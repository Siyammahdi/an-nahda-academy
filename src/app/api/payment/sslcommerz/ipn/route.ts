import { NextRequest, NextResponse } from 'next/server';

// Backend API URL
const BACKEND_URL = process.env.BACKEND_URL || 'https://an-nahda-backend.vercel.app';

export async function POST(request: NextRequest) {
  try {
    // Get form data for IPN
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    
    // Forward the request to the backend
    const response = await fetch(`${BACKEND_URL}/api/payment/sslcommerz/ipn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data as any).toString(),
    });

    const result = await response.json();

    if (response.ok) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { error: result.message || 'IPN processing failed' },
        { status: response.status }
      );
    }

  } catch (error) {
    console.error('IPN processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 