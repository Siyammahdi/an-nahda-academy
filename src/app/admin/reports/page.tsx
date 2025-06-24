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
import PageHeader from './components/PageHeader';
import ReportTabs from './components/ReportTabs';
import ComingSoonNotice from './components/ComingSoonNotice';

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
  return (
    <div className="space-y-6">
      <PageHeader />
      <ReportTabs />
      <ComingSoonNotice />
    </div>
  );
} 