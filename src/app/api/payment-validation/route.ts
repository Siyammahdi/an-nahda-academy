import { NextRequest, NextResponse } from 'next/server';

// Backend API URL
const BACKEND_URL = process.env.BACKEND_API_URL || 'https://an-nahda-backend.vercel.app/api';

export async function GET(request: NextRequest) {
  console.log('Payment validation GET request received');
  return NextResponse.json(
    { error: 'Method not allowed. Use POST for payment validation.' },
    { status: 405 }
  );
}

export async function POST(request: NextRequest) {
  console.log('Payment validation POST request received');
  try {
    const body = await request.json();
    
    console.log('Payment validation request body:', body);
    
    // Get authorization header from the request
    const authHeader = request.headers.get("Authorization");
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (authHeader) {
      headers["Authorization"] = authHeader;
    }
    
    console.log('Forwarding request to backend:', `${BACKEND_URL}/payment/validate`);
    
    // Forward the request to the backend
    const response = await fetch(`${BACKEND_URL}/payment/validate`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    console.log('Backend response status:', response.status);

    const result = await response.json();
    console.log('Backend response:', result);

    if (response.ok) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { success: false, message: result.message || 'Payment validation failed' },
        { status: response.status }
      );
    }

  } catch (error) {
    console.error('Payment validation error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 