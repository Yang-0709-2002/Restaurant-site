"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/cn";

type Item = { href: string; label: string };

export function MobileNav({ labels }: { labels: Item[] }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("common");

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={t("navigationMenu")}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex flex-col gap-1" aria-hidden>
          <span className={cn("h-0.5 w-5 bg-white transition", open && "translate-y-1.5 rotate-45")} />
          <span className={cn("h-0.5 w-5 bg-white transition", open && "opacity-0")} />
          <span className={cn("h-0.5 w-5 bg-white transition", open && "-translate-y-1.5 -rotate-45")} />
        </span>
      </button>
      {open ? (
        <div
          id="mobile-nav"
          className="absolute left-0 right-0 top-16 border-b border-white/10 bg-brand-charcoal/95 px-4 py-4 shadow-xl backdrop-blur-md"
        >
          <nav className="flex flex-col gap-1">
            {labels.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-white/5 hover:text-brand-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
