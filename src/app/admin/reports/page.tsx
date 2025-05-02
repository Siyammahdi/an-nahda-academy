"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { 
  BarChart3, 
  LineChart, 
  FileText, 
  Download, 
  Calendar, 
  Users, 
  BookOpen, 
  CreditCard, 
  Filter,
  Mail
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';

// Mock financial data
const financialData = [
  { id: 1, date: '2023-07-01', type: 'Course Enrollment', course: 'Learning Arabic', student: 'Ahmed Hassan', amount: 12000, status: 'completed' },
  { id: 2, date: '2023-07-03', type: 'Course Enrollment', course: 'Fiqhun-Nisa', student: 'Fatima Khan', amount: 15000, status: 'completed' },
  { id: 3, date: '2023-07-05', type: 'Partial Payment', course: 'Alima Course', student: 'Zainab Ali', amount: 8000, status: 'pending' },
  { id: 4, date: '2023-07-10', type: 'Course Enrollment', course: 'Hasanul Khuluk', student: 'Mohammad Rahman', amount: 10000, status: 'completed' },
  { id: 5, date: '2023-07-15', type: 'Course Enrollment', course: 'Parenting Course', student: 'Omar Farooq', amount: 7500, status: 'completed' },
];

// Mock enrollment data
const enrollmentData = [
  { id: 1, course: 'Learning Arabic', totalEnrollments: 28, activeEnrollments: 22, completionRate: 35 },
  { id: 2, course: 'Fiqhun-Nisa', totalEnrollments: 42, activeEnrollments: 38, completionRate: 20 },
  { id: 3, course: 'Hasanul Khuluk', totalEnrollments: 18, activeEnrollments: 15, completionRate: 30 },
  { id: 4, course: 'Alima Course', totalEnrollments: 12, activeEnrollments: 10, completionRate: 25 },
  { id: 5, course: 'Parenting Course', totalEnrollments: 35, activeEnrollments: 32, completionRate: 15 },
];

// Date range picker component (placeholder)
const DateRangePicker = ({ onChange }: { onChange: (range: { from: Date; to: Date }) => void }) => {
  return (
    <div className="flex items-center gap-2 border rounded-md px-3 py-2">
      <Calendar className="h-4 w-4 text-gray-500" />
      <span className="text-sm">Last 30 days</span>
    </div>
  );
};

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('financial');
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Reports</h1>
          <p className="text-sm text-muted-foreground">Financial and operational insights for your academy</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Report
          </Button>
        </div>
      </div>
      
      {/* Report Tabs */}
      <Card>
        <CardHeader className="pb-0">
          <Tabs defaultValue="financial" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="financial" className="flex items-center gap-1">
                  <CreditCard className="h-4 w-4" />
                  <span>Financial</span>
                </TabsTrigger>
                <TabsTrigger value="enrollment" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Enrollment</span>
                </TabsTrigger>
                <TabsTrigger value="courses" className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>Courses</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                <DateRangePicker onChange={setDateRange} />
                <Select defaultValue="all">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="arabic">Learning Arabic</SelectItem>
                    <SelectItem value="fiqh">Fiqhun-Nisa</SelectItem>
                    <SelectItem value="khuluk">Hasanul Khuluk</SelectItem>
                    <SelectItem value="alima">Alima Course</SelectItem>
                    <SelectItem value="parenting">Parenting Course</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Tabs>
        </CardHeader>
        
        <CardContent className="pt-6">
          <TabsContent value="financial" className="mt-0">
            {/* Financial Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">৳52,500</p>
                      <p className="text-xs text-green-600">+12% from last month</p>
                    </div>
                    <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-full">
                      <CreditCard className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Payments</p>
                      <p className="text-2xl font-bold">৳8,000</p>
                      <p className="text-xs text-amber-600">1 payment pending</p>
                    </div>
                    <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-full">
                      <FileText className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Course Value</p>
                      <p className="text-2xl font-bold">৳10,500</p>
                      <p className="text-xs text-blue-600">Based on 5 enrollments</p>
                    </div>
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Financial Transactions Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {financialData.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{format(new Date(transaction.date), 'MMM d, yyyy')}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.course}</TableCell>
                      <TableCell>{transaction.student}</TableCell>
                      <TableCell>৳{transaction.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === 'completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}>
                          {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="enrollment" className="mt-0">
            {/* Enrollment Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Enrollments</p>
                      <p className="text-2xl font-bold">135</p>
                      <p className="text-xs text-green-600">+15% from last month</p>
                    </div>
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-full">
                      <Users className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Enrollments</p>
                      <p className="text-2xl font-bold">117</p>
                      <p className="text-xs text-blue-600">86.7% active rate</p>
                    </div>
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Completion Rate</p>
                      <p className="text-2xl font-bold">25%</p>
                      <p className="text-xs text-amber-600">Across all courses</p>
                    </div>
                    <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-full">
                      <LineChart className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Enrollment Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Total Enrollments</TableHead>
                    <TableHead>Active Enrollments</TableHead>
                    <TableHead>Completion Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollmentData.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.course}</TableCell>
                      <TableCell>{course.totalEnrollments}</TableCell>
                      <TableCell>{course.activeEnrollments}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${course.completionRate}%` }}
                            />
                          </div>
                          <span className="text-xs">{course.completionRate}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="courses" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12">
              <BarChart3 className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Course Analytics Coming Soon</h3>
              <p className="text-sm text-gray-500 text-center max-w-md">
                We're working on comprehensive course analytics to help you understand engagement, 
                completion rates, and student feedback across all your courses.
              </p>
            </div>
          </TabsContent>
        </CardContent>
      </Card>
      
      {/* Coming Soon Notice */}
      <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">
          Enhanced Reporting Features Coming Soon
        </h3>
        <p className="text-sm text-blue-600 dark:text-blue-300 max-w-md mx-auto">
          We're working on adding advanced analytics, custom report generation, and scheduled email reports to help you gain deeper insights into your platform's performance.
        </p>
      </div>
    </div>
  );
} 