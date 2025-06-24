import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { format } from 'date-fns';

const financialData = [
  { id: 1, date: '2023-07-01', type: 'Course Enrollment', course: 'Learning Arabic', student: 'Ahmed Hassan', amount: 12000, status: 'completed' },
  { id: 2, date: '2023-07-03', type: 'Course Enrollment', course: 'Fiqhun-Nisa', student: 'Fatima Khan', amount: 15000, status: 'completed' },
  { id: 3, date: '2023-07-05', type: 'Partial Payment', course: 'Alima Course', student: 'Zainab Ali', amount: 8000, status: 'pending' },
  { id: 4, date: '2023-07-10', type: 'Course Enrollment', course: 'Hasanul Khuluk', student: 'Mohammad Rahman', amount: 10000, status: 'completed' },
  { id: 5, date: '2023-07-15', type: 'Course Enrollment', course: 'Parenting Course', student: 'Omar Farooq', amount: 7500, status: 'completed' },
];

export default function FinancialTransactionsTable() {
  // TODO: Replace with props or API data
  return (
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
  );
} 