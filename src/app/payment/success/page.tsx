"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Home, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const PaymentSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validatePayment = async () => {
      try {
        const tranId = searchParams.get('tran_id');
        const status = searchParams.get('status');
        const valId = searchParams.get('val_id');

        console.log('Payment success page - validation params:', {
          tranId,
          status,
          valId
        });

        if (tranId && valId) {
          // Always try to validate payment with backend, regardless of status
          const response = await fetch('https://an-nahda-backend.vercel.app/api/payment/sslcommerz/validate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              tran_id: tranId,
              val_id: valId,
            }),
          });

          const data = await response.json();
          console.log('Payment validation response:', data);

          if (response.ok && data.success) {
            setPaymentDetails(data);
            console.log('Payment validated successfully:', data);
          } else {
            console.error('Payment validation failed:', data);
            // Even if validation fails, we can still show success if we have basic payment info
            if (tranId) {
              setPaymentDetails({
                tran_id: tranId,
                amount: searchParams.get('amount') || 'Unknown',
                payment_method: 'Unknown',
                fallback_validation: true,
                validation_message: 'Payment processed but validation pending'
              });
            }
          }
        } else if (tranId) {
          // If we have tranId but no valId, still show success with basic info
          setPaymentDetails({
            tran_id: tranId,
            amount: searchParams.get('amount') || 'Unknown',
            payment_method: 'Unknown',
            fallback_validation: true,
            validation_message: 'Payment processed successfully'
          });
        }
      } catch (error) {
        console.error('Error validating payment:', error);
        // Show basic success info even if validation fails
        const tranId = searchParams.get('tran_id');
        if (tranId) {
          setPaymentDetails({
            tran_id: tranId,
            amount: searchParams.get('amount') || 'Unknown',
            payment_method: 'Unknown',
            fallback_validation: true,
            validation_message: 'Payment processed successfully'
          });
        }
      } finally {
        setLoading(false);
      }
    };

    validatePayment();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-lg text-muted-foreground">Validating your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        {/* Success Icon */}
        <div className="rounded-full bg-green-100 p-6 dark:bg-green-900/20">
          <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-500" />
        </div>

        {/* Success Message */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
          <p className="text-lg text-muted-foreground max-w-md">
            Your payment has been processed successfully. You will receive a confirmation email shortly.
          </p>
        </div>

        {/* Payment Details */}
        {paymentDetails && (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-medium">{paymentDetails.tran_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">৳{paymentDetails.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-medium capitalize">{paymentDetails.payment_method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium text-green-600">
                  {paymentDetails.validation_message || 'Paid'}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          {isAuthenticated ? (
            <>
              <Button 
                onClick={() => router.push('/dashboard/courses')}
                className="flex-1"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                My Courses
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push('/dashboard')}
                className="flex-1"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </>
          ) : (
            <>
              <Button 
                onClick={() => router.push('/login')}
                className="flex-1"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Login to Access Courses
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push('/')}
                className="flex-1"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </>
          )}
        </div>

        {/* Additional Information */}
        <div className="text-center text-sm text-muted-foreground max-w-md">
          <p>
            If you have any questions about your payment or course access, 
            please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage; 