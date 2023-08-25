/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scaleDraw: {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.03)",
          },
        },
      },
      animation: {
        scaleDraw: "scaleDraw 0.6s ease-in-out",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
