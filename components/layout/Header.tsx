import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import HeaderMenu from "@/components//ui/HeaderMenu";
import SearchBar from "../ui/SearchBar";
import FavoriteButton from "../ui/FavoriteButton";
import CartIcon from "../ui/CartIcon";
import SignIn from "../ui/SignIn";
import MobileMenu from "../ui/MobileMenu";

export default function Header() {
  return (
    <header className="bg-white py-5 border-b border-b-black/20">
      <Container className="flex items-center justify-between text-shop_lightColor">
        <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
          <MobileMenu/>
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex justify-end items-center gap-5">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />
          <SignIn />
        </div>
      </Container>
    </header>
  );
}
