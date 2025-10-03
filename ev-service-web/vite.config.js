import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: "index.html", // Sửa từ "src/index.html" thành "index.html"
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    host: "localhost",
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./css/variables.css";`,
      },
    },
  },
  optimizeDeps: {
    include: ["chart.js", "axios", "moment"],
  },
});
