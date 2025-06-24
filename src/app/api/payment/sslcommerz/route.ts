import { NextRequest, NextResponse } from 'next/server';

// Backend API URL - Updated to use the working backend
const BACKEND_URL = process.env.BACKEND_URL || 'https://an-nahda-backend.vercel.app';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Frontend received payment request:', {
      orderId: body.orderId,
      amount: body.amount,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      backendUrl: BACKEND_URL
    });
    
    // Forward the request to the backend
    const response = await fetch(`${BACKEND_URL}/api/payment/sslcommerz/init`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || '',
      },
      body: JSON.stringify(body),
    });

    console.log('Backend response status:', response.status);
    console.log('Backend response headers:', Object.fromEntries(response.headers.entries()));

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Backend returned non-JSON response:', contentType);
      return NextResponse.json(
        { 
          error: 'Backend service unavailable',
          details: `Backend returned ${response.status} with content-type: ${contentType}`,
          backendUrl: BACKEND_URL
        },
        { status: 503 }
      );
    }

    const result = await response.json();
    console.log('Backend response body:', result);

    if (response.ok) {
      return NextResponse.json(result);
    } else {
      console.error('Backend error:', {
        status: response.status,
        statusText: response.statusText,
        result: result
      });
      return NextResponse.json(
        { error: result.message || result.details || 'Payment gateway error' },
        { status: response.status }
      );
    }

  } catch (error) {
    console.error('SSLCommerz payment error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 