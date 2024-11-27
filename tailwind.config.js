/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-blue": "#f0f8ff",
        "red-700": "#AF2658",
        "gray-600": "#4b5563",
        "gray-800": "#1f2937",
        'red-700': '#b91c1c',
      },
      borderRadius: {
        '100px': '100px',
        '200px': '200px',
      },
    },
  },
  plugins: [],
};
