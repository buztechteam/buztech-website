import { useLang } from '../i18n/LanguageContext';
import type { ProductPageId } from '../i18n/types';
import { revealProps } from '../motion/reveal';
import { pagePath, productPages } from '../routes';
import { ArrowRight, pageIcons } from './icons';
import { cardArrow, cardIcon, cardLink } from './ui';

/**
 * Link cards to product pages: a small "Products" block at the foot of a page, linking every product page
 * except `current`. The whole card is clickable through its title link (stretched with ::after),
 * so the link name stays short.
 */
export function ProductLinks({ current }: { current?: ProductPageId }) {
  const { lang, t } = useLang();
  const ids = productPages.filter((id) => id !== current);
  return (
    <section className="surface-light bg-white py-16 text-navy lg:py-20">
      <div className="container-x">
        <h2 {...revealProps(0)} className="text-2xl leading-tight font-extrabold">
          {t.productLinks.heading}
        </h2>
        <ul className={`mt-6 grid gap-4 ${ids.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {ids.map((id, i) => {
            const Icon = pageIcons[id];
            const p = t.pages[id];
            return (
              <li
                key={id}
                {...revealProps(i)}
                className={`group relative flex items-start gap-4 rounded-xl border border-navy/12 bg-light p-5 ${cardLink} hover:border-deep-teal has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-deep-teal`}
              >
                <span className={`grid size-11 shrink-0 place-items-center rounded-lg bg-navy text-brand-teal ${cardIcon}`}>
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg leading-snug font-extrabold text-balance">
                    <a
                      href={pagePath(id, lang)}
                      className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none"
                    >
                      {p.label}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-pretty text-navy/80">{p.summary}</p>
                </div>
                <ArrowRight className={`mt-1 size-5 shrink-0 text-deep-teal ${cardArrow}`} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
