// Minimal static server for dist/, mounted at the configured base path.
// Used by the screenshot and Lighthouse scripts.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { gzipSync } from "node:zlib";

// Compress text like GitHub Pages / Netlify / Cloudflare do, so Lighthouse
// measures realistic transfer sizes.
const COMPRESSIBLE = /^(text\/|application\/(json|xml)|image\/svg)/;

const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain",
  ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml",
  ".woff2": "font/woff2", ".ico": "image/x-icon",
};

export const BASE = (process.env.BASE_PATH ?? "/winapps-website").replace(/\/$/, "");

export function serve(port = 4322, root = "dist") {
  const server = createServer(async (req, res) => {
    let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (!path.startsWith(BASE + "/") && path !== BASE) return send404();
    path = path.slice(BASE.length) || "/";
    let file = normalize(join(root, path));
    try {
      if ((await stat(file)).isDirectory()) file = join(file, "index.html");
      const body = await readFile(file);
      const type = TYPES[extname(file)] ?? "application/octet-stream";
      if (COMPRESSIBLE.test(type) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "")) {
        res.writeHead(200, { "Content-Type": type, "Content-Encoding": "gzip", Vary: "Accept-Encoding" });
        res.end(gzipSync(body));
      } else {
        res.writeHead(200, { "Content-Type": type });
        res.end(body);
      }
    } catch {
      send404();
    }
    async function send404() {
      const body = await readFile(join(root, "404.html")).catch(() => "Not found");
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(body);
    }
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}
