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
        'dark-blue': '#0D1B2A',
        'off-white': '#E0E1DD'
      }
    },
  },
  plugins: [],
}

