/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        secondary: '#1F2937',
        background: '#111827',
        text: '#F9FAFB',
        accent: '#10B981',
        error: '#EF4444',
      },
    },
  },
  plugins: [],
} 