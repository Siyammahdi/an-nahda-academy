import { Card, CardContent } from '@/components/ui/card';
import { Users, BookOpen, LineChart } from 'lucide-react';

export default function EnrollmentOverviewCards() {
  // TODO: Replace with props or API data
  const totalEnrollments = 135;
  const activeEnrollments = 117;
  const avgCompletionRate = 25;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Total Enrollments</p>
              <p className="text-2xl font-bold">{totalEnrollments}</p>
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
              <p className="text-2xl font-bold">{activeEnrollments}</p>
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
              <p className="text-2xl font-bold">{avgCompletionRate}%</p>
              <p className="text-xs text-amber-600">Across all courses</p>
            </div>
            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-full">
              <LineChart className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 