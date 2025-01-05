const { nextui } = require('@nextui-org/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-dark": "linear-gradient(135deg, #0b1f1b, #080f21,  #1b012e)", 
        "gradient-light": "linear-gradient(135deg, #c5fcf0, #d7e0f5, #e3c3fa)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        liAdor: ['"Li Ador Noirrit"', 'sans-serif'], 

      },
      animation: {
        "fade-in": "fadeIn 1s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(100px)", filter: "blur(33px)" },
          "100%": { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
