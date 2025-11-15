import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import HeaderMenu from "@/components//ui/HeaderMenu";
import SearchBar from "../ui/SearchBar";
import FavoriteButton from "../ui/FavoriteButton";
import CartIcon from "../ui/CartIcon";

import MobileMenu from "../ui/MobileMenu";
import { auth } from "@clerk/nextjs/server";

import { getMyOrders } from "@/sanity/queries";
import HeaderAuth from "@/components/auth/HeaderAuth";

export default async function Header() {
  let userId: string | null = null;

  try {
    const a = await auth();
    userId = a?.userId ?? null;
  } catch (_) {
    userId = null;
  }
  const orders = userId ? await getMyOrders(userId) : [];
  const ordersCount = Array.isArray(orders) ? orders.length : 0;

  return (
    <header className="sticky top-0 z-50 bg-white/70 py-5 backdrop-blur-md">
      <Container className="text-shop_lightColor flex items-center justify-between">
        <div className="flex w-auto items-center justify-start gap-2.5 md:w-1/3 md:gap-0">
          <MobileMenu />
          <Logo />
        </div>

        <HeaderMenu />

        <div className="flex w-auto items-center justify-end gap-5 md:w-1/3">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />
          <HeaderAuth ordersCount={ordersCount} />
        </div>
      </Container>
    </header>
  );
}
