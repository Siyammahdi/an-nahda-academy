import axios from "axios";
import { AxiosError } from "axios";

// Use relative path with Next.js proxy
const API_URL = "/api";

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

interface ErrorResponse {
  success: boolean;
  message: string;
}

// Create axios instance with baseURL 
// (but don't set headers here as they'll be set on each request)
const Axios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add a request interceptor to always check for token
Axios.interceptors.request.use(
  (config) => {
    // For browser environments only
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("auth-token");
      
      if (token) {
        // Add the token to the Authorization header
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    
    // Always add Content-Type header
    config.headers['Content-Type'] = 'application/json';
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { success: false, message: "Registration failed" };
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
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { success: false, message: "Login failed" };
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
    } catch (error: unknown) {
      // Even if the server logout fails, clear local storage
      localStorage.removeItem("auth-token");
      localStorage.removeItem("auth-user");
      
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { success: false, message: "Logout failed" };
    }
  },

  // Get the current user
  getCurrentUser: async () => {
    try {
      const response = await Axios.get<{ success: boolean; data: Record<string, unknown> }>("/auth/me");
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { success: false, message: "Failed to get current user" };
    }
  },

  // Check if the user is authenticated
  isAuthenticated: () => {
    if (typeof window === 'undefined') return false;
    
    const token = localStorage.getItem("auth-token");
    return !!token;
  },
}; 