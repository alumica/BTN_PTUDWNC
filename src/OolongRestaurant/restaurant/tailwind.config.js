/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        custom:"Poppins,sans-serif",
        playfair:['"Playfair Display"',],
        montserrat:['"Montserrat"', 'sans-serif'],
        montserrat2: "Montserrat, sans-serif",
        title:"Playfair Display, serif"
      },
      colors: {
        'primary-red': '#B1464A',
        'primary-black': '#222222',
        primary: {
          white: "#ffffff",
          black: "#222222",
          gray: "#555555",
          sunshine: "#FFF0DE",
          red:"#B1464A",
        }
      }
    },
  },
  plugins: [],
}
