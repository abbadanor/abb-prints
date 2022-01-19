module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        current: "#262624",
        abb: {
          100: "#dc0000",
          200: "#ff000f",
          300: "#ff534a",
          400: "#f3f3ec",
          500: "#1d1d1b",
        },
        // ...
      },
    },
  },
  plugins: [],
}