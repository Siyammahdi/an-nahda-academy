import { NextRequest, NextResponse } from 'next/server';

// Backend API URL
const BACKEND_URL = process.env.BACKEND_API_URL || 'https://an-nahda-backend.vercel.app/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get authorization header from the request
    const authHeader = request.headers.get("Authorization");
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (authHeader) {
      headers["Authorization"] = authHeader;
    }
    
    // Forward the request to the backend
    const response = await fetch(`${BACKEND_URL}/payment/validate`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const result = await response.json();

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