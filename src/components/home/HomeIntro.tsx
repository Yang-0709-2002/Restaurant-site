import { getLocale, getTranslations } from "next-intl/server";
import { getRestaurant } from "@/lib/content";
import type { Locale } from "@/lib/content";

export async function HomeIntro() {
  const r = getRestaurant();
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home");
  const intro = r.shortIntro[locale];

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
        {t("introTitle")}
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">
        {intro}
      </p>
    </section>
  );
}
