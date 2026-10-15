import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  // Base relativa: faz o mesmo build funcionar na Vercel e em subcaminhos do GitHub Pages.
  base: "./",
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});
