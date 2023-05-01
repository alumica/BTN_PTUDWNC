/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        custom:"Poppins,sans-serif",
        playfair:['"Playfair Display"',],
        montserrat:['"Montserrat"', 'sans-serif']
      },
      colors: {
        'primary-red': '#B1464A',
        'primary-black': '#222222'
      }
    },
  },
  plugins: [],
}
