import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.resolve(__dirname, "src"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
  },
  plugins: [react()],
});
