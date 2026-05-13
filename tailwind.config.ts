import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        mist: "#f6f7f2",
        ember: "#ff6b35",
        basil: "#27745d",
        citron: "#d8f05b",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 23, 23, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
