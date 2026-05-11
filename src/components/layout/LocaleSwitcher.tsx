"use client";

import { Link, usePathname, routing } from "@/i18n/routing";
import { localePickerLabel, type AppLocale } from "@/i18n/locales";
import { cn } from "@/lib/cn";
import { useLocale } from "next-intl";

const locales: AppLocale[] = [...routing.locales];

export function LocaleSwitcher() {
  const pathname = usePathname();
  const locale = useLocale() as AppLocale;

  const pill = (code: AppLocale) =>
    cn(
      "rounded-full px-2 py-1 transition-colors sm:px-2.5",
      locale === code
        ? "bg-brand-red text-white"
        : "text-zinc-300 hover:text-brand-gold",
    );

  return (
    <div className="flex flex-wrap items-center gap-0.5 rounded-full border border-white/10 bg-black/30 p-0.5 text-[11px] font-semibold tracking-wide sm:text-xs">
      {locales.map((code) => (
        <Link key={code} href={pathname} locale={code} className={pill(code)}>
          {localePickerLabel[code]}
        </Link>
      ))}
    </div>
  );
}
