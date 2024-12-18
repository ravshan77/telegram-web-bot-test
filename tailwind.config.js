/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true, // container'ni o'rtaga joylashtirish uchun
        padding: '1rem 2rem', // asosiy ichki chekka
        screens: {
          sm: '600px',
          md: '728px',
          lg: '984px',
          xl: '1240px',
          '2xl': '1440px',
        },
      },
    },
  },
  plugins: [],
};
