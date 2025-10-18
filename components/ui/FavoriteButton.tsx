import { Product } from "@/sanity.types";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

const FavoriteButton = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
}) => {
  console.log(product)
  return (
    <>
      {!showProduct ? (
        <Link href={"/wishlist"} className="group relative">
          <Heart className="hover:text-shop_light_green hoverEffect h-5 w-5" />
          <span className="bg-shop_dark_green absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full text-xs font-semibold text-white">
            0
          </span>
        </Link>
      ) : (
        <button className="group relative hover:text-shop_light_green hoverEffect border border-shop_light_green/80 hover:border-shop_light_green p-1.5 rounded-sm">
          <Heart className="text-shop_light_green/80 group-hover:text-shop_light_green hoverEffect mt-0.5 w-5 h-5"/>
        </button>
      )}
    </>
  );
};

export default FavoriteButton;
