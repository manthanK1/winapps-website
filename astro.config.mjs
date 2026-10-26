// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// Where the site is served from. Defaults to the GitHub Pages project URL.
// When winapps.co.in points at the host, build with
//   SITE_URL=https://winapps.co.in BASE_PATH=/
// (see DEPLOY.md). Canonical URLs, the sitemap and OG tags all follow these.
const SITE_URL = process.env.SITE_URL ?? "https://manthank1.github.io";
const BASE_PATH = process.env.BASE_PATH ?? "/winapps-website";

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: "always",
  build: {
    format: "directory",
    // One small stylesheet per page: inlining removes a render-blocking request.
    inlineStylesheets: "always",
  },
  integrations: [
    sitemap({ filter: (page) => !page.includes("/styleguide/") }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
