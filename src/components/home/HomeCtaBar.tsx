import { getTranslations } from "next-intl/server";
import { getRestaurant } from "@/lib/content";
import { Link } from "@/i18n/routing";

export async function HomeCtaBar() {
  const tc = await getTranslations("common");
  const r = getRestaurant();
  const dest = encodeURIComponent(`${r.addressLine}, ${r.mapsQuery}`);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-gradient-to-r from-brand-red/20 via-black/40 to-brand-gold/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="text-sm text-zinc-300">{tc("contactUs")}</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/menu"
            className="inline-flex flex-1 items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-brand-ink hover:bg-brand-gold sm:flex-none"
          >
            {tc("viewMenu")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex flex-1 items-center justify-center rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:border-brand-gold hover:text-brand-gold sm:flex-none"
          >
            {tc("contactUs")}
          </Link>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${dest}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center rounded-full bg-brand-red px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-dark sm:flex-none"
          >
            {tc("getDirections")}
          </a>
        </div>
      </div>
    </section>
  );
}
