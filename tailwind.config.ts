import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#C41E3A",
          "red-dark": "#9E1830",
          gold: "#D4AF37",
          "gold-muted": "#C5A028",
          ink: "#0a0a0a",
          charcoal: "#141414",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        sc: ["var(--font-noto-sc)", "var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.88) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
