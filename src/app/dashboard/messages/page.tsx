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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Send,
  Plus,
  ChevronRight,
  Paperclip,
  Smile,
  MoreVertical,
  User,
  Users,
  Bell,
  Calendar,
  X,
  MessageSquare,
  Phone,
  Video,
  Filter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Mock data for conversations
const conversations = [
  {
    id: 1,
    person: {
      name: "Shaykh Ibrahim",
      role: "Instructor",
      avatar: "https://placehold.co/400/5271ff/ffffff?text=SI",
      course: "Tafsir Studies",
      online: true,
    },
    lastMessage: {
      text: "I've reviewed your assignment and provided feedback. Your understanding of the concepts is excellent!",
      time: "10:24 AM",
      isRead: true,
      isFromMe: false,
    },
    unreadCount: 0,
  },
  {
    id: 2,
    person: {
      name: "Ustadh Ahmad",
      role: "Instructor",
      avatar: "https://placehold.co/400/34aa87/ffffff?text=UA",
      course: "Quranic Arabic",
      online: false,
    },
    lastMessage: {
      text: "Yes, we'll be covering the different types of verb forms in the next class. Please prepare by reviewing...",
      time: "Yesterday",
      isRead: false,
      isFromMe: false,
    },
    unreadCount: 2,
  },
  {
    id: 3,
    person: {
      name: "Dr. Sara",
      role: "Academic Advisor",
      avatar: "https://placehold.co/400/ff9052/ffffff?text=DS",
      course: null,
      online: true,
    },
    lastMessage: {
      text: "I'd be happy to discuss your course selection for next semester. Are you available for a meeting on Thursday?",
      time: "Mar 20",
      isRead: true,
      isFromMe: false,
    },
    unreadCount: 0,
  },
  {
    id: 4,
    person: {
      name: "Support Team",
      role: "Admin",
      avatar: "https://placehold.co/400/e91e63/ffffff?text=ST",
      course: null,
      online: true,
    },
    lastMessage: {
      text: "Thank you for contacting us. We've received your query and will get back to you within 24 hours.",
      time: "Feb 14",
      isRead: true,
      isFromMe: false,
    },
    unreadCount: 0,
  },
];

// Mock data for selected conversation messages
const selectedConversationMessages = [
  {
    id: 1,
    text: "Assalamu alaikum Shaykh Ibrahim, I had a question about last week's lecture on Surah Al-Baqarah.",
    time: "Mar 21, 9:30 AM",
    isFromMe: true,
  },
  {
    id: 2,
    text: "Wa alaikum assalam. Yes, what is your question?",
    time: "Mar 21, 9:45 AM",
    isFromMe: false,
  },
  {
    id: 3,
    text: "I was wondering if you could explain the context of revelation for verses 152-157? I'm finding it difficult to connect the historical context with the message.",
    time: "Mar 21, 9:48 AM",
    isFromMe: true,
  },
  {
    id: 4,
    text: "That's an excellent question. These verses were revealed during a challenging time for the early Muslim community and provide guidance on patience during adversity.\n\nThe historical context relates to the tests faced by the believers, including loss of life and property. Would you like me to elaborate on specific aspects?",
    time: "Mar 21, 10:02 AM",
    isFromMe: false,
  },
  {
    id: 5,
    text: "Yes, please. I'm particularly interested in understanding verse 155 about being tested with fear, hunger, loss of wealth and lives. How did the early Muslims apply these teachings in their lives?",
    time: "Mar 21, 10:10 AM",
    isFromMe: true,
  },
  {
    id: 6,
    text: "The early Muslims faced severe hardships - economic boycotts leading to hunger, constant fear of persecution, loss of property when they migrated, and martyrdom of loved ones.\n\nThey applied these teachings by recognizing these were tests from Allah, responding with 'Inna lillahi wa inna ilayhi raji'un' (To Allah we belong and to Him we return), and maintaining patience (sabr).\n\nThese verses provided them comfort by assuring them that their suffering was not without purpose and that Allah was aware of their condition. The promise of Allah's blessings upon the patient ones gave them strength.",
    time: "Mar 21, 10:20 AM",
    isFromMe: false,
  },
  {
    id: 7,
    text: "I've reviewed your assignment and provided feedback. Your understanding of the concepts is excellent!",
    time: "Today, 10:24 AM",
    isFromMe: false,
  },
];

// Create custom DialogTrigger component
const DialogTrigger = ({ 
  children, 
  asChild = false
}: { 
  children: React.ReactNode; 
  asChild?: boolean 
}) => {
  return <>{children}</>;
};

const MessagePage = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [openNewMessage, setOpenNewMessage] = useState(false);
  const [messageFilter, setMessageFilter] = useState("all");

  // Filter conversations based on search and filter
  const filteredConversations = conversations.filter((convo) => {
    const matchesSearch = convo.person.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (convo.person.course && convo.person.course.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = messageFilter === "all" || 
                         (messageFilter === "unread" && convo.unreadCount > 0) ||
                         (messageFilter === "instructors" && convo.person.role === "Instructor") ||
                         (messageFilter === "admin" && convo.person.role === "Admin");
    
    return matchesSearch && matchesFilter;
  });

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you would send this message to the backend
      // For now, we'll just clear the input
      setNewMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with your instructors, advisors, and support team
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Conversations List - 1/3 of the grid on larger screens */}
        <div>
          <Card className="h-[calc(80vh-100px)]">
            <CardHeader className="px-4 py-3 space-y-0">
              <div className="flex justify-between items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search messages..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Dialog open={openNewMessage} onOpenChange={setOpenNewMessage}>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="ghost" title="New Message">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>New Message</DialogTitle>
                      <DialogDescription>
                        Start a new conversation with an instructor or staff member
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select recipient" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Instructors</SelectLabel>
                              <SelectItem value="shaykh_ibrahim">Shaykh Ibrahim</SelectItem>
                              <SelectItem value="ustadh_ahmad">Ustadh Ahmad</SelectItem>
                              <SelectItem value="qari_yusuf">Qari Yusuf</SelectItem>
                              <SelectItem value="prof_aisha">Prof. Aisha</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <SelectLabel>Administration</SelectLabel>
                              <SelectItem value="academic_advisor">Academic Advisor</SelectItem>
                              <SelectItem value="support_team">Support Team</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Input placeholder="Subject (optional)" />
                      </div>
                      <div className="grid gap-2">
                        <textarea
                          className="min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          placeholder="Type your message here..."
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setOpenNewMessage(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setOpenNewMessage(false)}>
                        <Send className="h-4 w-4 mr-2" /> Send Message
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter Messages</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setMessageFilter("all")}>
                      All Messages
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setMessageFilter("unread")}>
                      Unread
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setMessageFilter("instructors")}>
                      From Instructors
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setMessageFilter("admin")}>
                      From Administration
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
              <Tabs 
                defaultValue="inbox" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="inbox">Inbox</TabsTrigger>
                  <TabsTrigger value="archived">Archived</TabsTrigger>
                </TabsList>
                <TabsContent value="inbox" className="m-0">
                  <ScrollArea className="h-[calc(80vh-220px)]">
                    {filteredConversations.length === 0 ? (
                      <div className="flex flex-col items-center justify-center text-center p-8">
                        <MessageSquare className="h-10 w-10 text-muted-foreground mb-3" />
                        <h3 className="font-medium">No conversations found</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {searchQuery 
                            ? "Try a different search term" 
                            : "Start a new message to begin a conversation"}
                        </p>
                      </div>
                    ) : (
                      <div>
                        {filteredConversations.map((convo) => (
                          <div 
                            key={convo.id}
                            className={`flex items-start gap-3 p-3 cursor-pointer transition-colors hover:bg-accent ${
                              selectedConversation?.id === convo.id 
                                ? "bg-accent/50" 
                                : ""
                            }`}
                            onClick={() => handleSelectConversation(convo)}
                          >
                            <div className="relative">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={convo.person.avatar} alt={convo.person.name} />
                                <AvatarFallback>
                                  {convo.person.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              {convo.person.online && (
                                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-background"></span>
                              )}
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <div className="flex justify-between items-baseline mb-1">
                                <h4 className={`font-medium truncate ${
                                  convo.unreadCount > 0 ? "font-semibold" : ""
                                }`}>
                                  {convo.person.name}
                                </h4>
                                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                  {convo.lastMessage.time}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Badge 
                                  variant="outline" 
                                  className="text-xs rounded-sm px-1 font-normal mr-2"
                                >
                                  {convo.person.role}
                                </Badge>
                                {convo.person.course && (
                                  <span className="text-xs text-muted-foreground truncate">
                                    {convo.person.course}
                                  </span>
                                )}
                              </div>
                              <p className={`text-sm truncate mt-1 ${
                                convo.unreadCount > 0 ? "font-medium text-foreground" : "text-muted-foreground"
                              }`}>
                                {convo.lastMessage.isFromMe && "You: "}
                                {convo.lastMessage.text}
                              </p>
                            </div>
                            {convo.unreadCount > 0 && (
                              <Badge className="rounded-full h-5 w-5 p-0 flex items-center justify-center text-xs shrink-0">
                                {convo.unreadCount}
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="archived" className="m-0">
                  <div className="flex flex-col items-center justify-center text-center p-8 h-[calc(80vh-220px)]">
                    <MessageSquare className="h-10 w-10 text-muted-foreground mb-3" />
                    <h3 className="font-medium">No archived messages</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Messages you archive will appear here
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Conversation Display - 2/3 of the grid on larger screens */}
        <div className="md:col-span-2">
          {selectedConversation ? (
            <Card className="h-[calc(80vh-100px)] flex flex-col">
              <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConversation.person.avatar} alt={selectedConversation.person.name} />
                    <AvatarFallback>
                      {selectedConversation.person.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{selectedConversation.person.name}</h3>
                      <Badge variant="outline" className="text-xs px-1 font-normal">
                        {selectedConversation.person.role}
                      </Badge>
                      {selectedConversation.person.online && (
                        <span className="text-xs text-green-500 font-medium">Online</span>
                      )}
                    </div>
                    {selectedConversation.person.course && (
                      <p className="text-xs text-muted-foreground">
                        {selectedConversation.person.course}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" title="Voice Call">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Video Call">
                    <Video className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Conversation</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <User className="h-4 w-4 mr-2" /> View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="h-4 w-4 mr-2" /> Schedule Meeting
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bell className="h-4 w-4 mr-2" /> Mute Notifications
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Users className="h-4 w-4 mr-2" /> Add to Group
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <X className="h-4 w-4 mr-2" /> Archive Conversation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {selectedConversationMessages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.isFromMe ? "justify-end" : "justify-start"}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.isFromMe 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted"
                          }`}
                        >
                          <div className="whitespace-pre-line">{message.text}</div>
                          <div 
                            className={`text-xs mt-1 ${
                              message.isFromMe ? "text-primary-foreground/80" : "text-muted-foreground"
                            }`}
                          >
                            {message.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <Separator />
              <CardFooter className="p-3">
                <div className="relative w-full flex items-center">
                  <Button variant="ghost" size="icon" className="absolute left-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    className="px-10 bg-muted"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button variant="ghost" size="icon" className="absolute right-10">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    className="absolute right-0" 
                    onClick={handleSendMessage} 
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card className="h-[calc(80vh-100px)] flex flex-col items-center justify-center p-8 text-center">
              <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No conversation selected</h2>
              <p className="text-muted-foreground mb-6">
                Select a conversation from the list or start a new one
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> Start New Conversation
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>New Message</DialogTitle>
                    <DialogDescription>
                      Start a new conversation with an instructor or staff member
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select recipient" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Instructors</SelectLabel>
                            <SelectItem value="shaykh_ibrahim">Shaykh Ibrahim</SelectItem>
                            <SelectItem value="ustadh_ahmad">Ustadh Ahmad</SelectItem>
                            <SelectItem value="qari_yusuf">Qari Yusuf</SelectItem>
                            <SelectItem value="prof_aisha">Prof. Aisha</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Administration</SelectLabel>
                            <SelectItem value="academic_advisor">Academic Advisor</SelectItem>
                            <SelectItem value="support_team">Support Team</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Input placeholder="Subject (optional)" />
                    </div>
                    <div className="grid gap-2">
                      <textarea
                        className="min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        placeholder="Type your message here..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">
                      Cancel
                    </Button>
                    <Button>
                      <Send className="h-4 w-4 mr-2" /> Send Message
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagePage; 