"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Clock, BookOpen, PlayCircle, User, ShoppingCart, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useCart, CartItem } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { parsePrice, formatPrice } from "@/lib/utils";
import { getCourses, Course } from "@/lib/api";

// Define course type for display
interface CourseType {
  id: string;
  title: string;
  instructor: string;
  image: string;
  level: string;
  category: string;
  duration: string;
  price: number | string;
  description?: string;
  language?: string;
  age?: string;
  start?: string;
  classes?: string;
  startingTime?: string;
  progress?: number;
  totalLessons?: string;
  completedLessons?: number;
  lastAccessed?: string;
  nextLesson?: string;
}

const CoursesPage = () => {
  const { addToCart, isInCart } = useCart();
  const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites();
  const [mounted, setMounted] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set mounted to true after first render to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const backendCourses = await getCourses();
        setCourses(backendCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Transform backend courses to display format
  const transformCourseForDisplay = (course: Course): CourseType => {
    // Find course duration from schedule
    const durationItem = course.courseDetails.schedule.find(item => 
      Object.keys(item)[0] === "courseDuration"
    );
    const duration = durationItem ? Object.values(durationItem)[0] : "Flexible Schedule";
    
    // Find starting time from schedule
    const startingTimeItem = course.courseDetails.schedule.find(item => 
      Object.keys(item)[0] === "startingTime"
    );
    const startingTime = startingTimeItem ? Object.values(startingTimeItem)[0] : "After Enrollment";
    
    // Find age requirement from schedule
    const ageItem = course.courseDetails.schedule.find(item => 
      Object.keys(item)[0] === "ageRequirement"
    );
    const age = ageItem ? Object.values(ageItem)[0] : "12+";
    
    // Find course language from schedule
    const languageItem = course.courseDetails.schedule.find(item => 
      Object.keys(item)[0] === "courseLanguage"
    );
    const language = languageItem ? Object.values(languageItem)[0] : "Bangla, Arabic";

    return {
      id: course._id,
      title: course.courseName,
      instructor: "An-Nahda Academy",
      image: course.imagePath,
      level: "Beginner", // Default level
      category: "Islamic Studies", // Default category
      duration: duration,
      price: course.courseDetails.fees.courseFee,
      description: course.description,
      language: language,
      age: age,
      start: startingTime,
      classes: course.courseDetails.platform,
      startingTime: startingTime,
      // Mock progress data for enrolled courses (in real app, this would come from user enrollment data)
      progress: Math.floor(Math.random() * 100),
      totalLessons: "Flexible",
      completedLessons: Math.floor(Math.random() * 20),
      lastAccessed: `${Math.floor(Math.random() * 7)} days ago`,
      nextLesson: "To Be Determined",
    };
  };

  // For demo purposes, we'll show first 3 courses as enrolled and rest as available
  const enrolledCourses: CourseType[] = courses.slice(0, 3).map(transformCourseForDisplay);
  const availableCourses: CourseType[] = courses.slice(3).map(transformCourseForDisplay);

  const handleAddToCart = (course: CourseType) => {
    // Format the course to match CartItem type
    const cartItem: CartItem = {
      id: course.id,
      type: "course" as const,
      title: course.title,
      description: course.description || `${course.title} - ${course.level} level course`,
      instructor: course.instructor,
      price: typeof course.price === 'number' ? course.price : parsePrice(course.price),
      discountedPrice: null,
      image: course.image,
      duration: course.duration,
    };
    
    addToCart(cartItem);
    toast.success(`${course.title} added to cart!`);
  };

  // A safe version of isInCart that only runs on client-side
  const checkIsInCart = (id: string) => {
    if (!mounted) return false;
    return isInCart(id);
  };

  // A safe version of isFavorite that only runs on client-side
  const checkIsFavorite = (id: string) => {
    if (!mounted) return false;
    return isFavorite(id);
  };

  // Toggle favorite
  const toggleFavorite = (course: CourseType) => {
    // Format the course to match CartItem type
    const cartItem: CartItem = {
      id: course.id,
      type: "course" as const,
      title: course.title,
      description: course.description || `${course.title} - ${course.level} level course`,
      instructor: course.instructor,
      price: typeof course.price === 'number' ? course.price : parsePrice(course.price),
      discountedPrice: null,
      image: course.image,
      duration: course.duration,
    };
    
    if (checkIsFavorite(course.id)) {
      removeFromFavorites(course.id);
      toast.success(`${course.title} removed from favorites!`);
    } else {
      addToFavorites(cartItem);
      toast.success(`${course.title} added to favorites!`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">My Courses</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Browse and manage your enrolled and available courses
        </p>
      </div>

      <Tabs defaultValue="enrolled" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
          <TabsTrigger value="available">Available Courses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrolled" className="space-y-4 sm:space-y-6">
          {enrolledCourses.length === 0 ? (
            <Card className="shadow-sm">
              <CardHeader className="px-3 py-2 sm:px-6 sm:py-4">
                <CardTitle className="text-base sm:text-lg">No Enrolled Courses</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  You haven&apos;t enrolled in any courses yet
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-6 py-6 sm:py-8 text-center">
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                  Browse our available courses and enroll to start learning
                </p>
                <Button>Browse Courses</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden shadow-sm h-full">
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-1/3">
                      <Image
                        src={course.image}
                        alt={course.title}
                        width={300}
                        height={200}
                        className="w-full h-40 sm:h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-3 sm:p-4 flex flex-col">
                      <div>
                        <div className="flex items-start justify-between mb-1 sm:mb-2">
                          <h3 className="font-semibold text-sm sm:text-base line-clamp-2">{course.title}</h3>
                          <Badge variant="outline" className="text-[10px] sm:text-xs ml-2 shrink-0">
                            {course.level}
                          </Badge>
                        </div>
                        <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3 line-clamp-2">
                          <span className="font-medium">Instructor:</span> {course.instructor}
                        </p>
                      </div>
                      
                      {course.progress !== undefined && (
                        <div className="space-y-2 sm:space-y-3 flex-1">
                          <div>
                            <div className="flex justify-between items-center text-[10px] sm:text-xs mb-1">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-1.5 sm:h-2" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            {course.completedLessons !== undefined && course.totalLessons && (
                              <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground">
                                <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                                <span>{course.completedLessons}/{course.totalLessons}</span>
                              </div>
                            )}
                            <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                              <span>{course.duration}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-3 pt-2 sm:pt-3 border-t">
                        <div className="flex flex-wrap gap-2 justify-between items-center">
                          <Button size="sm" className="h-7 sm:h-8 text-[10px] sm:text-xs px-2 sm:px-3">
                            <PlayCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                            Continue Learning
                          </Button>
                          {course.lastAccessed && (
                            <div className="text-[10px] sm:text-xs text-muted-foreground">
                              Last accessed: {course.lastAccessed}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="available" className="space-y-4 sm:space-y-6">
          {availableCourses.length === 0 ? (
            <Card className="shadow-sm">
              <CardHeader className="px-3 py-2 sm:px-6 sm:py-4">
                <CardTitle className="text-base sm:text-lg">No Available Courses</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  No additional courses are available at the moment
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {availableCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden shadow-sm flex flex-col h-full">
                  <div className="relative">
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={400}
                      height={225}
                      className="w-full h-48 object-cover"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-background/80 hover:bg-background"
                      onClick={() => toggleFavorite(course)}
                    >
                      <Heart 
                        className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${checkIsFavorite(course.id) ? 'fill-red-500 text-red-500' : ''}`} 
                      />
                    </Button>
                  </div>
                  <CardContent className="flex-1 p-3 sm:p-4">
                    <div className="flex items-start justify-between mb-1 sm:mb-2">
                      <h3 className="font-semibold text-sm sm:text-base line-clamp-2">{course.title}</h3>
                      <Badge variant="outline" className="text-[10px] sm:text-xs ml-2 shrink-0">
                        {course.level}
                      </Badge>
                    </div>
                    
                    <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">
                      <span className="font-medium">Instructor:</span> {course.instructor}
                    </p>
                    
                    <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2 mb-2 sm:mb-3">
                      {course.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-2 sm:mb-3">
                      <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                        <span className="truncate">{course.duration}</span>
                      </div>
                      <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground">
                        <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                        <span className="truncate">{course.age}</span>
                      </div>
                    </div>
                    
                    <Separator className="my-2 sm:my-3" />
                    
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-sm sm:text-base">{formatPrice(typeof course.price === 'number' ? course.price : parsePrice(course.price), '৳')}</div>
                      <Button 
                        size="sm" 
                        className="h-7 sm:h-8 text-[10px] sm:text-xs px-2 sm:px-3"
                        onClick={() => handleAddToCart(course)}
                        disabled={checkIsInCart(course.id)}
                      >
                        {checkIsInCart(course.id) ? (
                          <span>Added to Cart</span>
                        ) : (
                          <>
                            <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoursesPage; 