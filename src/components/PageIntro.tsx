import type { ReactNode } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { arriveProps } from '../motion/reveal';
import { isProductPage, pagePath } from '../routes';

/**
 * Top band of every inner page: breadcrumb, the page's one h1 and its lead.
 * Same gradient and Navy scrim as the home hero, so the pages read as one site.
 */
export function PageIntro({
  title,
  lead,
  chips,
  children,
}: {
  title: string;
  lead?: string;
  chips?: string[];
  /** Extra content at the foot of the band, e.g. the facts on About. */
  children?: ReactNode;
}) {
  const { lang, page, t } = useLang();
  const trail = [t.nav.home, ...(isProductPage(page) ? [t.nav.products] : [])];

  return (
    <section className="relative isolate overflow-hidden bg-brand-gradient text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 from-navy/80 via-navy/45 to-navy/10 max-lg:bg-linear-to-b lg:bg-linear-to-r"
      />
      <div className="container-x py-12 sm:py-16">
        <nav {...arriveProps(0)} aria-label={t.a11y.breadcrumb}>
          <ol className="flex flex-wrap items-center gap-x-2 text-sm text-light/85">
            {trail.map((label, index) => (
              <li key={label} className="flex items-center gap-2">
                {index === 0 ? (
                  <a href={pagePath('home', lang)} className="underline-offset-4 hover:text-white hover:underline">
                    {label}
                  </a>
                ) : (
                  <span>{label}</span>
                )}
                <span aria-hidden="true">/</span>
              </li>
            ))}
            <li aria-current="page" className="font-extrabold text-white">
              {title}
            </li>
          </ol>
        </nav>
        <h1 {...arriveProps(1)} className="mt-4 text-[clamp(2rem,1.2rem+2.4vw,3.25rem)] leading-[1.15] font-extrabold tracking-tight text-balance">
          {title}
        </h1>
        {lead && <p {...arriveProps(2)} className="mt-4 max-w-[40rem] text-lg leading-relaxed text-light">{lead}</p>}
        {chips && chips.length > 0 && (
          <ul {...arriveProps(3)} className="mt-6 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li key={chip} className="rounded-md border border-white/40 bg-navy/30 px-3 py-1.5 text-sm font-extrabold text-white">
                {chip}
              </li>
            ))}
          </ul>
        )}
        {children && <div {...arriveProps(4)}>{children}</div>}
      </div>
    </section>
  );
}
