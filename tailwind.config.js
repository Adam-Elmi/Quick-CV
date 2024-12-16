/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "max-md" : {max : "768px"},
        "desktop": { max: "1024px" },
        "tablet": { max: "768px" },
        "mobile": { max: "640px" },
        "small-mobile": { max: "368px" },
      }
    },
  },
  plugins: [],
}

