"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import type { Locale } from "@/lib/content";
import { formatPriceFt } from "@/lib/content";
import { cn } from "@/lib/cn";

type Localized = { en: string; hu: string; zh: string };

type Category = { id: string; label: Localized };

type Item = {
  id: string;
  categoryId: string;
  name: Localized;
  description: Localized;
  priceFt: number;
  image: string;
};

type Props = {
  locale: Locale;
  categories: Category[];
  items: Item[];
  title: string;
  subtitle: string;
  priceNote: string;
};

export function MenuExperience({
  locale,
  categories,
  items,
  title,
  subtitle,
  priceNote,
}: Props) {
  const t = useTranslations("menu");
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  // Initialize query from URL (?q=) and keep it in sync for shareable searches.
  useEffect(() => {
    const url = new URL(window.location.href);
    const initial = url.searchParams.get("q") ?? "";
    setQuery(initial);
  }, []);

  useEffect(() => {
    const q = query.trim();
    const url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    const next = `${pathname}${url.search}${url.hash}`;
    router.replace(next, { scroll: false });
  }, [pathname, query, router]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((dish) => {
      const name = dish.name[locale].toLowerCase();
      const desc = dish.description[locale].toLowerCase();
      const nameEn = dish.name.en.toLowerCase();
      return (
        name.includes(q) ||
        desc.includes(q) ||
        nameEn.includes(q) ||
        dish.name.hu.toLowerCase().includes(q) ||
        dish.name.zh.toLowerCase().includes(q)
      );
    });
  }, [items, locale, query]);

  const itemsByCat = useMemo(() => {
    const map = new Map<string, Item[]>();
    for (const c of categories) {
      map.set(
        c.id,
        filteredItems.filter((i) => i.categoryId === c.id),
      );
    }
    return map;
  }, [categories, filteredItems]);

  const hasResults = filteredItems.length > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-zinc-400">{subtitle}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="sr-only" htmlFor="menu-search">
            {t("searchLabel")}
          </label>
          <input
            id="menu-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            autoComplete="off"
            className="w-full rounded-full border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white outline-none ring-brand-gold/50 placeholder:text-zinc-500 focus:border-brand-gold/50 focus:ring-2 sm:max-w-md"
          />
          {query.trim() ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="shrink-0 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-zinc-300 hover:border-brand-gold/50 hover:text-brand-gold"
            >
              {t("clearSearch")}
            </button>
          ) : null}
        </div>
      </header>

      <div className="mt-8 flex gap-4 overflow-x-auto pb-2 md:hidden">
        {categories.map((c) => {
          const count = itemsByCat.get(c.id)?.length ?? 0;
          if (!count) return null;
          return (
            <a
              key={c.id}
              href={`#cat-${c.id}`}
              className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-200 hover:border-brand-gold/50 hover:text-brand-gold"
            >
              {c.label[locale]}
            </a>
          );
        })}
      </div>

      {!hasResults ? (
        <p className="mt-12 text-center text-sm text-zinc-500">{t("searchEmpty")}</p>
      ) : (
        <div className="mt-6 flex flex-col gap-10 md:gap-12">
          {categories.map((cat) => {
            const catItems = itemsByCat.get(cat.id) ?? [];
            if (!catItems.length) return null;
            return (
              <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-24">
                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-gradient-to-r from-brand-gold/60 to-transparent" />
                  <h2 className="font-display text-xl font-semibold text-brand-gold sm:text-2xl">
                    {cat.label[locale]}
                  </h2>
                  <span className="h-px flex-1 bg-gradient-to-l from-brand-gold/60 to-transparent" />
                </div>

                <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:snap-none md:overflow-visible lg:grid-cols-3">
                  {catItems.map((dish) => (
                    <article
                      key={dish.id}
                      className="w-[min(88vw,340px)] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/30 shadow-md shadow-black/30 md:w-auto md:min-w-0"
                    >
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={dish.image}
                          alt={dish.name[locale]}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 88vw, 33vw"
                        />
                      </div>
                      <div className="space-y-2 p-4">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display text-base font-semibold text-white">
                            {dish.name[locale]}
                          </h3>
                          <span className="shrink-0 text-sm font-semibold text-brand-gold">
                            {formatPriceFt(dish.priceFt, locale)}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-400">
                          {dish.description[locale]}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      <p
        className={cn(
          "mt-10 text-center text-xs text-zinc-600",
          !hasResults && "mt-6",
        )}
      >
        {priceNote}
      </p>
    </div>
  );
}
