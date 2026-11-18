// What each built page downloads first: its own dictionary, the hero's script only where the hero is, the h1's font.
// Run with `npm test` (builds first). The helpers are repeated here, not imported from site.test.mjs: importing that
// file would run all of its tests a second time in this process.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, posix, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]))
const read = (rel) => readFileSync(join(dist, rel), 'utf8')
const pages = walk(dist)
  .filter((f) => f.endsWith('.html'))
  .map((f) => relative(dist, f).replaceAll('\\', '/'))
const LANGS = ['ge', 'en', 'az', 'ru']
const langOf = (page) => page.match(/^(en|az|ru)\//)?.[1] ?? 'ge'
const css = walk(join(dist, 'assets'))
  .filter((f) => f.endsWith('.css'))
  .map((f) => readFileSync(f, 'utf8'))
  .join('\n')

/** The page's main script and modulepreload links, as addresses ("/assets/index-….js"). */
const entryScripts = (html) =>
  [...html.matchAll(/<script type="module"[^>]*\ssrc="([^"]+)"|<link rel="modulepreload"[^>]*\shref="([^"]+)"/g)].map((m) => m[1] ?? m[2])

/** Every script the page loads before it runs: its scripts, its modulepreloads and what they import statically. */
function loadedScripts(html) {
  const seen = new Set()
  const visit = (url) => {
    if (seen.has(url)) return
    seen.add(url)
    const code = read(url)
    // static imports only: `from"./x.js"` and `import"./x.js"`; a dynamic `import(` is what must stay unloaded
    for (const m of code.matchAll(/from\s*["'`](\.\/[^"'`]+\.js)["'`]|import\s*["'`](\.\/[^"'`]+\.js)["'`]/g)) {
      visit(posix.join(posix.dirname(url), m[1] ?? m[2]))
    }
  }
  entryScripts(html).forEach(visit)
  return [...seen]
}
const loadedCode = (html) => loadedScripts(html).map(read).join('\n')

/** The skip link's text in each language, taken from the built home pages: it lives only in that language's dictionary. */
const skipText = Object.fromEntries(
  LANGS.map((lang) => [lang, read(lang === 'ge' ? 'index.html' : `${lang}/index.html`).match(/<a href="#main"[^>]*>([^<]+)</)[1]]),
)

test('every script and modulepreload link points to a file in dist/', () => {
  for (const page of pages) {
    for (const url of entryScripts(read(page))) {
      assert.match(url, /^\/assets\/[\w.-]+\.js$/, `${page}: ${url}`)
      assert.ok(existsSync(join(dist, url)), `${page}: ${url} is missing`)
    }
  }
})

test('each page preloads its own dictionary chunk and no other', () => {
  for (const page of pages) {
    const lang = langOf(page)
    const dicts = entryScripts(read(page)).filter((url) => /^\/assets\/(ge|en|az|ru)-[\w-]+\.js$/.test(url))
    assert.equal(dicts.length, 1, `${page}: ${dicts.length} dictionary chunks preloaded`)
    assert.match(dicts[0], new RegExp(`^/assets/${lang}-`), `${page} preloads ${dicts[0]}`)
  }
})

test("a page's scripts carry its own language's dictionary and no other language's", () => {
  for (const page of pages) {
    const lang = langOf(page)
    const code = loadedCode(read(page))
    assert.ok(code.includes(skipText[lang]), `${page}: its ${lang} dictionary is not loaded`)
    for (const other of LANGS.filter((l) => l !== lang)) {
      assert.ok(!code.includes(skipText[other]), `${page} loads the ${other} dictionary`)
    }
  }
  // the two the owner reads most, named
  assert.ok(!loadedCode(read('index.html')).includes(skipText.en), 'the Georgian home loads English')
  assert.ok(!loadedCode(read('en/index.html')).includes(skipText.ge), 'the English home loads Georgian')
})

test("the hero logo's animation loads only on pages that show the hero", () => {
  let heroPages = 0
  for (const page of pages) {
    const html = read(page)
    const hero = html.includes('data-hero-art')
    if (hero) heroPages++
    assert.equal(/webgl/.test(loadedCode(html)), hero, `${page}: hero ${hero ? 'without' : 'not shown, but'} its script`)
  }
  assert.equal(heroPages, LANGS.length, 'the hero is on the four home pages')
})

test("each page preloads exactly one font: the woff2 file its h1 is drawn in, used by the CSS", () => {
  // (React adds its own image preloads, e.g. the IdeaHub photo: only font preloads count here)
  const fontLinks = (page) => [...read(page).matchAll(/<link rel="preload"[^>]*\sas="font"[^>]*>/g)].map((m) => m[0])
  for (const page of pages) {
    const links = fontLinks(page)
    assert.equal(links.length, 1, `${page}: ${links.length} font preloads`)
    const [link] = links
    assert.match(link, /\stype="font\/woff2"/, `${page}: ${link}`)
    assert.match(link, /\scrossorigin[\s>/]/, `${page}: a font preload without crossorigin is fetched twice`)
    const href = link.match(/\shref="([^"]+)"/)[1]
    assert.match(href, /^\/assets\/[\w.-]+\.woff2$/, `${page}: ${href}`)
    assert.ok(existsSync(join(dist, href)), `${page}: ${href} is missing`)
    assert.ok(css.includes(`url(${href})`), `${page}: ${href} is not used by the CSS`)
  }
  const preloaded = (page) => fontLinks(page)[0].match(/\shref="\/assets\/([^"]+)"/)[1]
  assert.match(preloaded('index.html'), /^noto-sans-georgian-georgian-800-/)
  assert.match(preloaded('en/index.html'), /^inter-latin-800-/)
  assert.match(preloaded('ru/index.html'), /^inter-cyrillic-800-/)
  assert.match(preloaded('microsoft-365/index.html'), /^inter-latin-800-/, 'the Georgian Microsoft 365 h1 is Latin')
})

test('the build manifest is not deployed', () => {
  assert.ok(!existsSync(join(dist, '.vite')), 'dist/.vite is uploaded to Cloudflare as a static file')
})
