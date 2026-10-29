// Assertions over the built site in dist/. Run with `npm test` (builds first).
import { test } from 'node:test'
import assert from 'node:assert/strict'
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
