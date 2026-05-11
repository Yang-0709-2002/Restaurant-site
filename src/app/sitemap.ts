import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getSiteOrigin } from "@/lib/site-url";

const paths = ["", "/about", "/menu", "/gallery", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteOrigin();
  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}/${locale}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
