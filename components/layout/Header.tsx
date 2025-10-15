import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import HeaderMenu from "@/components//ui/HeaderMenu";
import SearchBar from "../ui/SearchBar";
import FavoriteButton from "../ui/FavoriteButton";
import CartIcon from "../ui/CartIcon";
import SignIn from "../ui/SignIn";
import MobileMenu from "../ui/MobileMenu";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, SignedIn, UserButton } from "@clerk/nextjs";

export default async function Header() {
  const user = await currentUser();
  return (
    <header className="bg-white/70 py-5 sticky top-0 z-50 backdrop-blur-md">
      <Container className="flex items-center justify-between text-shop_lightColor">
        <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex justify-end items-center gap-5">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />
          <ClerkLoaded>
            <SignedIn>
              <UserButton/>
            </SignedIn>
            {!user && <SignIn />}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
}
