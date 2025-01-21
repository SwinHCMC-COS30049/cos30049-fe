import type { Config } from "tailwindcss";

export default {
  important: true,
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    fontFamily: {
      sans: ["Figtree", "sans-serif"],
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        blob: "blob 4s infinite",
        blob2: "blob2 4s infinite",
        blob3: "blob3 4s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "scale(1) translate(-50%, -50%)",
          },
          "33%": {
            transform: "scale(1.05) translate(3rem, -5rem)",
          },
          "66%": {
            transform: "scale(0.95) translate(-2rem, 3rem)",
          },
          "100%": {
            transform: "scale(1) translate(-50%, -50%)",
          },
        },
        blob2: {
          "0%": {
            transform: "scale(1) translate(-50%, -100%)",
          },
          "33%": {
            transform: "scale(1.05) translate(-2rem, -3rem)",
          },
          "66%": {
            transform: "scale(0.95) translate(1.5rem, 2rem)",
          },
          "100%": {
            transform: "scale(1) translate(-50%, -100%)",
          },
        },
        blob3: {
          "0%": {
            transform: "scale(1) translate(-100%, -50%)",
          },
          "33%": {
            transform: "scale(1.1) translate(-4rem, 3rem)",
          },
          "66%": {
            transform: "scale(0.95) translate(3rem, -4rem)",
          },
          "100%": {
            transform: "scale(1) translate(-100%, -50%)",
          },
        },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
