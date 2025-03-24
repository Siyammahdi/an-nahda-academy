"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginRedirect: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page where the login modal can be opened
    router.push("/");
  }, [router]);

  return null;
};

export default LoginRedirect; 