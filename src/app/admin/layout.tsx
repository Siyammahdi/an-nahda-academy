"use client";

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  ActivitySquare,
  LogOut,
  Menu,
  X,
  BarChart3,
  CreditCard,
  FileText,
  Bell,
  Gauge,
  Globe,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Removed authentication checks to allow direct access
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  // Function to check if a link is active
  const isLinkActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  // Get user initials for avatar
  const getInitials = (name: string = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  // Navigation items grouped by category
  const navigationItems = [
    {
      title: "Overview",
      items: [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
        { name: "Activity Logs", href: "/admin/activity-logs", icon: ActivitySquare },
      ]
    },
    {
      title: "Content Management",
      items: [
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Courses", href: "/admin/courses", icon: BookOpen },
        { name: "Enrollments", href: "/admin/enrollments", icon: Gauge },
      ]
    },
    {
      title: "Communication",
      items: [
        { name: "Messages", href: "/admin/messages", icon: MessageSquare },
        { name: "Announcements", href: "/admin/announcements", icon: Bell },
      ]
    },
    {
      title: "Finance",
      items: [
        { name: "Payments", href: "/admin/payments", icon: CreditCard },
        { name: "Reports", href: "/admin/reports", icon: FileText },
      ]
    },
    {
      title: "System",
      items: [
        { name: "Settings", href: "/admin/settings", icon: Settings },
        { name: "Website", href: "/admin/website", icon: Globe },
        { name: "Help", href: "/admin/help", icon: HelpCircle },
      ]
    }
  ];
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar - fixed position, never scrolls */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md flex flex-col lg:relative",
          "transition-transform duration-300 ease-in-out lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close button for mobile */}
        <button 
          className="absolute top-4 right-4 lg:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X className="h-6 w-6 text-gray-500" />
        </button>
        
        {/* Logo/Brand - fixed at top */}
        <div className="p-4 border-b flex items-center shrink-0">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-8 h-8 rounded-md flex items-center justify-center mr-3">
            <span className="text-white font-bold">A</span>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Admin Panel
          </h1>
        </div>
        
        {/* Navigation - scrollable */}
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-300">
          {navigationItems.map((group, index) => (
            <div key={group.title} className="px-3 mb-6">
              <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {group.title}
              </h3>
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const isActive = isLinkActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm rounded-md transition-colors group",
                        isActive 
                          ? "bg-purple-50 text-purple-700" 
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className={cn(
                        "mr-3 flex-shrink-0 h-5 w-5",
                        isActive 
                          ? "text-purple-600" 
                          : "text-gray-500 group-hover:text-gray-700"
                      )} />
                      <span>{item.name}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-600" />
                      )}
                    </Link>
                  );
                })}
              </nav>
              {index < navigationItems.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </div>
        
        {/* User Info & Controls - fixed at bottom */}
        <div className="p-4 border-t bg-white shrink-0">
          <div className="flex items-center mb-4 justify-between">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3 border">
                <AvatarImage 
                  src={`https://avatar.vercel.sh/${user?.email || 'admin'}.png`} 
                  alt={user?.name || 'Admin'} 
                />
                <AvatarFallback className="bg-purple-100 text-purple-700">
                  {getInitials(user?.name || 'Admin User')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</p>
              </div>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="w-full text-left justify-between"
            onClick={handleLogout}
          >
            <span className="flex items-center">
              <LogOut className="mr-2 h-4 w-4 text-red-500" />
              Sign out
            </span>
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - fixed at top */}
        <header className="bg-white border-b sticky top-0 z-30 shrink-0">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
            
            {/* Page title - dynamic based on current route */}
            <h1 className="text-lg font-semibold text-gray-900 hidden sm:block">
              {(() => {
                if (pathname === '/admin') return 'Dashboard';
                if (!pathname) return 'Admin';
                const pageName = pathname.split('/').pop();
                if (!pageName) return 'Admin';
                return pageName.charAt(0).toUpperCase() + pageName.slice(1);
              })()}
            </h1>
            
            {/* Right side header elements */}
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="sr-only">Notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="flex items-center justify-between px-4 py-2 border-b">
                    <h3 className="font-medium">Notifications</h3>
                    <Button variant="ghost" size="sm" className="text-xs">Mark all as read</Button>
                  </div>
                  <div className="py-2">
                    <p className="px-4 py-2 text-sm text-center text-gray-500">No new notifications</p>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex"
                onClick={() => router.push('/')}
              >
                <Globe className="mr-2 h-4 w-4" />
                View Website
              </Button>
            </div>
          </div>
        </header>
        
        {/* Main content area - scrollable */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
} 