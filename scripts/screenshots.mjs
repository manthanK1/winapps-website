// Full-page screenshots of the built site at the brief's breakpoints.
// Usage: npm run build && npm run shots -- [--pages /,/work/] [--widths 390,1440] [--out dir]
// Uses the installed Microsoft Edge via Playwright (no browser download).
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import { BASE, serve } from "./serve.mjs";

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const widths = arg("widths", "360,390,768,1024,1280,1440,1920").split(",").map(Number);
const pages = arg("pages", "/").split(",");
const out = arg("out", "screenshots");
await mkdir(out, { recursive: true });

const server = await serve(4322);
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "msedge" });
const report = [];
for (const page of pages) {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce", deviceScaleFactor: 1 });
    const tab = await context.newPage();
    await tab.goto(`http://localhost:4322${BASE}${page}`, { waitUntil: "networkidle" });
    await tab.evaluate(() => document.fonts.ready);
    // Scroll through once so lazy images load before the full-page capture.
    await tab.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await tab.waitForLoadState("networkidle");
    const overflow = await tab.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const name = `${page.replace(/\//g, "_").replace(/^_|_$/g, "") || "home"}-${width}.png`;
    await tab.screenshot({ path: `${out}/${name}`, fullPage: true });
    report.push(`${name}${overflow > 0 ? `  ⚠ horizontal overflow ${overflow}px` : ""}`);
    await context.close();
  }
}
await browser.close();
server.close();
console.log(report.join("\n"));
