import { NextRequest, NextResponse } from "next/server";

// Set the backend API URL to Vercel deployment
const API_URL = process.env.BACKEND_API_URL || "https://an-nahda-backend.vercel.app/api";

// Get all payments with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    // Debug: Check if this is a test request
    const { searchParams } = new URL(request.url);
    const debug = searchParams.get('debug');
    
    if (debug === 'auth') {
      // Return authentication debug info
      const authHeader = request.headers.get("Authorization");
      return NextResponse.json({
        success: true,
        debug: {
          hasAuthHeader: !!authHeader,
          authHeaderValue: authHeader ? authHeader.substring(0, 20) + '...' : null,
          allHeaders: Object.fromEntries(request.headers.entries())
        }
      });
    }
    
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const status = searchParams.get('status');
    const paymentMethod = searchParams.get('paymentMethod');
    const search = searchParams.get('search');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Build query parameters
    const params = new URLSearchParams({
      page,
      limit,
      ...(status && status !== 'all' && { status }),
      ...(paymentMethod && paymentMethod !== 'all' && { paymentMethod }),
      ...(search && { search }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate })
    });

    const url = `${API_URL}/admin/payments?${params}`;
    
    // Get authorization header from the request
    const authHeader = request.headers.get("Authorization");
    
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    console.log('Making request to:', url);
    console.log('Headers:', headers);
    console.log('Auth header present:', !!authHeader);

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: `HTTP ${response.status}: ${response.statusText}` };
      }
      console.log('Error data:', errorData);
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Success data:', data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Admin payments API error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
} 



