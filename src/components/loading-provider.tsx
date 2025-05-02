"use client";

import { createContext, useContext, useState, useEffect } from "react";
import LoadingScreen from "./loading-screen";

// Create a context for the loading state
interface LoadingContextValue {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

// Hook to use the loading context
export const useLoading = (): LoadingContextValue => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // This useEffect will run on the client side
  useEffect(() => {
    setIsMounted(true);
    
    // Always show loading animation during development/testing
    setIsLoading(true);
    
    if (typeof window !== 'undefined') {
      // Clear session storage to ensure animation shows on refresh during development
      sessionStorage.removeItem("hasVisitedBefore");
      localStorage.removeItem("disableLoadingAnimation");
    }
  }, []);

  const handleFinishLoading = () => {
    setIsLoading(false);
  };

  if (!isMounted) {
    // Return null during SSR to prevent hydration mismatch
    return null;
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <LoadingScreen finishLoading={handleFinishLoading} />}
      <div 
        style={{ 
          opacity: isLoading ? 0 : 1, 
          visibility: isLoading ? "hidden" : "visible", 
          transition: "opacity 0.5s ease-in-out, visibility 0.5s ease-in-out" 
        }}
      >
        {children}
      </div>
    </LoadingContext.Provider>
  );
};

export default LoadingProvider; 