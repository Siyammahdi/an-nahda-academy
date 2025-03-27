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
import { Heart, BookOpen, Clock, ShoppingCart, Trash2, Book } from "lucide-react";
import { useState, useEffect } from "react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

const FavoritesPage = () => {
  const router = useRouter();
  const { favoriteItems, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart, isInCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard/favorites');
    }
  }, [isAuthenticated, router]);

  // A safe version of isInCart that only runs on client-side
  const checkIsInCart = (id: number) => {
    if (!mounted) return false;
    return isInCart(id);
  };

  // If the component hasn't mounted yet, render a placeholder to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Favorites</h1>
          <p className="text-muted-foreground">
            View and manage your favorite courses and resources
          </p>
        </div>
        <div>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  <span>Favorite Items (0)</span>
                </CardTitle>
              </div>
              <CardDescription>
                Items you've saved as favorites
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">Loading favorites...</h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Favorites</h1>
        <p className="text-muted-foreground">
          View and manage your favorite courses and resources
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              <span>Favorite Items ({favoriteItems.length})</span>
            </CardTitle>
            {favoriteItems.length > 0 && (
              <Button 
                variant="ghost" 
                onClick={clearFavorites}
                className="h-8 px-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-1" /> Clear All
              </Button>
            )}
          </div>
          <CardDescription>
            Items you've saved as favorites
          </CardDescription>
        </CardHeader>
        <CardContent>
          {favoriteItems.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">Your favorites list is empty</h3>
              <p className="text-muted-foreground mt-2">Save courses you're interested in by clicking the heart icon.</p>
              <Button 
                onClick={() => router.push('/courses')} 
                className="mt-4"
              >
                Browse Courses
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => removeFromFavorites(item.id)}
                      className="absolute top-2 right-2 h-8 w-8 rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                    <div className="flex justify-between items-center mt-3">
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
                      <span className="font-bold">${item.discountedPrice || item.price}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => router.push(`/course_details/${item.id}`)}
                    >
                      <BookOpen className="h-4 w-4 mr-2" /> Details
                    </Button>
                    {mounted && checkIsInCart(item.id) ? (
                      <Button 
                        size="sm" 
                        variant="secondary"
                        className="flex-1"
                        disabled
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" /> In Cart
                      </Button>
                    ) : (
                      <Button 
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          addToCart(item);
                          toast.success(`${item.title} added to cart!`);
                        }}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FavoritesPage; 