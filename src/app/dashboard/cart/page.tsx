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

// Mock data for recommended items
const recommendedItems = [
  {
    id: 101,
    title: "Seerah: Life of Prophet Muhammad",
    price: 99.99,
    badge: "Bestseller",
    image: "/poster_square/aleema.png",
    type: "course",
    description: "Learn about the life of Prophet Muhammad (PBUH) in this comprehensive course",
    instructor: "Dr. Yasir Qadhi",
    duration: "40 hours"
  },
  {
    id: 102,
    title: "Islamic Calligraphy Workshop",
    price: 149.99,
    badge: "Bestseller",
    image: "/poster_square/husnul_khuluk.png",
    type: "course",
    description: "Master the beautiful art of Islamic calligraphy from expert practitioners",
    instructor: "Ustadh Ali Khan",
    duration: "24 hours"
  },
  {
    id: 103,
    title: "Understanding Hadith Sciences",
    price: 199.99,
    badge: "Bestseller",
    image: "/poster_square/fiqhun_nisa.png", 
    type: "course",
    description: "Deep dive into the science of Hadith and its principles of authentication",
    instructor: "Shaykh Muhammad Salah",
    duration: "36 hours"
  },
];

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

  // Set hasMounted to true after component mounts
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Calculate totals
  const subtotal = calculateSubtotal();
  const taxes = (subtotal - discount) * 0.05; // 5% tax
  const total = calculateTotal();

  // Toggle an item as favorite
  const toggleFavorite = (item: CartItem) => {
    const isFavorite = checkIsFavorite(item.id);
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
  const checkIsFavorite = (id: number) => {
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
                            <div className="text-center sm:text-right mt-2 sm:mt-0">
                              {item.discountedPrice ? (
                                <div>
                                  <p className="text-xs sm:text-sm line-through text-muted-foreground">${item.price.toFixed(2)}</p>
                                  <p className="font-bold text-primary text-sm sm:text-base">${item.discountedPrice.toFixed(2)}</p>
                                </div>
                              ) : (
                                <p className="font-bold text-sm sm:text-base">${item.price.toFixed(2)}</p>
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
                                <Heart className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 ${checkIsFavorite(item.id) ? "fill-red-500 text-red-500" : ""}`} /> 
                                {checkIsFavorite(item.id) ? "Saved" : "Save"}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {recommendedItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden shadow-sm h-full">
                      <div className="relative">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={300}
                          height={150}
                          className="w-full h-32 object-cover"
                        />
                        {item.badge && (
                          <Badge className="absolute top-2 right-2 bg-amber-500 text-white hover:bg-amber-600 text-[10px] sm:text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-xs sm:text-sm line-clamp-2 min-h-[2.5rem]">{item.title}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-bold text-xs sm:text-sm">${item.price.toFixed(2)}</span>
                          <Button
                            size="sm"
                            onClick={() => {
                              addToCart({
                                id: item.id,
                                type: "course",
                                title: item.title,
                                description: item.description,
                                instructor: item.instructor || "Instructor",
                                price: item.price,
                                discountedPrice: null,
                                image: item.image,
                                duration: item.duration || "N/A",
                              } as CartItem);
                              toast.success(`${item.title} added to cart!`);
                            }}
                            className="h-7 px-2 text-[10px] sm:text-xs"
                          >
                            <PlusCircle className="h-3 w-3 mr-1" /> Add
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
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
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {promoApplied && (
                    <div className="flex justify-between text-xs sm:text-sm text-green-600">
                      <span className="flex items-center">
                        <BadgePercent className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Promo Code
                      </span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Taxes</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-bold text-sm sm:text-base">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
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