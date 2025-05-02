"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, LineChart, PieChart, Activity, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-sm text-muted-foreground">Track and analyze your platform's performance metrics</p>
        </div>
        <div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>
      
      {/* Time Period Filter */}
      <Tabs defaultValue="month" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Page Views" value="24,589" trend="+12.5%" icon={<Activity className="h-5 w-5 text-blue-600" />} />
        <StatsCard title="Unique Visitors" value="8,245" trend="+5.2%" icon={<Activity className="h-5 w-5 text-green-600" />} />
        <StatsCard title="Conversion Rate" value="3.6%" trend="+0.8%" icon={<Activity className="h-5 w-5 text-purple-600" />} />
        <StatsCard title="Average Session" value="4m 32s" trend="+12.3%" icon={<Activity className="h-5 w-5 text-amber-600" />} />
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">User Growth</CardTitle>
            <CardDescription>User registrations over time</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-slate-50 rounded-md">
            <div className="text-center space-y-3">
              <LineChart className="h-12 w-12 mx-auto text-slate-400" />
              <p className="text-sm text-slate-500">User growth trends visualization will appear here</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Traffic Sources</CardTitle>
            <CardDescription>Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-slate-50 rounded-md">
            <div className="text-center space-y-3">
              <PieChart className="h-12 w-12 mx-auto text-slate-400" />
              <p className="text-sm text-slate-500">Traffic sources breakdown will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Additional Charts */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Content Performance</CardTitle>
          <CardDescription>Most viewed courses and engagement metrics</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center bg-slate-50 rounded-md">
          <div className="text-center space-y-3">
            <BarChart3 className="h-12 w-12 mx-auto text-slate-400" />
            <p className="text-sm text-slate-500">Course performance metrics will appear here</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800 mb-2">
          Analytics Dashboard Coming Soon
        </h3>
        <p className="text-sm text-blue-600 max-w-md mx-auto">
          We're working on building a comprehensive analytics dashboard to help you track and optimize your platform's performance.
        </p>
      </div>
    </div>
  );
}

// Reusable stats card component
function StatsCard({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: React.ReactNode }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            <div className="flex items-center text-xs text-green-600">
              <span>{trend}</span>
            </div>
          </div>
          <div className="p-2 rounded-full bg-slate-100">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 