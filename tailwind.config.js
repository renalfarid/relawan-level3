/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './assets/js/*.js',
    './assets/js/*.min.js'
  ],
  safelist: [
    'bg-orange-600'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

