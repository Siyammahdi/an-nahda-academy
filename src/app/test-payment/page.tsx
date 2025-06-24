"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const TestPaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const testBackendConnection = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('https://an-nahda-backend.vercel.app/api/payment/test');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const testPaymentInitiation = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const paymentData = {
        orderId: `TEST_${Date.now()}`,
        amount: 100,
        customerName: 'Test User',
        customerEmail: 'test@example.com',
        customerPhone: '01712345678',
        customerAddress: 'Dhaka',
        customerCity: 'Dhaka',
        customerPostCode: '1000',
        customerCountry: 'Bangladesh',
        items: [
          {
            name: 'Test Course',
            price: 100,
            quantity: 1
          }
        ]
      };

      const response = await fetch('/api/payment/sslcommerz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();
      setResult(data);

      if (data.success && data.gatewayPageURL) {
        // Redirect to SSLCommerz
        window.location.href = data.gatewayPageURL;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>SSLCommerz Integration Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Button 
              onClick={testBackendConnection}
              disabled={loading}
              variant="outline"
            >
              {loading ? 'Testing...' : 'Test Backend Connection'}
            </Button>

            <Button 
              onClick={testPaymentInitiation}
              disabled={loading}
            >
              {loading ? 'Initiating Payment...' : 'Test Payment Initiation'}
            </Button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <h3 className="text-red-800 font-medium">Error:</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {result && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <h3 className="text-green-800 font-medium">Result:</h3>
              <pre className="text-green-700 text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="text-blue-800 font-medium">Test Instructions:</h3>
            <ol className="text-blue-700 text-sm list-decimal pl-5 space-y-1">
              <li>First, test the backend connection to ensure the server is running</li>
              <li>Then, test payment initiation to verify SSLCommerz integration</li>
              <li>If successful, you'll be redirected to SSLCommerz payment gateway</li>
              <li>Use test cards: 4111111111111111 (Visa) or 5555555555554444 (MasterCard)</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestPaymentPage; 