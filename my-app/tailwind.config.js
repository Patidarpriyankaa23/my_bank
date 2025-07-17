/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",            // ✅ for your main HTML file
    "./src/**/*.{js,jsx,ts,tsx}",  // ✅ for all components/pages in src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
