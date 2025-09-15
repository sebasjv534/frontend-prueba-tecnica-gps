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
        primary: {
          blue1: "#00249C",
          blue2: "#40CEE4",
        },
        secondary: {
          red1: "#C6007E",
          red2: "#E280BE",
        },
        neutral: {
          gray: "#C5C5C5",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      spacing: {
        '160': '640px',
        '335': '335px',
        '907': '907px',
      },
      width: {
        '160': '640px',
        '246': '246px',
        '385': '385px',
        '907': '907px',
      },
      height: {
        '335': '335px',
        '63': '63px',
      },
      animation: {
        "card-activate": "cardActivate 0.3s ease-in-out",
        "fade-in": "fadeIn 0.2s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        cardActivate: {
          "0%": { transform: "scale(1)", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
          "50%": { transform: "scale(1.02)", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },
          "100%": { transform: "scale(1)", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;