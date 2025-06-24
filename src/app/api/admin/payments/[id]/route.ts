import { NextRequest, NextResponse } from "next/server";

// Set the backend API URL to Vercel deployment
const API_URL = process.env.BACKEND_API_URL || "https://an-nahda-backend.vercel.app/api";

// Get single payment
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const url = `${API_URL}/admin/payments/${params.id}`;
    const authHeader = request.headers.get("Authorization");
    
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to fetch payment' }));
      throw new Error(errorData.message || 'Failed to fetch payment');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Get payment API error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// Update payment status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status } = body;
    
    if (!status) {
      return NextResponse.json(
        { success: false, message: "Status is required" },
        { status: 400 }
      );
    }
    
    const url = `${API_URL}/admin/payments/${params.id}`;
    const authHeader = request.headers.get("Authorization");
    
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (authHeader) {
      headers["Authorization"] = authHeader;
    }
    
    const response = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to update payment status' }));
      throw new Error(errorData.message || 'Failed to update payment status');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error updating payment status:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
} 