// components/SingleProductDescription.tsx
import React from "react";
import Container from "./Container";
import { Product } from "@/sanity.types";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import "@/app/product-tabs.css"; // <— ВАЖНО: подключаем стили
import { StarIcon } from "lucide-react";

const SingleProductDescription = ({ product }: { product: Product }) => {
  
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Description",
      children: (
        <div className="prose mt-1 max-w-none text-sm leading-7 md:text-base">
          {product?.description ?? "No description provided."}
        </div>
      ),
    },
    {
      key: "2",
      label: "Additional Information",
      children: (
        <div className="prose max-w-none text-sm leading-7 md:text-base">
          <div className="mt-1 mb-4 flex items-center justify-around border-b pb-2">
            <p>Weight:</p>
            <p className="text-sm text-gray-500">180 kg</p>
          </div>
          <div className="flex items-center justify-around">
            <p>Dimensions:</p>
            <p className="text-sm text-gray-500">3 x 72 x 109 cm</p>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: "Reviews",
      children: (
        <div className="prose max-w-none">
          <div className="flex items-center gap-0.5 text-xs">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                size={12}
                className="text-shop_light_green"
                fill={"#3b9c3c"}
              />
            ))}
            <p className="ml-1 font-semibold">{`Duc Pham`}</p>
            <p>- July 21, 2025</p>
          </div>
          <p className="mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
            suscipit quam optio, iure accusantium ipsam nulla facilis tempore
            recusandae, qui eos error provident magni fuga cum ipsa ipsum
            distinctio! Maxime?
          </p>
        </div>
      ),
    },
  ];

  return (
    <Container>
      <div className="product-tabs-wrapper w-full md:w-2/3 lg:w-1/2 hidden sm:inline-block mb-4">
        <Tabs
          items={items}
          defaultActiveKey="1"
          type="line"
          
          tabBarGutter={24}
          animated
          className="product-tabs"
        />
      </div>
      
    </Container>
  );
};

export default SingleProductDescription;
