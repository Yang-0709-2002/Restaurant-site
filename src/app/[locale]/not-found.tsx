import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function NotFound() {
  const t = await getTranslations("nav");
  const nf = await getTranslations("notFound");

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-white">{nf("title")}</h1>
      <p className="mt-3 text-zinc-400">{nf("body")}</p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-brand-red px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-dark"
      >
        {t("home")}
      </Link>
    </div>
  );
}
