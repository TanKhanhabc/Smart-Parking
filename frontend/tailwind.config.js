/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#0b1220', panel: '#111c2f', accent: '#38bdf8' },
      boxShadow: { glow: '0 0 0 1px rgba(56,189,248,.12), 0 16px 40px rgba(0,0,0,.22)' }
    },
  },
  plugins: [],
}
