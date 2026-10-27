// Renders the hills backdrop (home hero, footer) from SVG to PNG. Shipped as
// a responsive AVIF/WebP picture rather than inline SVG: a full-width SVG
// with gradients costs hundreds of ms of main-thread paint on phones.
// Run with `node scripts/build-hills.mjs` after editing the shapes below.
import sharp from "sharp";

const W = 1440;
const H = 520;
const SCALE = 2; // 2880px wide output for high-density screens

// [x, y, scale] of the rounded "clay" trees.
const TREES = {
  hero: [[150, 318, 1], [196, 330, 0.8], [1228, 300, 1.1], [1282, 318, 0.85], [1330, 330, 0.7]],
  footer: [[120, 250, 1], [170, 262, 0.8], [1260, 236, 1.1], [1316, 254, 0.8]],
};

function svg(variant) {
  const trees = TREES[variant]
    .map(([x, y, s]) => `
      <g transform="translate(${x} ${y}) scale(${s})">
        <rect x="-9" y="-46" width="18" height="52" rx="9" fill="#0F4547" opacity="0.85"/>
        <rect x="-15" y="-30" width="30" height="34" rx="15" fill="#187173"/>
        <rect x="-11" y="-52" width="22" height="30" rx="11" fill="#2E9799"/>
      </g>`)
    .join("");
  // The hero sits on a teal-100 → teal-50 sky; the footer on white → teal-50.
  const sky = variant === "hero" ? ["#D6EDED", "#EEF7F7"] : ["#FFFFFF", "#EEF7F7"];
  const sun = variant === "hero" ? `<circle cx="1120" cy="236" r="64" fill="url(#sun)" opacity="0.9"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W * SCALE}" height="${H * SCALE}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="${H}" gradientUnits="userSpaceOnUse"><stop stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient>
      <linearGradient id="back" x1="0" y1="200" x2="0" y2="520" gradientUnits="userSpaceOnUse"><stop stop-color="#AEDADB"/><stop offset="1" stop-color="#7FC2C3"/></linearGradient>
      <linearGradient id="mid" x1="0" y1="260" x2="0" y2="520" gradientUnits="userSpaceOnUse"><stop stop-color="#4FA6A8"/><stop offset="1" stop-color="#1F8A8C"/></linearGradient>
      <linearGradient id="front" x1="0" y1="380" x2="0" y2="520" gradientUnits="userSpaceOnUse"><stop stop-color="#187173"/><stop offset="1" stop-color="#13595B"/></linearGradient>
      <radialGradient id="sun" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1120 236) scale(64)"><stop stop-color="#FAD64B"/><stop offset="0.7" stop-color="#F6C21E"/><stop offset="1" stop-color="#F6C21E" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#sky)"/>
    ${sun}
    <path d="M0 300C180 230 330 220 520 270C700 318 860 236 1040 214C1210 194 1330 236 1440 262V520H0Z" fill="url(#back)"/>
    <path d="M0 360C160 320 300 312 470 344C640 376 760 320 930 304C1110 288 1280 322 1440 352V520H0Z" fill="url(#mid)"/>
    ${trees}
    <path d="M0 430C220 400 420 396 720 420C1010 444 1230 404 1440 410V520H0Z" fill="url(#front)"/>
  </svg>`;
}

for (const variant of ["hero", "footer"]) {
  const out = `src/assets/images/hills-${variant}.png`;
  await sharp(Buffer.from(svg(variant))).png({ compressionLevel: 9 }).toFile(out);
  console.log(`wrote ${out}`);
}
