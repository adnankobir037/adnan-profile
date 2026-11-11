/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#080f1c",
        concrete: "#151e2b",
        amber: {
          400: "#fbbf24",
        },
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
      boxShadow: {
        amber: "0 0 30px rgba(251, 191, 36, 0.12)",
      },
    },
  },
  plugins: [],
};
