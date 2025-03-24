"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RegistrationRedirect: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page where the registration modal can be opened
    router.push("/");
  }, [router]);

  return null;
};

export default RegistrationRedirect;
