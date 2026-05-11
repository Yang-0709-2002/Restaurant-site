import { getRestaurant } from "@/lib/content";
import type { Locale } from "@/lib/content";

type Props = {
  locale: Locale;
};

const descriptions: Record<Locale, string> = {
  en: "Thai and Chinese restaurant at Nyír Pláza, Nyíregyháza.",
  hu: "Thai és kínai étterem a Nyír Plázában, Nyíregyházán.",
  zh: "位于匈牙利尼赖吉哈佐 Nyír Pláza 购物中心的泰式与中式餐厅。",
};

export function JsonLdRestaurant({ locale }: Props) {
  const r = getRestaurant();
  const description = descriptions[locale];

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: r.name,
    description,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80",
    telephone: r.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: r.addressLine,
      addressLocality: "Nyíregyháza",
      postalCode: "4400",
      addressCountry: "HU",
    },
    servesCuisine: r.cuisines,
    priceRange: `${r.priceRangeFt.min}-${r.priceRangeFt.max} HUF`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:30",
        closes: "20:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "20:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
