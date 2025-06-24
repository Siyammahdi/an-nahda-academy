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
  Edit
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
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }
  
  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h2 className="text-xl font-semibold text-gray-900">Authentication Required</h2>
        <p className="text-gray-600 text-center max-w-md">
          You need to be logged in as an administrator to access the payment management page.
        </p>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Quick login credentials:</p>
          <div className="text-sm space-y-1">
            <p><strong>Admin:</strong> admin@example.com / Admin123</p>
            <p><strong>User:</strong> user@example.com / User123</p>
          </div>
        </div>
        <Button 
          onClick={() => window.location.href = '/login'} 
          className="bg-purple-600 hover:bg-purple-700"
        >
          Go to Login
        </Button>
      </div>
    );
  }

  // Show error if user is not admin
  if (user?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h2 className="text-xl font-semibold text-gray-900">Access Denied</h2>
        <p className="text-gray-600 text-center max-w-md">
          You need administrator privileges to access the payment management page.
          Current role: {user?.role}
        </p>
        <Button 
          onClick={() => window.location.href = '/dashboard'} 
          className="bg-purple-600 hover:bg-purple-700"
        >
          Go to Dashboard
        </Button>
      </div>
    );
  }
  
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600">Manage and monitor all payment transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={exportPayments}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
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
          
          <Card>
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
          
          <Card>
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
          
          <Card>
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="flex gap-2">
                <Input
                  id="search"
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
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
            
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
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
            
            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4">
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
      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment._id}>
                    <TableCell className="font-medium">{payment.orderId}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{payment.customerName}</div>
                        <div className="text-sm text-gray-500">{payment.customerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(payment.amount, payment.currency)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(payment.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(payment.status)}
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-gray-500" />
                        {getPaymentMethodName(payment.paymentMethod)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        {format(new Date(payment.createdAt), 'MMM dd, yyyy')}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openViewDialog(payment)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openUpdateDialog(payment)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {payment.status === 'pending' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePaymentValidation(payment)}
                            disabled={isSubmitting}
                            title="Validate Payment"
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {pagination && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                {pagination.total} results
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasPrev}
                  onClick={() => fetchPayments(pagination.page - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasNext}
                  onClick={() => fetchPayments(pagination.page + 1)}
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Order ID</Label>
                  <p className="text-sm">{selectedPayment.orderId}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Transaction ID</Label>
                  <p className="text-sm">{selectedPayment.tranId}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Customer Name</Label>
                  <p className="text-sm">{selectedPayment.customerName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm">{selectedPayment.customerEmail}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm">{selectedPayment.customerPhone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Amount</Label>
                  <p className="text-sm font-medium">
                    {formatCurrency(selectedPayment.amount, selectedPayment.currency)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge variant={getStatusBadgeVariant(selectedPayment.status)}>
                    {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Payment Method</Label>
                  <p className="text-sm">{getPaymentMethodName(selectedPayment.paymentMethod)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Created Date</Label>
                  <p className="text-sm">{format(new Date(selectedPayment.createdAt), 'PPP')}</p>
                </div>
                {selectedPayment.paymentDate && (
                  <div>
                    <Label className="text-sm font-medium">Payment Date</Label>
                    <p className="text-sm">{format(new Date(selectedPayment.paymentDate), 'PPP')}</p>
                  </div>
                )}
              </div>
              
              <div>
                <Label className="text-sm font-medium">Items</Label>
                <div className="mt-2 space-y-2">
                  {selectedPayment.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(item.price, selectedPayment.currency)} x {item.quantity}
                      </span>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Payment Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="status">Status</Label>
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleStatusUpdate} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 mt-2 animate-spin" />}
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 