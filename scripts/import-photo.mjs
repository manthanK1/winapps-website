// Normalises a photo for the site: max 1600px wide, metadata (EXIF/GPS)
// stripped, high-quality JPEG. Astro generates AVIF/WebP sizes at build time.
// Usage: node scripts/import-photo.mjs <source.jpg> <src/assets/images/.../name.jpg>
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import sharp from "sharp";

const [from, to] = process.argv.slice(2);
await mkdir(dirname(to), { recursive: true });
const info = await sharp(from)
  .rotate() // respect EXIF orientation before metadata is dropped
  .resize({ width: 1600, withoutEnlargement: true })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(to);
console.log(`${to}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
