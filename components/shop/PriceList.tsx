import React from "react";
import { Title } from "../ui/text";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const priceArray = [
  { title: "Under $100", value: "0-100" },
  { title: "$100 - $200", value: "100-200" },
  { title: "$200 - $300", value: "200-300" },
  { title: "$300 - $500", value: "300-500" },
  { title: "Over $500", value: "500-1000" },
];

interface Props {
  selectedPrice?: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base font-black">Price</Title>
      <RadioGroup value={selectedPrice || ""} className="mt-2 space-y-1">
        {priceArray?.map((price, i) => (
          <div
            key={i}
            className="flex items-center space-x-2 hover:cursor-pointer"
            onClick={() => {
              setSelectedPrice(price?.value);
            }}
          >
            <RadioGroupItem
              value={price?.value}
              id={price?.value}
              className="rounded-sm"
            />
            <Label
              htmlFor={price?.value}
              className={`${selectedPrice === price?.value ? "text-shop_dark_green font-semibold" : "font-normal"} hover:cursor-pointer`}
            >
              {price?.title}
            </Label>
          </div>
        ))}
        {selectedPrice && (
          <button
            onClick={() => {
              setSelectedPrice(null);
            }}
            className="hover:text-shop_dark_green hoverEffect mt-2 text-left text-sm font-medium underline decoration-[1px] underline-offset-2"
          >
            Reset selection
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default PriceList;
