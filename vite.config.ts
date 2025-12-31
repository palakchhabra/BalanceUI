import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { copyFileSync, cpSync, mkdirSync } from "fs";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-themes",
      closeBundle() {
        mkdirSync("dist/theme", { recursive: true });
         cpSync("src/theme/themes", "dist/theme", { recursive: true });
        copyFileSync(
          "src/theme/theme-contract.css",
          "dist/theme/theme-contract.css"
        );
        copyFileSync(
          "src/theme/design-tokens.css",
          "dist/theme/design-tokens.css"
        );
      },
    },
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "BalanceUI",
      formats: ["es", "cjs"],
      fileName: (format) => `balanceui.${format}.js`,
    },
    rollupOptions: {
      external: (id) => {
        return id === "react" || id === "react-dom" || id.startsWith("react/") || id.startsWith("react-dom/");
      },
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    cssCodeSplit: true, // 🔥 REQUIRED
  },
});
