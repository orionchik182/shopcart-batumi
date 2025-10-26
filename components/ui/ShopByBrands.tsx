import React from "react";
import { Title } from "./text";
import Link from "next/link";
import { getAllBrands } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";

const extraData = [
  {
    title: "Free Delivery",
    description: "Free shipping over $100",
    icon: <Truck size={45} />,
  },
  {
    title: "Free Return",
    description: "Free shipping over 100$",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "Customer Support",
    description: "Friendly 24/7 customer support",
    icon: <Headset size={45} />,
  },
  {
    title: "Money Back guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={45} />,
  },
];

const ShopByBrands = async () => {
  const brands = await getAllBrands();
  return (
    <div className="bg-shop_light_bg mb-10 rounded-md p-5 lg:mb-20 lg:p-7">
      <div className="mb-10 flex items-center justify-between gap-5">
        <Title>Shop By Brands</Title>
        <Link
          href={"/shop"}
          className="hover:text-shop_btn_dark_green hoverEffect text-sm font-semibold tracking-wide"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 lg:grid-cols-8">
        {brands?.map((brand) => (
          <Link
            href={{pathname: "/shop", query: {brand: brand?.slug?.current}}}
            className="shadow-shop_dark_green/20 hoverEffect flex h-24 w-34 items-center justify-center overflow-hidden rounded-md bg-white hover:shadow-lg"
            key={brand?._id}
          >
            {brand?.image && (
              <Image
                src={urlFor(brand?.image).url()}
                alt="brandImage"
                width={250}
                height={250}
                className="h-20 w-32 object-contain"
              />
            )}
          </Link>
        ))}
      </div>
      <div className="hover:shadow-shop_light_green/20 mt-16 grid grid-cols-1 gap-2.5 p-2 py-5 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        {extraData?.map((item, index) => (
          <div
            key={index}
            className="group text-shop_lightColor hover:text-shop_light_green flex items-center gap-3"
          >
            <span className="hoverEffect inline-flex scale-100 group-hover:scale-90">
              {item?.icon}
            </span>
            <div className="text-sm">
              <p className="text-shop_darkColor/80 font-bold capitalize">
                {item?.title}
              </p>
              <p className="text-shop_lightColor">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrands;
