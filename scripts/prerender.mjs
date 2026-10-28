/**
 * Build step 3 of 3 (see "build" in package.json): writes a finished HTML file for every page
 * in both languages, so each address loads with its content, title and description in place.
 *   dist/index.html            Georgian home      dist/en/index.html            English home
 *   dist/servers/index.html    Georgian servers   dist/en/servers/index.html    English servers ...
 * With VITE_SITE_URL set it also adds canonical / hreflang links, og:url and sitemap.xml.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadEnv } from 'vite';

const root = process.cwd();
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, pages, langs, pagePath } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const env = loadEnv('production', root, 'VITE_');
const siteUrl = (env.VITE_SITE_URL ?? '').replace(/\/+$/, '');

const HTML_LANG = { ge: 'ka', en: 'en' };
const OG_LOCALE = { ge: 'ka_GE', en: 'en_US' };
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const HEAD_BLOCK = /<!-- page-head[\s\S]*?<!-- \/page-head -->/;
if (!HEAD_BLOCK.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error('prerender: index.html is missing the page-head block or the empty #root');
}

const urls = [];
for (const lang of langs) {
  for (const page of pages) {
    const { html, meta } = render(page, lang);
    const route = pagePath(page, lang);

    const head = [
      `<title>${esc(meta.title)}</title>`,
      `<meta name="description" content="${esc(meta.description)}" />`,
      `<meta property="og:locale" content="${OG_LOCALE[lang]}" />`,
      `<meta property="og:title" content="${esc(meta.title)}" />`,
      `<meta property="og:description" content="${esc(meta.description)}" />`,
    ];
    if (siteUrl) {
      head.push(
        `<link rel="canonical" href="${siteUrl}${route}" />`,
        `<meta property="og:url" content="${siteUrl}${route}" />`,
        ...langs.map((l) => `<link rel="alternate" hreflang="${HTML_LANG[l]}" href="${siteUrl}${pagePath(page, l)}" />`),
        `<link rel="alternate" hreflang="x-default" href="${siteUrl}${pagePath(page, 'ge')}" />`,
      );
      urls.push(`${siteUrl}${route}`);
    }

    const out = template
      .replace(/<html lang="[^"]*">/, `<html lang="${HTML_LANG[lang]}">`)
      .replace(HEAD_BLOCK, head.join('\n    '))
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

    const file = path.join(dist, ...route.split('/').filter(Boolean), 'index.html');
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, out);
    console.log(`prerendered ${route}`);
  }
}

if (siteUrl) {
  const body = urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n');
  await writeFile(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
  );
  console.log(`sitemap.xml: ${urls.length} addresses`);
}

await rm(ssrDir, { recursive: true, force: true });
