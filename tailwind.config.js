/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vedic-gold': '#D4AF37',
        'vedic-orange': '#FF9933',
        'vedic-saffron': '#FF6600',
        'vedic-indigo': '#4B0082',
        'om-blue': '#1E3A8A',
        'peace-teal': '#0D9488',
      },
      fontFamily: {
        'sanskrit': ['Noto Serif Devanagari', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
