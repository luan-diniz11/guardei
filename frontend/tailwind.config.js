/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          default: '#F97316'
        }
      }
    }
  },
  darkMode: 'class',
  plugins: []
}
