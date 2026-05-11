import type { Metadata } from "next";
import type { AppLocale } from "@/i18n/locales";
import { openGraphLocale } from "@/i18n/locales";

const defaultOgImage =
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80";

function pagePath(locale: AppLocale, path: string): string {
  if (!path || path === "/") return `/${locale}`;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${p}`;
}

/** 共享 Open Graph / Twitter Card 片段（相对 `metadataBase` 的 `url`） */
export function ogTwitterBundle(opts: {
  locale: AppLocale;
  path: string;
  title: string;
  description: string;
  siteName: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const url = pagePath(opts.locale, opts.path);
  return {
    openGraph: {
      title: opts.title,
      description: opts.description,
      type: "website",
      locale: openGraphLocale(opts.locale),
      url,
      siteName: opts.siteName,
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: opts.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [defaultOgImage],
    },
  };
}
