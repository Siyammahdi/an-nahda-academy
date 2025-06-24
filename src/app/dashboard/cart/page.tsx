"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  PlusCircle, 
  Book, 
  Clock, 
  CreditCard, 
  Trash2, 
  ShoppingCart,
  Heart,
  BadgePercent
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useCart, CartItem } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { useFavorites } from "@/contexts/FavoritesContext";
import { formatPrice, parsePrice } from "@/lib/utils";
import { getCourses, Course } from "@/lib/api";

const CartPage = () => {
  const router = useRouter();
  const { 
    cartItems, 
    removeFromCart, 
    clearCart, 
    calculateSubtotal, 
    calculateTotal, 
    applyPromoCode, 
    promoApplied, 
    discount,
    addToCart
  } = useCart();
  const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites();
  
  const [promoCode, setPromoCode] = useState("Nahda10");
  const [hasMounted, setHasMounted] = useState(false);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [loadingRecommended, setLoadingRecommended] = useState(true);

  // Set hasMounted to true after component mounts
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Fetch recommended courses from backend
  useEffect(() => {
    const fetchRecommendedCourses = async () => {
      try {
        setLoadingRecommended(true);
        const courses = await getCourses();
        // Show courses that are not in cart as recommendations
        const cartItemIds = cartItems.map(item => item.id);
        const availableCourses = courses.filter(course => !cartItemIds.includes(course._id));
        // Take first 3 courses as recommendations
        setRecommendedCourses(availableCourses.slice(0, 3));
      } catch (error) {
        console.error('Error fetching recommended courses:', error);
      } finally {
        setLoadingRecommended(false);
      }
    };

    if (hasMounted) {
      fetchRecommendedCourses();
    }
  }, [hasMounted, cartItems]);

  // Transform course for display
  const transformCourseForDisplay = (course: Course) => {
    // Find course duration from schedule
    const durationItem = course.courseDetails.schedule.find(item => 
      Object.keys(item)[0] === "courseDuration"
    );
    const duration = durationItem ? Object.values(durationItem)[0] : "Flexible Schedule";

    return {
      id: course._id,
      title: course.courseName,
      price: parsePrice(course.courseDetails.fees.courseFee),
      badge: "Popular",
      image: course.imagePath,
      type: "course",
      description: course.description,
      instructor: "An-Nahda Academy",
      duration: duration,
    };
  };

  // Calculate totals
  const subtotal = calculateSubtotal();
  const total = calculateTotal();

  // Toggle an item as favorite
  const toggleFavorite = (item: CartItem) => {
    const isFavorite = checkIsFavorite(item.id.toString());
    if (isFavorite) {
      removeFromFavorites(item.id);
      toast.success(`${item.title} removed from favorites!`);
    } else {
      addToFavorites(item);
      toast.success(`${item.title} added to favorites!`);
    }
  };

  // Apply promo code
  const handleApplyPromoCode = () => {
    applyPromoCode(promoCode);
  };
  
  // Handle continue shopping
  const continueShopping = () => {
    router.push('/dashboard/courses');
  };

  // Check if item is in favorites
  const checkIsFavorite = (id: string) => {
    if (!hasMounted) return false;
    return isFavorite(id);
  };

  // If the component hasn't mounted yet, render a placeholder to prevent hydration mismatch
  if (!hasMounted) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">My Cart</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Review and checkout your selected courses and resources
          </p>
        </div>
        <div className="grid gap-3 sm:gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-3 sm:space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="px-3 py-2 sm:px-6 sm:py-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Cart Items (0)</span>
                  </CardTitle>
                </div>
                <CardDescription className="text-xs sm:text-sm">
                  Items you&apos;ve added to your cart
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="text-center py-6 sm:py-8">
                  <h3 className="text-base sm:text-lg font-medium">Loading cart...</h3>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="shadow-sm sticky top-4">
              <CardHeader className="px-3 py-2 sm:px-6 sm:py-4">
                <CardTitle className="text-base sm:text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span>Loading...</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">My Cart</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Review and checkout your selected courses and resources
        </p>
      </div>

      <div className="grid gap-3 sm:gap-6 md:grid-cols-3">
        {/* Cart Items Section - Takes up 2/3 of the grid on medium screens and up */}
        <div className="md:col-span-2 space-y-3 sm:space-y-4">
          <Card className="shadow-sm">
            <CardHeader className="px-3 py-2 sm:px-6 sm:py-4">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Cart Items ({cartItems.length})</span>
                </CardTitle>
              </div>
              <CardDescription className="text-xs sm:text-sm">
                Items you&apos;ve added to your cart
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <h3 className="text-base sm:text-lg font-medium">Your cart is empty</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Start browsing courses and resources to add items to your cart.</p>
                </div>
              ) : (
                <div className=" space-y-3 sm:space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden shadow-sm">
                      <div className="flex flex-col sm:flex-row p-3 sm:p-4 gap-3 sm:gap-4">
                        <div className="shrink-0 mx-auto sm:mx-0">
                          <Image 
                            src={item.image} 
                            alt={item.title} 
                            width={128}
                            height={96}
                            className="w-full sm:w-32 h-auto sm:h-24 max-w-[200px] object-cover rounded-md" 
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="font-medium mb-1 text-center sm:text-left text-sm sm:text-base">{item.title}</h3>
                              <p className="text-xs text-muted-foreground line-clamp-2 text-center sm:text-left">{item.description}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              {item.discountedPrice ? (
                                <>
                                  <p className="text-xs sm:text-sm line-through text-muted-foreground">{formatPrice(item.price, '৳')}</p>
                                  <p className="font-bold text-primary text-sm sm:text-base">{formatPrice(item.discountedPrice, '৳')}</p>
                                </>
                              ) : (
                                <p className="font-bold text-sm sm:text-base">{formatPrice(item.price, '৳')}</p>
                              )}
                            </div>
                          </div>
                          <div className="mt-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                            <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                              {item.type === "course" ? (
                                <div className="flex items-center justify-center sm:justify-start">
                                  <Badge variant="outline" className="mr-2 text-[10px] sm:text-xs">{item.type}</Badge>
                                  <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> <span className="text-[10px] sm:text-xs">{item.duration}</span>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center sm:justify-start">
                                  <Badge variant="outline" className="mr-2 text-[10px] sm:text-xs">{item.type}</Badge>
                                  <Book className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> {item.format}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2 justify-center sm:justify-start">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => toggleFavorite(item)}
                                className="h-8 px-2 text-xs"
                              >
                                <Heart className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 ${checkIsFavorite(item.id.toString()) ? "fill-red-500 text-red-500" : ""}`} /> 
                                {checkIsFavorite(item.id.toString()) ? "Saved" : "Save"}
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => removeFromCart(item.id)}
                                className="h-8 px-2 text-xs text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between px-3 py-3 sm:px-6 sm:py-4 gap-2">
              <Button variant="outline" onClick={continueShopping} className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-10">
                Continue Shopping
              </Button>
              <Button variant="ghost" onClick={clearCart} className="w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-10">
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> Clear Cart
              </Button>
            </CardFooter>
          </Card>

          {/* Recommended Items Section */}
          {cartItems.length > 0 && (
            <Card className="shadow-sm">
              <CardHeader className="px-3 py-2 sm:px-6 sm:py-4">
                <CardTitle className="text-base sm:text-lg">Recommended For You</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Based on your cart items and interests
                </CardDescription>
              </CardHeader>
              <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                {loadingRecommended ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Loading recommendations...</p>
                  </div>
                ) : recommendedCourses.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-600">No additional courses available at the moment.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {recommendedCourses.map((course) => {
                      const displayCourse = transformCourseForDisplay(course);
                      return (
                        <Card key={displayCourse.id} className="overflow-hidden shadow-sm h-full">
                          <div className="relative">
                            <Image
                              src={displayCourse.image}
                              alt={displayCourse.title}
                              width={300}
                              height={150}
                              className="w-full h-32 object-cover"
                            />
                            {displayCourse.badge && (
                              <Badge className="absolute top-2 right-2 bg-amber-500 text-white hover:bg-amber-600 text-[10px] sm:text-xs">
                                {displayCourse.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium text-xs sm:text-sm line-clamp-2 min-h-[2.5rem]">{displayCourse.title}</h3>
                            <div className="flex justify-between items-center mt-2">
                              <span className="font-bold text-xs sm:text-sm">{formatPrice(displayCourse.price, '৳')}</span>
                              <Button
                                size="sm"
                                onClick={() => {
                                  addToCart({
                                    id: displayCourse.id,
                                    type: "course",
                                    title: displayCourse.title,
                                    description: displayCourse.description,
                                    instructor: displayCourse.instructor,
                                    price: displayCourse.price,
                                    discountedPrice: null,
                                    image: displayCourse.image,
                                    duration: displayCourse.duration,
                                  } as CartItem);
                                  toast.success(`${displayCourse.title} added to cart!`);
                                }}
                                className="h-7 px-2 text-[10px] sm:text-xs"
                              >
                                <PlusCircle className="h-3 w-3 mr-1" /> Add
                              </Button>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary Section - Takes up 1/3 of the grid on medium screens and up */}
        <div>
          <Card className="shadow-sm sticky top-4">
            <CardHeader className="px-3 py-2 sm:px-6 sm:py-4">
              <CardTitle className="text-base sm:text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal, '৳')}</span>
                  </div>
                  
                  {promoApplied && (
                    <div className="flex justify-between text-xs sm:text-sm text-green-600">
                      <span className="flex items-center">
                        <BadgePercent className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Promo Code
                      </span>
                      <span>-{formatPrice(discount, '৳')}</span>
                    </div>
                  )}
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-bold text-sm sm:text-base">
                    <span>Total</span>
                    <span>{formatPrice(total, '৳')}</span>
                  </div>
                </div>

                {!promoApplied && (
                  <div className="pt-1 sm:pt-2">
                    <div className="rounded-md bg-muted p-2 sm:p-3 text-xs sm:text-sm space-y-2 sm:space-y-3">
                      <div className="flex items-center gap-2">
                        <BadgePercent className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Do you have a promo code?</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter code"
                          className="bg-background flex-1 h-8 px-2 text-xs rounded-md border"
                        />
                        <Button 
                          size="sm" 
                          onClick={handleApplyPromoCode}
                          className="h-8 text-xs"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 px-3 py-3 sm:px-6 sm:py-4">
              <Button 
                className="w-full bg-primary text-white h-9 text-xs sm:text-sm" 
                disabled={cartItems.length === 0}
                onClick={() => router.push("/dashboard/checkout")}
              >
                <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" /> Checkout
              </Button>
              
              <p className="text-[10px] sm:text-xs text-center text-muted-foreground pt-1 sm:pt-2">
                By proceeding, you agree to our Terms of Service and Payment Terms.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 