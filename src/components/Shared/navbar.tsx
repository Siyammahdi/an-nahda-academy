"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GrFavorite } from "react-icons/gr";
import { Menu } from "lucide-react";

import { Logo } from "@/components/icons";
import { siteConfig } from "@/config/site";
import RegistrationModal from "../registrationModal";
import LoginModal from "../loginModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const { getCartCount } = useCart();
  const { getFavoritesCount } = useFavorites();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after first render to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check for showLogin parameter in URL and open login modal
  useEffect(() => {
    if (mounted) {
      try {
        const url = new URL(window.location.href);
        const showLogin = url.searchParams.get('showLogin');
        
        if (showLogin === 'true') {
          // Remove the showLogin parameter without page reload
          url.searchParams.delete('showLogin');
          window.history.replaceState({}, '', url.toString());
          
          // Small delay to ensure UI is ready
          setTimeout(() => {
            setIsLoginClicked(true);
          }, 100);
        }
      } catch (error) {
        console.error('Error parsing URL:', error);
      }
    }
  }, [mounted]);

  const handleLoginOpen = () => {
    setIsModalOpen(false);
    setIsLoginClicked(true);
  };

  const handleLoginClose = () => {
    setIsLoginClicked(false);
  };

  const handleModalOpen = () => {
    setIsLoginClicked(false);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Get user initials for avatar
  const getInitials = (name: string = "") => {
    if (!name) return "U"; // Default to "U" for User if no name exists
    
    const nameParts = name.split(" ");
    if (nameParts.length === 0 || !nameParts[0]) return "U";
    
    // Get first letter of first name and optionally first letter of last name
    const firstInitial = nameParts[0].charAt(0).toUpperCase();
    const lastInitial = nameParts.length > 1 && nameParts[1] ? nameParts[1].charAt(0).toUpperCase() : "";
    
    return firstInitial + lastInitial;
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Get cart count safely - only show cart badge on client-side
  const cartCount = mounted ? getCartCount() : 0;
  const showCartBadge = mounted && cartCount > 0;

  // Get favorites count safely - only show favorites badge on client-side
  const favoritesCount = mounted ? getFavoritesCount() : 0;
  const showFavoritesBadge = mounted && favoritesCount > 0;

  // Favorites route based on authentication status
  const favoritesRoute = isAuthenticated ? "/dashboard/favorites" : "/favorites";

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full transition-colors duration-300 h-24",
      isScrolled ? "bg-background/50 backdrop-blur-md" : "bg-transparent"
    )}>
      <div className="container flex items-center h-full justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="leading-5 font-bold text-xl bg-gradient-to-r from-violet-900 to-violet-500 bg-clip-text text-transparent flex flex-col">An-nahda <span className="font-normal text-sm">Academy</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex">
          <ul className="flex space-x-1">
            {siteConfig.navItems.map((item) => (
              <li key={item.href}>
                {item.label === "Login" ? (
                  isAuthenticated ? (
                    <Link 
                      href="/dashboard" 
                      className="flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link 
                      href={item.href} 
                      onClick={handleLoginOpen}
                      className="flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      {item.label}
                    </Link>
                  )
                ) : (
                  <Link 
                    href={item.href} 
                    className="flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden sm:flex items-center gap-4">
          <Link href={isAuthenticated ? "/dashboard/cart" : "/cart"} className="text-violet-600 relative">
            <FaCartShopping size={20} />
            {showCartBadge && (
              <Badge variant="destructive" className="absolute -top-2 -right-3 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                {cartCount}
              </Badge>
            )}
          </Link>
          <Link href={favoritesRoute} className="text-violet-600 relative">
            <GrFavorite size={20} />
            {showFavoritesBadge && (
              <Badge variant="secondary" className="absolute -top-2 -right-3 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                {favoritesCount}
              </Badge>
            )}
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Button asChild className="rounded-full bg-primary">
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </Button>
              <Link href="/dashboard/profile">
                <div className="relative">
                  <Avatar className="h-9 w-9 border-2 border-primary cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarFallback className="text-sm font-bold bg-primary text-primary-foreground">
                      {getInitials(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </Link>
            </div>
          ) : (
            <Button onClick={handleLoginOpen} className="rounded-full bg-primary">
              Login
            </Button>
          )}
        </div>

        {/* Mobile Menu Button and Icons */}
        <div className="flex lg:hidden items-center gap-2">
          <Link href={isAuthenticated ? "/dashboard/cart" : "/cart"} className="text-foreground relative mr-1">
            <FaCartShopping size={18} />
            {showCartBadge && (
              <Badge variant="destructive" className="absolute -top-2 -right-3 h-4 w-4 flex items-center justify-center p-0 text-[10px]">
                {cartCount}
              </Badge>
            )}
          </Link>
          <Link href={favoritesRoute} className="text-foreground relative mr-1">
            <GrFavorite size={18} />
            {showFavoritesBadge && (
              <Badge variant="secondary" className="absolute -top-2 -right-3 h-4 w-4 flex items-center justify-center p-0 text-[10px]">
                {favoritesCount}
              </Badge>
            )}
          </Link>
          {isAuthenticated && (
            <Link href="/dashboard/profile">
              <div className="relative">
                <Avatar className="h-8 w-8 border-2 border-primary cursor-pointer">
                  <AvatarFallback className="text-xs font-bold bg-primary text-primary-foreground">
                    {getInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </Link>
          )}
          
          {/* Mobile Menu Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[220px] lg:hidden mt-2">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {siteConfig.navItems.map((item) => (
                item.label === "Login" ? (
                  isAuthenticated ? (
                    <DropdownMenuItem key={`${item.href}-dashboard`} asChild>
                      <Link 
                        href="/dashboard" 
                        className="cursor-pointer w-full"
                      >
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem key={item.href} onClick={handleLoginOpen} className="cursor-pointer">
                      {item.label}
                    </DropdownMenuItem>
                  )
                ) : (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link 
                      href={item.href} 
                      className="cursor-pointer w-full"
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                )
              ))}
              
              <DropdownMenuSeparator />
              
              {isAuthenticated ? (
                <DropdownMenuItem asChild>
                  <Link 
                    href="/dashboard" 
                    className="cursor-pointer w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem 
                  onClick={handleLoginOpen} 
                  className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-2 text-sm font-medium"
                >
                  Login
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isModalOpen && <RegistrationModal isOpen={isModalOpen} onClose={handleModalClose} handleLoginOpen={handleLoginOpen} />}
      {isLoginClicked && <LoginModal isOpen={isLoginClicked} onClose={handleLoginClose} handleModalOpen={handleModalOpen} />}
    </header>
  );
};
