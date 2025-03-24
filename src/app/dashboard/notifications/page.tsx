"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  BellOff,
  Calendar,
  Clock,
  GraduationCap, 
  MailOpen,
  RefreshCw,
  Settings,
  Trash2,
  MessageSquare,
  CheckCheck,
  ExternalLink,
  AlertCircle,
  BookOpen,
  Mail,
  FileCheck,
  Megaphone
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Type definitions
interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  course?: string;
  actionUrl: string;
  icon: React.ElementType;
  sender?: string;
  category?: string;
  dueDate?: string;
  date?: string;
  eventTime?: string;
}

interface NotificationPreference {
  id: string;
  title: string;
  description: string;
  email: boolean;
  push: boolean;
}

// Mock data for notifications
const notificationsData: Notification[] = [
  {
    id: 1,
    type: "course",
    title: "New Module Released: Quranic Vocabulary",
    message: "A new module has been added to your Arabic Language course. Explore new Quranic vocabulary and practice exercises.",
    time: "10 minutes ago",
    isRead: false,
    course: "Quranic Arabic",
    actionUrl: "#",
    icon: BookOpen,
  },
  {
    id: 2,
    type: "message",
    title: "New Message from Shaykh Ibrahim",
    message: "You have received feedback on your recent assignment submission.",
    time: "2 hours ago",
    isRead: true,
    sender: "Shaykh Ibrahim",
    actionUrl: "#/dashboard/messages",
    icon: MessageSquare,
  },
  {
    id: 3,
    type: "announcement",
    title: "End of Term Examination Schedule",
    message: "The final examinations schedule for this semester has been posted. Please review and prepare accordingly.",
    time: "Yesterday",
    isRead: false,
    category: "Academic",
    actionUrl: "#",
    icon: Megaphone,
  },
  {
    id: 4,
    type: "system",
    title: "Account Security Recommendation",
    message: "We recommend updating your password regularly to ensure your account remains secure.",
    time: "2 days ago",
    isRead: true,
    category: "Security",
    actionUrl: "#",
    icon: AlertCircle,
  },
  {
    id: 5,
    type: "deadline",
    title: "Assignment Deadline Approaching",
    message: "Your assignment for Tafsir Studies is due in 3 days. Make sure to submit it on time.",
    time: "2 days ago",
    isRead: false,
    course: "Tafsir Studies",
    dueDate: "Mar 28, 2023",
    actionUrl: "#",
    icon: Clock,
  },
  {
    id: 6,
    type: "course",
    title: "Course Certificate Available",
    message: "Congratulations! Your certificate for 'Introduction to Islamic Sciences' is now available for download.",
    time: "1 week ago",
    isRead: true,
    course: "Introduction to Islamic Sciences",
    actionUrl: "#",
    icon: GraduationCap,
  },
  {
    id: 7,
    type: "announcement",
    title: "Upcoming Webinar: Understanding Hadith Sciences",
    message: "Join us for a special webinar with Dr. Abdullah Hakim on understanding Hadith methodologies. Registration is now open.",
    time: "1 week ago",
    isRead: true,
    category: "Events",
    date: "Apr 5, 2023",
    eventTime: "7:00 PM - 8:30 PM",
    actionUrl: "#",
    icon: Calendar,
  },
  {
    id: 8,
    type: "system",
    title: "Profile Completion Reminder",
    message: "Your profile is 80% complete. Add your educational background to reach 100%.",
    time: "2 weeks ago",
    isRead: true,
    actionUrl: "#/dashboard/profile",
    icon: FileCheck,
  },
];

// Notification preference settings
const notificationPreferences: NotificationPreference[] = [
  {
    id: "course_updates",
    title: "Course Updates",
    description: "Notifications about new content, materials, and course changes",
    email: true,
    push: true,
  },
  {
    id: "assignment_reminders",
    title: "Assignment Reminders",
    description: "Reminders about upcoming assignment deadlines",
    email: true,
    push: true,
  },
  {
    id: "messages",
    title: "Messages",
    description: "Notifications when you receive messages from instructors or staff",
    email: true,
    push: true,
  },
  {
    id: "announcements",
    title: "Announcements",
    description: "Important announcements from the academy",
    email: true,
    push: true,
  },
  {
    id: "webinars_events",
    title: "Webinars & Events",
    description: "Updates about upcoming webinars, workshops, and events",
    email: true,
    push: false,
  },
  {
    id: "system_updates",
    title: "System Updates",
    description: "Important information about your account and security",
    email: true,
    push: false,
  },
  {
    id: "marketing",
    title: "Promotions & Offers",
    description: "Special offers, discounts, and new course recommendations",
    email: false,
    push: false,
  },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPreferences, setSelectedPreferences] = useState(notificationPreferences);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.isRead;
    return notification.type === activeTab;
  });

  // Get unread count
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
  };

  // Mark a single notification as read
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    setConfirmClearOpen(false);
  };

  // Toggle notification preference
  const togglePreference = (id: string, type: "email" | "push") => {
    setSelectedPreferences(
      selectedPreferences.map((pref) =>
        pref.id === id
          ? { ...pref, [type]: !pref[type] }
          : pref
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">
          Stay updated with important messages, announcements, and updates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Notifications List - Takes up 2/3 of the grid on medium screens and up */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CardTitle>Your Notifications</CardTitle>
                  {unreadCount > 0 && (
                    <Badge variant="secondary">
                      {unreadCount} unread
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={markAllAsRead} 
                    disabled={unreadCount === 0}
                  >
                    <MailOpen className="h-4 w-4 mr-2" /> Mark All Read
                  </Button>
                  <Dialog open={confirmClearOpen} onOpenChange={setConfirmClearOpen}>
                    <DialogTrigger>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                        disabled={notifications.length === 0}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Clear All
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Clear All Notifications</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to clear all notifications? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setConfirmClearOpen(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={clearAllNotifications}>
                          Clear All
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <CardDescription>
                Your latest updates and activity notifications
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
              <Tabs 
                defaultValue="all" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="course">Courses</TabsTrigger>
                  <TabsTrigger value="announcement">Announcements</TabsTrigger>
                  <TabsTrigger value="message">Messages</TabsTrigger>
                </TabsList>
                <ScrollArea className="h-[calc(80vh-240px)]">
                  {filteredNotifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center p-12">
                      <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-medium text-lg">No notifications found</h3>
                      <p className="text-muted-foreground mt-1">
                        {activeTab === "all"
                          ? "You don't have any notifications yet"
                          : activeTab === "unread"
                          ? "You don't have any unread notifications"
                          : `You don't have any ${activeTab} notifications`}
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {filteredNotifications.map((notification) => {
                        const IconComponent = notification.icon;
                        return (
                          <div 
                            key={notification.id} 
                            className={`p-4 hover:bg-accent transition-colors ${
                              !notification.isRead ? "bg-accent/40" : ""
                            }`}
                          >
                            <div className="flex gap-4">
                              <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-primary/10 text-primary`}>
                                <IconComponent className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className="font-medium text-sm">
                                    {notification.title}
                                  </h4>
                                  <div className="flex items-center whitespace-nowrap">
                                    <span className="text-xs text-muted-foreground">
                                      {notification.time}
                                    </span>
                                    {!notification.isRead && (
                                      <Badge variant="default" className="ml-2 h-2 w-2 rounded-full p-0"></Badge>
                                    )}
                                  </div>
                                </div>
                                
                                <p className="text-sm text-muted-foreground mt-1">
                                  {notification.message}
                                </p>
                                
                                <div className="flex items-center mt-2 text-xs">
                                  {notification.type === "course" && (
                                    <Badge variant="outline" className="mr-2">
                                      {notification.course}
                                    </Badge>
                                  )}
                                  {notification.type === "announcement" && (
                                    <Badge variant="outline" className="mr-2">
                                      {notification.category}
                                    </Badge>
                                  )}
                                  {notification.type === "deadline" && (
                                    <div className="flex items-center text-amber-500 mr-2">
                                      <Clock className="h-3 w-3 mr-1" />
                                      <span>Due: {notification.dueDate}</span>
                                    </div>
                                  )}
                                </div>

                                <div className="flex mt-3 gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8"
                                    asChild
                                  >
                                    <a href={notification.actionUrl}>
                                      <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                                      {notification.type === "course" ? "View Course" : 
                                       notification.type === "message" ? "View Message" :
                                       notification.type === "announcement" ? "Read More" :
                                       notification.type === "deadline" ? "View Assignment" :
                                       "View Details"}
                                    </a>
                                  </Button>
                                  {!notification.isRead && (
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8"
                                      onClick={() => markAsRead(notification.id)}
                                    >
                                      <CheckCheck className="h-3.5 w-3.5 mr-1.5" />
                                      Mark as Read
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </ScrollArea>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings - Takes up 1/3 of the grid on medium screens and up */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
              <CardDescription>
                Customize how you receive notifications
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Email Delivery</AlertTitle>
                <AlertDescription>
                  Email notifications are sent to <strong>user@example.com</strong>
                </AlertDescription>
              </Alert>
              
              <div className="space-y-6">
                {selectedPreferences.map((preference) => (
                  <div key={preference.id}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <h4 className="text-sm font-medium">{preference.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {preference.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor={`${preference.id}-email`} className="text-xs">
                          Email
                        </Label>
                      </div>
                      <Switch
                        id={`${preference.id}-email`}
                        checked={preference.email}
                        onChange={() => togglePreference(preference.id, "email")}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor={`${preference.id}-push`} className="text-xs">
                          Push Notifications
                        </Label>
                      </div>
                      <Switch
                        id={`${preference.id}-push`}
                        checked={preference.push}
                        onChange={() => togglePreference(preference.id, "push")}
                      />
                    </div>
                    {preference.id !== selectedPreferences[selectedPreferences.length - 1].id && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <Button className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" /> Save Preferences
              </Button>
              <Button variant="outline" className="w-full">
                <BellOff className="h-4 w-4 mr-2" /> Pause All Notifications (24h)
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage; 