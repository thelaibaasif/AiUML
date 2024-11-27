/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-blue": "#f0f8ff", // Add this custom color for the background
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Add the forms plugin here
  ],
};

