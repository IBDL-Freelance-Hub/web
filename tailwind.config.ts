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
          primary: "#1D1D39",
          secondary: "#E11119",
          complementary: "#419257",
          surface: "#F8FAFC",
          border: "#E2E8F0",
        },
        status: {
          ok: "#419257",
          wait: "#F59E0B",
          stop: "#E11119",
          info: "#1D1D39",
          mute: "#64748B",
        },
      },
      fontFamily: {
        sans: ["'Calibri'", "system-ui", "-apple-system", "sans-serif"],
        arabic: ["var(--font-cairo)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
