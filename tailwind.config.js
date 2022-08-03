/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "apps/site/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-yellow': {
          DEFAULT: '#FFD54C'
        },
        'main-blue': {
          DEFAULT: '#08185A',
          '100': '#CFD4FF'
        },
        'main-red': {
          DEFAULT: '#FF1100'
        },
        'main-grey': {
          DEFAULT: '#E5E5E5',
          200: '#F1F1F1',
          800: '#363636'
        },
        'main-green': {
          DEFAULT: '#296118'
        }
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif']
      },
      screens: {
        '3xl': '1920px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
