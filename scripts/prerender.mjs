/**
 * Build step 3 of 3 (see "build" in package.json): writes a finished HTML file for every page
 * in every language, so each address loads with its content, title and description in place.
 *   dist/index.html            Georgian home      dist/en/index.html, dist/az/, dist/ru/   other homes
 *   dist/services/index.html   Georgian services  dist/en/services/index.html ...
 * With VITE_SITE_URL set it also adds canonical / hreflang links, og:url and sitemap.xml.
 * It also writes dist/404.html, dist/en/404.html ... ("page not found", noindex), which Cloudflare
 * serves with a 404 status for unknown addresses (not_found_handling: "404-page" in wrangler.jsonc).
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadEnv } from 'vite';

const root = process.cwd();
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, pages, langs, pagePath, htmlLang, offices, dictionaries } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const env = loadEnv('production', root, 'VITE_');
const siteUrl = (env.VITE_SITE_URL ?? '').replace(/\/+$/, '');

const OG_LOCALE = { ge: 'ka_GE', en: 'en_US', az: 'az_AZ', ru: 'ru_RU' };
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const HEAD_BLOCK = /<!-- page-head[\s\S]*?<!-- \/page-head -->/;
if (!HEAD_BLOCK.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error('prerender: index.html is missing the page-head block or the empty #root');
}

/*
 * The Organization data in index.html is LLC BUZ Tech Georgia's. Azerbaijani and Russian pages show the
 * Baku office and none of the Georgian company's facts, so they get the brand and the Baku contacts only.
 */
const LD_BLOCK = /<script type="application\/ld\+json">[\s\S]*?<\/script>/;
if (!LD_BLOCK.test(template)) throw new Error('prerender: index.html is missing the Organization JSON-LD');
const bakuLd = (lang) =>
  `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BUZ Tech',
    ...(siteUrl && { url: `${siteUrl}${pagePath('home', lang)}`, logo: `${siteUrl}/icon-512.png` }),
    slogan: 'Consulting · Cloud · Tech',
    telephone: offices.baku.phone,
    email: offices.baku.email,
    address: { '@type': 'PostalAddress', streetAddress: dictionaries[lang].contact.address, addressCountry: 'AZ' },
    areaServed: ['Georgia', 'Azerbaijan', 'Turkey', 'Uzbekistan', 'Kazakhstan'],
  })}</script>`;

/** Fills the template for one page; `extraHead` lines go into the page-head block. */
function pageHtml(page, lang, extraHead) {
  const { html, meta } = render(page, lang);
  const head = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    ...extraHead,
  ];
  const base = lang === 'az' || lang === 'ru' ? template.replace(LD_BLOCK, bakuLd(lang)) : template;
  return base
    .replace(/<html lang="[^"]*">/, `<html lang="${htmlLang[lang]}">`)
    .replace(HEAD_BLOCK, head.join('\n    '))
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

async function write(relPath, content) {
  const file = path.join(dist, ...relPath.split('/').filter(Boolean));
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content);
  console.log(`prerendered /${relPath.replace(/^\/+/, '').replace(/index\.html$/, '')}`);
}

const urls = [];
for (const lang of langs) {
  for (const page of pages) {
    const route = pagePath(page, lang);
    const head = [];
    if (siteUrl) {
      head.push(
        `<link rel="canonical" href="${siteUrl}${route}" />`,
        `<meta property="og:url" content="${siteUrl}${route}" />`,
        ...langs.map((l) => `<link rel="alternate" hreflang="${htmlLang[l]}" href="${siteUrl}${pagePath(page, l)}" />`),
        `<link rel="alternate" hreflang="x-default" href="${siteUrl}${pagePath(page, 'ge')}" />`,
      );
      urls.push(`${siteUrl}${route}`);
    }
    await write(`${route}index.html`, pageHtml(page, lang, head));
  }
  /* Cloudflare serves the nearest 404.html: /en/anything gets the English one. */
  await write(`${pagePath('home', lang)}404.html`, pageHtml('notFound', lang, ['<meta name="robots" content="noindex" />']));
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
