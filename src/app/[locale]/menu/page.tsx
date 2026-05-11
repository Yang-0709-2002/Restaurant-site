import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { isAppLocale, type AppLocale } from "@/i18n/locales";
import { languageAlternates } from "@/lib/hreflang";
import { ogTwitterBundle } from "@/lib/seo";
import { MenuBoard } from "@/components/menu/MenuBoard";

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
  const t = await getTranslations({ locale, namespace: "menu" });
  const tm = await getTranslations({ locale, namespace: "meta" });
  const title = t("title");
  const siteName = tm("titleDefault");
  const description = t("subtitle");
  const ogTitle = `${title} · ${siteName}`;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/menu`,
      languages: languageAlternates("/menu"),
    },
    ...ogTwitterBundle({
      locale: loc,
      path: "/menu",
      title: ogTitle,
      description,
      siteName,
    }),
  };
}

export default function MenuPage() {
  return <MenuBoard />;
}
