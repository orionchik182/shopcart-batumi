"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { Search, Loader2 } from "lucide-react";

type Hit = { name: string | null; slug: string | null };

const SEARCH_PRODUCTS = `*[
  _type == "product" &&
  defined(slug.current) &&
  name match $q
]| order(lower(name) asc)[0...7]{
  name,
  "slug": slug.current
}`;

export default function SearchBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // открыть инпут и сфокусироваться
  const toggleOpen = () => {
    setOpen((v) => !v);
  };
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // дебаунс-поиск
  useEffect(() => {
    if (!open) return;
    const term = q.trim();
    if (term.length === 0) {
      setHits([]);
      return;
    }
    const t = setTimeout(async () => {
      try {
        setLoading(true);
        const data: Hit[] = await client.fetch(SEARCH_PRODUCTS, { q: `${term}*` });
        setHits(data ?? []);
      } catch (e) {
        console.error("search error:", e);
        setHits([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [q, open]);

  // переход
  const go = (slug?: string | null) => {
    if (!slug) return;    
    router.push(`/product/${slug}`);
    setOpen(false);
    setQ("");
    setHits([]);
  };

  // Enter: к первому совпадению
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && hits[0]?.slug) {
      go(hits[0].slug);
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        aria-label="Search"
        onClick={toggleOpen}
        className="rounded p-1 hover:text-shop_light_green"
      >
        <Search className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl border border-gray-200 bg-white p-2 shadow-xl z-50">
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search products…"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-black"
          />

          {/* результаты */}
          <div className="mt-2 max-h-64 overflow-auto">
            {loading && (
              <div className="flex items-center gap-2 px-2 py-3 text-sm text-gray-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching…
              </div>
            )}

            {!loading && q && hits.length === 0 && (
              <div className="px-2 py-3 text-sm text-gray-500">No results</div>
            )}

            {!loading &&
              hits.map((h) => (
                <button
                  key={h.slug ?? Math.random()}
                  onClick={() => go(h.slug)}
                  className="block w-full rounded-md px-2 py-2 text-left text-sm hover:bg-gray-100"
                >
                  {h.name}
                </button>
              ))}
          </div>

          <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-gray-400">
            <span>Enter — open first result</span>
            <span>Esc — close</span>
          </div>
        </div>
      )}
    </div>
  );
}