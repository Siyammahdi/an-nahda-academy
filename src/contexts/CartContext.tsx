"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define cart item types
export interface CartItem {
  id: string;
  type: 'course' | 'resource';
  title: string;
  description: string;
  instructor?: string;
  author?: string;
  price: number;
  discountedPrice?: number | null;
  image: string;
  duration?: string;
  format?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  getCartCount: () => number;
  calculateSubtotal: () => number;
  calculateTotal: () => number;
  applyPromoCode: (code: string) => boolean;
  promoApplied: boolean;
  discount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with empty array to prevent hydration mismatch
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  // Track if component has mounted
  const [hasMounted, setHasMounted] = useState(false);

  // Set hasMounted to true after first render
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Load cart from localStorage only after component has mounted
  useEffect(() => {
    if (hasMounted && typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      
      const savedPromo = localStorage.getItem('promoApplied');
      if (savedPromo) {
        setPromoApplied(JSON.parse(savedPromo));
      }
      
      const savedDiscount = localStorage.getItem('discount');
      if (savedDiscount) {
        setDiscount(JSON.parse(savedDiscount));
      }
    }
  }, [hasMounted]);

  // Save cart to localStorage whenever it changes, but only on client side
  useEffect(() => {
    if (hasMounted && typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      localStorage.setItem('promoApplied', JSON.stringify(promoApplied));
      localStorage.setItem('discount', JSON.stringify(discount));
    }
  }, [cartItems, promoApplied, discount, hasMounted]);

  // Add item to cart
  const addToCart = (item: CartItem) => {
    // Check if item already exists in cart
    if (!isInCart(item.id)) {
      setCartItems([...cartItems, item]);
    }
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    setPromoApplied(false);
    setDiscount(0);
  };

  // Check if item is in cart
  const isInCart = (id: string) => {
    return cartItems.some(item => item.id === id);
  };

  // Get cart item count
  const getCartCount = () => {
    // Return 0 during server-side rendering to prevent hydration mismatch
    if (!hasMounted) return 0;
    return cartItems.length;
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.discountedPrice || item.price);
    }, 0);
  };

  // Apply promo code
  const applyPromoCode = (code: string) => {
    // For demo purposes, we'll accept "STUDENT10" as a valid promo code for 10% off
    if (code.toLowerCase() === "student10") {
      const subtotal = calculateSubtotal();
      setDiscount(subtotal * 0.1); // 10% discount
      setPromoApplied(true);
      return true;
    }
    return false;
  };

  // Calculate total with discount (no tax)
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal - discount;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    getCartCount,
    calculateSubtotal,
    calculateTotal,
    applyPromoCode,
    promoApplied,
    discount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}; 