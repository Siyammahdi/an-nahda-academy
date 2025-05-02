"use client";

import React, { useState, useEffect } from 'react';
import { AdminAPI, AdminActivityDto } from '@/api/admin.api';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  ChevronDown, 
  DownloadCloud, 
  Filter, 
  List, 
  Loader2, 
  MoreHorizontal, 
  RefreshCcw, 
  Search,
  Trash2,
  FileText,
  Users,
  BookOpen,
  Settings
} from 'lucide-react';
import { format, subDays } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

// Mock data for activity logs if the API doesn't return enough details
const activitiesData: AdminActivityDto[] = Array.from({ length: 50 }).map((_, i) => ({
  _id: `activity-${i + 1}`,
  userId: {
    _id: `user-${Math.floor(Math.random() * 10) + 1}`,
    name: ['Ahmed Admin', 'Sara Manager', 'Omar Moderator', 'Fatima Supervisor', 'Zainab Administrator'][Math.floor(Math.random() * 5)],
    email: 'admin@example.com'
  },
  action: ['create', 'update', 'delete', 'view', 'login', 'logout'][Math.floor(Math.random() * 6)],
  details: [
    'Updated course content', 
    'Created new user account', 
    'Deleted expired announcement', 
    'Viewed student details', 
    'Updated system settings', 
    'Modified payment records'
  ][Math.floor(Math.random() * 6)],
  resourceType: ['user', 'course', 'setting', 'other'][Math.floor(Math.random() * 4)],
  resourceId: `resource-${Math.floor(Math.random() * 100) + 1}`,
  ip: `192.168.1.${Math.floor(Math.random() * 255) + 1}`,
  timestamp: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
}));

export default function ActivityLogsPage() {
  const [activities, setActivities] = useState<AdminActivityDto[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<AdminActivityDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [resourceFilter, setResourceFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState('7days');
  const [userFilter, setUserFilter] = useState('all');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // View type
  const [viewType, setViewType] = useState<'list' | 'detailed'>('list');

  // Load data on component mount
  useEffect(() => {
    fetchActivities();
  }, []);

  // Apply filters whenever filter states change
  useEffect(() => {
    applyFilters();
  }, [searchTerm, actionFilter, resourceFilter, dateRangeFilter, userFilter, activities]);

  // Fetch activities from API
  const fetchActivities = async () => {
    setLoading(true);
    
    try {
      // Try to fetch from API first
      const response = await AdminAPI.getActivityLogs();
      
      if (response?.data && response.data.length > 0) {
      setActivities(response.data);
      } else {
        // Fall back to mock data if API returns empty or no data
        console.log('Using mock activity data');
        setActivities(activitiesData);
      }
      
      setError(null);
    } catch (error: any) {
      console.error('Error fetching activities:', error);
      // Fall back to mock data on error
      setActivities(activitiesData);
      // Still show a toast notification about the API error
      toast.error('Could not fetch from API, using demo data');
    } finally {
      setLoading(false);
    }
  };

  // Apply all filters to activity data
  const applyFilters = () => {
    let result = [...activities];
    
    // Apply search term filter
    if (searchTerm) {
      result = result.filter(activity => 
        activity.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.resourceType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply action filter
    if (actionFilter !== 'all') {
      result = result.filter(activity => activity.action === actionFilter);
    }
    
    // Apply resource filter
    if (resourceFilter !== 'all') {
      result = result.filter(activity => activity.resourceType === resourceFilter);
    }
    
    // Apply date range filter
    const now = new Date();
    let cutoffDate: Date;
    
    switch (dateRangeFilter) {
      case 'today':
        cutoffDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case '7days':
        cutoffDate = subDays(now, 7);
        break;
      case '30days':
        cutoffDate = subDays(now, 30);
        break;
      case 'all':
      default:
        cutoffDate = new Date(0); // Beginning of time
        break;
    }
    
    if (dateRangeFilter !== 'all') {
      result = result.filter(activity => new Date(activity.timestamp) >= cutoffDate);
    }
    
    // Apply user filter
    if (userFilter !== 'all') {
      result = result.filter(activity => activity.userId._id === userFilter);
    }
    
    // Sort by timestamp (newest first)
    result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    setFilteredActivities(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Get color based on action type
  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'update':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'delete':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'view':
        return 'text-amber-600 bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400';
      case 'login':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400';
      case 'logout':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  // Get icon based on resource type
  const getResourceIcon = (resourceType: string) => {
    switch (resourceType) {
      case 'user':
        return <Users className="h-4 w-4" />;
      case 'course':
        return <BookOpen className="h-4 w-4" />;
      case 'setting':
        return <Settings className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  // Export to CSV
  const exportToCsv = () => {
    const headers = ['Date', 'User', 'Action', 'Resource Type', 'Details', 'IP'];
    
    const csvData = filteredActivities.map(activity => [
      format(new Date(activity.timestamp), 'yyyy-MM-dd HH:mm:ss'),
      activity.userId.name,
      activity.action,
      activity.resourceType,
      activity.details,
      activity.ip
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `activity-logs-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Activity logs exported successfully');
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredActivities.slice(indexOfFirstItem, indexOfLastItem);

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          onClick={() => setCurrentPage(1)}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Show ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Show current page and surrounding pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i <= 1 || i >= totalPages) continue;
      
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            onClick={() => setCurrentPage(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            onClick={() => setCurrentPage(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Activity Logs</h1>
          <p className="text-sm text-muted-foreground">
            Monitor and analyze admin activities
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Tabs defaultValue="list" onValueChange={(value) => setViewType(value as 'list' | 'detailed')}>
            <TabsList className="h-9">
              <TabsTrigger value="list" className="px-3 text-xs">
                <List className="h-4 w-4 mr-1" />
                List
              </TabsTrigger>
              <TabsTrigger value="detailed" className="px-3 text-xs">
                <FileText className="h-4 w-4 mr-1" />
                Detailed
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="sm" onClick={fetchActivities} className="h-9">
            <RefreshCcw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          
          <Button variant="outline" size="sm" onClick={exportToCsv} className="h-9">
            <DownloadCloud className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle>Filters</CardTitle>
          <CardDescription>
            Narrow down activity logs by applying filters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <p className="text-sm font-medium mb-2">Search</p>
        <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
                  placeholder="Search in logs..."
                  className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
              </div>
        </div>
        
            <div>
              <p className="text-sm font-medium mb-2">Action</p>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="create">Create</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
              <SelectItem value="view">View</SelectItem>
              <SelectItem value="login">Login</SelectItem>
              <SelectItem value="logout">Logout</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
            <div>
              <p className="text-sm font-medium mb-2">Resource</p>
              <Select value={resourceFilter} onValueChange={setResourceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select resource" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Resources</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="course">Course</SelectItem>
              <SelectItem value="setting">Setting</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Date Range</p>
              <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Items Per Page</p>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Items per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="25">25 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                  <SelectItem value="100">100 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
        </CardContent>
      </Card>
      
      {loading ? (
        <div className="flex justify-center items-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <span className="ml-2 text-lg">Loading activity logs...</span>
        </div>
      ) : (
        <>
          {viewType === 'list' ? (
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Activity Log List</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {filteredActivities.length} {filteredActivities.length === 1 ? 'entry' : 'entries'}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead className="hidden md:table-cell">Details</TableHead>
                      <TableHead className="hidden lg:table-cell">IP Address</TableHead>
                      <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
                    {currentItems.length === 0 ? (
              <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <FileText className="h-8 w-8 mb-2" />
                            <h3 className="text-lg font-medium">No activities found</h3>
                            <p className="text-sm mt-1">Try changing your search or filter criteria</p>
                          </div>
                </TableCell>
              </TableRow>
            ) : (
                      currentItems.map((activity) => (
                <TableRow key={activity._id}>
                          <TableCell className="font-medium whitespace-nowrap">
                            {format(new Date(activity.timestamp), 'MMM dd, HH:mm')}
                  </TableCell>
                  <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7">
                                <AvatarImage src={`https://avatar.vercel.sh/${activity.userId.name.replace(' ', '')}.png`} />
                                <AvatarFallback>{activity.userId.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{activity.userId.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                            <Badge className={`${getActionColor(activity.action)}`}>
                              {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                            <div className="flex items-center gap-1">
                              {getResourceIcon(activity.resourceType)}
                              <span className="text-sm capitalize">{activity.resourceType}</span>
                    </div>
                  </TableCell>
                          <TableCell className="max-w-[250px] truncate hidden md:table-cell">
                            {activity.details}
                          </TableCell>
                          <TableCell className="whitespace-nowrap hidden lg:table-cell">
                            {activity.ip}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Export Entry</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
              </CardContent>
              <CardFooter className="flex justify-between items-center py-4">
                <div className="text-sm text-muted-foreground">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredActivities.length)} of {filteredActivities.length} entries
      </div>
      
        <Pagination>
          <PaginationContent>
              <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    />
                    {renderPaginationItems()}
                    <PaginationNext
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages || totalPages === 0}
                    />
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </Card>
          ) : (
            <div className="space-y-4">
              {currentItems.length === 0 ? (
                <Card className="shadow-sm">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No activities found</h3>
                    <p className="text-sm mt-1 text-muted-foreground">Try changing your search or filter criteria</p>
                  </CardContent>
                </Card>
              ) : (
                currentItems.map((activity) => (
                  <Card key={activity._id} className="shadow-sm overflow-hidden">
                    <CardHeader className="pb-2 bg-muted/40">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={`https://avatar.vercel.sh/${activity.userId.name.replace(' ', '')}.png`} />
                            <AvatarFallback>{activity.userId.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{activity.userId.name}</CardTitle>
                            <CardDescription>{activity.userId.email}</CardDescription>
                          </div>
                        </div>
                        <Badge className={`${getActionColor(activity.action)}`}>
                          {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="py-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-sm">Activity Details</h3>
                          <p className="mt-1 text-sm">{activity.details}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <h4 className="text-xs text-muted-foreground mb-1">Timestamp</h4>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{format(new Date(activity.timestamp), 'MMM dd, yyyy HH:mm:ss')}</span>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-xs text-muted-foreground mb-1">Resource Type</h4>
                            <div className="flex items-center gap-1.5">
                              {getResourceIcon(activity.resourceType)}
                              <span className="capitalize">{activity.resourceType}</span>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-xs text-muted-foreground mb-1">IP Address</h4>
                            <span>{activity.ip}</span>
                          </div>
                        </div>
                        
                        {activity.resourceId && (
                          <div>
                            <h4 className="text-xs text-muted-foreground mb-1">Resource ID</h4>
                            <Badge variant="outline" className="font-mono">{activity.resourceId}</Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
              
              <div className="flex justify-between items-center py-2">
                <div className="text-sm text-muted-foreground">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredActivities.length)} of {filteredActivities.length} entries
                </div>
                
                <Pagination>
                  <PaginationContent>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    />
                    {renderPaginationItems()}
              <PaginationNext
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages || totalPages === 0}
              />
          </PaginationContent>
        </Pagination>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
} 