/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        fullext: { raw: "(min-height: 830px)" },
        semiext: { raw: "((min-height: 630px) and (max-height: 830px))" },
      },
    },
    fontFamily: {
      "nova-square": ["'Nova Square'", "sans-serif"],
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
/*eslint-env node*/
