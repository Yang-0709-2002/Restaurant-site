"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/lib/content";
import { GalleryLightbox, type GalleryImage } from "./GalleryLightbox";

/** JSON 导入的 `type` 为 `string`，与运行时 `"dish" | "venue"` 一致 */
export type GalleryContentImage = {
  id: string;
  type: string;
  src: string;
  alt: { en: string; hu: string; zh: string };
};

type Props = {
  locale: Locale;
  images: GalleryContentImage[];
};

export function GallerySection({ locale, images }: Props) {
  const t = useTranslations("common");
  const [filter, setFilter] = useState<"all" | "dish" | "venue">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return images;
    return images.filter((i) => i.type === filter);
  }, [filter, images]);

  const lightboxImages: GalleryImage[] = filtered.map((i) => ({
    id: i.id,
    src: i.src,
    alt: i.alt[locale],
  }));

  const chip = (key: "all" | "dish" | "venue", label: string) => (
    <button
      type="button"
      onClick={() => setFilter(key)}
      className={
        filter === key
          ? "rounded-full bg-brand-red px-4 py-1.5 text-xs font-semibold text-white"
          : "rounded-full border border-white/10 px-4 py-1.5 text-xs font-semibold text-zinc-300 hover:border-brand-gold/50 hover:text-brand-gold"
      }
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {chip("all", t("filterAll"))}
        {chip("dish", t("filterDishes"))}
        {chip("venue", t("filterVenue"))}
      </div>
      <GalleryLightbox images={lightboxImages} />
    </div>
  );
}
