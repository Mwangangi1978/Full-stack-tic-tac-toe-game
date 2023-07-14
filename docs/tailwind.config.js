/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        'popup': '0px 0px 15px black',
        'button-popup': '0px 0px 10px black'
      }
    },
  },
  plugins: [],
}

