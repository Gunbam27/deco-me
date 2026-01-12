/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jua)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brown: {
          50: '#fff5f0',
          100: '#f9d7c6',
          300: '#c97a4a',
          500: '#7c3b18',
          700: '#4a1f0d',
        },
        pink: {
          100: '#fff2f2',
          200: '#fde2e7',
          500: '#fcbfc3',
        },
      },
    },
  },
  plugins: [],
};
