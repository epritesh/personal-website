/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-cyan': '#22d3ee',
        'brand-indigo': '#4338ca',
        'brand-purple': '#7c3aed',
      },
      fontFamily: {
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
