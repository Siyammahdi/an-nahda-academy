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

// Get a user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    
    // In a real implementation, this would make a request to the backend API
    // const url = `${API_URL}/admin/users/${userId}`;
    // const response = await fetch(url, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${request.cookies.get("token")?.value}`
    //   }
    // });
    
    // const data = await response.json();
    
    // For now, find the user in the mock data
    const user = mockUsers.find(user => user._id === userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error("Error getting user:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// Update a user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const body = await request.json();
    
    // In a real implementation, this would make a request to the backend API
    // const url = `${API_URL}/admin/users/${userId}`;
    // const response = await fetch(url, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${request.cookies.get("token")?.value}`
    //   },
    //   body: JSON.stringify(body)
    // });
    
    // const data = await response.json();
    
    // For now, find and update the user in the mock data
    const userIndex = mockUsers.findIndex(user => user._id === userId);
    
    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    
    // Update user data
    const updatedUser = {
      ...mockUsers[userIndex],
      name: body.name || mockUsers[userIndex].name,
      email: body.email || mockUsers[userIndex].email,
      role: body.role || mockUsers[userIndex].role,
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// Delete a user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    
    // In a real implementation, this would make a request to the backend API
    // const url = `${API_URL}/admin/users/${userId}`;
    // const response = await fetch(url, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${request.cookies.get("token")?.value}`
    //   }
    // });
    
    // const data = await response.json();
    
    // For now, just return a success response
    return NextResponse.json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
} 