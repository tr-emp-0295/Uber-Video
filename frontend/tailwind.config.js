/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FFD21F',
          dark: '#F5BE00',
          soft: '#FFF6CC',
        },
        ink: '#111111',
      },
    },
  },
  plugins: [],
}
