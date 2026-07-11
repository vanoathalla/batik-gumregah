import type { Config } from "tailwindcss";

// Tailwind v4: most configuration is done via CSS @theme in globals.css
// This file is kept for plugin registration only
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
