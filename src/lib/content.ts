import gallery from "@/content/gallery.json";
import menu from "@/content/menu.json";
import restaurant from "@/content/restaurant.json";
import type { AppLocale } from "@/i18n/locales";
import { priceNumberFormatLocale } from "@/i18n/locales";

export type Locale = AppLocale;

export function getRestaurant() {
  return restaurant;
}

export function getMenu() {
  return menu;
}

export function getGallery() {
  return gallery;
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
