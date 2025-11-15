import type { Metadata } from "next";

import "../globals.css";

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
  return <>{children}</>;
}
