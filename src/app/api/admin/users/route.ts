import { NextRequest, NextResponse } from "next/server";

// Set the backend API URL from environment or use a default
const API_URL = process.env.BACKEND_API_URL || "https://an-nahda-backend.vercel.app/api";

// Mock users data for development (will be replaced with actual API call in production)
const mockUsers = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    createdAt: '2023-01-15T10:00:00.000Z',
    updatedAt: '2023-01-15T10:00:00.000Z'
  },
  {
    _id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    createdAt: '2023-02-20T14:30:00.000Z',
    updatedAt: '2023-02-20T14:30:00.000Z'
  },
  {
    _id: '3',
    name: 'Ahmed Ali',
    email: 'ahmed@example.com',
    role: 'user',
    createdAt: '2023-03-05T09:15:00.000Z',
    updatedAt: '2023-03-05T09:15:00.000Z'
  },
  {
    _id: '4',
    name: 'Fatima Khan',
    email: 'fatima@example.com',
    role: 'admin',
    createdAt: '2023-04-10T11:45:00.000Z',
    updatedAt: '2023-04-10T11:45:00.000Z'
  },
  {
    _id: '5',
    name: 'Mohammad Rahman',
    email: 'mohammad@example.com',
    role: 'user',
    createdAt: '2023-05-15T16:20:00.000Z',
    updatedAt: '2023-05-15T16:20:00.000Z'
  }
];

// Get all users
export async function GET(request: NextRequest) {
  try {
    // In a real implementation, this would make a request to the backend API
    // const url = `${API_URL}/admin/users`;
    // const authHeader = request.headers.get("Authorization");
    // const tokenFromCookie = request.cookies.get("token")?.value;
    
    // const headers: HeadersInit = {
    //   "Content-Type": "application/json",
    // };

    // if (authHeader) {
    //   headers["Authorization"] = authHeader;
    // } else if (tokenFromCookie) {
    //   headers["Authorization"] = `Bearer ${tokenFromCookie}`;
    // }

    // const response = await fetch(url, {
    //   method: "GET",
    //   headers,
    //   credentials: "include",
    // });

    // const data = await response.json();
    
    // For now, just return mock data
    return NextResponse.json({
      success: true,
      count: mockUsers.length,
      data: mockUsers
    });
  } catch (error) {
    console.error("Admin users API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { success: false, message: "Name, email and password are required" },
        { status: 400 }
      );
    }
    
    // In a real implementation, this would make a request to the backend API
    // const url = `${API_URL}/admin/users`;
    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${request.cookies.get("token")?.value}`
    //   },
    //   body: JSON.stringify(body)
    // });
    
    // const data = await response.json();
    
    // For now, create a mock response
    const newUser = {
      _id: Math.floor(Math.random() * 1000).toString(),
      name: body.name,
      email: body.email,
      role: body.role || 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      data: newUser
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
} 