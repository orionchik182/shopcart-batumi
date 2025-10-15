"use client";
import { Category, Product } from "@/sanity.types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { client } from "@/sanity/lib/client";

import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "./ProductCard";

interface Props {
  categories: Category[];
  slug: string;
}

const CategoryProducts = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === currentSlug) return;
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false });
  };

  const fetchProducts = async (categorySlug: string) => {
    setLoading(true);
    try {
      const query = `
            *[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc){
            ...,"categories": categories[]->title}
        `;
      const data = await client.fetch(query, { categorySlug });
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentSlug);
  }, [router]);
  return (
    <div className="flex flex-col items-start gap-5 py-5 md:flex-row">
      <div className="flex flex-col border md:min-w-40">
        {categories?.map((item) => (
          <Button
            onClick={() => handleCategoryChange(item?.slug?.current as string)}
            key={item?._id}
            className={`text-shop_darkColor hover:bg-shop_orange hoverEffect rounded-none border-0 border-b bg-transparent p-0 font-semibold capitalize shadow-none transition-colors last:border-b-0 hover:text-white ${item?.slug?.current === currentSlug && "bg-shop_orange border-shop_orange text-white"}`}
          >
            <p className="w-full px-2 text-left">{item?.title}</p>
          </Button>
        ))}
      </div>
      <div className="flex-1">
        {loading ? (
          <div className="flex min-h-80 w-full flex-col items-center justify-center space-y-4 rounded-lg bg-gray-100 py-10 text-center">
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Product is loading...</span>
            </div>
          </div>
        ) : products?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {products?.map((product:Product) => (
              <AnimatePresence key={product?._id}>
                <motion.div>
                  <ProductCard product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        ) : (
          <NoProductAvailable
            selectedTab={currentSlug}
            className="mt-0 w-full"
          />
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
