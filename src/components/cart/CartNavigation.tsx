"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, LogIn, UserPlus } from "lucide-react";

interface CartNavigationProps {
  position?: "top" | "bottom";
  className?: string;
}

const CartNavigation = ({ position = "top", className = "" }: CartNavigationProps) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {isAuthenticated ? (
        <>
          <Button 
            size="sm"
            variant="ghost"
            onClick={() => router.push('/dashboard/cart')}
          >
            <ShoppingCart className="h-4 w-4 mr-2" /> Dashboard Cart
          </Button>
        </>
      ) : (
        <>
          <Button 
            size="sm"
            variant="ghost"
            onClick={() => router.push('/cart')}
          >
            <ShoppingCart className="h-4 w-4 mr-2" /> Public Cart
          </Button>
          <Button 
            size="sm"
            variant="ghost"
            onClick={() => router.push('/login')}
          >
            <LogIn className="h-4 w-4 mr-2" /> Login
          </Button>
          <Button 
            size="sm"
            variant="ghost"
            onClick={() => router.push('/registration')}
          >
            <UserPlus className="h-4 w-4 mr-2" /> Register
          </Button>
        </>
      )}
    </div>
  );
};

export default CartNavigation; 