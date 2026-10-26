// Builds a labelled contact sheet from a folder of .jpg images, used to
// review image candidates. Files named 00.jpg, 01.jpg… are labelled by number.
// Usage: node scripts/contact-sheet.mjs <folder> <out.png> [cols] [tileWidth]
import { readdir } from "node:fs/promises";
import sharp from "sharp";

const [dir, out, colsArg, wArg] = process.argv.slice(2);
const cols = Number(colsArg ?? 4), W = Number(wArg ?? 300), H = Math.round(W * 2 / 3), PAD = 8;
const files = (await readdir(dir)).filter((f) => /\.jpe?g$/i.test(f)).sort();
const rows = Math.ceil(files.length / cols);
const tiles = await Promise.all(files.map(async (f) => {
  const img = await sharp(`${dir}/${f}`).resize(W, H, { fit: "cover" }).toBuffer().catch(() => null);
  const text = /^\d+\.jpe?g$/i.test(f) ? String(parseInt(f)) : f.replace(/\.jpe?g$/i, "");
  const label = Buffer.from(`<svg width="${W}" height="${H}"><rect x="0" y="0" width="${text.length * 11 + 18}" height="30" fill="#000" opacity="0.75"/><text x="8" y="22" font-family="Arial" font-size="18" font-weight="bold" fill="#fff">${text}</text></svg>`);
  return { img, label };
}));
await sharp({ create: { width: cols * (W + PAD) + PAD, height: Math.max(1, rows) * (H + PAD) + PAD, channels: 3, background: "#ddd" } })
  .composite(tiles.flatMap((t, i) => {
    const left = PAD + (i % cols) * (W + PAD), top = PAD + Math.floor(i / cols) * (H + PAD);
    return t.img ? [{ input: t.img, left, top }, { input: t.label, left, top }] : [{ input: t.label, left, top }];
  }))
  .png()
  .toFile(out);
console.log(`${out}: ${files.length} images`);
