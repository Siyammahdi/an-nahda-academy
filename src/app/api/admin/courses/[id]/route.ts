import { NextRequest, NextResponse } from "next/server";

// Set the backend API URL from environment or use a default
const API_URL = process.env.BACKEND_API_URL || "https://an-nahda-backend.vercel.app/api";

// Get a single course by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = params.id;
    const url = `${API_URL}/admin/courses/${courseId}`;

    // Get the token from the cookies or Authorization header
    const authHeader = request.headers.get("Authorization");
    const tokenFromCookie = request.cookies.get("token")?.value;
    
    // Headers to send to the backend
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Add Authorization header if available
    if (authHeader) {
      headers["Authorization"] = authHeader;
    } else if (tokenFromCookie) {
      headers["Authorization"] = `Bearer ${tokenFromCookie}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
      credentials: "include",
    });

    const data = await response.json();

    // Return the response with the same status
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Admin course API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// Update a course by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = params.id;
    const url = `${API_URL}/admin/courses/${courseId}`;
    const body = await request.json();

    // Get the token from the cookies or Authorization header
    const authHeader = request.headers.get("Authorization");
    const tokenFromCookie = request.cookies.get("token")?.value;
    
    // Headers to send to the backend
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Add Authorization header if available
    if (authHeader) {
      headers["Authorization"] = authHeader;
    } else if (tokenFromCookie) {
      headers["Authorization"] = `Bearer ${tokenFromCookie}`;
    }

    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await response.json();

    // Return the response with the same status
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Admin course API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// Delete a course by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = params.id;
    const url = `${API_URL}/admin/courses/${courseId}`;

    // Get the token from the cookies or Authorization header
    const authHeader = request.headers.get("Authorization");
    const tokenFromCookie = request.cookies.get("token")?.value;
    
    // Headers to send to the backend
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Add Authorization header if available
    if (authHeader) {
      headers["Authorization"] = authHeader;
    } else if (tokenFromCookie) {
      headers["Authorization"] = `Bearer ${tokenFromCookie}`;
    }

    const response = await fetch(url, {
      method: "DELETE",
      headers,
      credentials: "include",
    });

    const data = await response.json();

    // Return the response with the same status
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Admin course API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
} 