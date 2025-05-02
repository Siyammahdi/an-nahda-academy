"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, MessageSquare, Send, Filter, User, Phone, Mail, Plus, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';

// Mock conversations data
const mockConversations = [
  {
    id: '1',
    user: {
      id: '101',
      name: 'Ahmed Hassan',
      email: 'ahmed@example.com',
      avatar: 'https://avatar.vercel.sh/ahmed.png',
      role: 'student'
    },
    lastMessage: {
      text: 'I have a question about the Arabic course schedule',
      time: '2023-07-22T14:30:00.000Z',
      sender: 'user'
    },
    unread: 2,
    status: 'active'
  },
  {
    id: '2',
    user: {
      id: '102',
      name: 'Fatima Khan',
      email: 'fatima@example.com',
      avatar: 'https://avatar.vercel.sh/fatima.png',
      role: 'student'
    },
    lastMessage: {
      text: 'Thank you for your help with my enrollment',
      time: '2023-07-21T10:15:00.000Z',
      sender: 'user'
    },
    unread: 0,
    status: 'active'
  },
  {
    id: '3',
    user: {
      id: '103',
      name: 'Mohammad Rahman',
      email: 'mohammad@example.com',
      avatar: 'https://avatar.vercel.sh/mohammad.png',
      role: 'instructor'
    },
    lastMessage: {
      text: 'I have updated the course materials as requested',
      time: '2023-07-20T16:45:00.000Z',
      sender: 'user'
    },
    unread: 0,
    status: 'active'
  },
  {
    id: '4',
    user: {
      id: '104',
      name: 'Zainab Ali',
      email: 'zainab@example.com',
      avatar: 'https://avatar.vercel.sh/zainab.png',
      role: 'student'
    },
    lastMessage: {
      text: 'Can you provide more information about the payment plans?',
      time: '2023-07-19T09:30:00.000Z',
      sender: 'user'
    },
    unread: 1,
    status: 'active'
  },
  {
    id: '5',
    user: {
      id: '105',
      name: 'Omar Farooq',
      email: 'omar@example.com',
      avatar: 'https://avatar.vercel.sh/omar.png',
      role: 'parent'
    },
    lastMessage: {
      text: 'I would like to discuss my daughter\'s progress in the course',
      time: '2023-07-18T13:20:00.000Z',
      sender: 'user'
    },
    unread: 0,
    status: 'archived'
  }
];

// Mock messages for a selected conversation
const mockMessages = [
  {
    id: 'm1',
    text: 'Hello, I have a question about the Arabic course schedule.',
    time: '2023-07-22T14:30:00.000Z',
    sender: 'user',
    user: {
      id: '101',
      name: 'Ahmed Hassan',
      avatar: 'https://avatar.vercel.sh/ahmed.png'
    }
  },
  {
    id: 'm2',
    text: 'Of course, Ahmed. I\'d be happy to help. What would you like to know about the schedule?',
    time: '2023-07-22T14:35:00.000Z',
    sender: 'admin',
    user: {
      id: 'admin',
      name: 'Admin',
      avatar: 'https://avatar.vercel.sh/admin.png'
    }
  },
  {
    id: 'm3',
    text: 'I noticed that there is a class scheduled for next Friday, but I thought it was a holiday. Will the class still take place?',
    time: '2023-07-22T14:40:00.000Z',
    sender: 'user',
    user: {
      id: '101',
      name: 'Ahmed Hassan',
      avatar: 'https://avatar.vercel.sh/ahmed.png'
    }
  }
];

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1'); // First conversation selected by default
  const [newMessage, setNewMessage] = useState('');

  // Filter conversations based on search and active tab
  const filteredConversations = mockConversations.filter(conversation => {
    // Apply search filter
    const matchesSearch = 
      conversation.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.lastMessage.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply tab filter
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'unread' && conversation.unread > 0) ||
      (activeTab === 'archived' && conversation.status === 'archived');
    
    return matchesSearch && matchesTab;
  });

  // Get the selected conversation details
  const selectedConversationDetails = mockConversations.find(c => c.id === selectedConversation);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // In a real application, this would send the message to the API
    // and update the conversation with the new message
    
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Messages</h1>
          <p className="text-sm text-muted-foreground">Communicate with students, instructors, and parents</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Message
        </Button>
      </div>
      
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row gap-4 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Conversations List */}
        <div className="md:w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
          {/* Search and Filter */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative mb-3">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search messages..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mb-2" />
                <h3 className="font-medium text-gray-900 dark:text-gray-100">No messages found</h3>
                <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  className={`w-full flex items-start p-4 gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-left border-b border-gray-200 dark:border-gray-700 ${
                    selectedConversation === conversation.id ? 'bg-purple-50 dark:bg-purple-900/20' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="relative flex-shrink-0">
                    <Avatar>
                      <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                      <AvatarFallback>
                        {conversation.user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.unread > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-red-500 rounded-full">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                        {conversation.user.name}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {format(new Date(conversation.lastMessage.time), 'h:mm a')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {conversation.lastMessage.sender === 'user' ? '' : 'You: '}
                      {conversation.lastMessage.text}
                    </p>
                    <div className="mt-1 flex items-center">
                      <Badge variant="outline" className="text-xs">
                        {conversation.user.role === 'student' ? 'Student' : 
                         conversation.user.role === 'instructor' ? 'Instructor' : 'Parent'}
                      </Badge>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
        
        {/* Messages View */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Conversation Header */}
          {selectedConversationDetails ? (
            <>
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedConversationDetails.user.avatar} alt={selectedConversationDetails.user.name} />
                    <AvatarFallback>
                      {selectedConversationDetails.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{selectedConversationDetails.user.name}</h3>
                    <p className="text-sm text-gray-500">{selectedConversationDetails.user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <User className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Phone className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Mail className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockMessages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex ${message.sender === 'admin' ? 'flex-row-reverse' : 'flex-row'} gap-3 max-w-[80%]`}>
                      {message.sender === 'user' && (
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage src={message.user.avatar} alt={message.user.name} />
                          <AvatarFallback>
                            {message.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div className={`p-3 rounded-lg ${
                          message.sender === 'admin' 
                            ? 'bg-purple-500 text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {format(new Date(message.time), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <MessageSquare className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No conversation selected</h3>
              <p className="text-sm text-gray-500">Select a conversation to view messages</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Coming Soon Notice */}
      <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg mt-6">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">
          Enhanced Messaging Features Coming Soon
        </h3>
        <p className="text-sm text-blue-600 dark:text-blue-300 max-w-md mx-auto">
          We're working on adding features like file attachments, message templates, and bulk messaging capabilities.
        </p>
      </div>
    </div>
  );
} 