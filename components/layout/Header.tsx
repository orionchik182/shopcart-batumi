import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import HeaderMenu from "@/components//ui/HeaderMenu";

export default function Header() {
  return (
    <header className="bg-white py-5 border-b border-b-black/20">
      <Container className="flex items-center justify-between">
        <Logo />
        <HeaderMenu />
        <div>Others</div>
      </Container>
    </header>
  );
}
