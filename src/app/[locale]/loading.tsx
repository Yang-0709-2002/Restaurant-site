"use client";

import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("common");

  return (
    <div
      className="mx-auto flex min-h-[50vh] max-w-6xl flex-col items-center justify-center gap-6 px-4 py-16"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex gap-2">
        <span className="h-3 w-3 animate-bounce rounded-full bg-brand-red [animation-delay:-0.3s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-brand-gold [animation-delay:-0.15s]" />
        <span className="h-3 w-3 animate-bounce rounded-full bg-brand-red" />
      </div>
      <p className="text-sm font-medium tracking-wide text-zinc-400">{t("loading")}</p>
      <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-1/3 animate-pulse rounded-full bg-gradient-to-r from-brand-red to-brand-gold" />
      </div>
    </div>
  );
}
