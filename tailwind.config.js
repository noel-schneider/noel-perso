/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './projets/**/*.html', './src/js/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
