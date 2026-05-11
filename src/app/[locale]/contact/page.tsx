import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { isAppLocale, type AppLocale } from "@/i18n/locales";
import { languageAlternates } from "@/lib/hreflang";
import { ogTwitterBundle } from "@/lib/seo";
import { GoogleMapEmbed } from "@/components/contact/GoogleMapEmbed";
import { getRestaurant } from "@/lib/content";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isAppLocale(locale)) {
    return {};
  }
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "contact" });
  const tm = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const siteName = tm("titleDefault");
  const description = t("subtitle");
  const ogTitle = `${title} · ${siteName}`;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: languageAlternates("/contact"),
    },
    ...ogTwitterBundle({
      locale: loc,
      path: "/contact",
      title: ogTitle,
      description,
      siteName,
    }),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const r = getRestaurant();
  const monSat = r.weeklyHours.find((h) => h.weekdays.includes(1));
  const sun = r.weeklyHours.find((h) => h.weekdays.includes(0));
  const dest = encodeURIComponent(`${r.addressLine}, ${r.mapsQuery}`);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-zinc-400">{t("subtitle")}</p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <section className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
              {t("address")}
            </h2>
            <p className="mt-2 text-lg text-white">{r.addressLine}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${dest}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-brand-red px-4 py-2 text-sm font-semibold text-white hover:bg-brand-red-dark"
              >
                {t("mapTitle")}
              </a>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
              {t("phone")}
            </h2>
            <a
              href={`tel:${r.phoneTel}`}
              className="mt-2 block text-xl font-semibold text-brand-gold hover:text-brand-gold-muted"
            >
              {r.phoneDisplay}
            </a>
            <p className="mt-2 text-xs text-zinc-500 sm:hidden">{t("mobileHint")}</p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
              {t("hours")}
            </h2>
            <p className="mt-3 text-sm text-zinc-300">
              <span className="font-medium text-white">{t("weekdaysLabel")}</span>
              <br />
              {monSat ? `${monSat.open}–${monSat.close}` : "—"}
            </p>
            <p className="mt-3 text-sm text-zinc-300">
              <span className="font-medium text-white">{t("sundayLabel")}</span>
              <br />
              {sun ? `${sun.open}–${sun.close}` : "—"}
            </p>
          </section>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
            {t("mapTitle")}
          </h2>
          <div className="mt-3">
            <GoogleMapEmbed query={r.mapsQuery} title={r.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
