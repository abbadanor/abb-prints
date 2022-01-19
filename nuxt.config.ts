import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  buildModules: [
    // pinia plugin - https://pinia.esm.dev
    ["@pinia/nuxt", "typeface-poppins"],
  ],
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
