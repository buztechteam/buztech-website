import { useLang } from '../i18n/LanguageContext';
import type { ProductPageId } from '../i18n/types';
import { revealProps } from '../motion/reveal';
import { pagePath, productPages } from '../routes';
import { ArrowRight, pageIcons } from './icons';
import { cardArrow, cardIcon, cardLink, h2Class, leadClass } from './ui';

/**
 * Link cards to product pages. The whole card is clickable through its title link (stretched with ::after),
 * so the link name stays short.
 * - Default: a small "Products" block at the foot of a page, linking every product page except `current`.
 * - `prominent` with a heading and lead: a full home-page section (Everything else, on request).
 */
export function ProductLinks({
  current,
  ids = productPages.filter((id) => id !== current),
  heading,
  lead,
  prominent = false,
}: {
  current?: ProductPageId;
  ids?: ProductPageId[];
  heading?: string;
  lead?: string;
  prominent?: boolean;
}) {
  const { lang, t } = useLang();
  return (
    <section className={`surface-light bg-white text-navy ${prominent ? 'py-20 lg:py-24' : 'py-16 lg:py-20'}`}>
      <div className="container-x">
        <h2 {...revealProps(0)} className={prominent ? h2Class : 'text-2xl leading-tight font-extrabold'}>
          {heading ?? t.productLinks.heading}
        </h2>
        {lead && <p {...revealProps(1)} className={`${leadClass} text-navy/85`}>{lead}</p>}
        <ul className={`grid gap-4 ${prominent ? 'mt-10 md:grid-cols-2 md:gap-5' : `mt-6 ${ids.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}`}>
          {ids.map((id, i) => {
            const Icon = pageIcons[id];
            const p = t.pages[id];
            return (
              <li
                key={id}
                {...revealProps(i)}
                className={`group relative flex items-start gap-4 rounded-xl border border-navy/12 bg-light ${prominent ? 'p-6 sm:p-7' : 'p-5'} ${cardLink} hover:border-deep-teal has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-3 has-[a:focus-visible]:outline-deep-teal`}
              >
                <span className={`grid shrink-0 place-items-center rounded-lg bg-navy text-brand-teal ${prominent ? 'size-12' : 'size-11'} ${cardIcon}`}>
                  <Icon className={prominent ? 'size-6' : 'size-5'} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className={`leading-snug font-extrabold text-balance ${prominent ? 'text-xl sm:text-2xl' : 'text-lg'}`}>
                    <a
                      href={pagePath(id, lang)}
                      className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none"
                    >
                      {p.label}
                    </a>
                  </h3>
                  <p className={`mt-1 text-pretty ${prominent ? 'text-navy/85' : 'text-sm text-navy/80'}`}>{p.summary}</p>
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
