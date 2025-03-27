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
  Bookmark,
  BadgePercent
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
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
    image: "https://placehold.co/600x400/e5f5fb/102030?text=Recommended+1",
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
    image: "https://placehold.co/600x400/fbf5e5/102030?text=Recommended+2",
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
    image: "https://placehold.co/600x400/e5fbf5/102030?text=Recommended+3", 
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

  // Move item to saved for later
  const saveForLater = (id: number) => {
    // In a real app, this would move the item to a saved list
    // For this demo, we'll just remove it from the cart
    removeFromCart(id);
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

  // Toggle favorite
  const toggleFavorite = (item: {
    id: number;
    title: string;
    description: string;
    instructor: string;
    price: number;
    image: string;
    duration: string;
  }) => {
    if (checkIsFavorite(item.id)) {
      removeFromFavorites(item.id);
      toast.success(`${item.title} removed from favorites!`);
    } else {
      const cartItem = {
        id: item.id,
        type: "course" as const,
        title: item.title,
        description: item.description,
        instructor: item.instructor,
        price: item.price,
        discountedPrice: null,
        image: item.image,
        duration: item.duration,
      };
      addToFavorites(cartItem);
      toast.success(`${item.title} added to favorites!`);
    }
  };

  // If the component hasn't mounted yet, render a placeholder to prevent hydration mismatch
  if (!hasMounted) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Cart</h1>
          <p className="text-muted-foreground">
            Review and checkout your selected courses and resources
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Cart Items (0)</span>
                  </CardTitle>
                </div>
                <CardDescription>
                  Items you&apos;ve added to your cart
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium">Loading cart...</h3>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Cart</h1>
        <p className="text-muted-foreground">
          Review and checkout your selected courses and resources
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Cart Items Section - Takes up 2/3 of the grid on medium screens and up */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart Items ({cartItems.length})</span>
                </CardTitle>
              </div>
              <CardDescription>
                Items you&apos;ve added to your cart
              </CardDescription>
            </CardHeader>
            <CardContent>
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium">Your cart is empty</h3>
                  <p className="text-muted-foreground">Start browsing courses and resources to add items to your cart.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="flex p-4 gap-4">
                        <div className="shrink-0">
                          <Image 
                            src={item.image} 
                            alt={item.title} 
                            width={128}
                            height={96}
                            className="w-32 h-24 object-cover rounded-md" 
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium mb-1">{item.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                            </div>
                            <div className="text-right">
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
                          <div className="mt-3 flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                              {item.type === "course" ? (
                                <div className="flex items-center">
                                  <Badge variant="outline" className="mr-2">{item.type}</Badge>
                                  <Clock className="h-3.5 w-3.5 mr-1" /> {item.duration}
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <Badge variant="outline" className="mr-2">{item.type}</Badge>
                                  <Book className="h-3.5 w-3.5 mr-1" /> {item.format}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => saveForLater(item.id)}
                                className="h-8 px-2"
                              >
                                <Bookmark className="h-4 w-4 mr-1" /> Save
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => removeFromCart(item.id)}
                                className="h-8 px-2 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-1" /> Remove
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
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={continueShopping}>Continue Shopping</Button>
              <Button variant="ghost" onClick={clearCart}>
                <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Order Summary Section - Takes up 1/3 of the grid on medium screens and up */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                Review your order details before checkout
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Taxes (5%)</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="relative mb-4">
                    <div className="flex items-center">
                      <BadgePercent className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm font-medium">Promo Code</span>
                    </div>
                    <div className="flex mt-1.5">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        disabled={promoApplied}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <Button 
                        variant="outline"
                        size="sm" 
                        onClick={handleApplyPromoCode} 
                        disabled={promoApplied || !promoCode.trim()} 
                        className="ml-2 h-9"
                      >
                        Apply
                      </Button>
                    </div>
                    {promoApplied && (
                      <p className="text-xs text-green-600 mt-1">Promo code applied successfully!</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button 
                className="w-full" 
                disabled={cartItems.length === 0}
                onClick={() => router.push('/dashboard/checkout')}
              >
                <CreditCard className="h-4 w-4 mr-2" /> Proceed to Checkout
              </Button>
              <p className="text-xs text-center text-muted-foreground pt-2">
                By proceeding, you agree to our Terms of Service and Payment Terms.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Recommended Items Section */}
      <Card>
        <CardHeader>
          <CardTitle>You Might Also Like</CardTitle>
          <CardDescription>
            Based on your selections and browsing history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    width={400}
                    height={300}
                    className="w-full h-32 object-cover" 
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 hover:bg-background"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent the card click event
                      toggleFavorite(item);
                    }}
                  >
                    <Heart 
                      className={`h-4 w-4 ${checkIsFavorite(item.id) ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium truncate">
                    {item.title}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-bold">${item.price.toFixed(2)}</span>
                    <Badge variant="secondary" className="text-xs">{item.badge}</Badge>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      const cartItem = {
                        id: item.id,
                        type: "course" as const,
                        title: item.title,
                        description: item.description,
                        instructor: item.instructor,
                        price: item.price,
                        discountedPrice: null,
                        image: item.image,
                        duration: item.duration,
                      };
                      addToCart(cartItem);
                      toast.success(`${item.title} added to cart!`);
                    }}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" /> Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartPage; 