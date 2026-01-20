import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svrg from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svrg()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/src/styles/global/variables.scss" as *;
        @use "/src/styles/global/mixins.scss" as *;
        `,
      },
    },
  },
});
