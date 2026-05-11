import { getLocale, getTranslations } from "next-intl/server";
import { getRestaurant } from "@/lib/content";
import type { Locale } from "@/lib/content";
import { formatPriceFt } from "@/lib/content";

export async function HomeMetaStrip() {
  const r = getRestaurant();
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("common");
  const th = await getTranslations("home");

  const monSat = r.weeklyHours.find((h) => h.weekdays.includes(1));
  const sun = r.weeklyHours.find((h) => h.weekdays.includes(0));

  const price = `${formatPriceFt(r.priceRangeFt.min, locale)} – ${formatPriceFt(r.priceRangeFt.max, locale)}`;

  const cuisineLabel = (code: string) => {
    if (code === "Thai") return t("cuisineThai");
    if (code === "Chinese") return t("cuisineChinese");
    return code;
  };

  return (
    <section className="border-y border-white/5 bg-brand-charcoal/60">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
            {th("hoursTitle")}
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            <span className="block font-medium text-white">{th("hoursWeekdays")}</span>
            {monSat ? `${monSat.open}–${monSat.close}` : "—"}
          </p>
          <p className="mt-2 text-sm text-zinc-300">
            <span className="block font-medium text-white">{th("hoursSun")}</span>
            {sun ? `${sun.open}–${sun.close}` : "—"}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
            {t("cuisine")}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {r.cuisines.map((c) => (
              <span
                key={c}
                className="rounded-full border border-brand-red/40 bg-brand-red/10 px-3 py-1 text-xs font-semibold text-brand-gold"
              >
                {cuisineLabel(c)}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
            {t("avgPrice")}
          </p>
          <p className="mt-2 text-lg font-semibold text-white">{price}</p>
        </div>
        <div className="flex items-end">
          <p className="text-sm leading-relaxed text-zinc-500">{th("ctaSub")}</p>
        </div>
      </div>
    </section>
  );
}
