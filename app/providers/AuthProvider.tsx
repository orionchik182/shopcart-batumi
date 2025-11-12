"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname(); // форс-перемонтирование после возврата со Stripe
  return (
    <ClerkProvider
      key={pathname}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      {children}
    </ClerkProvider>
  );
}