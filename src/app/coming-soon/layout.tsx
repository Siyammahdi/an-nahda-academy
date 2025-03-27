"use client";

import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // We're using a minimal layout without the global navbar or footer
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* Render only the page content */}
      {children}
      
      {/* Keep the toast for notification functionality */}
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  );
} 