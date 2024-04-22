import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      "gray-100": "#F7FAFC",
      "gray-300": "#E2E8F0",
      "gray-600": "#828282",
      "gray-700": "#4A5568",
      "gray-800": "#2D3748",
      "gray-900": "#1A202C",
      "black": "#000000",
      "white": "#FFFFFF",
      "green-500": "#38B2AC",
      "cyan-600": "#3182CE",
    }
  },
  plugins: [],
};
export default config;
