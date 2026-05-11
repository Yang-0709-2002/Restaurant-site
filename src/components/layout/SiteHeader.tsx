import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileNav } from "./MobileNav";

const navKeys = [
  { href: "/", key: "home" as const },
  { href: "/about", key: "about" as const },
  { href: "/menu", key: "menu" as const },
  { href: "/gallery", key: "gallery" as const },
  { href: "/contact", key: "contact" as const },
];

export function SiteHeader() {
  const t = useTranslations("nav");
  const b = useTranslations("brand");

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-brand-ink/90 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-red-dark text-sm font-bold text-white shadow-lg shadow-brand-red/30">
            B
          </span>
          <span className="hidden min-w-0 flex-col leading-tight sm:flex">
            <span className="font-display text-sm font-semibold tracking-tight text-white group-hover:text-brand-gold sm:text-base">
              {b("nameLine")}
            </span>
            <span className="truncate text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              {b("cuisinesLine")}
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 text-sm font-medium text-zinc-300 md:flex"
          aria-label="Primary"
        >
          {navKeys.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 transition-colors hover:bg-white/5 hover:text-brand-gold"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <MobileNav labels={navKeys.map((i) => ({ href: i.href, label: t(i.key) }))} />
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
    </header>
  );
}
