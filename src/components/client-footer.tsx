"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Shared/footer";

export function ClientFooter() {
  const location = usePathname();
  const noHeaderFooter = location.includes('/dashboard');
  return noHeaderFooter ? null : <Footer />;
} 