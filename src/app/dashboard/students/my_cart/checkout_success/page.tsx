"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

// Component to handle transaction details
function TransactionDetails() {
  const searchParams = useSearchParams();
  const transId = searchParams.get('trans_id') || 'Unknown';

  return (
    <div className="bg-muted/50 p-4 rounded-lg mb-8 w-full max-w-md">
      <p className="font-medium">Transaction Details</p>
      <p className="text-sm text-muted-foreground mb-2">Transaction ID: {transId}</p>
      <p className="text-sm text-muted-foreground">A confirmation email has been sent to your registered email address.</p>
    </div>
  );
}

// Loading fallback
function TransactionDetailsSkeleton() {
  return (
    <div className="bg-muted/50 p-4 rounded-lg mb-8 w-full max-w-md animate-pulse">
      <p className="font-medium">Transaction Details</p>
      <div className="h-4 bg-muted rounded w-3/4 my-2"></div>
      <div className="h-4 bg-muted rounded w-full"></div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/dashboard/courses');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
      <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-4 mb-6">
        <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
      <p className="text-xl text-muted-foreground mb-6">
        Thank you for your purchase
      </p>
      
      <Suspense fallback={<TransactionDetailsSkeleton />}>
        <TransactionDetails />
      </Suspense>
      
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          You&apos;ll be redirected to your courses in {countdown} seconds...
        </p>
        
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            Go to Dashboard
          </Button>
          <Button onClick={() => router.push('/dashboard/courses')}>
            View My Courses
          </Button>
        </div>
      </div>
    </div>
  );
} 