import { businessPlans, microsoftExtras } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import type { ProductId } from '../i18n/types';
import { revealProps } from '../motion/reveal';
import { inquireHref, pagePath } from '../routes';
import { ArrowRight } from './icons';
import { IncludedList } from './Included';
import { SpecList } from './SpecList';
import { btn, cardStatic, h2Class, leadClass, textCta } from './ui';

/** Price and audit buttons for a Navy band (the page intro). */
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

/** The quiet price link on a card or row, with that product pre-selected in the form. */
export function PriceLink({ product, className = '' }: { product: ProductId; className?: string }) {
  const { lang, t } = useLang();
  return (
    <a href={inquireHref(product, lang)} className={`${textCta} ${className}`}>
      {t.cta}
      <ArrowRight className="size-4" />
    </a>
  );
}

/**
 * The three Business plans side by side, each with who it is for and what it adds over the one before,
 * then the jargon in plain words. Every card asks for a price with its plan pre-selected.
 */
function BusinessPlans() {
  const { t } = useLang();
  const b = t.m365.business;
  return (
    <section className="surface-light bg-light py-14 text-navy sm:py-16 lg:py-20">
      <div className="container-x">
        <h2 {...revealProps(0)} className={h2Class}>{b.heading}</h2>
        <p {...revealProps(1)} className={`${leadClass} text-navy/85`}>{b.lead}</p>

        {/*
          Phones and tablets: the plans sit side by side and swipe, the next one peeking in, instead of stacking
          three screens deep. The row reveals as one, so a card swiped into view is never left hidden.
        */}
        <ul
          {...revealProps(2)}
          className="-mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:mt-10 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {businessPlans.map((plan, i) => {
            const copy = b.plans[plan.id];
            const previous = businessPlans[i - 1];
            return (
              <li
                key={plan.id}
                className={`flex w-[85%] max-w-[26rem] shrink-0 snap-start flex-col rounded-xl border border-navy/12 bg-white p-5 sm:p-7 lg:w-auto lg:max-w-none ${cardStatic}`}
              >
                <h3 className="text-2xl leading-tight font-extrabold">{plan.name}</h3>
                <p className="mt-2 text-pretty text-navy/85">{copy.who}</p>
                {previous && <p className="mt-5 text-sm font-extrabold text-balance">{b.plus.replace('{plan}', previous.name)}</p>}
                <SpecList specs={copy.includes} iconClass="text-deep-teal" className={previous ? 'mt-3' : 'mt-5'} />
                <div className="mt-auto pt-5">
                  <PriceLink product={plan.id} />
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 border-t border-navy/12 pt-10 sm:mt-14">
          <h3 {...revealProps(0)} className="text-2xl leading-tight font-extrabold">{t.m365.terms.heading}</h3>
          <dl className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
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

/** E3 / E5, Copilot, Windows and Office: one row each, name, what it is, price link. */
function MicrosoftExtras() {
  const { t } = useLang();
  const x = t.m365.extras;
  return (
    <section className="surface-light bg-white py-14 text-navy sm:py-16 lg:py-20">
      <div className="container-x">
        <h2 {...revealProps(0)} className={h2Class}>{x.heading}</h2>
        <p {...revealProps(1)} className={`${leadClass} text-navy/85`}>{x.lead}</p>
        <ul className="mt-8 border-b border-navy/12 sm:mt-10">
          {microsoftExtras.map((id, i) => (
            <li
              key={id}
              {...revealProps(i)}
              className="grid gap-2 border-t border-navy/12 py-5 sm:py-6 md:grid-cols-[15rem_1fr_auto] md:items-center md:gap-8"
            >
              <h3 className="text-xl leading-snug font-extrabold text-balance">{t.products[id]}</h3>
              <p className="max-w-[40rem] text-pretty text-navy/85">{x.items[id]}</p>
              <PriceLink product={id} className="justify-self-start" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AzureEntra() {
  const { t } = useLang();
  const c = t.m365.cloud;
  return (
    <section className="surface-light bg-light py-14 text-navy sm:py-16 lg:py-20">
      <div className="container-x">
        <h2 {...revealProps(0)} className={h2Class}>{c.heading}</h2>
        <p {...revealProps(1)} className={`${leadClass} text-navy/85`}>{c.lead}</p>
        <ul className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 md:gap-5">
          {(['azure', 'entra'] as const).map((id, i) => (
            <li key={id} {...revealProps(i)} className={`flex flex-col rounded-xl border border-navy/12 bg-white p-5 sm:p-7 ${cardStatic}`}>
              <h3 className="text-2xl leading-tight font-extrabold">{t.products[id]}</h3>
              <p className="mt-2 text-pretty text-navy/85">{c.items[id].text}</p>
              <SpecList specs={c.items[id].specs} iconClass="text-deep-teal" />
              <div className="mt-auto pt-5">
                <PriceLink product={id} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The best-price statement beside what every order includes. No buttons: the contact band right after it asks. */
function QuoteIncludes() {
  const { t } = useLang();
  return (
    <section className="bg-navy py-14 text-light sm:py-16 lg:py-20">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <h2 {...revealProps(0)} className={`${h2Class} text-white`}>{t.beat.title}</h2>
          <p {...revealProps(1)} className={`${leadClass} text-light/85`}>{t.beat.text}</p>
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
