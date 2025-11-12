"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { ReactNode } from "react";

function Inner({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const sp = useSearchParams();
  const key = pathname + "?" + sp.toString(); // ← учитываем query, которые меняются после Stripe

  return (
    <ClerkProvider
      key={key}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      {children}
    </ClerkProvider>
  );
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <Inner>{children}</Inner>
    </Suspense>
  );
}