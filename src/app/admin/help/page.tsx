"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  HelpCircle,
  FileText,
  Book,
  BookOpen,
  Users,
  Settings,
  Bell,
  MessageSquare,
  FileQuestion,
  Activity,
  ChevronRight,
  Mail,
  ExternalLink,
  Play,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

// FAQ Items
const faqItems = [
  {
    id: '1',
    category: 'general',
    question: 'How do I add a new user to the platform?',
    answer: 'To add a new user, navigate to the "Users" section in the sidebar. Click on the "Add User" button in the top right corner. Fill in the required information in the form that appears, then click "Create User". The new user will be added to the system and will receive an email with login instructions.'
  },
  {
    id: '2',
    category: 'general',
    question: 'How can I create a new course?',
    answer: 'To create a new course, go to the "Courses" section in the sidebar. Click the "New Course" button in the top right corner. Fill out the course details form, including title, description, price, and schedule. You can also add course materials and assignments. Once complete, click "Create Course" to publish it on the platform.'
  },
  {
    id: '3',
    category: 'general',
    question: 'How do I view course enrollments?',
    answer: 'To view enrollments, navigate to the "Enrollments" section in the sidebar. Here you can see all active enrollments across all courses. You can filter by course, date range, or enrollment status. Click on any enrollment to view detailed information about the student\'s progress and payment status.'
  },
  {
    id: '4',
    category: 'content',
    question: 'How do I edit an existing announcement?',
    answer: 'To edit an announcement, go to the "Announcements" section in the sidebar. Find the announcement you want to edit in the list and click the three dots on the right side. Select "Edit" from the dropdown menu. Make your changes in the form that appears, then click "Update Announcement" to save your changes.'
  },
  {
    id: '5',
    category: 'content',
    question: 'How can I upload course materials?',
    answer: 'To upload course materials, navigate to the "Courses" section and select the course you want to add materials to. Click on the "Materials" tab, then click "Add Material". You can upload files (PDF, DOCX, images, etc.) and organize them into modules. Add a title and description for each material, then click "Save" to make them available to enrolled students.'
  },
  {
    id: '6',
    category: 'reports',
    question: 'How do I generate a financial report?',
    answer: 'To generate a financial report, go to the "Reports" section in the sidebar. Select the "Financial" tab, then choose the date range and any other filters you need. Click "Generate Report" to view the data. You can export the report to Excel or PDF using the export buttons, or schedule it to be emailed regularly by clicking "Schedule Report".'
  },
  {
    id: '7',
    category: 'reports',
    question: 'Where can I see student progress analytics?',
    answer: 'To view student progress analytics, go to the "Analytics" section in the sidebar. Here you can see overall engagement metrics and completion rates. For individual student progress, navigate to the "Users" section, find the student, and click on their name. In the student profile, click the "Progress" tab to see detailed course-by-course performance data.'
  },
  {
    id: '8',
    category: 'settings',
    question: 'How do I change the system settings?',
    answer: 'To change system settings, go to the "Settings" section in the sidebar. Here you can adjust global platform settings, notification preferences, payment gateways, and more. Make your changes and click "Save Changes" at the bottom of each section. Some changes may require confirmation to ensure they don\'t disrupt the platform operation.'
  },
  {
    id: '9',
    category: 'settings',
    question: 'How do I manage user roles and permissions?',
    answer: 'To manage user roles and permissions, go to the "Settings" section and click on the "Roles & Permissions" tab. Here you can view and edit existing roles or create new ones. For each role, you can specify granular permissions across different areas of the platform. To change a user\'s role, go to the "Users" section, find the user, click "Edit", and select the appropriate role from the dropdown menu.'
  },
  {
    id: '10',
    category: 'troubleshooting',
    question: 'What should I do if a student reports a payment issue?',
    answer: 'If a student reports a payment issue, first check their account in the "Users" section. Review their payment history in the "Payments" tab of their profile. Verify the status of the transaction in your payment gateway dashboard. If the payment was processed but not reflected in the system, you can manually mark it as paid. If there was a technical issue, direct the student to try again or offer an alternative payment method.'
  }
];

// Video Tutorials
const videoTutorials = [
  {
    id: 'v1',
    title: 'Getting Started with the Admin Dashboard',
    duration: '5:42',
    thumbnail: 'https://placehold.co/320x180/e2e8f0/1e293b?text=Admin+Dashboard',
    category: 'getting-started'
  },
  {
    id: 'v2',
    title: 'User Management: Adding and Editing Users',
    duration: '4:18',
    thumbnail: 'https://placehold.co/320x180/e2e8f0/1e293b?text=User+Management',
    category: 'users'
  },
  {
    id: 'v3',
    title: 'Creating and Managing Courses',
    duration: '6:35',
    thumbnail: 'https://placehold.co/320x180/e2e8f0/1e293b?text=Course+Management',
    category: 'courses'
  },
  {
    id: 'v4',
    title: 'Sending Announcements and Notifications',
    duration: '3:22',
    thumbnail: 'https://placehold.co/320x180/e2e8f0/1e293b?text=Announcements',
    category: 'communication'
  },
  {
    id: 'v5',
    title: 'Understanding Analytics and Reports',
    duration: '7:14',
    thumbnail: 'https://placehold.co/320x180/e2e8f0/1e293b?text=Analytics',
    category: 'reports'
  },
  {
    id: 'v6',
    title: 'Advanced System Settings Configuration',
    duration: '8:03',
    thumbnail: 'https://placehold.co/320x180/e2e8f0/1e293b?text=System+Settings',
    category: 'settings'
  }
];

// Quick Links
const quickLinks = [
  { title: 'User Management Guide', icon: Users, href: '#' },
  { title: 'Course Creation Tutorial', icon: BookOpen, href: '#' },
  { title: 'Analytics Explained', icon: BarChart3, href: '#' },
  { title: 'Payment System Setup', icon: Settings, href: '#' },
  { title: 'Messaging System Guide', icon: MessageSquare, href: '#' },
  { title: 'Announcements Best Practices', icon: Bell, href: '#' }
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('faq');
  const [activeFaqCategory, setActiveFaqCategory] = useState('all');

  // Filter FAQ items based on search and category
  const filteredFaqItems = faqItems.filter(item => {
    const matchesSearch = 
      searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      activeFaqCategory === 'all' || 
      item.category === activeFaqCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Filter video tutorials based on search
  const filteredVideoTutorials = videoTutorials.filter(video => 
    searchTerm === '' || 
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Help & Support</h1>
          <p className="text-sm text-muted-foreground">Get help with using the admin dashboard</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Contact Support
        </Button>
      </div>
      
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          className="pl-10"
          placeholder="Search help articles, tutorials, and FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {quickLinks.map((link, index) => (
          <Card key={index} className="hover:bg-gray-50 transition-colors">
            <Link href={link.href}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100">
                  <link.icon className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{link.title}</h3>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
      
      {/* Content Tabs */}
      <Tabs defaultValue="faq" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="faq" className="flex items-center gap-1">
            <FileQuestion className="h-4 w-4" />
            <span>FAQs</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-1">
            <Play className="h-4 w-4" />
            <span>Tutorials</span>
          </TabsTrigger>
          <TabsTrigger value="guides" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Guides</span>
          </TabsTrigger>
        </TabsList>
        
        {/* FAQ Content */}
        <TabsContent value="faq" className="mt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* FAQ Categories */}
            <div className="md:w-60 shrink-0">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Categories</h3>
              <div className="space-y-1">
                <Button 
                  variant={activeFaqCategory === 'all' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveFaqCategory('all')}
                >
                  All Questions
                </Button>
                <Button 
                  variant={activeFaqCategory === 'general' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveFaqCategory('general')}
                >
                  General
                </Button>
                <Button 
                  variant={activeFaqCategory === 'content' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveFaqCategory('content')}
                >
                  Content Management
                </Button>
                <Button 
                  variant={activeFaqCategory === 'reports' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveFaqCategory('reports')}
                >
                  Reports & Analytics
                </Button>
                <Button 
                  variant={activeFaqCategory === 'settings' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveFaqCategory('settings')}
                >
                  Settings
                </Button>
                <Button 
                  variant={activeFaqCategory === 'troubleshooting' ? 'default' : 'ghost'} 
                  className="w-full justify-start" 
                  onClick={() => setActiveFaqCategory('troubleshooting')}
                >
                  Troubleshooting
                </Button>
              </div>
            </div>
            
            {/* FAQ List */}
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
              
              {filteredFaqItems.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <HelpCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqItems.map((item) => (
                    <Card key={item.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{item.question}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{item.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Videos Content */}
        <TabsContent value="videos" className="mt-6">
          <h2 className="text-xl font-bold mb-4">Video Tutorials</h2>
          
          {filteredVideoTutorials.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Play className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tutorials found</h3>
              <p className="text-gray-500">Try adjusting your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideoTutorials.map((video) => (
                <Card key={video.id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-3 bg-white/90 rounded-full">
                        <Play className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white rounded text-xs">
                      {video.duration}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1">{video.title}</h3>
                    <p className="text-sm text-gray-500 capitalize">{video.category.replace('-', ' ')}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        {/* Guides Content */}
        <TabsContent value="guides" className="mt-6">
          <div className="text-center py-12 bg-blue-50 rounded-lg">
            <FileText className="h-12 w-12 mx-auto text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Comprehensive Guides Coming Soon
            </h3>
            <p className="text-blue-700 max-w-md mx-auto">
              We're working on detailed documentation to help you get the most out of the admin dashboard.
              Check back soon for step-by-step guides on all features.
            </p>
            <Button variant="outline" className="mt-4">
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Knowledge Base
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Support */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Still Need Help?</CardTitle>
          <CardDescription>Our support team is always ready to assist you</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center p-4">
              <div className="p-3 bg-purple-100 rounded-full mb-3">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium mb-1">Email Support</h3>
              <p className="text-sm text-gray-500 mb-3">Get a response within 24 hours</p>
              <Button variant="outline" size="sm">
                Send Email
              </Button>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="p-3 bg-green-100 rounded-full mb-3">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium mb-1">Live Chat</h3>
              <p className="text-sm text-gray-500 mb-3">Available 9 AM - 5 PM, Mon-Fri</p>
              <Button variant="outline" size="sm">
                Start Chat
              </Button>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="p-3 bg-blue-100 rounded-full mb-3">
                <Book className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium mb-1">Documentation</h3>
              <p className="text-sm text-gray-500 mb-3">Browse detailed user guides</p>
              <Button variant="outline" size="sm">
                View Docs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 