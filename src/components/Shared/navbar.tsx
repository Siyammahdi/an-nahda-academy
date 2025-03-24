"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GrFavorite } from "react-icons/gr";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import RegistrationModal from "../registrationModal";
import LoginModal from "../loginModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full transition-colors duration-300 h-24",
      isScrolled ? "bg-background/50 backdrop-blur-md" : "bg-transparent"
    )}>
      <div className="container flex items-center h-full justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
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
          <Link href="/" className="text-foreground">
            <FaCartShopping size={20} />
          </Link>
          <Link href="/favourites" className="text-foreground">
            <GrFavorite size={20} />
          </Link>
          <ThemeSwitch />
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

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
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
          <ThemeSwitch />
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-24 bg-background z-50 p-6 overflow-auto">
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold">Menu</h2>
            <nav>
              <ul className="flex flex-col space-y-3">
                {siteConfig.navItems.map((item) => (
                  <li key={item.href}>
                    {item.label === "Login" ? (
                      isAuthenticated ? (
                        <Link 
                          href="/dashboard" 
                          className="block py-2 text-lg"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                      ) : (
                        <Link 
                          href={item.href} 
                          className="block py-2 text-lg"
                          onClick={() => {
                            handleLoginOpen();
                            setMobileMenuOpen(false);
                          }}
                        >
                          {item.label}
                        </Link>
                      )
                    ) : (
                      <Link 
                        href={item.href} 
                        className="block py-2 text-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            {isAuthenticated ? (
              <Button 
                onClick={() => {
                  setMobileMenuOpen(false);
                }} 
                className="mt-4 rounded-full bg-primary"
                asChild
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <Button 
                onClick={() => {
                  handleLoginOpen();
                  setMobileMenuOpen(false);
                }} 
                className="mt-4 rounded-full bg-primary"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}

      {isModalOpen && <RegistrationModal isOpen={isModalOpen} onClose={handleModalClose} handleLoginOpen={handleLoginOpen} />}
      {isLoginClicked && <LoginModal isOpen={isLoginClicked} onClose={handleLoginClose} handleModalOpen={handleModalOpen} />}
    </header>
  );
};
