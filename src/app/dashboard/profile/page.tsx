"use client";

import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Home, 
  BookOpen, 
  Shield, 
  Clock, 
  Calendar
} from "lucide-react";

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+880 1234-567890",
    address: "Dhaka, Bangladesh",
    bio: "Student at An-Nahda Academy, passionate about Islamic studies and Arabic language.",
  });

  // Get user initials for avatar
  const getInitials = (name: string = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this to the backend
    toast.success("Profile updated successfully");
    setIsEditing(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Manage your account settings and personal information
        </p>
      </div>

      <Tabs defaultValue="personal" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
            <Card className="md:col-span-1 shadow-sm">
              <CardHeader className="px-3 py-2 sm:px-6 sm:py-4">
                <CardTitle className="text-base sm:text-lg">Profile</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Your public profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 px-3 sm:px-6">
                <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                  <AvatarImage 
                    src={`https://avatar.vercel.sh/${user?.email || 'user'}.png`} 
                    alt={user?.name || 'User'} 
                  />
                  <AvatarFallback className="text-2xl sm:text-4xl">
                    {getInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-medium">{user?.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{user?.email}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground capitalize">
                    Role: {user?.role || "Student"}
                  </p>
                </div>
                <Separator />
                <div className="w-full text-center">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "2023"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 shadow-sm">
              <CardHeader className="px-3 py-2 sm:px-6 sm:py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-base sm:text-lg">Personal Information</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Update your personal details
                    </CardDescription>
                  </div>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      size="sm"
                      className="h-8 text-xs sm:text-sm"
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-3 sm:gap-4">
                    <div className="grid gap-1 sm:gap-2">
                      <div className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                        <Label htmlFor="name" className="text-xs sm:text-sm">Full Name</Label>
                      </div>
                      
                      {isEditing ? (
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="h-8 sm:h-9 text-xs sm:text-sm"
                        />
                      ) : (
                        <p className="text-xs sm:text-sm font-medium">{formData.name}</p>
                      )}
                    </div>
                    
                    <div className="grid gap-1 sm:gap-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                        <Label htmlFor="email" className="text-xs sm:text-sm">Email</Label>
                      </div>
                      
                      {isEditing ? (
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="h-8 sm:h-9 text-xs sm:text-sm"
                        />
                      ) : (
                        <p className="text-xs sm:text-sm font-medium">{formData.email}</p>
                      )}
                    </div>
                    
                    <div className="grid gap-1 sm:gap-2">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                        <Label htmlFor="phone" className="text-xs sm:text-sm">Phone Number</Label>
                      </div>
                      
                      {isEditing ? (
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="h-8 sm:h-9 text-xs sm:text-sm"
                        />
                      ) : (
                        <p className="text-xs sm:text-sm font-medium">{formData.phone}</p>
                      )}
                    </div>
                    
                    <div className="grid gap-1 sm:gap-2">
                      <div className="flex items-center gap-2">
                        <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                        <Label htmlFor="address" className="text-xs sm:text-sm">Address</Label>
                      </div>
                      
                      {isEditing ? (
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="h-8 sm:h-9 text-xs sm:text-sm"
                        />
                      ) : (
                        <p className="text-xs sm:text-sm font-medium">{formData.address}</p>
                      )}
                    </div>
                    
                    <div className="grid gap-1 sm:gap-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                        <Label htmlFor="bio" className="text-xs sm:text-sm">Bio</Label>
                      </div>
                      
                      {isEditing ? (
                        <Input
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="h-8 sm:h-9 text-xs sm:text-sm"
                        />
                      ) : (
                        <p className="text-xs sm:text-sm font-medium">{formData.bio}</p>
                      )}
                    </div>
                    
                    {isEditing && (
                      <div className="flex justify-end space-x-2 mt-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsEditing(false)}
                          size="sm"
                          className="h-8 text-xs sm:text-sm"
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                          size="sm"
                          className="h-8 text-xs sm:text-sm"
                        >
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card className="shadow-sm">
            <CardHeader className="px-3 py-2 sm:px-6 sm:py-4">
              <CardTitle className="text-base sm:text-lg">Preferences</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Manage how your account works
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
              <div className="grid gap-3 sm:gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <Card className="shadow-sm">
                    <CardHeader className="px-3 py-2 sm:px-4 sm:py-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-sm sm:text-base">Time Zone</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-4 py-2 sm:py-3">
                      <p className="text-xs sm:text-sm">Current: Asia/Dhaka (GMT+6)</p>
                    </CardContent>
                    <CardFooter className="px-3 sm:px-4 py-2 sm:py-3">
                      <Button variant="outline" size="sm" className="w-full h-8 text-xs sm:text-sm">
                        Change
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="shadow-sm">
                    <CardHeader className="px-3 py-2 sm:px-4 sm:py-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-sm sm:text-base">Notification Settings</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-4 py-2 sm:py-3">
                      <p className="text-xs sm:text-sm">Receive: Email, Push, SMS</p>
                    </CardContent>
                    <CardFooter className="px-3 sm:px-4 py-2 sm:py-3">
                      <Button variant="outline" size="sm" className="w-full h-8 text-xs sm:text-sm">
                        Manage
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card className="shadow-sm">
            <CardHeader className="px-3 py-2 sm:px-6 sm:py-4">
              <CardTitle className="text-base sm:text-lg">Security</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Manage your security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
              <div className="grid gap-3 sm:gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <Card className="shadow-sm">
                    <CardHeader className="px-3 py-2 sm:px-4 sm:py-3">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-sm sm:text-base">Password</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-4 py-2 sm:py-3">
                      <p className="text-xs sm:text-sm">Last changed: 3 months ago</p>
                    </CardContent>
                    <CardFooter className="px-3 sm:px-4 py-2 sm:py-3">
                      <Button variant="outline" size="sm" className="w-full h-8 text-xs sm:text-sm">
                        Change Password
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="shadow-sm">
                    <CardHeader className="px-3 py-2 sm:px-4 sm:py-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-sm sm:text-base">Two-Factor Authentication</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="px-3 sm:px-4 py-2 sm:py-3">
                      <p className="text-xs sm:text-sm">Status: Not Enabled</p>
                    </CardContent>
                    <CardFooter className="px-3 sm:px-4 py-2 sm:py-3">
                      <Button variant="outline" size="sm" className="w-full h-8 text-xs sm:text-sm">
                        Set Up 2FA
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage; 