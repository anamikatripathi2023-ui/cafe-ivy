/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
      extend: {
        colors: {
          cream: { 50: '#FFFDF7', 100: '#FFF9E8', 200: '#FFF3D1', 300: '#FFEAB3', 400: '#FFE09A' },
          sand: { 50: '#FAF8F5', 100: '#F5F0EA', 200: '#EBE1D5', 300: '#DDD0BC', 400: '#C9B89E', 500: '#B5A080' },
          blush: { 50: '#FFF5F5', 100: '#FFE8E8', 200: '#FFD4D4', 300: '#FFB8B8', 400: '#FF9C9C' },
          sage: { 50: '#F5F8F5', 100: '#E8F0E8', 200: '#D4E1D4', 300: '#B8CDB8', 400: '#9CB99C' },
          mocha: { 50: '#FAF6F3', 100: '#F0E8E0', 200: '#E0D0C0', 300: '#C9B49C', 400: '#B39878', 500: '#9C7C54', 600: '#7A6043', 700: '#584432', 800: '#3C2E22', 900: '#1E1711' },
        },
        fontFamily: {
          display: ['"Playfair Display"', 'serif'],
          body: ['"DM Sans"', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };