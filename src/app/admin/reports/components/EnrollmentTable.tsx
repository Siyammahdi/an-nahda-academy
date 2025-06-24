import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

const enrollmentData = [
  { id: 1, course: 'Learning Arabic', totalEnrollments: 28, activeEnrollments: 22, completionRate: 35 },
  { id: 2, course: 'Fiqhun-Nisa', totalEnrollments: 42, activeEnrollments: 38, completionRate: 20 },
  { id: 3, course: 'Hasanul Khuluk', totalEnrollments: 18, activeEnrollments: 15, completionRate: 30 },
  { id: 4, course: 'Alima Course', totalEnrollments: 12, activeEnrollments: 10, completionRate: 25 },
  { id: 5, course: 'Parenting Course', totalEnrollments: 35, activeEnrollments: 32, completionRate: 15 },
];

export default function EnrollmentTable() {
  // TODO: Replace with props or API data
  return (
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
  );
} 