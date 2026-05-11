import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { isAppLocale, type AppLocale } from "@/i18n/locales";
import { languageAlternates } from "@/lib/hreflang";
import { ogTwitterBundle } from "@/lib/seo";
import { FeaturedDishes } from "@/components/home/FeaturedDishes";
import { HeroBanner } from "@/components/home/HeroBanner";
import { HomeCtaBar } from "@/components/home/HomeCtaBar";
import { HomeIntro } from "@/components/home/HomeIntro";
import { HomeMetaStrip } from "@/components/home/HomeMetaStrip";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  if (!isAppLocale(locale)) {
    return {};
  }
  const loc = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = t("titleDefault");
  const description = t("description");
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: languageAlternates(""),
    },
    ...ogTwitterBundle({
      locale: loc,
      path: "",
      title,
      description,
      siteName: title,
    }),
  };
}

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <HomeIntro />
      <HomeMetaStrip />
      <FeaturedDishes />
      <HomeCtaBar />
    </>
  );
}
