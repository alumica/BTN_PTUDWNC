/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        custom:"Poppins,sans-serif",
        montserrat: "Montserrat, sans-serif",
        title:"Playfair Display, serif"
      }
    },
    colors: {
      primary: {
        white: "#ffffff",
        black: "#222222",
        gray: "#555555",
        sunshine: "#FFF0DE",
        red:"#B1464A",
      }
    },
  },
  plugins: [],
}
