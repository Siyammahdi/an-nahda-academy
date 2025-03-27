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
import { Clock, BookOpen, PlayCircle, User, ShoppingCart, PlusCircle, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useCart, CartItem } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { toast } from "sonner";
import { useState, useEffect } from "react";

// Mock data types
interface CourseType {
  id: number;
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

// Mock data for demonstration
const enrolledCourses: CourseType[] = [
  {
    id: 1,
    title: "Learning Arabic Course",
    instructor: "Not Specified",
    progress: 65,
    totalLessons: "Flexible",
    completedLessons: 16,
    image: "/course_poster/learning_arabic.png",
    lastAccessed: "2 days ago",
    nextLesson: "To Be Determined",
    level: "Beginner",
    category: "Arabic Language",
    language: "Bangla, Arabic",
    age: "10+",
    duration: "9+ months (Live Class)",
    start: "After Enrollment",
    price: 650,
    description: "Comprehensive Arabic language course covering basic to intermediate concepts with focus on practical usage."
  },
  {
    id: 2,
    title: "Hasanul Khuluk",
    instructor: "Not Specified",
    progress: 32,
    totalLessons: "Live & Pre-recorded",
    completedLessons: 13,
    image: "/course_poster/husnul_khuluk.png",
    lastAccessed: "5 days ago",
    nextLesson: "To Be Determined",
    level: "Intermediate",
    category: "Islamic Studies",
    language: "Bangla, Arabic",
    age: "12+",
    duration: "2 months",
    start: "Next batch starts on March 1st, 2025",
    price: 1000,
    description: "Learn about character building and ethics from an Islamic perspective."
  },
  {
    id: 3,
    title: "Fiqhun-Nisa",
    instructor: "Not Specified",
    progress: 89,
    totalLessons: "20+ Classes",
    completedLessons: 16,
    image: "/course_poster/fiqhun_nisa.png",
    lastAccessed: "Yesterday",
    nextLesson: "To Be Determined",
    level: "Beginner",
    category: "Islamic Studies",
    language: "Bangla, Arabic",
    age: "10+",
    duration: "18+ hours (Live + Recorded)",
    start: "After Enrollment",
    price: 1050,
    description: "Special course on Islamic jurisprudence focusing on issues pertaining to women."
  },
];

const availableCourses = [
  {
    id: 4,
    title: "Alima Course",
    instructor: "Not Specified",
    image: "/course_poster/aleema.png",
    level: "Advanced",
    category: "Islamic Studies",
    duration: "3 Years (Live Class)",
    price: 550,
    language: "Bangla, Arabic",
    age: "12+",
    start: "After Enrollment",
    classes: "Flexible class schedule",
    startingTime: "Next batch starts on April 1st, 2025",
    description: "Comprehensive Islamic studies course covering various Islamic sciences to train female scholars."
  },
  {
    id: 5,
    title: "Parenting Course",
    instructor: "Not Specified",
    image: "/course_poster/parenting.png",
    level: "Beginner",
    category: "Parenting & Family",
    duration: "6 months (Live Class)",
    price: 550,
    language: "Bangla",
    age: "16+",
    start: "After Enrollment",
    classes: "Flexible class schedule",
    startingTime: "Next batch starts on April 1st, 2025",
    description: "Learn effective parenting techniques from an Islamic perspective for raising righteous children."
  },
];


const CoursesPage = () => {
  const { addToCart, isInCart } = useCart();
  const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after first render to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = (course: CourseType) => {
    // Format the course to match CartItem type
    const cartItem: CartItem = {
      id: course.id,
      type: "course" as const,
      title: course.title,
      description: course.description || `${course.title} - ${course.level} level course`,
      instructor: course.instructor,
      price: typeof course.price === 'number' ? course.price : 
        typeof course.price === 'string' ? parseFloat(course.price.split(' ')[0]) : 0,
      discountedPrice: null,
      image: course.image,
      duration: course.duration,
    };
    
    addToCart(cartItem);
    toast.success(`${course.title} added to cart!`);
  };

  // A safe version of isInCart that only runs on client-side
  const checkIsInCart = (id: number) => {
    if (!mounted) return false;
    return isInCart(id);
  };

  // A safe version of isFavorite that only runs on client-side
  const checkIsFavorite = (id: number) => {
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
      price: typeof course.price === 'number' ? course.price : 
        typeof course.price === 'string' ? parseFloat(course.price.split(' ')[0]) : 0,
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
                <CardHeader className="p-4">
                  <div className="flex flex-col justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      
                    </div>
                    {/* <Badge variant="outline" className="capitalize">
                      <span className="text-xs">{course.category}</span>
                    </Badge> */}
                    <CardDescription className="flex items-center mt-1">
                        <User className="h-3 w-3 mr-1" /> <span className="text-xs">{course.instructor}</span>
                      </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{course.completedLessons} completed</span>
                      <span>{course.totalLessons} </span>
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
                <CardFooter className="flex justify-between p-4">
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
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full bg-background/80 hover:bg-background"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(course);
                      }}
                    >
                      <Heart 
                        className={`h-4 w-4 ${checkIsFavorite(course.id) ? 'fill-red-500 text-red-500' : ''}`}
                      />
                    </Button>
                    <Badge className="bg-primary text-primary-foreground">
                      {typeof course.price === 'number' ? `${course.price} Tk.` : course.price}
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
                    {/* <Badge variant="outline" className="ml-2 capitalize">
                      <span>{course.category}</span>
                    </Badge> */}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-xs">{course.duration}</span>
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
                  {mounted && checkIsInCart(course.id) ? (
                    <Button size="sm" className="w-[48%]" variant="secondary" disabled>
                      <ShoppingCart className="h-4 w-4 mr-2" /> In Cart
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      className="w-[48%]" 
                      onClick={() => handleAddToCart(course)}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Add to Cart
                    </Button>
                  )}
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