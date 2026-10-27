// @ts-check
import { writeFile } from "node:fs/promises";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { LEGACY_REDIRECTS } from "./src/lib/legacy-redirects.ts";

// Where the site is served from. Defaults to the GitHub Pages project URL.
// When winapps.co.in points at the host, build with
//   SITE_URL=https://winapps.co.in BASE_PATH=/
// (see DEPLOY.md). Canonical URLs, the sitemap and OG tags all follow these.
const SITE_URL = process.env.SITE_URL ?? "https://manthank1.github.io";
const BASE_PATH = process.env.BASE_PATH ?? "/winapps-website";
const base = BASE_PATH.replace(/\/$/, "");

/** Real 301s for hosts that read a `_redirects` file (Netlify, Cloudflare Pages). */
const redirectsFile = {
  name: "legacy-redirects-file",
  hooks: {
    "astro:build:done": async (/** @type {{ dir: URL }} */ { dir }) => {
      const lines = Object.entries(LEGACY_REDIRECTS).map(([from, to]) => `${base}${from}  ${base}${to}  301!`);
      await writeFile(new URL("_redirects", dir), lines.join("\n") + "\n");
    },
  },
};

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: "always",
  build: {
    format: "directory",
    // One small stylesheet per page: inlining removes a render-blocking request.
    inlineStylesheets: "always",
  },
  redirects: Object.fromEntries(Object.entries(LEGACY_REDIRECTS).map(([from, to]) => [from, `${base}${to}`])),
  integrations: [
    sitemap({ filter: (page) => !page.includes("/styleguide/") }),
    redirectsFile,
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
