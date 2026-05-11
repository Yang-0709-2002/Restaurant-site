"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LocaleError({ error, reset }: Props) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold">
        {t("kicker")}
      </p>
      <h1 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
        {t("title")}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{t("body")}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-8 inline-flex rounded-full bg-brand-red px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-red-dark"
      >
        {t("retry")}
      </button>
    </div>
  );
}
