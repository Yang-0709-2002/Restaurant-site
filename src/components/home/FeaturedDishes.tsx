import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { formatPriceFt, getMenu, getRestaurant } from "@/lib/content";
import type { Locale } from "@/lib/content";

export async function FeaturedDishes() {
  const r = getRestaurant();
  const menu = getMenu();
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("common");

  const items = r.featuredDishIds.flatMap((id) => {
    const found = menu.items.find((x) => x.id === id);
    return found ? [found] : [];
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
          {t("featured")}
        </h2>
        <Link
          href="/menu"
          className="text-sm font-semibold text-brand-gold hover:text-brand-gold-muted"
        >
          {t("viewMenu")} →
        </Link>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((dish) => (
          <article
            key={dish.id}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 shadow-lg shadow-black/40 transition hover:border-brand-gold/40"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={dish.image}
                alt={dish.name[locale]}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
            <div className="space-y-1 p-4">
              <h3 className="font-display text-lg font-semibold text-white">
                {dish.name[locale]}
              </h3>
              <p className="line-clamp-2 text-sm text-zinc-400">
                {dish.description[locale]}
              </p>
              <p className="pt-2 text-sm font-semibold text-brand-gold">
                {formatPriceFt(dish.priceFt, locale)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
