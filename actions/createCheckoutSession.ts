"use server";

import stripe from "@/lib/stripe";
import { Address } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import { headers } from "next/headers";
import Stripe from "stripe";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId?: string;
  address?: Address | null;
}

export interface GroupedCartItems {
  product: CartItem["product"];
  quantity: number;
}

async function getBaseUrl(): Promise<string> {
  const h = await headers();
  const origin = h.get("origin");
  if (origin && /^https?:\/\//.test(origin)) return origin;

  const proto = h.get("x-forwarded-proto");
  const host = h.get("x-forwarded-host") || h.get("host");
  if (proto && host) return `${proto}://${host}`;

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;

  return "http://localhost:3000";
}

export async function createCheckoutSession(
  items: GroupedCartItems[],
  metadata: Metadata,
) {
  try {
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });
    const customerId = customers?.data?.length > 0 ? customers.data[0].id : "";

    const baseUrl = await getBaseUrl();

    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId ?? "",
        address: JSON.stringify(metadata.address ?? null),
      },
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      invoice_creation: {
        enabled: true,
      },
      success_url: `${
        baseUrl
      }/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${baseUrl}/cart`,
      line_items: items?.map((item) => ({
        price_data: {
          currency: "USD",
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item?.product?.name || "Unknown Product",
            description: item?.product?.description,
            metadata: { id: item?.product?._id },
            images:
              item?.product?.images && item?.product?.images?.length > 0
                ? [urlFor(item?.product?.images[0]).url()]
                : undefined,
          },
        },
        quantity: item?.quantity,
      })),
    };
    if (customerId) {
      sessionPayload.customer = customerId;
    } else {
      sessionPayload.customer_email = metadata.customerEmail;
    }
    const session = await stripe.checkout.sessions.create(sessionPayload);
    return session.url;
  } catch (error) {
    console.error("Error creating Checkout Session:", error);
    throw error;
  }
}
