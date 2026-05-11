import { routing } from "@/i18n/routing";
import { localeHreflang, type AppLocale } from "@/i18n/locales";

/**
 * 生成 SEO `alternates.languages`（含 x-default → 默认语言站，与 `routing.defaultLocale` 一致）
 * @param pathWithoutLocale 例如 `""` 首页、`"/about"`
 */
export function languageAlternates(pathWithoutLocale: string): Record<string, string> {
  const suffix = pathWithoutLocale === "/" ? "" : pathWithoutLocale;
  const entries = ([...routing.locales] as AppLocale[]).map((loc) => [
    localeHreflang[loc],
    `/${loc}${suffix}`,
  ] as const);
  const defaultLoc = routing.defaultLocale;
  return Object.fromEntries([
    ...entries,
    ["x-default", `/${defaultLoc}${suffix}`],
  ]);
}
