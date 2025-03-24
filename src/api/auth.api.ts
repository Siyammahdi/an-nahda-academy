import Axios from "./Axios";

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

// Auth API services
export const AuthAPI = {
  // Register a new user
  register: async (credentials: RegisterCredentials) => {
    try {
      const response = await Axios.post<AuthResponse>("/auth/register", credentials);
      
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem("auth-token", response.data.token);
        localStorage.setItem("auth-user", JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: "Registration failed" };
    }
  },

  // Login an existing user
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await Axios.post<AuthResponse>("/auth/login", credentials);
      
      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem("auth-token", response.data.token);
        localStorage.setItem("auth-user", JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: "Login failed" };
    }
  },

  // Logout the current user
  logout: async () => {
    try {
      await Axios.get("/auth/logout");
      
      // Remove token from localStorage
      localStorage.removeItem("auth-token");
      localStorage.removeItem("auth-user");
      
      return { success: true, message: "Logout successful" };
    } catch (error: any) {
      throw error.response?.data || { success: false, message: "Logout failed" };
    }
  },

  // Get the current user
  getCurrentUser: async () => {
    try {
      const response = await Axios.get<{ success: boolean; data: any }>("/auth/me");
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { success: false, message: "Failed to get current user" };
    }
  },

  // Check if the user is authenticated
  isAuthenticated: () => {
    if (typeof window === 'undefined') return false;
    
    const token = localStorage.getItem("auth-token");
    return !!token;
  },
}; 