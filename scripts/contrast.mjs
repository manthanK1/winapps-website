// WCAG contrast check for the colour pairs the design system relies on.
const lum = (hex) => {
  const c = hex.match(/\w\w/g).map((h) => parseInt(h, 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

const pairs = [
  ["ink on paper", "#142224", "#F7F5F0", 4.5],
  ["stone-700 on paper", "#435253", "#F7F5F0", 4.5],
  ["muted on paper", "#5B6B6C", "#F7F5F0", 4.5],
  ["muted on white", "#5B6B6C", "#FFFFFF", 4.5],
  ["teal-600 on paper (large/UI only)", "#1F8A8C", "#F7F5F0", 3],
  ["teal-600 on white (large/UI only)", "#1F8A8C", "#FFFFFF", 3],
  ["teal-700 on paper (links)", "#187173", "#F7F5F0", 4.5],
  ["teal-700 on white (links)", "#187173", "#FFFFFF", 4.5],
  ["teal-800 on paper (headings)", "#13595B", "#F7F5F0", 4.5],
  ["ink on orange-500 (buttons)", "#142224", "#F39A2B", 4.5],
  ["ink on amber-400 (gradient end)", "#142224", "#F6C21E", 4.5],
  ["white on teal-950", "#FFFFFF", "#0B2E2F", 4.5],
  ["teal-100 on teal-950", "#D6EDED", "#0B2E2F", 4.5],
  ["teal-100 on teal-800", "#D6EDED", "#13595B", 4.5],
  ["amber-300 on teal-950", "#FAD64B", "#0B2E2F", 4.5],
  ["white on teal-700 (selected chip)", "#FFFFFF", "#187173", 4.5],
  ["teal-800 on teal-50 (chip)", "#13595B", "#EEF7F7", 4.5],
  ["error on white", "#B42318", "#FFFFFF", 4.5],
  ["white on orange-500 (NOT used)", "#FFFFFF", "#F39A2B", 4.5],
];
for (const [name, fg, bg, min] of pairs) {
  const r = ratio(fg, bg);
  console.log(`${r >= min ? "pass" : "FAIL"}  ${r.toFixed(2)}:1  (min ${min})  ${name}`);
}
