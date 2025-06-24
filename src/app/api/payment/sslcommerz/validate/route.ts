import { NextRequest, NextResponse } from 'next/server';

// Use a dedicated payment backend URL
const BACKEND_PAYMENT_URL = process.env.BACKEND_PAYMENT_URL || 'https://an-nahda-backend.vercel.app';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward the request to the backend
    const response = await fetch(`${BACKEND_PAYMENT_URL}/api/payment/sslcommerz/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (response.ok) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { error: result.message || 'Payment validation failed' },
        { status: response.status }
      );
    }

  } catch (error) {
    console.error('Payment validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 