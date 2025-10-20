"use client";
import { BRANDS_QUERYResult, Category, Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { Title } from "./text";
import CategoryList from "../shop/CategoryList";
import BrandList from "../shop/BrandList";
import PriceList from "../shop/PriceList";
import { useSearchParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";

interface Props {
  categories: Category[];
  brands: BRANDS_QUERYResult;
}

const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null,
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let minPrice = 0;
        let maxPrice = 10000;
        if (selectedPrice) {
          const [min, max] = selectedPrice.split("-").map(Number);
          minPrice = min;
          maxPrice = max;
        }
        const query = `
            *[_type == 'product' && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id)) && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id)) && price >= $minPrice && price <= $maxPrice] | order(name asc) {
            ...,"categories": categories[]->title}
        `;
        const data = await client.fetch(
          query,
          { selectedCategory, selectedBrand, minPrice, maxPrice },
          { next: { revalidate: 0 } },
        );
        setProducts(data);
      } catch (error) {
        console.error("Shop product fetching Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedBrand, selectedCategory, selectedPrice]);

  return (
    <div className="border-t">
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-lg tracking-wide uppercase">
              Get the products as your needs
            </Title>
            {(selectedCategory !== null ||
              selectedBrand !== null ||
              selectedPrice !== null) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setSelectedPrice(null);
                }}
                className="text-shop_dark_green hover:text-shop_orange hoverEffect mt-2 text-sm font-medium underline"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
        <div className="border-t-shop_dark_green/50 flex flex-col gap-5 border-t sm:flex-row">
          <div className="border-r-shop_dark_green/50 flex sm:flex-col scrollbar-hide pb-5 md:sticky md:top-20 md:h-[calc(100vh-160px)] md:min-w-64 md:self-start md:overflow-y-auto md:border-r">
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <BrandList
              brands={brands}
              setSelectedBrand={setSelectedBrand}
              selectedBrand={selectedBrand}
            />
            <PriceList
              setSelectedPrice={setSelectedPrice}
              selectedPrice={selectedPrice}
            />
          </div>
          <div className="flex-1 pt-5">
            <div className="scrollbar-hide h-[calc(100vh-160px)] overflow-auto pr-2">
              {loading ? (
                <div className="flex flex-col items-center justify-center gap-2 bg-white p-20">
                  <Loader2 className="text-shop_dark_green h-10 w-10 animate-spin" />
                  <p className="text-base font-semibold tracking-wide">
                    Product is loading . . .
                  </p>
                </div>
              ) : products?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {products?.map((product) => (
                    <ProductCard key={product?._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProductAvailable className="mt-0 bg-white" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
