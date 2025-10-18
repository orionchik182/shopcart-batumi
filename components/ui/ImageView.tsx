"use client";
import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  images?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
  isStock?: number;
}

const ImageView = ({ images = [], isStock }: Props) => {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="w-full space-y-2 md:w-1/2 md:space-y-4">
      <div className="border-shop_darkColor/10 group relative aspect-square w-full overflow-hidden rounded-md border">
        <AnimatePresence mode="wait">
          <motion.div
            key={active?._key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={urlFor(active).url()}
              alt="productImage"
              fill
              priority
              className={`object-contain transition-transform group-hover:scale-110 ${isStock === 0 ? "opacity-50" : ""}`}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {images?.map((image) => (
          <button
            key={image?._key}
            onClick={() => setActive(image)}
            className={`relative aspect-square rounded-md overflow-hidden border ${
              active._key === image._key ? "border-shop_darkColor opacity-100" : "opacity-80"
            }`}
          >
            <Image
              src={urlFor(image).url()}
              alt={`Thumbnail ${image._key}`}
              fill
              className="object-contain"
              sizes="100px"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
