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
        glow: "0 22px 70px rgba(39, 116, 93, 0.18)",
      },
      keyframes: {
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(12px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "rise-in": "rise-in 480ms ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
