"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Download, 
  Filter, 
  Check, 
  Clock, 
  X, 
  User, 
  Gauge, 
  BookOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

// Mock enrollments data
const mockEnrollments = [
  {
    id: '1',
    student: {
      id: '101',
      name: 'Ahmed Hassan',
      email: 'ahmed@example.com',
      avatar: 'https://avatar.vercel.sh/ahmed.png'
    },
    course: {
      id: '201',
      name: 'Learning Arabic'
    },
    status: 'active',
    progress: 68,
    startDate: '2023-05-15T00:00:00.000Z',
    endDate: '2023-11-15T00:00:00.000Z',
    paymentStatus: 'paid'
  },
  {
    id: '2',
    student: {
      id: '102',
      name: 'Fatima Khan',
      email: 'fatima@example.com',
      avatar: 'https://avatar.vercel.sh/fatima.png'
    },
    course: {
      id: '202',
      name: 'Fiqhun-Nisa'
    },
    status: 'active',
    progress: 42,
    startDate: '2023-06-01T00:00:00.000Z',
    endDate: '2023-12-01T00:00:00.000Z',
    paymentStatus: 'paid'
  },
  {
    id: '3',
    student: {
      id: '103',
      name: 'Mohammad Rahman',
      email: 'mohammad@example.com',
      avatar: 'https://avatar.vercel.sh/mohammad.png'
    },
    course: {
      id: '203',
      name: 'Hasanul Khuluk'
    },
    status: 'completed',
    progress: 100,
    startDate: '2023-03-10T00:00:00.000Z',
    endDate: '2023-09-10T00:00:00.000Z',
    paymentStatus: 'paid'
  },
  {
    id: '4',
    student: {
      id: '104',
      name: 'Zainab Ali',
      email: 'zainab@example.com',
      avatar: 'https://avatar.vercel.sh/zainab.png'
    },
    course: {
      id: '204',
      name: 'Alima Course'
    },
    status: 'on-hold',
    progress: 35,
    startDate: '2023-04-20T00:00:00.000Z',
    endDate: '2023-10-20T00:00:00.000Z',
    paymentStatus: 'partial'
  },
  {
    id: '5',
    student: {
      id: '105',
      name: 'Omar Farooq',
      email: 'omar@example.com',
      avatar: 'https://avatar.vercel.sh/omar.png'
    },
    course: {
      id: '205',
      name: 'Parenting Course'
    },
    status: 'active',
    progress: 22,
    startDate: '2023-07-05T00:00:00.000Z',
    endDate: '2024-01-05T00:00:00.000Z',
    paymentStatus: 'unpaid'
  }
];

export default function EnrollmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  // Filter enrollments based on search and filters
  const filteredEnrollments = mockEnrollments.filter(enrollment => {
    // Apply search filter
    const matchesSearch = 
      enrollment.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.course.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = 
      statusFilter === 'all' || enrollment.status === statusFilter;
    
    // Apply payment filter
    const matchesPayment = 
      paymentFilter === 'all' || enrollment.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Enrollments</h1>
          <p className="text-sm text-muted-foreground">Manage student enrollments across all courses</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            New Enrollment
          </Button>
        </div>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search enrollments..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <span>Status</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <span>Payment</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Enrollments Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnrollments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search className="h-8 w-8 text-gray-400" />
                      <p className="text-gray-500 font-medium">No enrollments found</p>
                      <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredEnrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={enrollment.student.avatar} alt={enrollment.student.name} />
                          <AvatarFallback>
                            {enrollment.student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{enrollment.student.name}</p>
                          <p className="text-xs text-gray-500">{enrollment.student.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{enrollment.course.name}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        enrollment.status === 'active' ? 'border-green-200 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        enrollment.status === 'completed' ? 'border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        'border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }>
                        {enrollment.status === 'active' && <Check className="h-3.5 w-3.5 mr-1" />}
                        {enrollment.status === 'completed' && <Check className="h-3.5 w-3.5 mr-1" />}
                        {enrollment.status === 'on-hold' && <Clock className="h-3.5 w-3.5 mr-1" />}
                        
                        <span>{enrollment.status === 'active' ? 'Active' : 
                              enrollment.status === 'completed' ? 'Completed' : 'On Hold'}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              enrollment.progress >= 80 ? 'bg-green-500' : 
                              enrollment.progress >= 40 ? 'bg-blue-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${enrollment.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium">{enrollment.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{format(new Date(enrollment.startDate), 'PP')}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        enrollment.paymentStatus === 'paid' ? 'border-green-200 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        enrollment.paymentStatus === 'partial' ? 'border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                        'border-red-200 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }>
                        {enrollment.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <User className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Gauge className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <BookOpen className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing <span className="font-medium">{filteredEnrollments.length}</span> of{" "}
          <span className="font-medium">{mockEnrollments.length}</span> enrollments
        </p>
        
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="bg-purple-50 text-purple-700 border-purple-200">1</Button>
          <Button variant="outline" size="sm" disabled>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Coming Soon Notice */}
      <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">
          Enhanced Enrollment Management Coming Soon
        </h3>
        <p className="text-sm text-blue-600 dark:text-blue-300 max-w-md mx-auto">
          We're working on building advanced enrollment features including bulk actions, detailed progress tracking, and automated reminders.
        </p>
      </div>
    </div>
  );
} 