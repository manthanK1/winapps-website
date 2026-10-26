// Renders public/brand/og.png (1200×630): the logo on paper with the tagline,
// in the site fonts. Run after `npm run brand`.
import { readFile } from "node:fs/promises";
import { chromium } from "playwright";

const b64 = async (p) => (await readFile(p)).toString("base64");
const logo = await b64("src/assets/brand/logo.png");
const font600 = await b64("src/assets/fonts/schibsted-grotesk-600.woff2");
const font400 = await b64("src/assets/fonts/inter-400.woff2");

const html = `<!doctype html><html><head><style>
@font-face{font-family:S;src:url(data:font/woff2;base64,${font600});font-weight:600}
@font-face{font-family:I;src:url(data:font/woff2;base64,${font400});font-weight:400}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#F7F5F0;display:flex;align-items:center;gap:72px;padding:0 88px;position:relative;overflow:hidden}
img{height:300px;flex:none}
h1{font:600 60px/1.05 S;letter-spacing:-0.03em;color:#13595B}
p{margin-top:22px;font:400 24px/1.4 I;color:#5B6B6C}
.bar{position:absolute;left:0;right:0;bottom:0;height:14px;background:#0B2E2F}
.bar::before{content:"";position:absolute;left:0;top:-4px;width:240px;height:4px;background:linear-gradient(135deg,#F39A2B,#F6C21E)}
</style></head><body>
<img src="data:image/png;base64,${logo}" alt="">
<div><h1>Senior engineers for software that has to work.</h1><p>AI · Product · Cloud · Modernization<br>Est. 2013 · India, US, UK &amp; Europe</p></div>
<div class="bar"></div>
</body></html>`;

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL ?? "msedge" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/brand/og.png" });
await browser.close();
console.log("public/brand/og.png written");
