/** @type {import('tailwindcss').Config} */

const { skeleton } = require('@skeletonlabs/tw-plugin');

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
       fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: 0, transform: "translateY(-20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        slideIn: "slideIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [
    skeleton({
      themes: {
        preset: ['skeleton', 'modern'], // choose themes
      },
    }),
  ],
};
