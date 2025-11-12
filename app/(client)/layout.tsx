

import type { Metadata } from "next";

import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ClerkProvider } from "@clerk/nextjs";


export const metadata: Metadata = {
  title: {
    template: "%s - Shopcart-Batumi online store",
    default: "Shopcart-Batumi online store",
  },
  description: "Shopcart-Batumi online store for all your needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <>{children}</>
  );
}
