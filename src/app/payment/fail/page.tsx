"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, ArrowLeft, RefreshCw, Home } from 'lucide-react';

const PaymentFailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tranId = searchParams.get('tran_id');
  const errorMessage = searchParams.get('error') || 'Payment processing failed';

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        {/* Error Icon */}
        <div className="rounded-full bg-red-100 p-6 dark:bg-red-900/20">
          <XCircle className="h-16 w-16 text-red-600 dark:text-red-500" />
        </div>

        {/* Error Message */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-red-600">Payment Failed</h1>
          <p className="text-lg text-muted-foreground max-w-md">
            {errorMessage}. Please try again or contact support if the problem persists.
          </p>
        </div>

        {/* Error Details */}
        {tranId && (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Transaction Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-medium">{tranId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium text-red-600">Failed</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button 
            onClick={() => router.back()}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
            className="flex-1"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        {/* Help Information */}
        <div className="text-center text-sm text-muted-foreground max-w-md space-y-2">
          <p>
            If you continue to experience issues, please:
          </p>
          <ul className="text-left space-y-1">
            <li>• Check your internet connection</li>
            <li>• Ensure your payment method has sufficient funds</li>
            <li>• Try using a different payment method</li>
            <li>• Contact our support team for assistance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailPage; 