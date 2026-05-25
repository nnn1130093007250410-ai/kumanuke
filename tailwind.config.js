/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50:  '#EFF5F0',
          100: '#C8DFC9',
          600: '#1F5C2E',
          700: '#194E26',
          800: '#143D1E',
          900: '#0C2914',
        },
        orange: {
          50:  '#FFF4ED',
          400: '#E07A30',
          600: '#C05A18',
          800: '#8A3C0A',
        },
        gray: {
          50:  '#F8F8F6',
          100: '#EFEFED',
          200: '#DDDDD8',
          400: '#9A9A95',
          600: '#5A5A55',
          800: '#2A2A26',
          900: '#1A1A16',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', '"Hiragino Kaku Gothic ProN"', 'sans-serif'],
        serif: ['"Noto Serif JP"', 'serif'],
        en: ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
