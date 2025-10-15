import { categoriesData, quickLinksData } from "@/constants/data";
import Container from "../ui/Container";
import FooterTop from "../ui/FooterTop";
import Logo from "../ui/Logo";
import SocialMedia from "../ui/SocialMedia";
import { SubText, SubTitle } from "../ui/text";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <SubText>
              Discover curated furniture collections at Shopcart, blending style
              and comfort to elevate your living spaces.
            </SubText>
            <SocialMedia
              className="text-shop_darkColor/60"
              tooltipClassName="bg-shop_darkColor text-white"
            />
          </div>
          <div>
            <SubTitle>Quick Links</SubTitle>
            <ul className="space-y-3 mt-4">
              {quickLinksData?.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="hover:text-shop_light_green hoverEffect font-medium"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SubTitle>Categories</SubTitle>
            <ul className="space-y-3 mt-4">
              {categoriesData?.map((item) => (
                <li key={item.title}>
                  <Link
                    href={`/category/${item.href}`}
                    className="hover:text-shop_light_green hoverEffect font-medium"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <SubTitle>Newsletter</SubTitle>
            <SubText>Subscribe to our newsletter to receive updates and exclusive offers</SubText>
            <form action="" className="space-y-3">
              <Input placeholder="Enter your email" type="email" required/>
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="py-6 border-t text-center text-sm text-gray-600">
          <div>
            © {new Date().getFullYear()}{" "}
            <Logo className="text-sm"/>
            . All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}
