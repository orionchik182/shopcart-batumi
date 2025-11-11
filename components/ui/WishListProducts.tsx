"use client";
import useStore from "@/store";
import React, { useState } from "react";
import Container from "./Container";
import { Heart, X } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";
import { Product } from "@/sanity.types";
import toast from "react-hot-toast";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";
import AddToCartButton from "./AddToCartButton";

const WishListProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(5);
  const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore();
  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 5, favoriteProduct.length));
  };

  const handleResetWishlist = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your wishlist?",
    );
    if (confirmReset) {
      resetFavorite();
      toast.success("Wishlist reset successfully");
    }
  };
  return (
    <Container>
      {favoriteProduct?.length > 0 ? (
        <>
          <div className="overflow-auto">
            <table className="w-full border-collapse">
              <thead className="border-b">
                <tr className="bg-black/5">
                  <th className="p-2 text-left">Image</th>
                  <th className="hidden p-2 text-left md:table-cell">
                    Category
                  </th>
                  <th className="hidden p-2 text-left md:table-cell">Type</th>
                  <th className="hidden p-2 text-left md:table-cell">Status</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-center md:text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {favoriteProduct
                  ?.slice(0, visibleProducts)
                  ?.map((product: Product) => (
                    <tr key={product?._id} className="border-b">
                      <td className="flex items-center gap-2 px-2 py-4">
                        <X
                          onClick={() => {
                            removeFromFavorite(product?._id);
                            toast.success("Product removed from wishlist!");
                          }}
                          size={18}
                          className="hoverEffect hover:cursor-pointer hover:text-red-600"
                        />
                        {product?.images && (
                          <Link
                            href={`/product/${product?.slug?.current}`}
                            className="group rounded-md border"
                          >
                            <Image
                              src={urlFor(product?.images[0]).url()}
                              alt="product image"
                              width={80}
                              height={80}
                              className="hoverEffect h-20 w-20 rounded-md object-contain group-hover:scale-105"
                            />
                          </Link>
                        )}
                        <p className="line-clamp-1">{product?.name}</p>
                      </td>
                      <td className="hidden p-2 capitalize md:table-cell">
                        {product?.categories && (
                          <p className="line-clamp-1 text-xs font-medium uppercase">
                            {product?.categories.map((cat) => cat).join(", ")}
                          </p>
                        )}
                      </td>
                      <td className="hidden p-2 capitalize md:table-cell">
                        {product?.variant}
                      </td>
                      <td
                        className={`w-24 p-2 ${(product?.stock as number) > 0 ? "text-green-600" : "text-red-600"} hidden text-sm font-medium md:table-cell`}
                      >
                        {(product?.stock as number) > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </td>
                      <td className="p-2">
                        <PriceFormatter amount={product?.price} />
                      </td>
                      <td className="p-2">
                        <AddToCartButton product={product} className="w-full" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {visibleProducts < favoriteProduct?.length && (
            <div className="my-5 text-center">
              <Button variant="outline" onClick={loadMore}>
                Load More
              </Button>
            </div>
          )}
          {favoriteProduct?.length > 0 && (
            <Button
              className="mb-5 font-semibold"
              variant={"destructive"}
              size={"lg"}
              onClick={handleResetWishlist}
            >
              Reset Wishlist
            </Button>
          )}
        </>
      ) : (
        <div className="relative flex min-h-[400px] flex-col items-center justify-center space-y-6 px-4 text-center">
          <div className="bg-muted-foreground/20 absolute top-22 right-1/2 h-4 w-4 animate-bounce rounded-full">
            <Heart
              className="text-muted-foreground h-10 w-10"
              strokeWidth={1.5}
            />
          </div>
          <div className="mb-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground text-sm">
                Items added to your wishlist will appear here
              </p>
            </div>
            <Button asChild className="mt-4">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default WishListProducts;
