import fs from "node:fs";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// Builds a fully self-contained, single-file HTML preview of the app for
// publishing as a hosted Artifact -- no server, no separate data files.
// A trimmed data bundle (see scripts/build-preview-artifact.mjs) is
// injected as an inline <script> that sets window.__HISTORY_PORTAL_BUNDLE__
// *before* the app's own module script runs, so useHistoricalData picks it
// up instead of trying to fetch() from public/data/ (which won't exist in
// a single published HTML page).
function injectBundle(): Plugin {
  return {
    name: "inject-preview-bundle",
    transformIndexHtml(html) {
      const bundleJs = fs.readFileSync("/tmp/preview-bundle.js", "utf8");
      return html.replace("<head>", `<head>\n    <script>${bundleJs}</script>`);
    },
  };
}

export default defineConfig({
  plugins: [react(), injectBundle(), viteSingleFile()],
  build: {
    outDir: "dist-preview",
    emptyOutDir: true,
  },
});
