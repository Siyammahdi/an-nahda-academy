"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  AlertTriangle,
  CheckCircle2,
  Key,
  Lock,
  LogOut,
  Moon,
  Save,
  Settings2,
  Shield,
  Sun,
  Trash2,
  UserCog,
  Globe,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define types for settings state
type SettingsType = {
  account: {
    name: string;
    email: string;
    language: string;
    timezone: string;
  };
  appearance: {
    theme: string;
    fontSize: string;
    reduceMotion: boolean;
    compactMode: boolean;
  };
  privacy: {
    profileVisibility: string;
    showCourseProgress: boolean;
    showLastSeen: boolean;
    allowSearchByEmail: boolean;
    allowMessageFromNonConnections: boolean;
    twoFactorAuth: boolean;
  };
  notifications: {
    email: {
      courseUpdates: boolean;
      messages: boolean;
      announcements: boolean;
      reminders: boolean;
    };
    push: {
      courseUpdates: boolean;
      messages: boolean;
      announcements: boolean;
      reminders: boolean;
    };
  };
};

// Create helper type to handle nested subcategories
type NestedSettings = {
  [key: string]: {
    [key: string]: boolean | string;
  };
};

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  
  // Mock settings state
  const [settings, setSettings] = useState<SettingsType>({
    account: {
      name: "Abdullah Ahmed",
      email: "abdullah.ahmed@example.com",
      language: "english",
      timezone: "GMT+3",
    },
    appearance: {
      theme: "system",
      fontSize: "medium",
      reduceMotion: false,
      compactMode: false,
    },
    privacy: {
      profileVisibility: "all",
      showCourseProgress: true,
      showLastSeen: true,
      allowSearchByEmail: false,
      allowMessageFromNonConnections: true,
      twoFactorAuth: false,
    },
    notifications: {
      email: {
        courseUpdates: true,
        messages: true,
        announcements: true,
        reminders: true,
      },
      push: {
        courseUpdates: true,
        messages: true,
        announcements: false,
        reminders: false,
      },
    },
  });

  // Toggle a setting value
  const toggleSetting = (
    category: keyof SettingsType, 
    setting: string, 
    subcategory: string | null = null
  ) => {
    setSettings((prevSettings) => {
      if (subcategory) {
        // Handle nested settings (like notifications.email.courseUpdates)
        return {
          ...prevSettings,
          [category]: {
            ...prevSettings[category],
            [subcategory]: {
              ...(prevSettings[category] as NestedSettings)[subcategory],
              [setting]: !(prevSettings[category] as NestedSettings)[subcategory][setting],
            },
          },
        };
      }
      
      // Handle direct settings (like appearance.reduceMotion)
      return {
        ...prevSettings,
        [category]: {
          ...prevSettings[category],
          [setting]: !(prevSettings[category] as { [key: string]: boolean | string })[setting],
        },
      };
    });
  };

  // Update a setting value
  const updateSetting = (
    category: keyof SettingsType, 
    setting: string, 
    value: string | boolean, 
    subcategory: string | null = null
  ) => {
    setSettings((prevSettings) => {
      if (subcategory) {
        // Handle nested settings
        return {
          ...prevSettings,
          [category]: {
            ...prevSettings[category],
            [subcategory]: {
              ...(prevSettings[category] as NestedSettings)[subcategory],
              [setting]: value,
            },
          },
        };
      }
      
      // Handle direct settings
      return {
        ...prevSettings,
        [category]: {
          ...prevSettings[category],
          [setting]: value,
        },
      };
    });
  };

  // Save settings
  const saveSettings = () => {
    // In a real application, this would save to the backend
    setSuccessMessage("Settings saved successfully!");
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {successMessage && (
        <Alert variant="default" className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs 
        defaultValue="account" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Account Settings Tab */}
        <TabsContent value="account">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCog className="h-5 w-5" />
                  <span>Account Information</span>
                </CardTitle>
                <CardDescription>
                  Update your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Your name" 
                    value={settings.account.name} 
                    onChange={(e) => updateSetting("account", "name", e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Your email" 
                    value={settings.account.email} 
                    onChange={(e) => updateSetting("account", "email", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    This email will be used for account-related notifications
                  </p>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      value="current-password"
                      readOnly 
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Button variant="outline" className="w-fit">
                    <Key className="h-4 w-4 mr-2" /> Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <span>Regional Settings</span>
                </CardTitle>
                <CardDescription>
                  Customize language and timezone preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-3">
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    value={settings.account.language} 
                    onValueChange={(value) => updateSetting("account", "language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="arabic">Arabic</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="turkish">Turkish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select 
                    value={settings.account.timezone} 
                    onValueChange={(value) => updateSetting("account", "timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GMT+0">GMT+0 (London, Lisbon)</SelectItem>
                      <SelectItem value="GMT+1">GMT+1 (Paris, Berlin)</SelectItem>
                      <SelectItem value="GMT+2">GMT+2 (Cairo, Athens)</SelectItem>
                      <SelectItem value="GMT+3">GMT+3 (Riyadh, Istanbul)</SelectItem>
                      <SelectItem value="GMT+4">GMT+4 (Dubai, Moscow)</SelectItem>
                      <SelectItem value="GMT+5">GMT+5 (Islamabad, Karachi)</SelectItem>
                      <SelectItem value="GMT-5">GMT-5 (New York, Toronto)</SelectItem>
                      <SelectItem value="GMT-8">GMT-8 (Los Angeles, Vancouver)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Your local time will be used for class schedules and deadlines
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Danger Zone</span>
                </CardTitle>
                <CardDescription>
                  Irreversible actions related to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    Deleting your account is permanent and cannot be undone. All your data will be permanently removed.
                  </AlertDescription>
                </Alert>
                <Dialog open={deleteAccountOpen} onOpenChange={setDeleteAccountOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" /> Delete Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Account Deletion</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. Your account and all associated data will be permanently deleted.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Label htmlFor="confirm-delete" className="text-base">Please type &quot;DELETE&quot; to confirm:</Label>
                      <Input 
                        id="confirm-delete" 
                        className="mt-2" 
                        placeholder="DELETE"
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setDeleteAccountOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" /> Delete Permanently
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <p className="text-xs text-muted-foreground">
                  If you prefer to temporarily disable your account instead, please contact support.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="h-5 w-5" />
                <span>Display Settings</span>
              </CardTitle>
              <CardDescription>
                Customize how the application looks and behaves
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base">Theme</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Select a theme for your dashboard
                  </p>
                  <RadioGroup 
                    className="flex gap-4"
                    value={settings.appearance.theme}
                    onValueChange={(value) => updateSetting("appearance", "theme", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="theme-light" />
                      <Label htmlFor="theme-light" className="flex items-center gap-1.5">
                        <Sun className="h-4 w-4" /> Light
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="theme-dark" />
                      <Label htmlFor="theme-dark" className="flex items-center gap-1.5">
                        <Moon className="h-4 w-4" /> Dark
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="theme-system" />
                      <Label htmlFor="theme-system" className="flex items-center gap-1.5">
                        <Settings2 className="h-4 w-4" /> System
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Separator />
                
                <div>
                  <Label className="text-base">Font Size</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Adjust the text size for better readability
                  </p>
                  <RadioGroup 
                    className="flex flex-col space-y-1"
                    value={settings.appearance.fontSize}
                    onValueChange={(value) => updateSetting("appearance", "fontSize", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="small" id="font-small" />
                      <Label htmlFor="font-small">Small</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="font-medium" />
                      <Label htmlFor="font-medium">Medium (Recommended)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="large" id="font-large" />
                      <Label htmlFor="font-large">Large</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Label className="text-base">Accessibility</Label>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="reduce-motion" className="text-sm">Reduce motion</Label>
                      <p className="text-xs text-muted-foreground">
                        Minimize animations and transitions
                      </p>
                    </div>
                    <Switch 
                      id="reduce-motion" 
                      checked={settings.appearance.reduceMotion}
                      onChange={() => toggleSetting("appearance", "reduceMotion")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact-mode" className="text-sm">Compact mode</Label>
                      <p className="text-xs text-muted-foreground">
                        Reduce padding and spacing throughout the interface
                      </p>
                    </div>
                    <Switch 
                      id="compact-mode" 
                      checked={settings.appearance.compactMode}
                      onChange={() => toggleSetting("appearance", "compactMode")}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy & Security Tab */}
        <TabsContent value="privacy">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span>Privacy Settings</span>
                </CardTitle>
                <CardDescription>
                  Control what information is visible to others
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <Label htmlFor="profile-visibility">Profile Visibility</Label>
                  <Select 
                    value={settings.privacy.profileVisibility} 
                    onValueChange={(value) => updateSetting("privacy", "profileVisibility", value)}
                  >
                    <SelectTrigger id="profile-visibility">
                      <SelectValue placeholder="Who can see your profile" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Everyone</SelectItem>
                      <SelectItem value="students">Academy Students Only</SelectItem>
                      <SelectItem value="connections">My Connections Only</SelectItem>
                      <SelectItem value="private">Private (Only Me)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-progress" className="text-sm">Show Course Progress</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow others to see your course completion status
                      </p>
                    </div>
                    <Switch 
                      id="show-progress" 
                      checked={settings.privacy.showCourseProgress}
                      onChange={() => toggleSetting("privacy", "showCourseProgress")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="show-last-seen" className="text-sm">Show Last Seen Status</Label>
                      <p className="text-xs text-muted-foreground">
                        Display when you were last active on the platform
                      </p>
                    </div>
                    <Switch 
                      id="show-last-seen" 
                      checked={settings.privacy.showLastSeen}
                      onChange={() => toggleSetting("privacy", "showLastSeen")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allow-search" className="text-sm">Allow Search by Email</Label>
                      <p className="text-xs text-muted-foreground">
                        Let others find your profile using your email address
                      </p>
                    </div>
                    <Switch 
                      id="allow-search" 
                      checked={settings.privacy.allowSearchByEmail}
                      onChange={() => toggleSetting("privacy", "allowSearchByEmail")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allow-messages" className="text-sm">Allow Messages from Non-Connections</Label>
                      <p className="text-xs text-muted-foreground">
                        Receive messages from students you&apos;re not connected with
                      </p>
                    </div>
                    <Switch 
                      id="allow-messages" 
                      checked={settings.privacy.allowMessageFromNonConnections}
                      onChange={() => toggleSetting("privacy", "allowMessageFromNonConnections")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  <span>Account Security</span>
                </CardTitle>
                <CardDescription>
                  Enhance the security of your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor" className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch 
                    id="two-factor" 
                    checked={settings.privacy.twoFactorAuth}
                    onChange={() => toggleSetting("privacy", "twoFactorAuth")}
                  />
                </div>
                {settings.privacy.twoFactorAuth && (
                  <Button variant="outline" size="sm">
                    <Settings2 className="h-4 w-4 mr-2" /> Configure 2FA
                  </Button>
                )}
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-base font-medium">Active Sessions</h3>
                  <div className="rounded-md border p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium">Current Session</p>
                        <p className="text-xs text-muted-foreground">Chrome on Windows • Riyadh, Saudi Arabia</p>
                        <p className="text-xs text-green-600 mt-1">Active now</p>
                      </div>
                      <Button variant="ghost" size="sm" disabled>
                        Current
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium">Mobile App</p>
                        <p className="text-xs text-muted-foreground">iPhone • Riyadh, Saudi Arabia</p>
                        <p className="text-xs text-muted-foreground mt-1">Last active: 2 hours ago</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-destructive">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <LogOut className="h-4 w-4 mr-2" /> Log Out from All Devices
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how and when you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-base font-medium mb-3">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-courses">Course Updates</Label>
                    <Switch 
                      id="email-courses" 
                      checked={settings.notifications.email.courseUpdates}
                      onChange={() => toggleSetting("notifications", "courseUpdates", "email")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-messages">Messages</Label>
                    <Switch 
                      id="email-messages" 
                      checked={settings.notifications.email.messages}
                      onChange={() => toggleSetting("notifications", "messages", "email")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-announcements">Announcements</Label>
                    <Switch 
                      id="email-announcements" 
                      checked={settings.notifications.email.announcements}
                      onChange={() => toggleSetting("notifications", "announcements", "email")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-reminders">Reminders</Label>
                    <Switch 
                      id="email-reminders" 
                      checked={settings.notifications.email.reminders}
                      onChange={() => toggleSetting("notifications", "reminders", "email")}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-base font-medium mb-3">Push Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-courses">Course Updates</Label>
                    <Switch 
                      id="push-courses" 
                      checked={settings.notifications.push.courseUpdates}
                      onChange={() => toggleSetting("notifications", "courseUpdates", "push")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-messages">Messages</Label>
                    <Switch 
                      id="push-messages" 
                      checked={settings.notifications.push.messages}
                      onChange={() => toggleSetting("notifications", "messages", "push")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-announcements">Announcements</Label>
                    <Switch 
                      id="push-announcements" 
                      checked={settings.notifications.push.announcements}
                      onChange={() => toggleSetting("notifications", "announcements", "push")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-reminders">Reminders</Label>
                    <Switch 
                      id="push-reminders" 
                      checked={settings.notifications.push.reminders}
                      onChange={() => toggleSetting("notifications", "reminders", "push")}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <Button onClick={saveSettings}>
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage; 