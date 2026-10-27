// Site QA on the built output:
//  1. every internal link / asset resolves, and every #fragment exists
//  2. one <h1> per page and no skipped heading levels
//  3. keyboard & interaction checks (skip link, menus, prompt box → form, FAQ, form)
// Usage: npm run build && node scripts/qa.mjs [--browser chromium|firefox|webkit]
import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { chromium, firefox, webkit } from "playwright";
import { BASE, serve } from "./serve.mjs";

const failures = [];
const fail = (msg) => failures.push(msg);

/* ---------- 1 & 2: static checks ---------- */
async function files(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await files(p)));
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}
const exists = (p) => stat(p).then(() => true, () => false);
const htmlFiles = await files("dist");
const ids = new Map();
const pages = new Map();
for (const f of htmlFiles) {
  const html = await readFile(f, "utf8");
  const url = "/" + relative("dist", f).split(sep).join("/").replace(/index\.html$/, "");
  pages.set(url, html);
  ids.set(url, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

for (const [url, html] of pages) {
  // Redirect stubs for old winapps.co.in URLs: only their link is checked.
  const isRedirect = html.includes('http-equiv="refresh"');
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (!isRedirect && h1s !== 1) fail(`${url}: ${h1s} <h1> elements`);
  const levels = [...html.replace(/<dialog[\s\S]*?<\/dialog>/, "").matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  levels.forEach((l, i) => { if (i && l > levels[i - 1] + 1) fail(`${url}: heading jumps h${levels[i - 1]} → h${l}`); });

  const markup = html.replace(/<script[\s\S]*?<\/script>/g, "");
  for (const [, attr, raw] of markup.matchAll(/\s(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:)/.test(raw)) continue;
    const [path, hash] = raw.split("#");
    let target = url;
    if (path) {
      if (!path.startsWith(BASE + "/")) { fail(`${url}: ${attr} outside base path: ${raw}`); continue; }
      target = path.slice(BASE.length).split("?")[0];
      const file = join("dist", target);
      const ok = target.endsWith("/") ? await exists(join(file, "index.html")) : await exists(file);
      if (!ok) { fail(`${url}: broken ${attr} → ${raw}`); continue; }
    }
    if (hash && pages.has(target) && !ids.get(target).has(hash)) fail(`${url}: missing #${hash} on ${target}`);
  }
}

/* ---------- 3: interaction checks ---------- */
const engines = { chromium, firefox, webkit };
const name = process.argv.includes("--browser") ? process.argv[process.argv.indexOf("--browser") + 1] : "chromium";
const launchOpts = name === "chromium" ? { channel: process.env.PW_CHANNEL ?? "msedge" } : {};
const server = await serve(4325);
const browser = await engines[name].launch(launchOpts);
const origin = `http://localhost:4325${BASE}`;
const check = async (label, fn) => { try { await fn(); } catch (e) { fail(`[${name}] ${label}: ${e.message.split("\n")[0]}`); } };
const assert = (cond, msg) => { if (!cond) throw new Error(msg); };

// Mobile
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: name !== "firefox" });
  const page = await ctx.newPage();
  await page.goto(origin + "/");

  await check("skip link is first tab stop", async () => {
    if (name === "webkit") {
      // Safari/WebKit skips links on Tab by default (Option+Tab reaches them),
      // so check DOM order instead.
      const first = await page.evaluate(() => document.querySelector("a[href], button, input, select, textarea, summary")?.textContent?.trim());
      assert(first === "Skip to content", "skip link is not the first focusable element");
    } else {
      await page.keyboard.press("Tab");
      assert((await page.evaluate(() => document.activeElement?.textContent?.trim())) === "Skip to content", "first focus is not the skip link");
    }
  });
  await check("mobile menu opens, traps focus, closes on Esc", async () => {
    await page.click("[data-menu-open]");
    assert(await page.evaluate(() => document.getElementById("mobile-menu").open), "dialog did not open");
    for (let i = 0; i < 15; i++) await page.keyboard.press("Tab");
    assert(await page.evaluate(() => document.getElementById("mobile-menu").contains(document.activeElement)), "focus escaped the menu");
    await page.keyboard.press("Escape");
    assert(!(await page.evaluate(() => document.getElementById("mobile-menu").open)), "Esc did not close the menu");
    await page.waitForFunction(() => document.activeElement?.hasAttribute("data-menu-open"), null, { timeout: 2000 })
      .catch(() => { throw new Error("focus not returned to the Menu button"); });
  });
  await check("home prompt box pre-fills the contact form", async () => {
    await page.fill("#build-message", "A booking app for our clinics");
    await page.click("label.build-chip:has-text('Cloud')");
    await page.click("form[aria-labelledby=build-title] button[type=submit]");
    await page.waitForURL(/\/contact\//);
    assert((await page.inputValue("#cf-message")) === "A booking app for our clinics", "message not carried over");
    assert(await page.isChecked("input[name=needs][value=Cloud]"), "need not pre-selected");
  });
  await check("no horizontal scroll at 390px", async () => {
    for (const p of ["/", "/contact/", "/work/fitness-member-app/", "/blog/building-agentic-ai-applications-problem-first-approach-2026/", "/news/"]) {
      await page.goto(origin + p);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      assert(over <= 0, `${p} overflows by ${over}px`);
    }
  });
  await ctx.close();
}

// Desktop
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(origin + "/");
  await check("header dropdown opens with keyboard, closes on Esc", async () => {
    const trigger = page.locator("[data-menu-trigger]").first();
    await trigger.focus();
    await page.keyboard.press("Enter");
    assert((await trigger.getAttribute("aria-expanded")) === "true", "menu did not open");
    assert(await page.locator("#menu-what-we-do a[href$='/services/ai-ml/']").isVisible(), "service link not visible");
    // WebKit skips links on Tab (see the skip-link check), which would leave the menu.
    if (name !== "webkit") await page.keyboard.press("Tab");
    await page.keyboard.press("Escape");
    assert((await trigger.getAttribute("aria-expanded")) === "false", "Esc did not close the menu");
    assert(await trigger.evaluate((el) => el === document.activeElement), "focus not returned to the menu button");
  });
  await check("service CTA pre-selects the need on the contact form", async () => {
    await page.goto(origin + "/services/data-analytics/");
    await page.click("main a.btn-dark:has-text('Book a 30-min intro call')");
    await page.waitForURL(/\/contact\//);
    assert(await page.isChecked("input[name=needs][value='Data & analytics']"), "need not pre-selected");
  });
  await check("FAQ opens with keyboard", async () => {
    await page.goto(origin + "/");
    const s = page.locator("details.faq-item summary").first();
    await s.focus();
    await page.keyboard.press("Enter");
    assert(await page.locator("details.faq-item").first().evaluate((d) => d.open), "details did not open");
  });
  await check("contact form blocks empty submit and focuses first error", async () => {
    await page.goto(origin + "/contact/");
    await page.click("[data-submit]");
    assert(await page.locator("#cf-name-error").isVisible(), "name error not shown");
    assert((await page.evaluate(() => document.activeElement?.id)) === "cf-name", "focus not moved to first invalid field");
    assert((await page.getAttribute("#cf-email", "aria-invalid")) === "true", "email not marked invalid");
  });
  await check("all tap targets ≥ 44px tall in header", async () => {
    const small = await page.$$eval("header a, header button", (els) => els.filter((e) => e.offsetParent && e.getBoundingClientRect().height < 44).map((e) => e.textContent.trim() || e.outerHTML.slice(0, 60)));
    assert(small.length === 0, `small targets: ${small.join(", ")}`);
  });
  await ctx.close();
}

await browser.close();
server.close();
console.log(`${htmlFiles.length} pages checked in ${name}.`);
if (failures.length) { console.log(failures.map((f) => "✗ " + f).join("\n")); process.exit(1); }
console.log("✓ All checks passed.");
