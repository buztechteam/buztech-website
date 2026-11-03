// The home-page language choice (worker/index.js), one case per rule.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import worker, { chooseLang } from '../worker/index.js'

const host = 'buztech.example'
const chrome = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36'
const visit = (over) => chooseLang({ host, userAgent: chrome, ...over })

test('a link from our own site keeps the Georgian home', () => {
  assert.equal(visit({ referer: `https://${host}/ru/`, acceptLanguage: 'ru-RU,ru;q=0.9', country: 'RU' }), 'ge')
})

test('crawlers and requests without Accept-Language keep the Georgian home', () => {
  const googlebot = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
  assert.equal(visit({ userAgent: googlebot, acceptLanguage: 'en-US', country: 'US' }), 'ge')
  assert.equal(visit({ userAgent: 'WhatsApp/2.23', acceptLanguage: 'ru', country: 'AZ' }), 'ge')
  assert.equal(visit({ acceptLanguage: '', country: 'US' }), 'ge')
})

test("the browser's first language wins when it is Georgian, Azerbaijani or Russian", () => {
  assert.equal(visit({ acceptLanguage: 'ka-GE,ka;q=0.9,en;q=0.8', country: 'DE' }), 'ge')
  assert.equal(visit({ acceptLanguage: 'ru-RU,ru;q=0.9', country: 'GE' }), 'ru')
  assert.equal(visit({ acceptLanguage: 'az,en;q=0.5', country: 'TR' }), 'az')
  assert.equal(visit({ acceptLanguage: 'en;q=0.4, ru;q=0.9', country: 'US' }), 'ru', 'weights decide, not order')
})

test('an English browser falls back to the country', () => {
  assert.equal(visit({ acceptLanguage: 'en-US,en;q=0.9', country: 'AZ' }), 'az')
  assert.equal(visit({ acceptLanguage: 'en-US,en;q=0.9', country: 'GE' }), 'ge')
  assert.equal(visit({ acceptLanguage: 'en-US,en;q=0.9', country: 'KZ' }), 'ru')
  assert.equal(visit({ acceptLanguage: 'en-US,en;q=0.9', country: 'TR' }), 'en')
  assert.equal(visit({ acceptLanguage: 'de-DE', country: '' }), 'en')
})

const env = { ASSETS: { fetch: async () => new Response('georgian home', { status: 200 }) } }
const request = (path, headers) => {
  const req = new Request(`https://${host}${path}`, { headers: { 'User-Agent': chrome, ...headers } })
  return req
}

test('the Worker redirects only "/", keeps the query string and is never cached', async () => {
  const res = await worker.fetch(request('/?utm=x', { 'Accept-Language': 'ru' }), env)
  assert.equal(res.status, 302)
  assert.equal(res.headers.get('Location'), '/ru/?utm=x')
  assert.match(res.headers.get('Cache-Control'), /no-store/)

  const kept = await worker.fetch(request('/', { 'Accept-Language': 'ka' }), env)
  assert.equal(kept.status, 200)
  assert.equal(await kept.text(), 'georgian home')

  const other = await worker.fetch(request('/services/', { 'Accept-Language': 'ru' }), env)
  assert.equal(other.status, 200, 'other addresses are served as they are')
})
