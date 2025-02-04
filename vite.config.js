import { resolve } from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        home: resolve(__dirname, "home.html"),
        signUp: resolve(__dirname, "sign-up.html"),
        logout: resolve(__dirname, "logout.html"),
        shoppingCart: resolve(__dirname, "shopping-cart.html"),
      },
    },
  },
});
