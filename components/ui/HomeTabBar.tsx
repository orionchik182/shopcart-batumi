import { productData } from "@/constants/data";
import Link from "next/link";
import React from "react";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabBar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-5">
      <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
        {productData?.map((item) => (
          <button
            onClick={() => onTabSelect(item?.title)}
            key={item.title}
            className={`border-shop_light_green/30 hover:bg-shop_light_green hover:border-shop_light_green hoverEffect rounded-full border px-4 py-1.5 hover:text-white md:px-6 md:py-2 ${selectedTab === item?.title ? "bg-shop_light_green border-shop_light_green text-white" : "bg-shop_light_green/20"}`}
          >
            {item?.title}
          </button>
        ))}
        <Link
        href={"/shop"}
        className="border-shop_light_green/30 hover:bg-shop_light_green hover:border-shop_light_green hoverEffect rounded-full border px-4 py-1.5 hover:text-white md:px-6 md:py-2"
      >
        See all
      </Link>
      </div>
      
    </div>
  );
};

export default HomeTabBar;
