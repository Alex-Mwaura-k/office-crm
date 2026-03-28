/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#DC2626",
          black: "#0e0e17",
          gold: "#EAB308",
          blue: "#3B82F6",
          white: "#FFFFFF",
          gray: "#F8FAFC",
        },
      },
    },
  },
  plugins: [],
};
