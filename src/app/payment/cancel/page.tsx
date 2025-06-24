"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, Home, ShoppingCart } from 'lucide-react';

const PaymentCancelPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tranId = searchParams.get('tran_id');

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        {/* Cancel Icon */}
        <div className="rounded-full bg-yellow-100 p-6 dark:bg-yellow-900/20">
          <AlertCircle className="h-16 w-16 text-yellow-600 dark:text-yellow-500" />
        </div>

        {/* Cancel Message */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-yellow-600">Payment Cancelled</h1>
          <p className="text-lg text-muted-foreground max-w-md">
            Your payment was cancelled. No charges have been made to your account.
          </p>
        </div>

        {/* Transaction Details */}
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
                <span className="font-medium text-yellow-600">Cancelled</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button 
            onClick={() => router.push('/cart')}
            className="flex-1"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Return to Cart
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

        {/* Additional Information */}
        <div className="text-center text-sm text-muted-foreground max-w-md">
          <p>
            Your cart items are still saved. You can complete your purchase anytime 
            by returning to your cart.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage; 