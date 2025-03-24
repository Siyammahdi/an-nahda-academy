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
  MinusCircle, 
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// Mock data for cart items
const initialCartItems = [
  {
    id: 1,
    type: "course",
    title: "Advanced Arabic for Quran Understanding",
    description: "Enhance your understanding of Quranic Arabic with advanced grammatical concepts",
    instructor: "Prof. Aisha Rahman",
    price: 199.99,
    discountedPrice: 149.99,
    image: "https://placehold.co/600x400/e9f5fa/102030?text=Arabic+Course",
    duration: "12 weeks",
  },
  {
    id: 2,
    type: "course",
    title: "Foundations of Islamic Jurisprudence",
    description: "Learn the principles and methodology of Islamic legal theory",
    instructor: "Dr. Abdullah Hakim",
    price: 249.99,
    discountedPrice: null,
    image: "https://placehold.co/600x400/faf5e9/102030?text=Fiqh+Course",
    duration: "16 weeks",
  },
  {
    id: 3,
    type: "resource",
    title: "Arabic-English Dictionary of Quranic Terms",
    description: "Comprehensive digital dictionary with over 5,000 Quranic terms",
    author: "Islamic Studies Institute",
    price: 39.99,
    discountedPrice: 29.99,
    image: "https://placehold.co/300x400/e9faf5/102030?text=Quranic+Dictionary",
    format: "Digital Download",
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.discountedPrice || item.price);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount if promo applied
  const taxes = (subtotal - discount) * 0.05; // 5% tax
  const total = subtotal - discount + taxes;

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Move item to saved for later
  const saveForLater = (id: number) => {
    // In a real app, this would move the item to a saved list
    // For this demo, we'll just remove it from the cart
    removeItem(id);
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "student10") {
      setPromoApplied(true);
    }
  };

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
                Items you've added to your cart
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
                          <img 
                            src={item.image} 
                            alt={item.title} 
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
                                onClick={() => removeItem(item.id)}
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
              <Button variant="outline">Continue Shopping</Button>
              <Button variant="ghost" onClick={() => setCartItems([])}>
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
                        onClick={applyPromoCode} 
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
              <Button className="w-full" disabled={cartItems.length === 0}>
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
            {[1, 2, 3].map((id) => (
              <Card key={id} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={`https://placehold.co/600x400/${id === 1 ? 'e5f5fb' : id === 2 ? 'fbf5e5' : 'e5fbf5'}/102030?text=Recommended+${id}`} 
                    alt={`Recommended Course ${id}`} 
                    className="w-full h-32 object-cover" 
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 hover:bg-background"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium truncate">
                    {id === 1 
                      ? "Seerah: Life of Prophet Muhammad" 
                      : id === 2 
                        ? "Islamic Calligraphy Workshop" 
                        : "Understanding Hadith Sciences"}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-bold">${(id * 50 + 49.99).toFixed(2)}</span>
                    <Badge variant="secondary" className="text-xs">Bestseller</Badge>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button size="sm" variant="outline" className="w-full">
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