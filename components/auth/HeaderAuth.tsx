"use client";

import Link from "next/link";
import { Logs } from "lucide-react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export default function HeaderAuth({ ordersCount = 0 }: { ordersCount?: number }) {
  return (
    <>
      <ClerkLoaded>
        <SignedIn>
          <Link
            href="/orders"
            className="group hover:text-shop_light_green hoverEffect relative"
          >
            <Logs />
            <span className="bg-shop_dark_green absolute top-0 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-xs font-semibold text-white">
              {ordersCount}
            </span>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <SignInButton
            mode="modal"
            forceRedirectUrl="/"
            fallbackRedirectUrl="/"
            signUpForceRedirectUrl="/"
            signUpFallbackRedirectUrl="/"
          >
            <button className="hover:text-shop_light_green">Login</button>
          </SignInButton>
        </SignedOut>
      </ClerkLoaded>

      <ClerkLoading>
        <button className="opacity-70" disabled>Loading…</button>
      </ClerkLoading>
    </>
  );
}