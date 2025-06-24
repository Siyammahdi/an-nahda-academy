import { Button } from '@/components/ui/button';
import { Download, Mail } from 'lucide-react';

export default function PageHeader() {
  return (
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
  );
} 