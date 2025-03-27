"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  GraduationCap, 
  BarChart3, 
  FileText,
  CheckCircle2,
  ArrowRightCircle
} from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

// Mock data for demo purposes
const recentCourses = [
  { id: 1, title: "Introduction to Islamic Studies", progress: 65, lastAccessed: "2 days ago" },
  { id: 2, title: "Quranic Arabic Foundations", progress: 32, lastAccessed: "5 days ago" },
  { id: 3, title: "Tajweed Rules for Beginners", progress: 89, lastAccessed: "Yesterday" },
];

const upcomingClasses = [
  { id: 1, title: "Quranic Arabic", date: "Tomorrow", time: "10:00 AM", teacher: "Ustadh Ahmad" },
  { id: 2, title: "Tafsir Class", date: "Wed, Apr 26", time: "11:30 AM", teacher: "Shaykh Ibrahim" },
];

const recentAnnouncements = [
  { id: 1, title: "End of Term Examinations", date: "Apr 22, 2023", priority: "high" },
  { id: 2, title: "New Resources Added for Islamic History", date: "Apr 20, 2023", priority: "medium" },
];

const Dashboard = () => {
   return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Welcome to your student dashboard. Here&apos;s what&apos;s happening with your learning journey.
        </p>
      </div>
      
      <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 py-2 sm:px-4 sm:py-3">
            <CardTitle className="text-xs sm:text-sm font-medium">Enrolled Courses</CardTitle>
            <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-3 sm:px-4 py-1 sm:py-2">
            <div className="text-lg sm:text-2xl font-bold">3</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Active learning paths
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 py-2 sm:px-4 sm:py-3">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-3 sm:px-4 py-1 sm:py-2">
            <div className="text-lg sm:text-2xl font-bold">24.5</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Learning hours this month
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 py-2 sm:px-4 sm:py-3">
            <CardTitle className="text-xs sm:text-sm font-medium">Assignments</CardTitle>
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-3 sm:px-4 py-1 sm:py-2">
            <div className="text-lg sm:text-2xl font-bold">2</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Pending submissions
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 py-2 sm:px-4 sm:py-3">
            <CardTitle className="text-xs sm:text-sm font-medium">Achievements</CardTitle>
            <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-3 sm:px-4 py-1 sm:py-2">
            <div className="text-lg sm:text-2xl font-bold">85%</div>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Average course completion
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm">
          <CardHeader className="px-3 py-2 sm:px-4 sm:py-3 pb-1 sm:pb-2">
            <CardTitle className="text-sm sm:text-base">Recent Courses</CardTitle>
            <CardDescription className="text-xs">
              Continue where you left off
            </CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-4 pt-1 sm:pt-2">
            <div className="space-y-3 sm:space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex flex-col space-y-1 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-blue-500" />
                      <span className="font-medium text-xs sm:text-sm truncate max-w-[180px] sm:max-w-none">{course.title}</span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-muted-foreground ml-2">
                      {course.lastAccessed}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={course.progress} className="h-1.5 sm:h-2" />
                    <span className="text-[10px] sm:text-xs font-medium">{course.progress}%</span>
                  </div>
                </div>
              ))}
              
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full mt-2 text-xs h-8 sm:h-9" asChild>
                  <Link className="flex items-center justify-center" href="/dashboard/courses">
                    <span>View all courses</span>
                    <ArrowRightCircle className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 shadow-sm">
          <CardHeader className="px-3 py-2 sm:px-4 sm:py-3 pb-1 sm:pb-2">
            <CardTitle className="text-sm sm:text-base">Upcoming Classes</CardTitle>
            <CardDescription className="text-xs">
              Your scheduled sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-4 pt-1 sm:pt-2">
            <div className="space-y-3 sm:space-y-4">
              {upcomingClasses.map((cls) => (
                <div key={cls.id} className="flex items-start space-x-2 sm:space-x-3">
                  <div className="bg-primary/10 p-1.5 sm:p-2 rounded-full">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-0.5 sm:space-y-1">
                    <p className="font-medium text-xs sm:text-sm leading-none">{cls.title}</p>
                    <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground">
                      <span className="font-medium">{cls.date}</span>
                      <span className="mx-1">•</span>
                      <span>{cls.time}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs">with {cls.teacher}</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 px-2 sm:h-8 sm:px-3 text-xs">Join</Button>
                </div>
              ))}
              
              <Separator className="my-2" />
              
              <div className="pt-1 sm:pt-2">
                <Button variant="outline" size="sm" className="w-full text-xs h-8 sm:h-9" asChild>
                  <Link className="flex items-center justify-center" href="/dashboard/schedule">
                    <span>View full schedule</span>
                    <ArrowRightCircle className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="px-3 py-2 sm:px-4 sm:py-3 pb-1 sm:pb-2">
            <CardTitle className="text-sm sm:text-base">Recent Announcements</CardTitle>
            <CardDescription className="text-xs">
              Important updates from your instructors
            </CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-4 pt-1 sm:pt-2">
            <div className="space-y-3 sm:space-y-4">
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="flex justify-between items-start">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-xs sm:text-sm">{announcement.title}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{announcement.date}</p>
                    </div>
                  </div>
                  <Badge variant={announcement.priority === 'high' ? "destructive" : "outline"} className="text-[10px] px-1.5 py-0.5 h-auto sm:text-xs">
                    {announcement.priority}
                  </Badge>
                </div>
              ))}
              
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full mt-2 text-xs h-8 sm:h-9" asChild>
                  <Link className="flex items-center justify-center" href="/dashboard/notifications">
                    <span>View all announcements</span>
                    <ArrowRightCircle className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader className="px-3 py-2 sm:px-4 sm:py-3 pb-1 sm:pb-2">
            <CardTitle className="text-sm sm:text-base">Quick Actions</CardTitle>
            <CardDescription className="text-xs">
              Frequently used tools and resources
            </CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-4 pt-1 sm:pt-2">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-16 sm:h-20 py-2 flex flex-col items-center justify-center" asChild>
                <Link href="/dashboard/courses">
                  <GraduationCap className="h-4 w-4 sm:h-6 sm:w-6 mb-1" />
                  <span className="text-[10px] sm:text-xs">My Courses</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-16 sm:h-20 py-2 flex flex-col items-center justify-center" asChild>
                <Link href="/dashboard/resources">
                  <BookOpen className="h-4 w-4 sm:h-6 sm:w-6 mb-1" />
                  <span className="text-[10px] sm:text-xs">Resources</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-16 sm:h-20 py-2 flex flex-col items-center justify-center" asChild>
                <Link href="/dashboard/schedule">
                  <Calendar className="h-4 w-4 sm:h-6 sm:w-6 mb-1" />
                  <span className="text-[10px] sm:text-xs">Schedule</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-16 sm:h-20 py-2 flex flex-col items-center justify-center" asChild>
                <Link href="/dashboard/profile">
                  <FileText className="h-4 w-4 sm:h-6 sm:w-6 mb-1" />
                  <span className="text-[10px] sm:text-xs">Documents</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;