import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, CreditCard, Users, BookOpen, BarChart3 } from 'lucide-react';
import FinancialOverviewCards from './FinancialOverviewCards';
import FinancialTransactionsTable from './FinancialTransactionsTable';
import EnrollmentOverviewCards from './EnrollmentOverviewCards';
import EnrollmentTable from './EnrollmentTable';

const DateRangePicker = ({ onChange }: { onChange: (range: { from: Date; to: Date }) => void }) => (
  <div className="flex items-center gap-2 border rounded-md px-3 py-2">
    <Calendar className="h-4 w-4 text-gray-500" />
    <span className="text-sm">Last 30 days</span>
  </div>
);

export default function ReportTabs() {
  const [activeTab, setActiveTab] = useState('financial');
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });

  return (
    <Card>
      <Tabs defaultValue="financial" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <CardHeader className="pb-0">
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
        </CardHeader>
        <CardContent className="pt-6">
          <TabsContent value="financial" className="mt-0">
            <FinancialOverviewCards />
            <FinancialTransactionsTable />
          </TabsContent>
          <TabsContent value="enrollment" className="mt-0">
            <EnrollmentOverviewCards />
            <EnrollmentTable />
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
      </Tabs>
    </Card>
  );
} 