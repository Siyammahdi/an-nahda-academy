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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Video,
  List,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Mock data for schedule
const weeklyClasses = [
  {
    id: 1,
    title: "Quranic Arabic",
    day: "Monday",
    time: "10:00 AM - 11:30 AM",
    instructor: "Ustadh Ahmad",
    location: "Virtual Classroom 1",
    type: "language",
    isOnline: true,
  },
  {
    id: 2,
    title: "Tafsir Studies",
    day: "Wednesday",
    time: "11:30 AM - 1:00 PM",
    instructor: "Shaykh Ibrahim",
    location: "Room 102",
    type: "islamic-studies",
    isOnline: false,
  },
  {
    id: 3,
    title: "Tajweed Rules",
    day: "Thursday",
    time: "7:00 PM - 8:30 PM",
    instructor: "Qari Yusuf",
    location: "Virtual Classroom 3",
    type: "quran",
    isOnline: true,
  },
  {
    id: 4,
    title: "Islamic History",
    day: "Friday",
    time: "2:00 PM - 3:30 PM",
    instructor: "Prof. Aisha",
    location: "Main Hall",
    type: "history",
    isOnline: false,
  },
  {
    id: 5,
    title: "Fiqh Discussion",
    day: "Saturday",
    time: "10:00 AM - 11:30 AM",
    instructor: "Dr. Abdullah",
    location: "Virtual Classroom 2",
    type: "islamic-studies",
    isOnline: true,
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "End of Term Examinations",
    date: "May 22, 2023",
    time: "9:00 AM - 12:00 PM",
    location: "Main Hall",
    type: "examination",
  },
  {
    id: 2,
    title: "Arabic Language Workshop",
    date: "Apr 29, 2023",
    time: "10:00 AM - 2:00 PM",
    location: "Virtual Classroom",
    type: "workshop",
  },
  {
    id: 3,
    title: "Islamic Calligraphy Session",
    date: "May 5, 2023",
    time: "3:00 PM - 5:00 PM",
    location: "Art Studio",
    type: "workshop",
  },
];

const appointments = [
  {
    id: 1,
    title: "One-on-One Tajweed Coaching",
    date: "Apr 27, 2023",
    time: "4:00 PM - 4:30 PM",
    with: "Qari Yusuf",
    status: "confirmed",
  },
  {
    id: 2,
    title: "Academic Advising Session",
    date: "May 3, 2023",
    time: "11:00 AM - 11:30 AM",
    with: "Dr. Sara",
    status: "pending",
  },
];

// Helper function to get current month and year
const getCurrentMonthYear = () => {
  const date = new Date();
  return {
    month: date.toLocaleString('default', { month: 'long' }),
    year: date.getFullYear()
  };
};

const SchedulePage = () => {
  const { month, year } = getCurrentMonthYear();
  const [currentMonth, setCurrentMonth] = useState(`${month} ${year}`);
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Filter classes based on selected type
  const filteredClasses = selectedFilter === "all" 
    ? weeklyClasses 
    : weeklyClasses.filter(cls => cls.type === selectedFilter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
        <p className="text-muted-foreground">
          Manage your classes, events, and appointments
        </p>
      </div>

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>

        {/* Calendar Tab */}
        <TabsContent value="calendar">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Calendar</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="font-medium text-xs md:text-base">{currentMonth}</span>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>
                Your scheduled classes and events for the month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-px bg-muted rounded-md overflow-hidden">
                {/* Day headers */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="bg-background p-2 text-center text-sm font-medium">
                    {day}
                  </div>
                ))}
                
                {/* Calendar days (showing just a sample row) */}
                {Array.from({ length: 35 }).map((_, i) => {
                  const day = i % 31 + 1;
                  const hasEvent = [3, 8, 15, 22, 27, 29].includes(day);
                  return (
                    <div 
                      key={i} 
                      className={`bg-background p-2 min-h-20 hover:bg-accent transition-colors ${
                        day === 15 ? "border-2 border-primary" : ""
                      }`}
                    >
                      <div className="text-sm font-medium mb-1">{day}</div>
                      {hasEvent && (
                        <div className="flex flex-col gap-1">
                          <div className="text-xs bg-blue-100 dark:bg-blue-900/30 p-1 rounded truncate">
                            {day === 22 && "Examinations"}
                            {day === 29 && "Arabic Workshop"}
                            {day === 3 && "Advising Session"}
                            {day === 15 && "Today"}
                            {day === 8 && "Quranic Arabic"}
                            {day === 27 && "Tajweed Coaching"}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 rounded-sm bg-blue-100 dark:bg-blue-900 mr-2"></div>
                <span>Class/Event</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 rounded-sm border-2 border-primary mr-2"></div>
                <span>Today</span>
              </div>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" /> Add Event
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Weekly Schedule Tab */}
        <TabsContent value="weekly">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Weekly Classes</CardTitle>
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Class Types</SelectLabel>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="language">Arabic Language</SelectItem>
                      <SelectItem value="quran">Quran & Tajweed</SelectItem>
                      <SelectItem value="islamic-studies">Islamic Studies</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>
                Your regular weekly class schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredClasses.map((cls) => (
                  <Card key={cls.id} className="overflow-hidden">
                    <div className={`h-2 w-full ${
                      cls.type === "language" 
                        ? "bg-blue-500" 
                        : cls.type === "quran" 
                          ? "bg-green-500" 
                          : cls.type === "islamic-studies" 
                            ? "bg-purple-500" 
                            : "bg-amber-500"
                    }`}></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{cls.title}</CardTitle>
                        <Badge variant={cls.isOnline ? "default" : "outline"}>
                          {cls.isOnline ? "Online" : "In-Person"}
                        </Badge>
                      </div>
                      <CardDescription>with {cls.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{cls.day}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{cls.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{cls.location}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        {cls.isOnline ? (
                          <>
                            <Video className="h-4 w-4 mr-2" /> Join Virtual Classroom
                          </>
                        ) : (
                          <>
                            <List className="h-4 w-4 mr-2" /> View Class Details
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>
                  Your scheduled one-on-one sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{appointment.title}</h3>
                        <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Users className="h-4 w-4 mr-2" />
                          <span>with {appointment.with}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Request New Appointment</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Special events and workshops
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{event.title}</h3>
                        <Badge variant="outline">
                          {event.type === "examination" ? "Exam" : "Workshop"}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Add to Calendar</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchedulePage; 