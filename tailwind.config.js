/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  safelist: [
    // add any dynamically generated classes you need here
    "bg-red-500",
    "text-center",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}