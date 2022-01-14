import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  srcDir: "./",
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 4000,
  },
});
