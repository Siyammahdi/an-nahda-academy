import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
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
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}


//#181938 blue_1
//#0e241f green_1
//#0b1f1b green_2