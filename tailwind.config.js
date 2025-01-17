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
        "max-lg": { max: "990px" },
        "tablet": { max: "768px" },
        "mobile": { max: "640px" },
        "medium-mobile": { max: "480px" },
        "small-mobile": { max: "368px" },
      }
    },
  },
  plugins: [],
}

