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
  Book, 
  Clock, 
  LogIn,
  Trash2, 
  ShoppingCart,
  Bookmark,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Image from "next/image";

const CartPage = () => {
  const router = useRouter();
  const { cartItems, removeFromCart, clearCart, calculateSubtotal } = useCart();
  const { isAuthenticated } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);

  // Set hasMounted to true after component mounts
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard/cart');
    }
  }, [isAuthenticated, router]);

  // Calculate subtotal
  const subtotal = calculateSubtotal();

  // Move item to saved for later (just removes it for now)
  const saveForLater = (id: number) => {
    removeFromCart(id);
  };
  
  // Handle continue shopping
  const continueShopping = () => {
    router.push('/courses');
  };

  // Handle login to checkout
  const loginToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    // Save return URL in session storage to redirect back after login
    sessionStorage.setItem("returnUrl", "/dashboard/checkout");
    
    // Show info toast and redirect to homepage with showLogin parameter
    toast.info("Please login to complete your purchase", {
      description: "You'll be redirected to checkout after login",
      duration: 4000
    });
    
    router.push('/?showLogin=true');
  };

  // If the component hasn't mounted yet, render a placeholder to prevent hydration mismatch
  if (!hasMounted) {
    return (
      <div className="container max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">My Cart</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Review your selected courses and resources
          </p>
        </div>
        <div>
          <Card className="shadow-sm">
            <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Cart Items (0)</span>
                </CardTitle>
              </div>
              <CardDescription className="text-xs sm:text-sm">
                Items you&apos;ve added to your cart
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <div className="text-center py-8 sm:py-12">
                <h3 className="text-base sm:text-lg font-medium">Loading cart...</h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">My Cart</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Review your selected courses and resources
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {/* Cart Items Section - Takes up 2/3 of the grid on medium screens and up */}
        <div className="md:col-span-2 space-y-4">
          <Card className="shadow-sm">
            <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
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
                <div className="text-center py-8 sm:py-12">
                  <h3 className="text-base sm:text-lg font-medium">Your cart is empty</h3>
                  <p className="text-muted-foreground text-sm mt-2">Start browsing courses to add items to your cart.</p>
                  <Button 
                    onClick={() => router.push('/courses')} 
                    className="mt-4"
                  >
                    Browse Courses
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
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
                              <h3 className="font-medium mb-1 text-center sm:text-left">{item.title}</h3>
                              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 text-center sm:text-left">{item.description}</p>
                            </div>
                            <div className="text-center sm:text-right mt-2 sm:mt-0">
                              {item.discountedPrice ? (
                                <div>
                                  <p className="text-sm line-through text-muted-foreground">${item.price.toFixed(2)}</p>
                                  <p className="font-bold text-primary">${item.discountedPrice.toFixed(2)}</p>
                                </div>
                              ) : (
                                <p className="font-bold">${item.price.toFixed(2)}</p>
                              )}
                            </div>
                          </div>
                          <div className="mt-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                            <div className="text-sm text-muted-foreground text-center sm:text-left">
                              {item.type === "course" ? (
                                <div className="flex items-center justify-center sm:justify-start">
                                  <Badge variant="outline" className="mr-2">{item.type}</Badge>
                                  <Clock className="h-3.5 w-3.5 mr-1" /> <span className="text-xs">{item.duration}</span>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center sm:justify-start">
                                  <Badge variant="outline" className="mr-2">{item.type}</Badge>
                                  <Book className="h-3.5 w-3.5 mr-1" /> {item.format}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2 justify-center sm:justify-start">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => saveForLater(item.id)}
                                className="h-8 px-2 text-xs sm:text-sm"
                              >
                                <Bookmark className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Save
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => removeFromCart(item.id)}
                                className="h-8 px-2 text-xs sm:text-sm text-destructive hover:text-destructive"
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
              <Button variant="outline" onClick={continueShopping} className="w-full sm:w-auto">Continue Shopping</Button>
              <Button variant="ghost" onClick={clearCart} className="w-full sm:w-auto">
                <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Order Summary Section - Takes up 1/3 of the grid on medium screens and up */}
        <div>
          <Card className="shadow-sm sticky top-4">
            <CardHeader className="px-3 py-3 sm:px-6 sm:py-4">
              <CardTitle className="text-lg sm:text-xl">Order Summary</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Login or Register to complete your purchase
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Estimated Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="rounded-md bg-muted p-3 sm:p-4 text-xs sm:text-sm space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="font-medium">Not logged in</h4>
                      <p className="text-muted-foreground mt-1">
                        Please login or create an account to complete your purchase.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 px-3 py-3 sm:px-6 sm:py-4">
              {isAuthenticated ? (
                <Button 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90" 
                  disabled={cartItems.length === 0}
                  onClick={() => router.push('/dashboard/checkout')}
                >
                  Proceed to Payment
                </Button>
              ) : (
                <>
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90" 
                    onClick={loginToCheckout}
                    disabled={cartItems.length === 0}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login to Checkout
                  </Button>
                  
                  <div className="text-xs text-center text-muted-foreground mt-1 mb-2">
                    <span className="text-amber-600 font-medium">Note:</span> You need to login to complete your purchase.
                  </div>
                </>
              )}
              
              <p className="text-xs text-center text-muted-foreground pt-2">
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