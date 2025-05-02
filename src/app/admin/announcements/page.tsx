"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { 
  Bell,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash,
  Mail,
  Calendar,
  Users,
  Check,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';

// Mock announcements data
const announcements = [
  {
    id: '1',
    title: 'New Course Launch: Advanced Arabic Grammar',
    content: 'We are excited to announce the launch of our new Advanced Arabic Grammar course starting next month. Enrollment is now open.',
    audience: 'all',
    status: 'scheduled',
    createdBy: {
      name: 'Admin User',
      avatar: 'https://avatar.vercel.sh/admin.png'
    },
    createdAt: '2023-07-20T10:00:00.000Z',
    publishAt: '2023-08-01T09:00:00.000Z'
  },
  {
    id: '2',
    title: 'Important: System Maintenance',
    content: 'Our platform will be undergoing maintenance this weekend. Please expect brief periods of downtime between 11 PM and 2 AM on Saturday.',
    audience: 'all',
    status: 'published',
    createdBy: {
      name: 'Admin User',
      avatar: 'https://avatar.vercel.sh/admin.png'
    },
    createdAt: '2023-07-18T14:30:00.000Z',
    publishAt: '2023-07-18T15:00:00.000Z'
  },
  {
    id: '3',
    title: 'Reminder: Fiqhun-Nisa Assignment Deadline',
    content: 'This is a reminder that the final assignment for the Fiqhun-Nisa course is due by this Friday. Please ensure timely submission.',
    audience: 'course',
    courseId: '202',
    courseName: 'Fiqhun-Nisa',
    status: 'published',
    createdBy: {
      name: 'Admin User',
      avatar: 'https://avatar.vercel.sh/admin.png'
    },
    createdAt: '2023-07-15T09:45:00.000Z',
    publishAt: '2023-07-15T10:00:00.000Z'
  },
  {
    id: '4',
    title: 'Holiday Schedule for Eid-ul-Adha',
    content: 'Please note that all classes will be suspended during the Eid-ul-Adha holidays from July 28 to August 2. Regular schedule will resume on August 3.',
    audience: 'all',
    status: 'published',
    createdBy: {
      name: 'Admin User',
      avatar: 'https://avatar.vercel.sh/admin.png'
    },
    createdAt: '2023-07-10T11:20:00.000Z',
    publishAt: '2023-07-10T12:00:00.000Z'
  },
  {
    id: '5',
    title: 'Welcome to New Instructors',
    content: 'We are pleased to welcome two new instructors to our teaching staff. They will be joining our Arabic and Islamic Studies departments next month.',
    audience: 'all',
    status: 'draft',
    createdBy: {
      name: 'Admin User',
      avatar: 'https://avatar.vercel.sh/admin.png'
    },
    createdAt: '2023-07-05T16:10:00.000Z',
    publishAt: null
  }
];

export default function AnnouncementsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<string | null>(null);
  
  // Filter announcements based on active tab and search term
  const filteredAnnouncements = announcements.filter(announcement => {
    // Apply tab filter
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'published' && announcement.status === 'published') ||
      (activeTab === 'scheduled' && announcement.status === 'scheduled') ||
      (activeTab === 'draft' && announcement.status === 'draft');
    
    // Apply search filter
    const matchesSearch = 
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200">
            <Check className="h-3.5 w-3.5 mr-1" />
            Published
          </Badge>
        );
      case 'scheduled':
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200">
            <CalendarIcon className="h-3.5 w-3.5 mr-1" />
            Scheduled
          </Badge>
        );
      case 'draft':
        return (
          <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200">
            Draft
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Announcements</h1>
          <p className="text-sm text-muted-foreground">Manage and send announcements to students and instructors</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Announcement
        </Button>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full sm:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative flex-1 max-w-md ml-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search announcements..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Announcements List */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Audience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Publish Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnnouncements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Bell className="h-8 w-8 text-gray-400" />
                      <p className="text-gray-500 font-medium">No announcements found</p>
                      <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAnnouncements.map((announcement) => (
                  <TableRow 
                    key={announcement.id} 
                    className={selectedAnnouncement === announcement.id ? 'bg-purple-50 dark:bg-purple-900/10' : ''}
                    onClick={() => setSelectedAnnouncement(announcement.id)}
                  >
                    <TableCell>
                      <div className="font-medium">{announcement.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-md">{announcement.content}</div>
                    </TableCell>
                    <TableCell>
                      {announcement.audience === 'all' ? (
                        <Badge variant="outline">All Users</Badge>
                      ) : (
                        <Badge variant="outline">Course: {announcement.courseName}</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(announcement.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={announcement.createdBy.avatar} alt={announcement.createdBy.name} />
                          <AvatarFallback>{announcement.createdBy.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm">{format(new Date(announcement.createdAt), 'MMM d, yyyy')}</div>
                          <div className="text-xs text-gray-500">{format(new Date(announcement.createdAt), 'h:mm a')}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {announcement.publishAt ? (
                        <div>
                          <div className="text-sm">{format(new Date(announcement.publishAt), 'MMM d, yyyy')}</div>
                          <div className="text-xs text-gray-500">{format(new Date(announcement.publishAt), 'h:mm a')}</div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>Send Now</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                            <Trash className="h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Message Preview */}
      {selectedAnnouncement && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Announcement Preview</CardTitle>
            <CardDescription>How the announcement will appear to users</CardDescription>
          </CardHeader>
          <CardContent>
            {(() => {
              const announcement = announcements.find(a => a.id === selectedAnnouncement);
              
              if (!announcement) return null;
              
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{announcement.title}</h3>
                    {getStatusBadge(announcement.status)}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(announcement.createdAt), 'MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>
                        {announcement.audience === 'all' 
                          ? 'All Users' 
                          : `Course: ${announcement.courseName}`}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <p className="whitespace-pre-line">{announcement.content}</p>
                  </div>
                </div>
              );
            })()}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Close Preview</Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Edit Announcement</Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Coming Soon Notice */}
      <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">
          Enhanced Announcement Features Coming Soon
        </h3>
        <p className="text-sm text-blue-600 dark:text-blue-300 max-w-md mx-auto">
          We&apos;re working on adding rich text formatting, image attachments, email notifications, and targeted audience selection for more effective communication.
        </p>
      </div>
    </div>
  );
} 