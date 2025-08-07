import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@/app": path.resolve(__dirname, "src/App"),
      "@/components": path.resolve(__dirname, "src/components"),
      "@/config": path.resolve(__dirname, "src/config"),
      "@/contexts": path.resolve(__dirname, "src/contexts"),
      "@/hooks": path.resolve(__dirname, "src/hooks"),
      "@/pages": path.resolve(__dirname, "src/pages"),
      "@/styles": path.resolve(__dirname, "src/styles"),
      "@/types": path.resolve(__dirname, "src/types"),
      "@/utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
