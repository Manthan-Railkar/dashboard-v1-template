import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        stage: "#f3f3f3",
        ink: "#10302a",
        muted: "#7d8d88",
        forest: { DEFAULT: "#0b2b23", 2: "#143b31", 3: "#1c4a3e" },
        mint: { DEFAULT: "#7fe0c0", 2: "#b4f0db", 3: "#2fae8a", 4: "#1f8a6c" },
        peach: { DEFAULT: "#f3a877", 2: "#f9cdb0", 3: "#fde6d6" },
      },
      fontFamily: {
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
        display: ['"Hanken Grotesk Variable"', '"Inter Variable"', "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,.95) inset, 0 0 0 1px rgba(255,255,255,.55), 0 14px 34px -16px rgba(18,70,56,.28)",
      },
    },
  },
  plugins: [],
};
export default config;
