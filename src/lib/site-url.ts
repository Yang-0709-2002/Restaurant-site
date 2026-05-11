const FALLBACK = "https://bangkok-thai-chinese.example.com";

/** 站点绝对地址（用于 metadataBase、sitemap、robots）。优先读 `NEXT_PUBLIC_SITE_URL`。 */
export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      const normalized = raw.endsWith("/") ? raw.slice(0, -1) : raw;
      return new URL(normalized);
    } catch {
      return new URL(FALLBACK);
    }
  }
  return new URL(FALLBACK);
}

export function getSiteOrigin(): string {
  return getSiteUrl().origin;
}
