"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Shared/footer";

export function ClientFooter() {
  const location = usePathname();
  const noHeaderFooter = location.includes('/dashboard') || location.includes('/coming-soon') || location.includes('/admin');
  return noHeaderFooter ? null : <Footer />;
} 