/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-blue": "#EAF6FE", // Updated light blue color for the background
        "red-700": "#B91C1C",   // Correct red-700 color
        "gray-600": "#4B5563",  // Standard gray-600 for text
        "gray-800": "#1F2937",  // Standard gray-800 for text
        "pink-700": "#AF2658",  // Additional pink-red shade
        "yellow-300": "#FFDE80", // Match your border color
      },
      borderRadius: {
        'custom': '4px',
        'custom-curve': '20px',
        "100px": "100px", // Consistent use for rounded sections
        "200px": "200px", // Larger rounded sections
        "custom": "4px",
        "full": "9999px", // Fully rounded corners if needed
      },
    },
  },
  plugins: [],
};
