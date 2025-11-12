import { ClerkLoaded, SignInButton } from "@clerk/nextjs";
import React from "react";

const SignIn = () => {
  return (
    <ClerkLoaded>
      <SignInButton mode="modal">
        <button className="hover:text-shop_darkColor hoverEffect text-shop_lightColor text-sm font-semibold hover:cursor-pointer">
          Login
        </button>
      </SignInButton>
    </ClerkLoaded>
  );
};

export default SignIn;
