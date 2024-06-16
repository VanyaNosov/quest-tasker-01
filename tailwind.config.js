/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#080721",
        "gray": "#FAFAFB",
        "secondary": "#3E6BE0",
        "content" : "#6B6E85"
      },
      fontFamily: {
      }
    },
  },
  plugins: [],
}
