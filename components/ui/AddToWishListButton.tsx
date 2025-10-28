"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddToWishListButton = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const availableProduct = favoriteProduct?.find(
      (item) => item?._id === product?._id,
    );
    setExistingProduct(availableProduct || null);
  }, [product, favoriteProduct]);

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? "Product removed successfully!"
            : "Product added successfully!",
        );
      });
    }
  };

  return (
    <div className={cn("absolute top-2 right-2 hover:cursor-pointer", className)}>
      <button onClick={handleFavorite} className={`hover:bg-shop_dark_green hoverEffect rounded-full p-2.5 hover:text-white ${existingProduct ? "bg-shop_dark_green/80 text-white" : "bg-shop_lightColor/10"}`}>
        <Heart size={15} />
      </button>
    </div>
  );
};

export default AddToWishListButton;
