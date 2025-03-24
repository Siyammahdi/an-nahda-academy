"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const UserProfile: React.FC = () => {
  const { user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // Logout is handled by the auth context including redirection
    } catch (error: Error | unknown) {
      const errorMessage = error instanceof Error ? error.message : "Logout failed";
      toast.error(errorMessage);
    }
  };

  if (!user) {
    return null;
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-md shadow-sm">
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-lg">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Role</span>
          <span className="text-sm capitalize">{user.role}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Account Created</span>
          <span className="text-sm">
            {new Date(user.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={handleLogout}
        disabled={isLoading}
      >
        {isLoading ? "Logging out..." : "Sign Out"}
      </Button>
    </div>
  );
};

export default UserProfile; 