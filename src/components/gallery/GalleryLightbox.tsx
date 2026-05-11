"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

type Props = {
  images: GalleryImage[];
};

export function GalleryLightbox({ images }: Props) {
  const t = useTranslations("gallery");
  const [active, setActive] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setActive(null), []);

  const go = useCallback(
    (dir: -1 | 1) => {
      setActive((i) => {
        if (i === null) return i;
        const n = (i + dir + images.length) % images.length;
        return n;
      });
    },
    [images.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, go]);

  const modal =
    active !== null ? (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
        role="dialog"
        aria-modal="true"
        aria-label={t("title")}
        onClick={close}
      >
        <button
          type="button"
          className="absolute right-4 top-4 rounded-full border border-white/20 px-3 py-1 text-sm text-white hover:bg-white/10"
          aria-label={t("closeGallery")}
          onClick={close}
        >
          ✕
        </button>
        <button
          type="button"
          className="absolute left-2 top-1/2 z-[101] hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-white hover:bg-white/10 sm:block"
          aria-label={t("prevImage")}
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
        >
          ‹
        </button>
        <button
          type="button"
          className="absolute right-2 top-1/2 z-[101] hidden -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-white hover:bg-white/10 sm:block"
          aria-label={t("nextImage")}
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
        >
          ›
        </button>
        <div
          className="relative max-h-[85vh] w-full max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10">
            <Image
              src={images[active].src}
              alt={images[active].alt}
              fill
              className="object-contain bg-black"
              sizes="100vw"
              priority
            />
          </div>
          <p className="mt-3 text-center text-sm text-zinc-400">
            {t("imageCounter", { current: active + 1, total: images.length })}
          </p>
        </div>
      </div>
    ) : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
        {images.map((img, idx) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActive(idx)}
            aria-label={`${t("zoomBadge")}: ${img.alt}`}
            className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-zinc-900 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />
            <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white opacity-0 transition group-hover:opacity-100">
              {t("zoomBadge")}
            </span>
          </button>
        ))}
      </div>
      {mounted && modal ? createPortal(modal, document.body) : null}
    </>
  );
}
