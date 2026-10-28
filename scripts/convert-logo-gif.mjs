// Converts the animated logo GIF from the www.winapps.co.in header into a
// small animated WebP for this site's header.
//
//   node scripts/convert-logo-gif.mjs [path/to/logo.gif]   (default: brand/source/header-logo.gif)
//
// The GIF canvas has padding, and the ribbon swirls outside the finished
// logo, so every frame is cropped to the area the animation ever covers.
// Logo.astro then lines the last frame up exactly with the static logo, using
// the offsets this script writes to src/assets/brand/logo-animated.json.
import { writeFile } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import sharp from "sharp";

const input = process.argv[2] ?? "brand/source/header-logo.gif";
const output = "src/assets/brand/logo-animated.webp";
if (!existsSync(input)) {
  console.error(`Not found: ${input}`);
  process.exit(1);
}

const meta = await sharp(input, { animated: true }).metadata();
const frames = meta.pages ?? 1;

/** Bounding box of visible pixels in one frame, or null when it is empty. */
async function bbox(page) {
  const { data, info } = await sharp(input, { page }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let x0 = Infinity, y0 = Infinity, x1 = -1, y1 = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 16) {
        x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
      }
    }
  }
  return x1 < 0 ? null : { x0, y0, x1, y1 };
}

const boxes = [];
for (let i = 0; i < frames; i++) boxes.push(await bbox(i));
const all = boxes.filter(Boolean);
const union = {
  x0: Math.min(...all.map((b) => b.x0)), y0: Math.min(...all.map((b) => b.y0)),
  x1: Math.max(...all.map((b) => b.x1)), y1: Math.max(...all.map((b) => b.y1)),
};
const final = boxes.at(-1);
const crop = { left: union.x0, top: union.y0, width: union.x1 - union.x0 + 1, height: union.y1 - union.y0 + 1 };
const finalW = final.x1 - final.x0 + 1;
const finalH = final.y1 - final.y0 + 1;

// The header logo is 44px tall. 1.5x density keeps the file near 60 KB; it
// only shows for two seconds before the crisp static logo takes over.
const height = Math.round(((44 * 1.5) / finalH) * crop.height);
await sharp(input, { animated: true })
  .extract(crop)
  .resize({ height })
  .webp({ quality: 70, alphaQuality: 80, effort: 6, loop: 1 })
  .toFile(output);

// Where the crop sits relative to the finished logo, in % of the logo's box.
const layout = {
  durationMs: (meta.delay ?? []).reduce((a, b) => a + b, 0),
  left: (-(final.x0 - crop.left) / finalW) * 100,
  top: (-(final.y0 - crop.top) / finalH) * 100,
  height: (crop.height / finalH) * 100,
};
await writeFile("src/assets/brand/logo-animated.json", JSON.stringify(layout, null, 2) + "\n");

const kb = (f) => (statSync(f).size / 1024).toFixed(1);
console.log(`${input} (${frames} frames, ${kb(input)} KB) → ${output} (${kb(output)} KB, ${height}px tall, plays once)`);
console.log(layout);
