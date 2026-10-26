// Lighthouse (mobile, simulated 4G throttling) on every built page.
// Usage: npm run build && npm run lighthouse [-- --pages /,/work/ --detail]
// Uses the installed Edge; set CHROME_PATH to use another Chromium.
import { readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import { BASE, serve } from "./serve.mjs";

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const chromePath = process.env.CHROME_PATH ?? EDGE;

async function htmlPages(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlPages(p)));
    else if (e.name === "index.html") out.push("/" + relative("dist", dir).split(sep).join("/") + "/");
  }
  return out;
}

const arg = (name) => { const i = process.argv.indexOf(`--${name}`); return i > -1 ? process.argv[i + 1] : undefined; };
const detail = process.argv.includes("--detail");
const pages = arg("pages")?.split(",") ??
  (await htmlPages("dist")).map((p) => p.replace("//", "/")).filter((p) => !p.includes("styleguide"));
const server = await serve(4323);
const chrome = await chromeLauncher.launch({ chromePath, chromeFlags: ["--headless=new", "--disable-gpu"] });
const rows = [];
for (const page of pages) {
  const url = `http://localhost:4323${BASE}${page}`;
  const { lhr } = await lighthouse(url, { port: chrome.port, output: "json", logLevel: "error" });
  const s = (k) => Math.round(lhr.categories[k].score * 100);
  const a = (k) => lhr.audits[k].displayValue ?? "";
  const failing = Object.values(lhr.audits)
    .filter((au) => au.score !== null && au.score < 0.9 && au.scoreDisplayMode === "binary")
    .map((au) => au.id);
  if (detail) {
    console.log(`\n${page}  FCP ${a("first-contentful-paint")}  LCP ${a("largest-contentful-paint")}`);
    for (const item of lhr.audits["largest-contentful-paint-element"].details?.items ?? []) console.log(JSON.stringify(item).slice(0, 600));
  }
  rows.push({ page, perf: s("performance"), a11y: s("accessibility"), bp: s("best-practices"), seo: s("seo"), lcp: a("largest-contentful-paint"), cls: a("cumulative-layout-shift"), tbt: a("total-blocking-time"), failing: failing.join(",") });
}
await chrome.kill();
server.close();
console.table(rows);
