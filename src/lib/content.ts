import gallery from "@/content/gallery.json";
import menu from "@/content/menu.json";
import restaurant from "@/content/restaurant.json";
import type { AppLocale } from "@/i18n/locales";
import { priceNumberFormatLocale } from "@/i18n/locales";

import imgDrunkenNoodles from "@/assets/menu/drunken-noodles.jpg";
import imgGreenCurry from "@/assets/menu/green-curry.jpg";
import imgSaltPepperPrawns from "@/assets/menu/salt-pepper-prawns.jpg";

export type Locale = AppLocale;

/** 打包进 `/_next/static/media/`，避免 Cloudflare 上 `public/` 静态资源 404。 */
const MENU_IMAGE_BY_ID: Record<string, string> = {
  "drunken-noodles": imgDrunkenNoodles.src,
  "green-curry": imgGreenCurry.src,
  "salt-pepper-prawns": imgSaltPepperPrawns.src,
};

export function getRestaurant() {
  return restaurant;
}

export function getMenu() {
  return {
    ...menu,
    items: menu.items.map((item) => ({
      ...item,
      image: MENU_IMAGE_BY_ID[item.id] ?? item.image,
    })),
  };
}

export function getGallery() {
  return {
    ...gallery,
    images: gallery.images.map((img) =>
      img.id === "g2" ? { ...img, src: imgGreenCurry.src } : img,
    ),
  };
}

export function formatPriceFt(value: number, locale: Locale) {
  try {
    return new Intl.NumberFormat(priceNumberFormatLocale(locale), {
      style: "currency",
      currency: "HUF",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${value} Ft`;
  }
}
