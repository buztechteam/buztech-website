import { useLang } from '../i18n/LanguageContext';
import { revealProps } from '../motion/reveal';
import { inquireHref, pagePath } from '../routes';
import { ArrowRight } from './icons';
import { btn, h2Class, leadClass } from './ui';

/** Home page: Microsoft 365 leads, so it gets the dark panel and the plan line-up before anything else. */
export function M365Teaser() {
  const { lang, t } = useLang();
  const m = t.home.m365;
  return (
    <section className="surface-light bg-light py-20 text-navy lg:py-24">
      <div className="container-x">
        <div className="grid gap-10 rounded-[1.25rem] bg-navy p-6 text-light sm:p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:p-12">
          <div className="flex flex-col items-start">
            <h2 {...revealProps(0)} className={`${h2Class} text-white`}>{m.heading}</h2>
            <p {...revealProps(1)} className={`${leadClass} text-light/85`}>{m.lead}</p>
            <div {...revealProps(2)} className="mt-8 flex flex-wrap gap-3">
              <a href={pagePath('microsoft-365', lang)} className={`${btn('primary')} gap-2`}>
                {m.compare}
                <ArrowRight className="size-5" />
              </a>
              <a href={inquireHref('m365', lang)} className={btn('ghostOnDark')}>
                {t.cta}
              </a>
            </div>
          </div>

          <ul className="self-center border-b border-white/12">
            {m.rows.map((row, i) => (
              <li key={row.name} {...revealProps(i)} className="border-t border-white/12 py-4 sm:py-5">
                <p className="text-lg leading-snug font-extrabold text-white sm:text-xl">{row.name}</p>
                <p className="mt-0.5 text-light/80">{row.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
