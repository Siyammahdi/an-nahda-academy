"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from './CartContext';

// Define favorite context type
interface FavoritesContextType {
  favoriteItems: CartItem[];
  addToFavorites: (item: CartItem) => void;
  removeFromFavorites: (id: string) => void;
  clearFavorites: () => void;
  isFavorite: (id: string) => boolean;
  getFavoritesCount: () => number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with empty array to prevent hydration mismatch
  const [favoriteItems, setFavoriteItems] = useState<CartItem[]>([]);
  // Track if component has mounted
  const [hasMounted, setHasMounted] = useState(false);

  // Set hasMounted to true after first render
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Load favorites from localStorage only after component has mounted
  useEffect(() => {
    if (hasMounted && typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        setFavoriteItems(JSON.parse(savedFavorites));
      }
    }
  }, [hasMounted]);

  // Save favorites to localStorage whenever it changes, but only on client side
  useEffect(() => {
    if (hasMounted && typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(favoriteItems));
    }
  }, [favoriteItems, hasMounted]);

  // Add item to favorites
  const addToFavorites = (item: CartItem) => {
    // Check if item already exists in favorites
    if (!isFavorite(item.id)) {
      setFavoriteItems([...favoriteItems, item]);
    }
  };

  // Remove item from favorites
  const removeFromFavorites = (id: string) => {
    setFavoriteItems(favoriteItems.filter(item => item.id !== id));
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavoriteItems([]);
  };

  // Check if item is in favorites
  const isFavorite = (id: string) => {
    return favoriteItems.some(item => item.id === id);
  };

  // Get favorites count
  const getFavoritesCount = () => {
    // Return 0 during server-side rendering to prevent hydration mismatch
    if (!hasMounted) return 0;
    return favoriteItems.length;
  };

  const value = {
    favoriteItems,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    isFavorite,
    getFavoritesCount
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}; 