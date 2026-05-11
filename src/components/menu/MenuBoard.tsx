import { getLocale, getTranslations } from "next-intl/server";
import { getMenu } from "@/lib/content";
import type { Locale } from "@/lib/content";
import { MenuExperience } from "./MenuExperience";

export async function MenuBoard() {
  const menu = getMenu();
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("menu");

  return (
    <MenuExperience
      locale={locale}
      categories={menu.categories}
      items={menu.items}
      title={t("title")}
      subtitle={t("subtitle")}
      priceNote={t("priceNote")}
    />
  );
}
