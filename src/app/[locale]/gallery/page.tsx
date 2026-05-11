import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { isAppLocale, type AppLocale } from "@/i18n/locales";
import { languageAlternates } from "@/lib/hreflang";
import { ogTwitterBundle } from "@/lib/seo";
import { GallerySection } from "@/components/gallery/GallerySection";
import type { Locale } from "@/lib/content";
import { getGallery } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isAppLocale(locale)) {
    return {};
  }
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "gallery" });
  const tm = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const siteName = tm("titleDefault");
  const description = t("subtitle");
  const ogTitle = `${title} · ${siteName}`;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/gallery`,
      languages: languageAlternates("/gallery"),
    },
    ...ogTwitterBundle({
      locale: loc,
      path: "/gallery",
      title: ogTitle,
      description,
      siteName,
    }),
  };
}

export default async function GalleryPage() {
  const t = await getTranslations("gallery");
  const locale = (await getLocale()) as Locale;
  const { images } = getGallery();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-zinc-400">{t("subtitle")}</p>
      </header>
      <div className="mt-10">
        <GallerySection locale={locale} images={images} />
      </div>
    </div>
  );
}
