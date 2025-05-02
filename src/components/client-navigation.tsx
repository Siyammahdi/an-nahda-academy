"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Shared/navbar";

export function ClientNavigation() {
  const location = usePathname();
  const noHeaderFooter = location.includes('/dashboard') || location.includes('/coming-soon') || location.includes('/admin');
  return noHeaderFooter ? null : <Navbar />;
} 