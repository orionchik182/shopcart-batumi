"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { emptyCart } from "@/images";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4 py-10 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="relative mx-auto h-48 w-48"
        >
          <Image
            src={emptyCart}
            alt="Empty shopping cart"
            layout="fill"
            objectFit="contain"
            className="drop-shadow-lg"
          />
          <motion.div
            animate={{ x: [0, -10, 10, 0], y: [0, -5, 5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute -top-4 -right-4 rounded-full bg-blue-500 p-2"
          >
            <ShoppingCart size={24} className="text-white" />
          </motion.div>
        </motion.div>

        <div className="space-y-4 text-center">
          <h2 className="tet-3xl font-bold text-gray-800">
            Your cart is feeling lonely
          </h2>
          <p className="text-gray-600">
            It looks like you haven&apos;t added anything to your cart yet.
            Let&apos;s change that and find some amazing products for you!
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="bg-shop_darkColor/5 border-shop_darkColor/20 hover:border-shop_darkColor hover:bg-shop_darkColor hoverEffect block rounded-full border py-2.5 text-center text-sm font-semibold tracking-wide hover:text-white"
          >
            Discover Products
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default EmptyCart;
