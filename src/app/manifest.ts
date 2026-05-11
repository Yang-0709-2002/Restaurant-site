import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getSiteOrigin } from "@/lib/site-url";

export default function manifest(): MetadataRoute.Manifest {
  const origin = getSiteOrigin();
  const start = `${origin}/${routing.defaultLocale}/`;

  return {
    name: "Bangkok Thai Chinese Restaurant",
    short_name: "Bangkok",
    description: "Thai and Chinese restaurant at Nyír Pláza, Nyíregyháza.",
    start_url: start,
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    lang: routing.defaultLocale,
    orientation: "portrait-primary",
    categories: ["food", "restaurant"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" }
    ]
  };
}
