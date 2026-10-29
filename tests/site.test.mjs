// Assertions over the built site in dist/. Run with `npm test` (builds first).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  )
}

/** Absolute paths of every built HTML page. */
export function pages() {
  return walk(dist).filter((f) => f.endsWith('.html'))
}

/** Contents of dist/<rel>. */
export function html(rel) {
  return readFileSync(join(dist, rel), 'utf8')
}

/** The built CSS bundle text. */
export function css() {
  return walk(join(dist, 'assets'))
    .filter((f) => f.endsWith('.css'))
    .map((f) => readFileSync(f, 'utf8'))
    .join('\n')
}

const rel = (abs) => relative(dist, abs).replaceAll('\\', '/')

// "/en/about/" → "en/about/index.html"; "/favicon.svg" → "favicon.svg"
function targetFile(path) {
  const p = path.replace(/^\//, '')
  return p === '' || p.endsWith('/') ? `${p}index.html` : p
}

const ids = (page) => new Set([...page.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))

test('20 pages are built', () => {
  assert.equal(pages().length, 20)
})

test('every built page has exactly one h1', () => {
  for (const file of pages()) {
    const count = (readFileSync(file, 'utf8').match(/<h1[\s>]/g) ?? []).length
    assert.equal(count, 1, `${rel(file)} has ${count} <h1>`)
  }
})

const GATE =
  "<script>if(document.visibilityState==='visible'&&matchMedia('(prefers-reduced-motion: no-preference)').matches)document.documentElement.classList.add('motion')</script>"

test('pre-rendered pages carry the motion gate but never the motion class', () => {
  for (const file of pages()) {
    const page = readFileSync(file, 'utf8')
    const head = page.slice(page.indexOf('<head>'), page.indexOf('</head>'))
    assert.ok(head.includes(GATE), `${rel(file)}: gate script missing from <head>`)
    assert.doesNotMatch(page, /<html[^>]*class="[^"]*\bmotion\b/, `${rel(file)}: <html> has the motion class`)
  }
})

test('arrivals only run under .motion', () => {
  const c = css()
  assert.match(c, /\.motion \[data-arrive\]/)
  assert.match(c, /@keyframes arrive/)
  for (const cls of ['slab', 'wire']) {
    assert.match(c, new RegExp(`\\.motion \\.${cls}\\s*\\{[^}]*animation`), `.${cls} animation not under .motion`)
    // a selector that starts with .slab / .wire (not ".motion .slab") carrying an animation
    assert.doesNotMatch(c, new RegExp(`(^|[{},;])\\s*\\.${cls}\\s*\\{[^}]*animation`), `un-gated .${cls} animation`)
  }
})

test('reduced motion and page transitions are declared', () => {
  const c = css()
  assert.match(c, /@view-transition\s*\{\s*navigation:\s*auto/)
  const reduced = [...c.matchAll(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{/g)].map((m) =>
    c.slice(m.index, m.index + 400),
  )
  assert.ok(reduced.some((block) => /navigation:\s*none/.test(block)), 'no navigation:none under reduced motion')
})

const count = (text, re) => (text.match(re) ?? []).length

test('every page has an arrival at its top', () => {
  for (const file of pages()) {
    assert.ok(count(readFileSync(file, 'utf8'), /\sdata-arrive[=\s>]/g) >= 1, `${rel(file)} has no data-arrive`)
  }
})

test('content below the top can reveal', () => {
  assert.ok(count(html('index.html'), /\sdata-reveal[=\s>]/g) >= 8, 'home has fewer than 8 data-reveal')
  for (const lang of ['', 'en/']) {
    const page = html(`${lang}contact/index.html`)
    const form = page.slice(page.indexOf('<form'), page.indexOf('</form>'))
    assert.ok(form.length > 0, `${lang}contact has no <form>`)
    assert.equal(count(form, /\sdata-reveal[=\s>]/g), 0, `${lang}contact form has data-reveal`)
  }
})

test('no reveal state is baked into HTML', () => {
  for (const file of pages()) {
    assert.doesNotMatch(readFileSync(file, 'utf8'), /data-in\b|reveal-ready/, `${rel(file)} has reveal state`)
  }
})

test('reveal hidden state is gated', () => {
  assert.ok(css().includes('.reveal-ready [data-reveal]:not([data-in])'))
})

test('lift effects only apply on hover-capable devices and with motion allowed', () => {
  const c = css()
  // rules that set --tw-translate-y on :hover (also group-hover's ":hover *)")
  const lifts = [...c.matchAll(/:hover(?: \*\))?\{[^}]*--tw-translate-y:/g)]
  assert.ok(lifts.length > 0, 'no hover lift rules found')
  for (const m of lifts) {
    const before = c.slice(Math.max(0, m.index - 400), m.index)
    const rule = c.slice(Math.max(0, m.index - 80), m.index + 60)
    assert.ok(before.includes('hover:hover'), `lift outside (hover:hover): ${rule}`)
    assert.ok(before.includes('prefers-reduced-motion:no-preference'), `lift outside motion-safe: ${rule}`)
  }
})

test('menus are always rendered, closed by visibility', () => {
  for (const file of pages()) {
    const page = readFileSync(file, 'utf8')
    for (const id of ['products-menu', 'mobile-nav']) {
      const tag = page.match(new RegExp(`<[a-z]+[^>]*\\sid="${id}"[^>]*>`))?.[0]
      assert.ok(tag, `${rel(file)}: #${id} missing`)
      assert.match(tag, /\sdata-open="false"/, `${rel(file)}: #${id} not data-open="false"`)
      // neither the hidden attribute nor a bare `hidden` class (display:none cannot fade)
      assert.doesNotMatch(tag, /[\s"]hidden[\s>="]/, `${rel(file)}: #${id} is display:none`)
    }
  }
})

test('header can show a shadow', () => {
  assert.match(css(), /\[data-scrolled=true\][^{]*\{[^}]*box-shadow/)
})

const headersBlock = () => {
  const lines = html('_headers').split(/\r?\n/)
  const start = lines.findIndex((l) => l.trim() === '/*')
  assert.ok(start >= 0, '_headers has no /* block')
  const block = []
  for (const line of lines.slice(start + 1)) {
    if (!/^\s/.test(line)) break
    block.push(line.trim())
  }
  return block
}
const csp = () => headersBlock().find((l) => l.startsWith('Content-Security-Policy:')) ?? ''

test('security headers are published', () => {
  const block = headersBlock().join('\n')
  for (const h of [
    'X-Content-Type-Options: nosniff',
    'Referrer-Policy: strict-origin-when-cross-origin',
    'X-Frame-Options: DENY',
  ]) {
    assert.ok(block.includes(h), `missing ${h}`)
  }
  const permissions = headersBlock().find((l) => l.startsWith('Permissions-Policy:')) ?? ''
  for (const p of ['camera=()', 'microphone=()', 'geolocation=()']) assert.ok(permissions.includes(p), `Permissions-Policy lacks ${p}`)
  for (const d of [
    "default-src 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'https://api.web3forms.com',
    'https://static.cloudflareinsights.com',
    'https://cloudflareinsights.com',
  ]) {
    assert.ok(csp().includes(d), `CSP lacks ${d}`)
  }
})

test('CSP allows exactly the inline gate script', () => {
  const gate = html('index.html').match(/<script>([\s\S]*?)<\/script>/)?.[1]
  assert.ok(gate, 'no inline gate script in index.html')
  const hash = createHash('sha256').update(gate).digest('base64')
  assert.ok(csp().includes(`'sha256-${hash}'`), `CSP lacks 'sha256-${hash}'`)
  for (const file of pages()) {
    for (const [, attrs, body] of readFileSync(file, 'utf8').matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
      if (/\ssrc=/.test(attrs ?? '') || /type="application\/ld\+json"/.test(attrs ?? '')) continue
      assert.equal(body, gate, `${rel(file)}: unexpected inline script`)
    }
  }
})

test('form fields are length-limited', () => {
  for (const lang of ['', 'en/']) {
    const page = html(`${lang}contact/index.html`)
    for (const [id, max] of [['company', 120], ['email', 254], ['message', 2000]]) {
      const tag = page.match(new RegExp(`<(?:input|textarea)[^>]*\\sid="${id}"[^>]*>`))?.[0] ?? ''
      // React renders maxLength="…"; HTML attribute names are case-insensitive
      assert.match(tag, new RegExp(`\\smaxlength="${max}"`, 'i'), `${lang}contact #${id} lacks maxlength=${max}`)
    }
  }
})

test('wrangler is pinned', () => {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
  assert.equal(pkg.devDependencies?.wrangler, '4.154.0')
})

test('internal links resolve', () => {
  const broken = []
  for (const file of pages()) {
    const page = readFileSync(file, 'utf8')
    for (const [, url] of page.matchAll(/\s(?:href|src)="([^"]*)"/g)) {
      if (!url.startsWith('#') && !(url.startsWith('/') && !url.startsWith('//'))) continue
      const [pathAndQuery, anchor] = url.split('#')
      const path = pathAndQuery.split('?')[0]
      const target = path === '' ? rel(file) : targetFile(path)
      if (!existsSync(join(dist, target))) {
        broken.push(`${rel(file)}: ${url} (no ${target})`)
        continue
      }
      if (anchor && target.endsWith('.html') && !ids(html(target)).has(anchor)) {
        broken.push(`${rel(file)}: ${url} (no id "${anchor}")`)
      }
    }
  }
  assert.deepEqual(broken, [])
})
