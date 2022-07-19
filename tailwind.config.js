/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-yellow': {
          DEFAULT: '#FFD54C'
        },
        'main-blue': {
          DEFAULT: '#08185A'
        },
        'main-red': {
          DEFAULT: '#FF1100'
        }
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif']
      }
    },
  },
  plugins: [],
}
