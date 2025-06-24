import { NextRequest, NextResponse } from "next/server";

// Set the backend API URL from environment or use a default
const API_URL = process.env.BACKEND_API_URL || "https://an-nahda-backend.vercel.app/api";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join("/");
    const searchParams = request.nextUrl.searchParams.toString();
    const queryString = searchParams ? `?${searchParams}` : "";
    const url = `${API_URL}/admin/${path}${queryString}`;

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
    console.error("Admin API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join("/");
    const url = `${API_URL}/admin/${path}`;
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
      method: "POST",
      headers,
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await response.json();

    // Return the response with the same status
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join("/");
    const url = `${API_URL}/admin/${path}`;
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
    console.error("Admin API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join("/");
    const url = `${API_URL}/admin/${path}`;

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
    console.error("Admin API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
} 