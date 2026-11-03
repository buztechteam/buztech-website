/**
 * Runs before the static assets for "/" only (assets.run_worker_first in wrangler.jsonc); every other
 * address is served straight from dist/. A visitor who arrives at the Georgian home from outside the
 * site is sent to the home of their language (chooseLang). Nothing is stored: the Privacy page
 * promises no cookies, so a choice made in the language menu lasts for the visit, not across visits.
 */

/** Countries whose visitors get Russian. The owner may change this list. */
const RUSSIAN = new Set(['RU', 'BY', 'KZ', 'KG', 'UZ', 'TJ']);

/** Crawlers and link-preview fetchers always get "/" as it is, so search and shared links see Georgian. */
const BOTS = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|linkedin|skype|discord|embedly|lighthouse|pagespeed/i;

const HOME = { en: '/en/', az: '/az/', ru: '/ru/' };

/** The browser's most wanted language tag, lower-cased ('' when there is none). */
function firstLanguage(acceptLanguage) {
  const tags = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q.slice(2)) : 1 };
    })
    .filter((t) => t.tag && t.tag !== '*' && t.q > 0);
  /* sort is stable: tags with the same weight keep the browser's order. */
  return tags.sort((a, b) => b.q - a.q)[0]?.tag ?? '';
}

/**
 * Which home a request for "/" gets: 'ge' serves "/" as it is, otherwise 'en' | 'az' | 'ru'.
 *   1. A link from our own site (the language menu, the logo): as it is.
 *   2. Crawlers, and requests without Accept-Language: as it is.
 *   3. The browser's first language, if it is Georgian, Azerbaijani or Russian. English is skipped:
 *      many people in Georgia and Azerbaijan use an English browser.
 *   4. The country: Georgia, Azerbaijan, the Russian-speaking countries above.
 *   5. Everyone else: English.
 */
export function chooseLang({ acceptLanguage = '', country = '', referer = '', userAgent = '', host = '' }) {
  if (referer && host) {
    try {
      if (new URL(referer).host === host) return 'ge';
    } catch {
      /* not a URL: treat as no referer */
    }
  }
  if (!acceptLanguage || BOTS.test(userAgent)) return 'ge';

  const primary = firstLanguage(acceptLanguage).split('-')[0];
  if (primary === 'ka') return 'ge';
  if (primary === 'az' || primary === 'ru') return primary;

  if (country === 'GE') return 'ge';
  if (country === 'AZ') return 'az';
  if (RUSSIAN.has(country)) return 'ru';
  return 'en';
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/' && (request.method === 'GET' || request.method === 'HEAD')) {
      const lang = chooseLang({
        acceptLanguage: request.headers.get('Accept-Language') ?? '',
        country: request.cf?.country ?? '',
        referer: request.headers.get('Referer') ?? '',
        userAgent: request.headers.get('User-Agent') ?? '',
        host: url.host,
      });
      if (lang !== 'ge') {
        return new Response(null, {
          status: 302,
          headers: {
            Location: `${HOME[lang]}${url.search}`,
            'Cache-Control': 'private, no-store',
            Vary: 'Accept-Language, Referer',
          },
        });
      }
    }
    return env.ASSETS.fetch(request);
  },
};
