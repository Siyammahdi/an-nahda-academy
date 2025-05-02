"use client";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React, { ReactNode } from "react";
import Sidebar from "./_components/SideBar";
import { IoMdLogOut } from "react-icons/io";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Link from "next/link";

interface DashboardProps {
  children: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const { user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Logout is handled by the auth context including redirection
      toast.success("Logged out successfully");
    } catch (error: Error | unknown) {
      const errorMessage = error instanceof Error ? error.message : "Logout failed";
      toast.error(errorMessage);
    }
  };

  // Get user initials for avatar
  const getInitials = (name: string = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-5">
        <div className="bg-white rounded-lg shadow p-2 sm:p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
            <div className="flex flex-row items-center gap-2 sm:gap-4">
              <div>
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                  <AvatarImage 
                    src={`https://avatar.vercel.sh/${user?.email || 'user'}.png`} 
                    alt={user?.name || 'User'} 
                  />
                  <AvatarFallback className="text-sm sm:text-base">
                    {getInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h1 className="text-xs sm:text-sm font-semibold text-gray-500 ">
                  Welcome back,
                </h1>
                <h1 className="text-base sm:text-lg font-semibold text-gray-900 ">
                  {user?.name || 'Loading...'}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 ">
                  {user?.email}
                </p>
              </div>
            </div>
            
            <div className="flex flex-row gap-2 items-center mt-2 md:mt-0 justify-center md:justify-end">
              <Link href="/" className="text-blue-600 hover:text-blue-800  text-xs sm:text-sm font-medium mr-2 sm:mr-3">
                Home
              </Link>
              <Button 
                onClick={handleLogout}
                disabled={isLoading}
                className="bg-violet-950 text-white hover:bg-violet-900 text-xs sm:text-sm h-7 sm:h-9 px-2 sm:px-3" 
                variant="default"
                size="sm"
              >
                <IoMdLogOut className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> 
                {isLoading ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </div>
          <Separator className="my-2 sm:my-3" />
          <div className="flex flex-col md:flex-row">
            <div className="md:w-64 w-full flex-shrink-0 mb-2 md:mb-0">
              <Sidebar />
            </div>
            <div className="flex-grow md:ml-3 lg:ml-4 mt-2 md:mt-0">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
