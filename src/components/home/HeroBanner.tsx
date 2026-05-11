import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { getRestaurant } from "@/lib/content";
import type { Locale } from "@/lib/content";
import { Link } from "@/i18n/routing";
import { OpenNowBadge } from "./OpenNowBadge";

export async function HeroBanner() {
  const r = getRestaurant();
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const tagline = r.tagline[locale];

  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1600&q=80"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 md:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-gold">
          {t("heroKicker")}
        </p>
        <div className="max-w-2xl space-y-4">
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            {r.name}
          </h1>
          <p className="text-lg text-zinc-200 sm:text-xl">{tagline}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <OpenNowBadge rules={r.weeklyHours} />
          <Link
            href="/menu"
            className="inline-flex items-center justify-center rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-red/30 transition hover:bg-brand-red-dark"
          >
            {tc("viewMenu")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-black/30 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur hover:border-brand-gold/60 hover:text-brand-gold"
          >
            {tc("contactUs")}
          </Link>
        </div>
      </div>
    </section>
  );
}
