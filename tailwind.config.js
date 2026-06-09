module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          500: "#FBBF24",
        },
        orange: {
          500: "#FB923C",
        },
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'],  // Add Poppins as the default sans font
        },
      },
    },
  },
  plugins: [],
};
