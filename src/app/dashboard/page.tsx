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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your student dashboard. Here&apos;s what&apos;s happening with your learning journey.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Active learning paths
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5</div>
            <p className="text-xs text-muted-foreground">
              Learning hours this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Pending submissions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              Average course completion
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Courses</CardTitle>
            <CardDescription>
              Continue where you left off
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="font-medium">{course.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Last accessed: {course.lastAccessed}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={course.progress} className="h-2" />
                    <span className="text-xs font-medium">{course.progress}%</span>
                  </div>
                </div>
              ))}
              
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                  <Link className="flex items-center justify-center" href="/dashboard/courses">
                    <span>View all courses</span>
                    <ArrowRightCircle className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>
              Your scheduled sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((cls) => (
                <div key={cls.id} className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-sm leading-none">{cls.title}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="font-medium">{cls.date}</span>
                      <span className="mx-1">•</span>
                      <span>{cls.time}</span>
                    </div>
                    <p className="text-xs">with {cls.teacher}</p>
                  </div>
                  <Button variant="outline" size="sm">Join</Button>
                </div>
              ))}
              
              <Separator className="my-2" />
              
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link className="flex items-center justify-center" href="/dashboard/schedule">
                    <span>View full schedule</span>
                    <ArrowRightCircle className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>
              Important updates from your instructors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">{announcement.title}</p>
                      <p className="text-xs text-muted-foreground">{announcement.date}</p>
                    </div>
                  </div>
                  <Badge variant={announcement.priority === 'high' ? "destructive" : "outline"}>
                    {announcement.priority}
                  </Badge>
                </div>
              ))}
              
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                  <Link className="flex items-center justify-center" href="/dashboard/notifications">
                    <span>View all announcements</span>
                    <ArrowRightCircle className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used tools and resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center" asChild>
                <Link href="/dashboard/courses">
                  <GraduationCap className="h-6 w-6 mb-1" />
                  <span className="text-xs">My Courses</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center" asChild>
                <Link href="/dashboard/resources">
                  <BookOpen className="h-6 w-6 mb-1" />
                  <span className="text-xs">Resources</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center" asChild>
                <Link href="/dashboard/schedule">
                  <Calendar className="h-6 w-6 mb-1" />
                  <span className="text-xs">Schedule</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center" asChild>
                <Link href="/dashboard/profile">
                  <FileText className="h-6 w-6 mb-1" />
                  <span className="text-xs">Documents</span>
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