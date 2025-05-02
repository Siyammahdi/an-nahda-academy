"use client";

import React, { useEffect, useState } from 'react';
import { AdminAPI, DashboardStatsDto, AdminActivityDto, UserDto } from '@/api/admin.api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  GraduationCap,
  LineChart,
  Plus,
  RefreshCcw,
  ScrollText,
  ShoppingCart,
  Users,
  Activity,
  ArrowRight,
  FileBarChart,
  BellRing
} from 'lucide-react';
import { formatDistanceToNow, format, subDays } from 'date-fns';
import Link from 'next/link';

// Mock chart data - in a real app this would come from the API
const revenueData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  data: [2100, 1800, 2600, 2300, 2800, 3200],
  previousYear: [1800, 1600, 2100, 1900, 2300, 2600]
};

const enrollmentData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  data: [15, 12, 18, 22, 20, 25]
};

const coursePerformanceData = [
  { name: "Learning Arabic", students: 28, completionRate: 78 },
  { name: "Fiqhun-Nisa", students: 22, completionRate: 85 },
  { name: "Hasanul Khuluk", students: 18, completionRate: 62 },
  { name: "Alima Course", students: 12, completionRate: 70 },
  { name: "Parenting Course", students: 15, completionRate: 55 },
];

// Upcoming payments data
const upcomingPayments = [
  { id: 1, name: "Ahmed Khan", amount: 650, course: "Learning Arabic", dueDate: "2023-06-15" },
  { id: 2, name: "Fatima Ali", amount: 1050, course: "Fiqhun-Nisa", dueDate: "2023-06-18" },
  { id: 3, name: "Saad Rahman", amount: 1000, course: "Hasanul Khuluk", dueDate: "2023-06-20" },
];

// Recent activities
const recentActivities = [
  { id: 1, type: "enrollment", user: "Mariam Hassan", course: "Parenting Course", time: "2 hours ago" },
  { id: 2, type: "payment", user: "Khalid Ahmed", amount: 550, course: "Parenting Course", time: "5 hours ago" },
  { id: 3, type: "completion", user: "Aisha Begum", course: "Fiqhun-Nisa", time: "Yesterday" },
  { id: 4, type: "enrollment", user: "Omar Farooq", course: "Learning Arabic", time: "Yesterday" },
  { id: 5, type: "registration", user: "Zainab Khan", time: "2 days ago" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStatsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState("month");

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const response = await AdminAPI.getDashboardStats();
        setStats(response.data);
        setError(null);
      } catch (error: any) {
        console.error('Error loading dashboard data:', error);
        setError(error.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Get current date for date display
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'MMMM d, yyyy');

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-red-200 text-red-700  px-4 py-3 rounded-lg" role="alert">
        <div className="flex items-center">
          <Activity className="h-5 w-5 mr-2 text-red-500" />
        <p><strong>Error:</strong> {error}</p>
        </div>
        <Button onClick={() => window.location.reload()} variant="outline" size="sm" className="mt-2">
          <RefreshCcw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">{formattedDate} - Welcome back, Admin!</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild className="bg-purple-600 hover:bg-purple-700" size="sm">
            <Link href="/admin/courses/new">
              <Plus className="h-4 w-4 mr-2" />
              New Course
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/users/new">
              <Plus className="h-4 w-4 mr-2" />
              New User
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold">{stats?.stats.users || 82}</p>
                <div className="flex items-center text-xs text-green-600">
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  <span>+12% from last month</span>
                </div>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                <p className="text-3xl font-bold">{stats?.stats.courses || 14}</p>
                <div className="flex items-center text-xs text-green-600">
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  <span>+5 new this quarter</span>
                </div>
              </div>
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-full">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Enrollments</p>
                <p className="text-3xl font-bold">{stats?.stats.enrollments || 164}</p>
                <div className="flex items-center text-xs text-green-600">
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  <span>+28 this month</span>
                </div>
              </div>
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-full">
                <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-3xl font-bold">৳{stats?.stats.revenue || 128350}</p>
                <div className="flex items-center text-xs text-green-600">
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  <span>+18% from last month</span>
                </div>
              </div>
              <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-full">
                <CreditCard className="h-6 w-6 text-amber-600 dark:text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart Card */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Revenue Overview</CardTitle>
              <Tabs defaultValue="month" className="w-[200px]" onValueChange={setDateRange}>
                <TabsList className="grid w-full grid-cols-3 h-8">
                  <TabsTrigger value="week" className="text-xs">Week</TabsTrigger>
                  <TabsTrigger value="month" className="text-xs">Month</TabsTrigger>
                  <TabsTrigger value="year" className="text-xs">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>Total revenue: ৳{revenueData.data.reduce((a, b) => a + b, 0).toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[240px] w-full">
              {/* Placeholder for Chart */}
              <div className="h-full w-full bg-slate-50 dark:bg-slate-900/50 rounded-lg flex items-center justify-center">
                <div className="space-y-4 text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium">Revenue Chart Placeholder</p>
                    <p className="text-xs text-muted-foreground">In the real implementation, this would be a Bar or Line chart</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-6 gap-2">
                {revenueData.months.map((month, index) => (
                  <div key={month} className="text-center">
                    <div className="text-xs font-medium">{month}</div>
                    <div className="mt-1 flex justify-center">
                      <Badge variant={index === revenueData.months.length - 1 ? "default" : "outline"} className={index === revenueData.months.length - 1 ? "bg-purple-600" : ""}>
                        ৳{(revenueData.data[index] / 1000).toFixed(1)}K
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enrollment Stats Card */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Enrollment Stats</CardTitle>
            <CardDescription>New enrollments over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[190px] w-full">
              {/* Placeholder for Chart */}
              <div className="h-full w-full bg-slate-50 dark:bg-slate-900/50 rounded-lg flex items-center justify-center">
                <div className="space-y-4 text-center">
                  <LineChart className="mx-auto h-10 w-10 text-slate-400" />
                  <p className="text-xs text-muted-foreground">Line chart placeholder</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-medium">Quick Stats</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">This Month</p>
                  <p className="text-lg font-bold text-green-600">+28</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">Last Month</p>
                  <p className="text-lg font-bold">+22</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/admin/enrollments">
                View Detailed Report
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Course Performance and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Course Performance */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Course Performance</CardTitle>
            <CardDescription>Enrollment and completion stats for top courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coursePerformanceData.map((course) => (
                <div key={course.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium">{course.name}</span>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{course.students} students</span>
                      </div>
                    </div>
                    <Badge variant="outline">{course.completionRate}% Completion</Badge>
                  </div>
                  <Progress value={course.completionRate} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/admin/courses">
                Manage Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        {/* Recent Activity */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            <CardDescription>Latest actions across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-1.5 rounded-full flex-shrink-0 ${
                    activity.type === 'enrollment' ? 'bg-green-100 dark:bg-green-900/30' :
                    activity.type === 'payment' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    activity.type === 'completion' ? 'bg-purple-100 dark:bg-purple-900/30' : 
                    'bg-amber-100 dark:bg-amber-900/30'
                  }`}>
                    {activity.type === 'enrollment' && <ShoppingCart className="h-4 w-4 text-green-600 dark:text-green-400" />}
                    {activity.type === 'payment' && <CreditCard className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                    {activity.type === 'completion' && <CheckCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
                    {activity.type === 'registration' && <Users className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.type === 'enrollment' && `Enrolled in ${activity.course}`}
                      {activity.type === 'payment' && `Paid ৳${activity.amount} for ${activity.course}`}
                      {activity.type === 'completion' && `Completed ${activity.course}`}
                      {activity.type === 'registration' && 'Created a new account'}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/admin/activity-logs">
                View All Activity
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Upcoming Payments and New Users */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Upcoming Payments */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Upcoming Payments</CardTitle>
            <CardDescription>Expected revenue in the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`https://avatar.vercel.sh/${payment.name.replace(' ', '')}.png`} alt={payment.name} />
                      <AvatarFallback>{payment.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{payment.name}</p>
                      <p className="text-xs text-muted-foreground">{payment.course}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">৳{payment.amount}</p>
                    <p className="text-xs text-muted-foreground">Due: {format(new Date(payment.dueDate), 'MMM dd')}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/admin/payments">
                View All Payments
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            <CardDescription>Frequent admin tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-1" asChild>
                <Link href="/admin/users/new">
                  <Users className="h-6 w-6 mb-1" />
                  <span className="text-xs">Add User</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-1" asChild>
                <Link href="/admin/courses/new">
                  <BookOpen className="h-6 w-6 mb-1" />
                  <span className="text-xs">Add Course</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-1" asChild>
                <Link href="/admin/announcements/new">
                  <BellRing className="h-6 w-6 mb-1" />
                  <span className="text-xs">Announcement</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-1" asChild>
                <Link href="/admin/reports">
                  <FileBarChart className="h-6 w-6 mb-1" />
                  <span className="text-xs">Reports</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 