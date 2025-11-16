// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({
  client,
});

export async function sanityFetchNoStore<T>({
  query,
  params = {},
  tags = [],
  revalidate = 0,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number;
}) {
  return client.fetch<T>(query, params, {
    cache: "no-store",
    next: { tags, revalidate },
  });
}