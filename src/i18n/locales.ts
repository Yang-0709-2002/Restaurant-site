import { routing } from "./routing";

/** 应用支持的语言（与 `routing.ts` 保持一致） */
export type AppLocale = (typeof routing.locales)[number];

export function isAppLocale(value: string): value is AppLocale {
  return (routing.locales as readonly string[]).includes(value);
}

/** 顶部语言切换展示用（顺序与 `routing.locales` 一致：HU → EN → 中文） */
export const localePickerLabel: Record<AppLocale, string> = {
  hu: "HU",
  en: "EN",
  zh: "中文",
};

/** `metadata.alternates.languages` 的 hreflang 键 */
export const localeHreflang: Record<AppLocale, string> = {
  hu: "hu",
  en: "en",
  zh: "zh-CN",
};

/** 价格数字格式（HUF） */
export function priceNumberFormatLocale(locale: AppLocale): string {
  if (locale === "hu") return "hu-HU";
  if (locale === "zh") return "zh-CN";
  return "en-HU";
}

/** Open Graph `locale` 字段（Next / Facebook 约定） */
export function openGraphLocale(locale: AppLocale): string {
  if (locale === "zh") return "zh_CN";
  if (locale === "hu") return "hu_HU";
  return "en_US";
}
