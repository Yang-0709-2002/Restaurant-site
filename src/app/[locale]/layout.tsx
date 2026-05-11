import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { DM_Sans, Noto_Sans_SC, Outfit } from "next/font/google";
import { isAppLocale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import { JsonLdRestaurant } from "@/components/seo/JsonLdRestaurant";
import { MobileActionDock } from "@/components/layout/MobileActionDock";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { cn } from "@/lib/cn";
import { getSiteUrl } from "@/lib/site-url";
import "../globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

/** `next/font` 仅配置 latin / latin-ext；中文由 Noto 与系统字体回退显示。 */
const notoSansSC = Noto_Sans_SC({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sc",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const base = getSiteUrl();
  const { locale } = await params;
  if (!isAppLocale(locale)) {
    return { metadataBase: base };
  }
  const t = await getTranslations({ locale, namespace: "meta" });
  const site = t("titleDefault");
  return {
    metadataBase: base,
    title: {
      default: site,
      template: `%s · ${site}`,
    },
    robots: { index: true, follow: true },
    appleWebApp: {
      capable: true,
      title: site,
      statusBarStyle: "black-translucent",
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isAppLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const tc = await getTranslations({ locale, namespace: "common" });

  return (
    <html
      lang={locale === "zh" ? "zh-Hans" : locale}
      className={cn(
        dmSans.variable,
        outfit.variable,
        notoSansSC.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://maps.google.com" />
      </head>
      <body
        className={cn(
          "min-h-dvh bg-brand-ink text-zinc-100",
          locale === "zh" ? "font-sc" : "font-sans",
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <JsonLdRestaurant locale={locale} />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-brand-red focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
          >
            {tc("skipToMain")}
          </a>
          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <main
              id="main-content"
              tabIndex={-1}
              className="flex-1 scroll-mt-16 outline-none pb-[4.5rem] md:pb-0"
            >
              {children}
            </main>
            <SiteFooter />
            <MobileActionDock />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
