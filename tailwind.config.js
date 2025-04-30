/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          'gudy-pink': '#FF69B1',
          'gudy-light-pink': '#FFC0D8',
          'gudy-bg-pink': '#FFC0CB',
        },
        fontFamily: {
          sans: ['var(--font-inter)', 'sans-serif'],
          paytone: ['var(--font-paytone)', 'sans-serif'],
        },
        borderRadius: {
          'large': '2rem',
        },
      },
    },
    plugins: [],
  }