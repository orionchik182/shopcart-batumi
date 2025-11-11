"use client";
import { Product } from "@/sanity.types";
import React from "react";
import { Button } from "./button";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import useStore from "@/store";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";

interface Props {
  product: Product | null;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, getItemCount } = useStore();

  const itemCount = getItemCount(product?._id as string);

  const isOutOfStock = product?.stock === 0;

  const handleAddToCart = () => {
    if (product) {
      if ((product?.stock as number) > itemCount) {
        addItem(product);
        toast.success(
          `${product?.name?.substring(0, 12)}... added successfully`,
        );
      } else {
        toast.error("Can not add more than available stock");
      }
    }
  };

  return (
    <div className="flex h-12 w-full items-center">
      {itemCount ? (
        <div className="w-full text-sm">
          <div className="flex items-center justify-between">
            <span className="text-shop_darkColor/80 text-xs">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          className={cn(
            "bg-shop_dark_green/80 text-shop_light_bg border-shop_dark_green/80 hover:bg-shop_dark_green hover:border-shop_dark_green hoverEffect w-full border font-semibold tracking-wide shadow-none hover:text-white",
            className,
          )}
          disabled={isOutOfStock}
        >
          <ShoppingBag /> {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
