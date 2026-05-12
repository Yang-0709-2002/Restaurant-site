import gallery from "@/content/gallery.json";
import menu from "@/content/menu.json";
import restaurant from "@/content/restaurant.json";
import type { AppLocale } from "@/i18n/locales";
import { priceNumberFormatLocale } from "@/i18n/locales";
import { MENU_INLINE_IMAGE_BY_ID } from "@/lib/menu-inline-data";

export type Locale = AppLocale;

export function getRestaurant() {
  return restaurant;
}

export function getMenu() {
  return {
    ...menu,
    items: menu.items.map((item) => ({
      ...item,
      image: MENU_INLINE_IMAGE_BY_ID[item.id] ?? item.image,
    })),
  };
}

export function getGallery() {
  return {
    ...gallery,
    images: gallery.images.map((img) =>
      img.id === "g2"
        ? { ...img, src: MENU_INLINE_IMAGE_BY_ID["green-curry"] ?? img.src }
        : img,
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
