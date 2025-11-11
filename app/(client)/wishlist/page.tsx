import NoAccess from "@/components/ui/NoAccess";
import WishListProducts from "@/components/ui/WishListProducts";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const WishListPage = async () => {
  const user = await currentUser();
  return (
    <>
      {user ? (
        <WishListProducts/>
      ) : (
        <NoAccess details="Log in to view your wishlist items. Don&rsquo;t miss out on your cart products to make the payment!" />
      )}
    </>
  );
};

export default WishListPage;
