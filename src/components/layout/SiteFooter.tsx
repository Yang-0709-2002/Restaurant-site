import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { getRestaurant } from "@/lib/content";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const r = getRestaurant();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-black/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-lg font-semibold text-white">{r.name}</p>
          <p className="mt-1 max-w-md text-sm text-zinc-400">{r.addressLine}</p>
          <a
            href={`tel:${r.phoneTel}`}
            className="mt-2 inline-block text-sm font-medium text-brand-gold hover:text-brand-gold-muted"
          >
            {r.phoneDisplay}
          </a>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
          <Link href="/menu" className="hover:text-brand-gold">
            {tn("menu")}
          </Link>
          <Link href="/contact" className="hover:text-brand-gold">
            {tn("contact")}
          </Link>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-zinc-600">
        © {year} {r.name}. {t("rights")}
      </div>
    </footer>
  );
}
