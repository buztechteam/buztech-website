import { businessPlans, microsoftExtras } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import { revealProps } from '../motion/reveal';
import { inquireHref, pagePath } from '../routes';
import { IncludedList } from './Included';
import { SpecList } from './SpecList';
import { btn, cardStatic, h2Class, leadClass } from './ui';

/** Price and audit buttons for a Navy band (page intro, quote section). */
export function PriceActions({ className = '' }: { className?: string }) {
  const { lang, t } = useLang();
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={inquireHref('m365', lang)} className={btn('primary')}>
        {t.cta}
      </a>
      <a href={`${pagePath('services', lang)}#audit`} className={btn('ghostOnDark')}>
        {t.hero.secondary}
      </a>
    </div>
  );
}

/**
 * The three Business plans side by side, each with who it is for and what it adds over the one before,
 * then the jargon in plain words. Every card asks for a price with its plan pre-selected.
 */
function BusinessPlans() {
  const { lang, t } = useLang();
  const b = t.m365.business;
  return (
    <section className="surface-light bg-light py-16 text-navy lg:py-20">
      <div className="container-x">
        <h2 {...revealProps(0)} className={h2Class}>{b.heading}</h2>
        <p {...revealProps(1)} className={`${leadClass} text-navy/85`}>{b.lead}</p>

        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {businessPlans.map((plan, i) => {
            const copy = b.plans[plan.id];
            const previous = businessPlans[i - 1];
            return (
              <li key={plan.id} {...revealProps(i)} className={`flex flex-col rounded-xl border border-navy/12 bg-white p-6 sm:p-7 ${cardStatic}`}>
                <h3 className="text-2xl leading-tight font-extrabold">{plan.name}</h3>
                <p className="mt-2 text-pretty text-navy/85">{copy.who}</p>
                {previous && <p className="mt-6 text-sm font-extrabold">{b.plus.replace('{plan}', previous.name)}</p>}
                <SpecList specs={copy.includes} iconClass="text-deep-teal" className={previous ? 'mt-3' : 'mt-6'} />
                <div className="mt-auto pt-8">
                  <a href={inquireHref(plan.id, lang)} className={btn('outlineOnLight', 'sm')}>
                    {t.cta}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 border-t border-navy/12 pt-10">
          <h3 {...revealProps(0)} className="text-2xl leading-tight font-extrabold">{t.m365.terms.heading}</h3>
          <dl className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-3">
            {t.m365.terms.items.map((item, i) => (
              <div key={item.term} {...revealProps(i)}>
                <dt className="text-lg font-extrabold">{item.term}</dt>
                <dd className="mt-1 text-pretty text-navy/85">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/** E3 / E5, Copilot, Windows and Office: one row each, name, what it is, price button. */
function MicrosoftExtras() {
  const { lang, t } = useLang();
  const x = t.m365.extras;
  return (
    <section className="surface-light bg-white py-16 text-navy lg:py-20">
      <div className="container-x">
        <h2 {...revealProps(0)} className={h2Class}>{x.heading}</h2>
        <p {...revealProps(1)} className={`${leadClass} text-navy/85`}>{x.lead}</p>
        <ul className="mt-10 border-b border-navy/12">
          {microsoftExtras.map((id, i) => (
            <li
              key={id}
              {...revealProps(i)}
              className="grid gap-3 border-t border-navy/12 py-6 md:grid-cols-[15rem_1fr_auto] md:items-center md:gap-8"
            >
              <h3 className="text-xl leading-snug font-extrabold text-balance">{t.products[id]}</h3>
              <p className="max-w-[40rem] text-pretty text-navy/85">{x.items[id]}</p>
              <a href={inquireHref(id, lang)} className={`${btn('outlineOnLight', 'sm')} justify-self-start`}>
                {t.cta}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AzureEntra() {
  const { lang, t } = useLang();
  const c = t.m365.cloud;
  return (
    <section className="surface-light bg-light py-16 text-navy lg:py-20">
      <div className="container-x">
        <h2 {...revealProps(0)} className={h2Class}>{c.heading}</h2>
        <p {...revealProps(1)} className={`${leadClass} text-navy/85`}>{c.lead}</p>
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {(['azure', 'entra'] as const).map((id, i) => (
            <li key={id} {...revealProps(i)} className={`flex flex-col rounded-xl border border-navy/12 bg-white p-6 sm:p-7 ${cardStatic}`}>
              <h3 className="text-2xl leading-tight font-extrabold">{t.products[id]}</h3>
              <p className="mt-2 text-pretty text-navy/85">{c.items[id].text}</p>
              <SpecList specs={c.items[id].specs} iconClass="text-deep-teal" />
              <div className="mt-auto pt-8">
                <a href={inquireHref(id, lang)} className={btn('outlineOnLight', 'sm')}>
                  {t.cta}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The price promise beside what the quote includes. */
function QuoteIncludes() {
  const { t } = useLang();
  return (
    <section className="bg-navy py-16 text-light lg:py-20">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div className="flex flex-col items-start">
          <h2 {...revealProps(0)} className={`${h2Class} text-white`}>{t.beat.title}</h2>
          <p {...revealProps(1)} className={`${leadClass} text-light/85`}>{t.beat.text}</p>
          <PriceActions className="mt-8" />
        </div>
        <div>
          <h2 {...revealProps(0)} className="text-2xl leading-tight font-extrabold text-white">{t.included.heading}</h2>
          <IncludedList dark className="mt-6 sm:grid-cols-2" />
        </div>
      </div>
    </section>
  );
}

/** Body of the Microsoft 365 page; its title, lead and buttons sit in the page's PageIntro. */
export function Microsoft365() {
  return (
    <>
      <BusinessPlans />
      <MicrosoftExtras />
      <AzureEntra />
      <QuoteIncludes />
    </>
  );
}
