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
        'slide-up': {
      '0%': { transform: 'translateY(50%)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 },
    },
      },
      animation: {
        slideIn: "slideIn 0.5s ease-in-out",
        'slide-up': 'slide-up 0.3s ease-out',
      },
    },
  },
  plugins: [
    skeleton({
      themes: {
        preset: ['skeleton', 'modern'], // choose themes
      },
    }),
     require('tailwind-scrollbar-hide'),
  ],
};
