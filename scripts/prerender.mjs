/**
 * Build step 3 of 3 (see "build" in package.json): writes a finished HTML file for every page
 * in every language, so each address loads with its content, title and description in place.
 *   dist/index.html            Georgian home      dist/en/index.html, dist/az/, dist/ru/   other homes
 *   dist/services/index.html   Georgian services  dist/en/services/index.html ...
 * With VITE_SITE_URL set it also adds canonical / hreflang links, og:url and sitemap.xml.
 * Only Georgian and English go to search engines (INDEXED); Azerbaijani and Russian say noindex.
 * It also writes dist/404.html, dist/en/404.html ... ("page not found", noindex), which Cloudflare
 * serves with a 404 status for unknown addresses (not_found_handling: "404-page" in wrangler.jsonc).
 * Each page preloads what it needs first: its own language's dictionary, the hero logo's script where the hero is
 * shown, and the font file its h1 is drawn in (see "Preloads" below).
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
/*
 * The languages search engines may list (owner, 12 November 2026). Azerbaijani and Russian wait for a
 * native speaker's read: they say noindex, stay out of the sitemap and out of the hreflang links.
 */
const INDEXED = ['ge', 'en'];
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

/* Georgian and English pages: the company data from index.html, plus its address and logo. */
const georgiaLd = () => {
  const data = JSON.parse(template.match(LD_BLOCK)[0].replace(/^<script[^>]*>|<\/script>$/g, ''));
  return `<script type="application/ld+json">${JSON.stringify({ ...data, ...(siteUrl && { url: `${siteUrl}/`, logo: `${siteUrl}/icon-512.png` }) })}</script>`;
};

/* On the home page: the site's name, so search results can show "BUZ Tech" rather than the address. */
const websiteLd = () =>
  `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BUZ Tech',
    alternateName: 'BUZ Tech Georgia',
    url: `${siteUrl}/`,
  })}</script>`;

/*
 * Preloads. The client build's manifest (dist/.vite/manifest.json, see vite.config.ts) names the hashed files.
 * - Each language's dictionary is a chunk of its own (src/i18n/loadDictionary.ts) that the main script loads
 *   before it hydrates; a modulepreload link fetches it alongside the main script instead of after it.
 * - The hero logo's animation (src/motion/heroLogo.ts) is a chunk of its own too, preloaded only where the hero is.
 * - The h1's font is otherwise found only once the CSS is applied; the h1 is the first thing a visitor reads.
 */
const MANIFEST = path.join(dist, '.vite', 'manifest.json');
const manifest = JSON.parse(await readFile(MANIFEST, 'utf8'));
const entry = manifest['index.html'];
if (!entry?.isEntry) throw new Error('prerender: the build manifest has no index.html entry');
const HERO_SRC = 'src/motion/heroLogo.ts';

/** Adds the file of manifest chunk `key` and of every chunk it imports to `into`. */
const collectChunk = (key, into) => {
  const chunk = manifest[key];
  if (!chunk || into.has(chunk.file)) return;
  into.add(chunk.file);
  for (const dep of chunk.imports ?? []) collectChunk(dep, into);
};
const loadedByEntry = new Set();
collectChunk('index.html', loadedByEntry);
/** The chunk built from `src` and those it imports, minus what every page loads anyway (the entry and its imports). */
function chunkFiles(src) {
  if (!manifest[src]) throw new Error(`prerender: ${src} is not a chunk of its own in the build manifest`);
  const files = new Set();
  collectChunk(src, files);
  return [...files].filter((file) => !loadedByEntry.has(file));
}

/* The template's main script: preloads go next to it. */
const ENTRY_SCRIPT = /<script type="module" crossorigin src="[^"]+"><\/script>/;
if (!ENTRY_SCRIPT.test(template)) throw new Error('prerender: index.html is missing the main module script');

const cssText = (await Promise.all((entry.css ?? []).map((file) => readFile(path.join(dist, file), 'utf8')))).join('\n');
const cssVar = (name) => cssText.match(new RegExp(`--${name}:\\s*([^;}]+)`))?.[1].trim();
/** A custom property's value, with a var(--other) value followed to the end. */
const cssValue = (name) => {
  const value = cssVar(name);
  const ref = value?.match(/^var\(--([\w-]+)\)$/)?.[1];
  return ref ? cssValue(ref) : value;
};
/*
 * The page's font stack (Tailwind's default family), the families in the order the browser tries them.
 * (Not looked up by the theme variable's own name: Tailwind reads this file too and would add that utility class.)
 */
const fontStack = (cssValue('default-font-family') ?? '').split(',').map((family) => family.trim().replace(/^["']|["']$/g, ''));
if (!fontStack[0]) throw new Error('prerender: the CSS has no --default-font-family');
/** "U+0000-00FF,U+0131" -> [[0, 255], [305, 305]] */
const parseRanges = (list) =>
  list.split(',').map((part) => {
    const [lo, hi = lo] = part.trim().replace(/^U\+/i, '').split('-');
    return [parseInt(lo.replace(/\?/g, '0'), 16), parseInt(hi.replace(/\?/g, 'F'), 16)];
  });
/** Built file -> its source in node_modules (from the manifest), for the subset's unicode-range. */
const sourceOf = new Map(Object.values(manifest).filter((chunk) => chunk.src).map((chunk) => [`/${chunk.file}`, chunk.src]));
/**
 * Every woff2 @font-face in the CSS, in order, with the characters it covers: its unicode-range, or, where the CSS
 * has none (the Fontsource subset files), the subset's range from the package's unicode.json.
 */
const fontFaces = await Promise.all(
  [...cssText.matchAll(/@font-face\s*{([^}]*)}/g)].map(async ([, body]) => {
    const family = body.match(/font-family:\s*["']?([^;"']+)/)?.[1].trim();
    const weight = Number(body.match(/font-weight:\s*(\d+)/)?.[1]);
    const url = body.match(/url\(["']?([^)"']+\.woff2)["']?\)/)?.[1];
    let range = body.match(/unicode-range:\s*([^;}]+)/)?.[1];
    if (!range && url) {
      const src = sourceOf.get(url) ?? '';
      const pkgDir = path.join(root, path.dirname(src), '..');
      const subset = path.basename(src).replace(`${path.basename(pkgDir)}-`, '').replace(new RegExp(`-${weight}-normal\\.woff2$`), '');
      const subsets = JSON.parse(await readFile(path.join(pkgDir, 'unicode.json'), 'utf8').catch(() => '{}'));
      range = subsets[subset];
    }
    if (!family || !weight || !url || !range) throw new Error(`prerender: cannot tell which characters this font covers: ${body}`);
    return { family, weight, url, ranges: parseRanges(range) };
  }),
);
const decodeHtml = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&(quot|lt|gt|nbsp|amp);/g, (_, name) => ({ quot: '"', lt: '<', gt: '>', nbsp: ' ', amp: '&' })[name]);

/**
 * The woff2 file that draws most of the page's h1. Each character goes to the first family of the font stack with
 * a face of the h1's weight that covers it (faces of one family are tried last-declared first, as browsers do).
 * A Georgian h1 is mostly Noto Sans Georgian, an English one Inter Latin, a Russian one Inter Cyrillic.
 */
function h1Font(html, where) {
  const h1 = html.match(/<h1\b([^>]*)>([\s\S]*?)<\/h1>/);
  if (!h1) throw new Error(`prerender: ${where} has no h1`);
  const weightName = h1[1].match(/\bfont-(medium|extrabold)\b/)?.[1];
  const weight = weightName && Number(cssVar(`font-weight-${weightName}`));
  if (!weight) throw new Error(`prerender: the h1 of ${where} has no font weight class (font-medium or font-extrabold)`);
  const counts = new Map();
  for (const char of decodeHtml(h1[2].replace(/<[^>]*>/g, ''))) {
    if (/[\s­]/.test(char)) continue;
    const code = char.codePointAt(0);
    const covers = (face) => face.weight === weight && face.ranges.some(([lo, hi]) => code >= lo && code <= hi);
    const face = fontStack.map((family) => fontFaces.filter((f) => f.family === family).reverse().find(covers)).find(Boolean);
    if (face) counts.set(face.url, (counts.get(face.url) ?? 0) + 1);
  }
  return [...counts].sort((a, b) => b[1] - a[1])[0]?.[0];
}

/** The preload links for one rendered page: the h1's font before the main script, its chunks after it. */
function preloads(html, page, lang) {
  const font = h1Font(html, `${page} (${lang})`);
  const chunks = new Set([...chunkFiles(`src/i18n/${lang}.ts`), ...(html.includes('data-hero-art') ? chunkFiles(HERO_SRC) : [])]);
  return {
    before: font ? [`<link rel="preload" as="font" type="font/woff2" crossorigin href="${font}" />`] : [],
    after: [...chunks].map((file) => `<link rel="modulepreload" crossorigin href="/${file}" />`),
  };
}

/** Fills the template for one page; `extraHead` lines go into the page-head block. */
function pageHtml(page, lang, extraHead) {
  const { html, meta } = render(page, lang);
  const { before, after } = preloads(html, page, lang);
  const head = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    ...extraHead,
  ];
  const base = template.replace(LD_BLOCK, () => (lang === 'az' || lang === 'ru' ? bakuLd(lang) : georgiaLd()));
  return base
    .replace(/<html lang="[^"]*">/, `<html lang="${htmlLang[lang]}">`)
    .replace(HEAD_BLOCK, head.join('\n    '))
    .replace(ENTRY_SCRIPT, (script) => [...before, script, ...after].join('\n    '))
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
  const indexed = INDEXED.includes(lang);
  for (const page of pages) {
    const route = pagePath(page, lang);
    const head = indexed ? [] : ['<meta name="robots" content="noindex, follow" />'];
    if (siteUrl) {
      head.push(`<link rel="canonical" href="${siteUrl}${route}" />`, `<meta property="og:url" content="${siteUrl}${route}" />`);
      if (indexed) {
        head.push(
          ...INDEXED.map((l) => `<link rel="alternate" hreflang="${htmlLang[l]}" href="${siteUrl}${pagePath(page, l)}" />`),
          `<link rel="alternate" hreflang="x-default" href="${siteUrl}${pagePath(page, 'ge')}" />`,
        );
        urls.push(`${siteUrl}${route}`);
      }
      if (page === 'home' && lang === 'ge') head.push(websiteLd());
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
/* The manifest was only for the preloads: it is not part of the site. */
await rm(path.dirname(MANIFEST), { recursive: true, force: true });
