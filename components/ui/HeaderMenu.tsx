import { headerData } from "@/constants/data";
import Link from "next/link";
import React from "react";

export default function HeaderMenu() {
  return (
    <div className="hidden md:inline-flex w-1/3 items-center gap-7 text-sm capitalize font-semibold text-shop_lightColor">
      {headerData?.map((item) => (
        <Link key={item?.title} href={item?.href}>
          {item?.title}
        </Link>
      ))}
    </div>
  );
}
