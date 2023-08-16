/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        '000000':'#000000',
        '52057B':'#52057B',
        '892CDC':'#892CDC',
        'BC6FF1':'#BC6FF1',
        'C70039': '#C70039'
      }
    },
  },
  plugins: [],
};