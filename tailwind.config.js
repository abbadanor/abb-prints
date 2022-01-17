module.exports = {
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        current: "#262624",
        abb: {
          100: "#dc0000",
          200: "#ff000f",
          300: "#ff534a",
          400: "#f3f3ec",
        },
        // ...
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
