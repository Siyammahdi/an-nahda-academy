"use client";

import React from "react";
import { Toaster } from "sonner";

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // We're using a minimal layout without the global navbar or footer
    <div
    >
      {/* Render only the page content */}
      {children}
      
      {/* Keep the toast for notification functionality */}
      <Toaster position="top-right" richColors />
    </div>
  );
} 