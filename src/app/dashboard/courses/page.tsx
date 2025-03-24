"use client";

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
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, BookOpen, PlayCircle, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// Mock data for demonstration
const enrolledCourses = [
  {
    id: 1,
    title: "Introduction to Islamic Studies",
    instructor: "Dr. Ahmed Abdullah",
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    image: "https://placehold.co/400x250/e9f5fa/102030?text=Islamic+Studies",
    lastAccessed: "2 days ago",
    nextLesson: "The Five Pillars of Islam",
    level: "Beginner",
    category: "Islamic Studies",
  },
  {
    id: 2,
    title: "Quranic Arabic Foundations",
    instructor: "Mohammed Salim",
    progress: 32,
    totalLessons: 40,
    completedLessons: 13,
    image: "https://placehold.co/400x250/f5e9fa/102030?text=Arabic+Foundations",
    lastAccessed: "5 days ago",
    nextLesson: "Verb Forms and Tenses",
    level: "Intermediate",
    category: "Arabic Language",
  },
  {
    id: 3,
    title: "Tajweed Rules for Beginners",
    instructor: "Qari Yusuf Hassan",
    progress: 89,
    totalLessons: 18,
    completedLessons: 16,
    image: "https://placehold.co/400x250/faf5e9/102030?text=Tajweed+Rules",
    lastAccessed: "Yesterday",
    nextLesson: "Rules of Madd (Elongation)",
    level: "Beginner",
    category: "Quranic Studies",
  },
];

const availableCourses = [
  {
    id: 4,
    title: "Advanced Hadith Studies",
    instructor: "Dr. Fatima Zahra",
    image: "https://placehold.co/400x250/e9faf5/102030?text=Hadith+Studies",
    level: "Advanced",
    category: "Hadith",
    duration: "12 weeks",
    price: "$199",
  },
  {
    id: 5,
    title: "Islamic History: The Golden Age",
    instructor: "Prof. Ibrahim Khan",
    image: "https://placehold.co/400x250/fae9e9/102030?text=Islamic+History",
    level: "Intermediate",
    category: "History",
    duration: "8 weeks",
    price: "$149",
  },
];

const CoursesPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Courses</h1>
        <p className="text-muted-foreground">
          Manage your learning journey and track your progress
        </p>
      </div>

      <Tabs defaultValue="enrolled" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
          <TabsTrigger value="available">Available Courses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrolled">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <User className="h-3 w-3 mr-1" /> <span className="text-xs">{course.instructor}</span>
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-2 capitalize">
                      {course.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{course.completedLessons} completed</span>
                      <span>{course.totalLessons} lessons</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Separator />
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="text-xs">{course.lastAccessed}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {course.level}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="w-[48%]">
                    <BookOpen className="h-4 w-4 mr-2" /> Materials
                  </Button>
                  <Button size="sm" className="w-[48%]">
                    <PlayCircle className="h-4 w-4 mr-2" /> Continue
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="available">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-primary text-primary-foreground">
                      {course.price}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <User className="h-3 w-3 mr-1" /> <span className="text-xs">{course.instructor}</span>
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-2 capitalize">
                      {course.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{course.duration}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {course.level}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="w-[48%]">
                    <BookOpen className="h-4 w-4 mr-2" /> Preview
                  </Button>
                  <Button size="sm" className="w-[48%]">
                    <CheckCircle className="h-4 w-4 mr-2" /> Enroll
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoursesPage; 