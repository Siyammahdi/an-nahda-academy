import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, FileText, BarChart3 } from 'lucide-react';

export default function FinancialOverviewCards() {
  // TODO: Replace with props or API data
  const totalRevenue = 52500;
  const pendingPayments = 8000;
  const avgCourseValue = 10500;
  const pendingCount = 1;
  const enrollments = 5;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">৳{totalRevenue.toLocaleString()}</p>
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
              <p className="text-2xl font-bold">৳{pendingPayments.toLocaleString()}</p>
              <p className="text-xs text-amber-600">{pendingCount} payment pending</p>
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
              <p className="text-2xl font-bold">৳{avgCourseValue.toLocaleString()}</p>
              <p className="text-xs text-blue-600">Based on {enrollments} enrollments</p>
            </div>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 