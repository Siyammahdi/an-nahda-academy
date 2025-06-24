"use client";

import React, { useEffect, useState } from 'react';
import { AdminAPI, PaymentDto, PaymentStatsDto, PaymentPaginationDto } from '@/api/admin.api';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Loader2, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  DollarSign,
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Edit,
  RefreshCw,
  User,
  Mail,
  Phone,
  Package
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function PaymentsPage() {
  const { user, isAuthenticated } = useAuth();
  const [payments, setPayments] = useState<PaymentDto[]>([]);
  const [stats, setStats] = useState<PaymentStatsDto | null>(null);
  const [pagination, setPagination] = useState<PaymentPaginationDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Dialog states
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentDto | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch payments on component mount
  useEffect(() => {
    fetchPayments();
  }, []);
  
  // Fetch payments function
  const fetchPayments = async (page = 1) => {
    try {
      setLoading(true);
      
      const params: Record<string, string | number> = {
        page,
        limit: 10,
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(paymentMethodFilter !== 'all' && { paymentMethod: paymentMethodFilter }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate })
      };
      
      // First, let's test authentication
      try {
        const authTest = await fetch('/api/admin/payments?debug=auth');
        const authData = await authTest.json();
        console.log('Auth debug:', authData);
      } catch (authError: unknown) {
        console.error('Auth debug failed:', authError);
      }
      
      const response = await AdminAPI.getAllPayments(params);
      
      if (response.success) {
        setPayments(response.data.payments);
        setStats(response.data.stats);
        setPagination(response.data.pagination);
        setError(null);
      } else {
        throw new Error('Failed to fetch payments');
      }
    } catch (error: unknown) {
      console.error('Error fetching payments:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch payments';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle search
  const handleSearch = () => {
    fetchPayments(1);
  };
  
  // Handle filter changes
  const handleFilterChange = () => {
    fetchPayments(1);
  };
  
  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPaymentMethodFilter('all');
    setStartDate('');
    setEndDate('');
    fetchPayments(1);
  };
  
  // Open view payment dialog
  const openViewDialog = (payment: PaymentDto) => {
    setSelectedPayment(payment);
    setIsViewDialogOpen(true);
  };
  
  // Open update status dialog
  const openUpdateDialog = (payment: PaymentDto) => {
    setSelectedPayment(payment);
    setUpdateStatus(payment.status);
    setIsUpdateDialogOpen(true);
  };
  
  // Handle status update
  const handleStatusUpdate = async () => {
    if (!selectedPayment || !updateStatus) return;
    
    try {
      setIsSubmitting(true);
      
      let response;
      
      // Try the admin API first, then fallback to payment API
      try {
        response = await AdminAPI.updatePaymentStatus(selectedPayment._id, updateStatus);
      } catch (adminError: unknown) {
        console.log('Admin API failed, trying payment API:', adminError);
        // Fallback to payment API using tranId
        response = await AdminAPI.updatePaymentStatusViaPaymentAPI(selectedPayment.tranId, updateStatus);
      }
      
      if (response.success) {
        // Update the payment in the list
        setPayments(prev => 
          prev.map(p => 
            p._id === selectedPayment._id 
              ? { ...p, status: updateStatus as 'pending' | 'completed' | 'failed' | 'cancelled', updatedAt: new Date().toISOString() }
              : p
          )
        );
        
        setIsUpdateDialogOpen(false);
        toast.success('Payment status updated successfully');
        
        // Refresh data to update stats
        fetchPayments(pagination?.page || 1);
      } else {
        throw new Error('Failed to update payment status');
      }
    } catch (error: unknown) {
      console.error('Error updating payment status:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update payment status';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle payment validation
  const handlePaymentValidation = async (payment: PaymentDto) => {
    if (!payment.tranId) {
      toast.error('Payment has no transaction ID for validation');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const response = await AdminAPI.validatePayment(payment.tranId);
      
      if (response.success) {
        // Update the payment in the list
        setPayments(prev => 
          prev.map(p => 
            p._id === payment._id 
              ? { ...p, status: response.data.status, updatedAt: new Date().toISOString() }
              : p
          )
        );
        
        toast.success('Payment validated successfully');
        
        // Refresh data to update stats
        fetchPayments(pagination?.page || 1);
      } else {
        throw new Error('Failed to validate payment');
      }
    } catch (error: unknown) {
      console.error('Error validating payment:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to validate payment';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'failed':
        return 'destructive';
      case 'cancelled':
        return 'outline';
      default:
        return 'secondary';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'cancelled':
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };
  
  // Get payment method display name
  const getPaymentMethodName = (method: string) => {
    const methods: { [key: string]: string } = {
      'bkash': 'bKash',
      'nagad': 'Nagad',
      'card': 'Credit/Debit Card',
      'mobile_banking': 'Mobile Banking',
      'internet_banking': 'Internet Banking',
      'atm': 'ATM Card',
      'rocket': 'Rocket',
      'upay': 'Upay',
    };
    return methods[method] || method;
  };
  
  // Get payment method icon
  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'bkash':
      case 'nagad':
      case 'rocket':
      case 'upay':
      case 'mobile_banking':
        return <CreditCard className="h-4 w-4 text-blue-600" />;
      case 'card':
        return <CreditCard className="h-4 w-4 text-purple-600" />;
      case 'internet_banking':
        return <CreditCard className="h-4 w-4 text-green-600" />;
      default:
        return <CreditCard className="h-4 w-4 text-gray-500" />;
    }
  };
  
  // Format currency
  const formatCurrency = (amount: number, currency: string = 'BDT') => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Export payments
  const exportPayments = () => {
    const csvContent = [
      ['Order ID', 'Customer Name', 'Email', 'Amount', 'Status', 'Payment Method', 'Date'],
      ...payments.map(p => [
        p.orderId,
        p.customerName,
        p.customerEmail,
        formatCurrency(p.amount, p.currency),
        p.status,
        getPaymentMethodName(p.paymentMethod),
        format(new Date(p.createdAt), 'MMM dd, yyyy')
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Payments exported successfully');
  };
  
  if (loading && !payments.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <p className="text-gray-600">Loading payments...</p>
        </div>
      </div>
    );
  }
  
  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <AlertCircle className="h-16 w-16 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900">Authentication Required</h2>
          <p className="text-gray-600 text-center max-w-md">
            You need to be logged in as an administrator to access the payment management page.
          </p>
        </div>
        
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Quick login credentials:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">Admin:</span>
                  <span className="text-gray-600">admin@example.com / Admin123</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">User:</span>
                  <span className="text-gray-600">user@example.com / User123</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Button 
          onClick={() => window.location.href = '/login'} 
          className="bg-purple-600 hover:bg-purple-700 px-6"
        >
          Go to Login
        </Button>
      </div>
    );
  }

  // Show error if user is not admin
  if (user?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <AlertCircle className="h-16 w-16 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="text-gray-600 text-center max-w-md">
            You need administrator privileges to access the payment management page.
            <br />
            <span className="font-medium">Current role: {user?.role}</span>
          </p>
        </div>
        
        <Button 
          onClick={() => window.location.href = '/dashboard'} 
          className="bg-purple-600 hover:bg-purple-700 px-6"
        >
          Go to Dashboard
        </Button>
      </div>
    );
  }
  
  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-8 p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor all payment transactions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => fetchPayments(pagination?.page || 1)}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={exportPayments}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                All time transactions
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <p className="text-xs text-muted-foreground">
                Successful payments
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalAmount)}</div>
              <p className="text-xs text-muted-foreground">
                From completed payments
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Order</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.averageAmount)}</div>
              <p className="text-xs text-muted-foreground">
                Per completed payment
              </p>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Filters */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <Label htmlFor="search" className="text-sm font-medium">Search</Label>
              <div className="flex gap-2">
                <Input
                  id="search"
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1"
                />
                <Button onClick={handleSearch} size="icon" className="shrink-0">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="status" className="text-sm font-medium">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="paymentMethod" className="text-sm font-medium">Payment Method</Label>
              <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="bkash">bKash</SelectItem>
                  <SelectItem value="nagad">Nagad</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="mobile_banking">Mobile Banking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="dateRange" className="text-sm font-medium">Date Range</Label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-6">
            <Button onClick={handleFilterChange}>
              Apply Filters
            </Button>
            <Button variant="outline" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Payments Table */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Payment Transactions</span>
            <span className="text-sm font-normal text-gray-500">
              {pagination && `${pagination.total} total payments`}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Payment Method</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="text-right font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12">
                      <div className="flex flex-col items-center space-y-4">
                        <Package className="h-12 w-12 text-gray-400" />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">No payments found</h3>
                          <p className="text-gray-500">No payment transactions match your current filters.</p>
                        </div>
                        <Button variant="outline" onClick={clearFilters}>
                          Clear Filters
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  payments.map((payment) => (
                    <TableRow key={payment._id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{payment.orderId}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-500" />
                            {payment.customerName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            {payment.customerEmail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(payment.amount, payment.currency)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(payment.status)} className="gap-1">
                          {getStatusIcon(payment.status)}
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getPaymentMethodIcon(payment.paymentMethod)}
                          <span className="text-sm">{getPaymentMethodName(payment.paymentMethod)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{format(new Date(payment.createdAt), 'MMM dd, yyyy')}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openViewDialog(payment)}
                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openUpdateDialog(payment)}
                            className="h-8 w-8 p-0 hover:bg-orange-50 hover:text-orange-600"
                            title="Update Status"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {payment.status === 'pending' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePaymentValidation(payment)}
                              disabled={isSubmitting}
                              className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
                              title="Validate Payment"
                            >
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {pagination && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                {pagination.total} results
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasPrev}
                  onClick={() => fetchPayments(pagination.page - 1)}
                  className="px-4"
                >
                  Previous
                </Button>
                <span className="text-sm font-medium">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasNext}
                  onClick={() => fetchPayments(pagination.page + 1)}
                  className="px-4"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* View Payment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Payment Details
            </DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Order ID</Label>
                    <p className="text-sm bg-gray-50 p-2 rounded">{selectedPayment.orderId}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Transaction ID</Label>
                    <p className="text-sm bg-gray-50 p-2 rounded font-mono">{selectedPayment.tranId}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Amount</Label>
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(selectedPayment.amount, selectedPayment.currency)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Status</Label>
                    <Badge variant={getStatusBadgeVariant(selectedPayment.status)} className="gap-1">
                      {getStatusIcon(selectedPayment.status)}
                      {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Customer Name
                    </Label>
                    <p className="text-sm bg-gray-50 p-2 rounded">{selectedPayment.customerName}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <p className="text-sm bg-gray-50 p-2 rounded">{selectedPayment.customerEmail}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </Label>
                    <p className="text-sm bg-gray-50 p-2 rounded">{selectedPayment.customerPhone}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Payment Method</Label>
                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                      {getPaymentMethodIcon(selectedPayment.paymentMethod)}
                      <span className="text-sm">{getPaymentMethodName(selectedPayment.paymentMethod)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Dates */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Created Date</Label>
                    <p className="text-sm bg-gray-50 p-2 rounded">
                      {format(new Date(selectedPayment.createdAt), 'PPP p')}
                    </p>
                  </div>
                  {selectedPayment.paymentDate && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Payment Date</Label>
                      <p className="text-sm bg-gray-50 p-2 rounded">
                        {format(new Date(selectedPayment.paymentDate), 'PPP p')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <Separator />
              
              {/* Items */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                <div className="space-y-3">
                  {selectedPayment.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-purple-600">{index + 1}</span>
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(item.price, selectedPayment.currency)} x {item.quantity}
                        </div>
                        <div className="text-sm text-gray-500">
                          Total: {formatCurrency(item.price * item.quantity, selectedPayment.currency)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Update Status Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Payment Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="status" className="text-sm font-medium">Payment Status</Label>
              <Select value={updateStatus} onValueChange={setUpdateStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {selectedPayment && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Payment Summary</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Order:</span> {selectedPayment.orderId}</p>
                  <p><span className="font-medium">Amount:</span> {formatCurrency(selectedPayment.amount, selectedPayment.currency)}</p>
                  <p><span className="font-medium">Customer:</span> {selectedPayment.customerName}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleStatusUpdate} 
              disabled={isSubmitting || !updateStatus}
            >
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}   