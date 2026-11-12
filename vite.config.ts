import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Build-time site settings, all optional:
 *  VITE_SITE_URL              final address, e.g. https://buztech.ge  -> og:image for link previews
 *                             (per-page canonical, hreflang and og:url come from scripts/prerender.mjs)
 *
 * The site is private: it is shared by link and kept out of search engines and AI crawlers. Every
 * page says "noindex, nofollow" (here and as X-Robots-Tag in public/_headers), and there is no sitemap.
 *  VITE_CF_ANALYTICS_TOKEN    Cloudflare Web Analytics token          -> cookie-free visit statistics
 */
/**
 * Search engines may visit, so that they read the noindex on every page and drop it: a page blocked here
 * could still be listed, without its content, from a link elsewhere. AI crawlers are kept out entirely.
 * Link-preview fetchers (WhatsApp, Telegram, Facebook, LinkedIn) are not blocked, so a shared link shows its card.
 */
const AI_CRAWLERS = [
  'GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai',
  'CCBot', 'Google-Extended', 'Applebot-Extended', 'PerplexityBot', 'Perplexity-User', 'Bytespider',
  'meta-externalagent', 'Amazonbot', 'cohere-ai', 'Diffbot', 'YouBot', 'DuckAssistBot',
];
const ROBOTS = [
  '# Private site: shared by link, not listed by search engines (every page says noindex).',
  'User-agent: *',
  'Allow: /',
  '',
  '# AI crawlers: keep out.',
  ...AI_CRAWLERS.map((bot) => `User-agent: ${bot}`),
  'Disallow: /',
  '',
].join('\n');

function siteMeta(env: Record<string, string>): Plugin {
  const siteUrl = (env.VITE_SITE_URL ?? '').replace(/\/+$/, '');
  const cfToken = env.VITE_CF_ANALYTICS_TOKEN ?? '';
  return {
    name: 'buz-site-meta',
    transformIndexHtml() {
      const tags: { tag: string; attrs: Record<string, string>; injectTo: 'head' | 'body' }[] = [
        { tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' }, injectTo: 'head' },
      ];
      if (siteUrl) {
        tags.push(
          { tag: 'meta', attrs: { property: 'og:image', content: `${siteUrl}/og-image.png` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:image:height', content: '630' }, injectTo: 'head' },
          { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' }, injectTo: 'head' },
        );
      }
      if (cfToken) {
        tags.push({
          tag: 'script',
          attrs: {
            defer: '',
            src: 'https://static.cloudflareinsights.com/beacon.min.js',
            'data-cf-beacon': JSON.stringify({ token: cfToken }),
          },
          injectTo: 'body',
        });
      }
      return tags;
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: ROBOTS,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_');
  return {
    plugins: [react(), tailwindcss(), siteMeta(env)],
    build: { target: 'es2022' },
    // The footer year, fixed when the site is built so the pre-rendered page and the browser agree
    // (a year read in the browser would differ from the built HTML after New Year: a hydration mismatch).
    define: { __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()) },
  };
});
