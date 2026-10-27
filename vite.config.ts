import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Build-time site settings, all optional:
 *  VITE_SITE_URL              final address, e.g. https://buztech.ge  -> canonical, og:url, og:image, sitemap.xml, robots sitemap line
 *  VITE_CF_ANALYTICS_TOKEN    Cloudflare Web Analytics token          -> cookie-free visit statistics
 */
function siteMeta(env: Record<string, string>): Plugin {
  const siteUrl = (env.VITE_SITE_URL ?? '').replace(/\/+$/, '');
  const cfToken = env.VITE_CF_ANALYTICS_TOKEN ?? '';
  return {
    name: 'buz-site-meta',
    transformIndexHtml() {
      const tags: { tag: string; attrs: Record<string, string>; injectTo: 'head' | 'body' }[] = [];
      if (siteUrl) {
        tags.push(
          { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: `${siteUrl}/` }, injectTo: 'head' },
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
        source: `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ''}`,
      });
      if (siteUrl) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc></url>\n</urlset>\n`,
        });
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_');
  return {
    plugins: [react(), tailwindcss(), siteMeta(env)],
    build: { target: 'es2022' },
  };
});
