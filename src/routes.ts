import { site } from './config/site';
import type { CategoryId, Dict, Lang, PageId } from './i18n/types';

/** Every page, in footer order. Each one is pre-rendered in both languages (scripts/prerender.mjs). */
export const pages: PageId[] = [
  'home',
  'licensing',
  'servers',
  'networking',
  'workspaces',
  'services',
  'about',
  'contact',
  'privacy',
];
export const langs: Lang[] = ['ge', 'en'];
export const productPages: CategoryId[] = ['licensing', 'servers', 'networking', 'workspaces'];

export const isProductPage = (page: PageId): page is CategoryId => (productPages as PageId[]).includes(page);

/**
 * Georgian lives at the root, English under /en/. Slugs are Latin in both languages.
 * notFound has no address of its own (it is /404.html and /en/404.html), so links to it go home.
 */
export function pagePath(page: PageId, lang: Lang): string {
  const prefix = lang === 'en' ? '/en/' : '/';
  return page === 'home' || page === 'notFound' ? prefix : `${prefix}${page}/`;
}

/** Unknown addresses resolve to notFound, matching the 404.html Cloudflare serves for them. */
export function matchPath(pathname: string): { page: PageId; lang: Lang } {
  const parts = pathname.split('/').filter((part) => part && part !== 'index.html');
  const lang: Lang = parts[0] === 'en' ? 'en' : 'ge';
  if (lang === 'en') parts.shift();
  if (parts.length === 0) return { page: 'home', lang };
  const page = parts.length === 1 && (pages as string[]).includes(parts[0]) ? (parts[0] as PageId) : 'notFound';
  return { page, lang };
}

/** The contact page with the product already chosen in the form. */
export const inquireHref = (product: string, lang: Lang) =>
  `${pagePath('contact', lang)}?product=${encodeURIComponent(product)}`;

/** Title and description per page, built from existing copy. */
export function pageMeta(page: PageId, t: Dict): { title: string; description: string } {
  const titled = (name: string, description: string) => ({ title: `${name} — ${site.name}`, description });
  switch (page) {
    case 'home':
      return t.meta;
    case 'services':
      return titled(t.services.heading, t.services.lead);
    case 'about':
      return titled(t.nav.about, t.footer.overview);
    case 'contact':
      return titled(t.nav.contact, t.contact.lead);
    case 'privacy':
      return titled(t.privacy.title, t.privacy.intro);
    case 'notFound':
      return titled(t.notFound.title, t.notFound.lead);
    default:
      return titled(t.products.categories[page].label, t.products.categories[page].summary);
  }
}
