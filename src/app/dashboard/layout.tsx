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
    <div className="bg-gray-50 dark:bg-zinc-900 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex flex-row items-center gap-5">
              <div>
                <Avatar className="w-16 h-16">
                  <AvatarImage 
                    src={`https://avatar.vercel.sh/${user?.email || 'user'}.png`} 
                    alt={user?.name || 'User'} 
                  />
                  <AvatarFallback className="text-lg">
                    {getInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h1 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Welcome back,
                </h1>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {user?.name || 'Loading...'}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
            </div>
            
            <div className="flex flex-row gap-2 items-center">
              <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm font-medium mr-4">
                Home
              </Link>
              <Button 
                onClick={handleLogout}
                disabled={isLoading}
                className="bg-violet-950 text-white hover:bg-violet-900" 
                variant="default"
              >
                <IoMdLogOut className="mr-2" /> 
                {isLoading ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-col md:flex-row">
            <div className="md:w-64 w-full flex-shrink-0">
              <Sidebar />
            </div>
            <div className="flex-grow p-4 md:ml-6 mt-4 md:mt-0">
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
