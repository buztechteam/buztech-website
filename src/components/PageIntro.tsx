import type { ReactNode } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { arriveProps } from '../motion/reveal';
import { isProductPage, pagePath } from '../routes';
import { GEAR_PATH, ICON_H, ICON_W, WING_RADIUS, WINGS } from './buzLogoPaths';

/**
 * Top band of every inner page: breadcrumb, the page's one h1 and its lead.
 * Same gradient and Navy scrim as the home hero, so the pages read as one site.
 */
export function PageIntro({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  /** Extra content at the foot of the band, e.g. the facts on About or the price buttons on a product page. */
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
      <div className="container-x relative py-12 sm:py-16">
        {/*
          Our own mark, drawn in outline like the gears behind the home hero, so an inner page opens
          with the brand and not an empty gradient. It fades out toward the text and never moves.
          Pinned to the top of the band, so on a tall band (About) it stays beside the title, clear of what follows.
          From xl only: on narrower screens a long Georgian title would run into its dots.
        */}
        <svg
          aria-hidden="true"
          viewBox={`-4 -4 ${ICON_W + 8} ${ICON_H + 8}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
          className="pointer-events-none absolute -top-14 -right-20 -z-10 h-[27rem] w-auto text-white/30 [mask-image:linear-gradient(to_right,transparent_8%,#000_55%)] max-xl:hidden"
        >
          {/* each bar's outline stops at its dot, as in the solid logo */}
          <mask id="page-mark-bars" maskUnits="userSpaceOnUse" x="-4" y="-4" width={ICON_W + 8} height={ICON_H + 8}>
            <rect x="-4" y="-4" width={ICON_W + 8} height={ICON_H + 8} fill="#fff" stroke="none" />
            {WINGS.map((wing) => (
              <circle key={wing.cy} cx={wing.cx} cy={wing.cy} r={WING_RADIUS} fill="#000" stroke="none" />
            ))}
          </mask>
          <g mask="url(#page-mark-bars)">
            {WINGS.map((wing) => (
              <path key={wing.cy} d={wing.bar} />
            ))}
          </g>
          {WINGS.map((wing) => (
            <circle key={wing.cy} cx={wing.cx} cy={wing.cy} r={WING_RADIUS} className="fill-white/10" />
          ))}
          <path d={GEAR_PATH} />
        </svg>
        <nav {...arriveProps(0)} aria-label={t.a11y.breadcrumb}>
          <ol className="flex flex-wrap items-center gap-x-2 text-sm text-light/85">
            {trail.map((label, index) => (
              <li key={label} className="flex items-center gap-2">
                {index === 0 ? (
                  <a href={pagePath('home', lang)} className="-my-3 py-3 underline-offset-4 hover:text-white hover:underline">
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
        <h1 {...arriveProps(1)} className="mt-4 text-[clamp(2rem,1.2rem+2.4vw,3.25rem)] leading-[1.15] font-extrabold tracking-tight text-balance break-words">
          {title}
        </h1>
        {lead && <p {...arriveProps(2)} className="mt-4 max-w-[40rem] text-lg leading-relaxed text-pretty text-light">{lead}</p>}
        {children && <div {...arriveProps(3)}>{children}</div>}
      </div>
    </section>
  );
}
