/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        // Backgrounds
        base: "#FAFAF8",
        surface: "#FFFFFF",

        // Text
        primary: "#1C1C1C",
        secondary: "#6E6E6E",

        // Luxury accent (Heaven Mayhem–like)
        accent: "#C6A75E",

        // UI
        border: "#E6E6E3",
        muted: "#F2F2EF",
      },

      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
        condensed: ["Anton", "sans-serif"],
      },

      fontSize: {
        h1: ["64px", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        h2: ["44px", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        h3: ["32px", { lineHeight: "1.3" }],
        body: ["17px", { lineHeight: "1.7" }],
        small: ["14px", { lineHeight: "1.6" }],
      },

      spacing: {
        section: "120px",
        sectionSm: "72px",
      },

      borderRadius: {
        xl: "20px",
        pill: "999px",
      },

      boxShadow: {
        subtle: "0 8px 24px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};
