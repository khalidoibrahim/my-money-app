// Build step: download the Google Fonts the app uses into www/fonts/ and point
// index.html at the local copies, so the APK works fully offline and needs no
// internet permission. If the download fails, the app falls back to system fonts.
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const html = await readFile('www/index.html', 'utf8');
const m = html.match(/<link rel="stylesheet" href="(https:\/\/fonts\.googleapis\.com\/css2[^"]+)">/);
if (!m) { console.log('No Google Fonts link found; nothing to do.'); process.exit(0); }

const UA = 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Mobile Safari/537.36';
const cssUrl = m[1].replace(/&amp;/g, '&');
let css = await (await fetch(cssUrl, { headers: { 'User-Agent': UA } })).text();

await mkdir('www/fonts', { recursive: true });
const urls = [...new Set(css.match(/https:\/\/fonts\.gstatic\.com\/[^)\s]+/g) || [])];
let i = 0;
for (const u of urls) {
  const name = `f${i++}.woff2`;
  const buf = Buffer.from(await (await fetch(u, { headers: { 'User-Agent': UA } })).arrayBuffer());
  await writeFile(`www/fonts/${name}`, buf);
  css = css.split(u).join(name);
}
await writeFile('www/fonts/fonts.css', css);

const out = html
  .replace(m[0], '<link rel="stylesheet" href="fonts/fonts.css">')
  .replace(/<link rel="preconnect" href="https:\/\/fonts\.(googleapis|gstatic)\.com"( crossorigin)?>\n?/g, '');
await writeFile('www/index.html', out);
console.log(`Bundled ${urls.length} font files.`);
