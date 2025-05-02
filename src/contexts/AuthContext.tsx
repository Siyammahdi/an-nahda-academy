"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AuthAPI, LoginCredentials, RegisterCredentials } from "@/api/auth.api";
import { useRouter } from "next/navigation";

// User type
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Load user from localStorage on initial render
  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      
      try {
        // Check if token exists
        if (AuthAPI.isAuthenticated()) {
          // Get stored user info
          const userFromStorage = localStorage.getItem("auth-user");
          
          if (userFromStorage) {
            setUser(JSON.parse(userFromStorage));
            setIsAuthenticated(true);
          } else {
            // If no user in storage but token exists, try to fetch user
            try {
              const { data } = await AuthAPI.getCurrentUser();
              setUser(data);
              localStorage.setItem("auth-user", JSON.stringify(data));
              setIsAuthenticated(true);
            } catch (error) {
              // If fetching fails, clear token and set unauthenticated
              localStorage.removeItem("auth-token");
              localStorage.removeItem("auth-user");
              setIsAuthenticated(false);
              setUser(null);
            }
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error loading user:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
      
      setIsLoading(false);
    };

    loadUser();
  }, []);

  // Redirect to dashboard if user is authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      // Check if user is on a public page that should redirect to dashboard (login or register)
      const path = window.location.pathname;
      
      // Don't redirect if the path starts with /admin
      if ((path === '/login' || path === '/registration') && !path.startsWith('/admin')) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await AuthAPI.login(credentials);
      setUser(data.user);
      setIsAuthenticated(true);
      
      // Check for returnUrl in sessionStorage
      const returnUrl = sessionStorage.getItem("returnUrl");
      
      if (returnUrl) {
        // Clear the returnUrl
        sessionStorage.removeItem("returnUrl");
        // Redirect to the saved URL
        router.push(returnUrl);
      } else {
        // Default redirect to dashboard only if on login/register pages
        const path = window.location.pathname;
        if ((path === '/login' || path === '/registration') && !path.startsWith('/admin')) {
          router.push("/dashboard");
        }
      }
    } catch (error: Error | unknown) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      setError(errorMessage);
      throw error; // Rethrow for modal component to handle
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await AuthAPI.register(credentials);
      setUser(data.user);
      setIsAuthenticated(true);
      
      // Check for returnUrl in sessionStorage
      const returnUrl = sessionStorage.getItem("returnUrl");
      
      if (returnUrl) {
        // Clear the returnUrl
        sessionStorage.removeItem("returnUrl");
        // Redirect to the saved URL
        router.push(returnUrl);
      } else {
        // Default redirect to dashboard only if on login/register pages
        const path = window.location.pathname;
        if ((path === '/login' || path === '/registration') && !path.startsWith('/admin')) {
          router.push("/dashboard");
        }
      }
    } catch (error: Error | unknown) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed";
      setError(errorMessage);
      throw error; // Rethrow for modal component to handle
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await AuthAPI.logout();
      setUser(null);
      setIsAuthenticated(false);
      router.push("/");
    } catch (error: Error | unknown) {
      const errorMessage = error instanceof Error ? error.message : "Logout failed";
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}; 