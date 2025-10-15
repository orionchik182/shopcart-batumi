import Container from "@/components/ui/Container";
import HomeBanner from "@/components/ui/HomeBanner";
import HomeCategories from "@/components/ui/HomeCategories";
import LatestBlog from "@/components/ui/LatestBlog";
import ProductGrid from "@/components/ui/ProductGrid";
import ShopByBrands from "@/components/ui/ShopByBrands";
import { getCategories } from "@/sanity/queries";

export default async function Home() {
  const categories = await getCategories(6);

  return (
    <Container className="bg-shop-light-pink">
      <HomeBanner />
      <div className="py-5">
        <ProductGrid />
      </div>
      <HomeCategories categories={categories} />
      <ShopByBrands />
      <LatestBlog />
    </Container>
  );
}
