import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { isAppLocale, type AppLocale } from "@/i18n/locales";
import { languageAlternates } from "@/lib/hreflang";
import { ogTwitterBundle } from "@/lib/seo";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isAppLocale(locale)) {
    return {};
  }
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "about" });
  const tm = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const siteName = tm("titleDefault");
  const description = t("introBody");
  const ogTitle = `${title} · ${siteName}`;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/about`,
      languages: languageAlternates("/about"),
    },
    ...ogTwitterBundle({
      locale: loc,
      path: "/about",
      title: ogTitle,
      description,
      siteName,
    }),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  const blocks = [
    { title: t("introTitle"), body: t("introBody") },
    { title: t("fusionTitle"), body: t("fusionBody") },
    { title: t("serviceTitle"), body: t("serviceBody") },
    { title: t("spaceTitle"), body: t("spaceBody") },
  ] as const;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
        {t("title")}
      </h1>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {blocks.map((b) => (
          <section
            key={b.title}
            className="rounded-2xl border border-white/10 bg-zinc-900/30 p-6 shadow-lg shadow-black/30"
          >
            <h2 className="font-display text-xl font-semibold text-brand-gold">
              {b.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
              {b.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
