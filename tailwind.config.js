/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/views/**/*.jsx",
    "./src/App.jsx",
  ],
  theme: {
    extend: {
      colors: {
        'dark-mode': '#2f2b3a',
        'off-white': '#E0E1DD',
        'dm-purple': '#5e43f3',
        'dm-purple-hov': '#9171f8'
      }
    },
    fontFamily: {
      'montserrat': ['Montserrat', 'ui-sans-serif']
    }
  },
  plugins: [],
}

