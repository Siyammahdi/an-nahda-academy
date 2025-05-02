"use client";

import * as React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { Toaster } from "sonner";
import LoadingProvider from "@/components/loading-provider";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <LoadingProvider>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <Toaster position="top-right" richColors />
            {children}
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}
