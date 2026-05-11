import { getTranslations } from "next-intl/server";
import { getRestaurant } from "@/lib/content";

export async function MobileActionDock() {
  const t = await getTranslations("common");
  const r = getRestaurant();
  const dest = encodeURIComponent(`${r.addressLine}, ${r.mapsQuery}`);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-brand-charcoal/95 px-3 py-2 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <a
          href={`tel:${r.phoneTel}`}
          className="flex flex-1 items-center justify-center rounded-full bg-brand-red py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand-red/20 active:scale-[0.98]"
        >
          {t("call")}
        </a>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${dest}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center rounded-full border border-brand-gold/40 bg-black/30 py-2.5 text-center text-sm font-semibold text-brand-gold active:scale-[0.98]"
        >
          {t("getDirections")}
        </a>
      </div>
    </div>
  );
}
