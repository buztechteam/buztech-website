import { useLang } from '../i18n/LanguageContext';
import { pagePath } from '../routes';
import { revealProps } from '../motion/reveal';
import { ArrowRight, Check } from './icons';
import { btn, h2Class, leadClass } from './ui';

/** The company facts (2018 · 5 countries), on Navy cells: the About intro. */
export function Facts({ className = '' }: { className?: string }) {
  const { t } = useLang();
  return (
    /* Phone: one compact row per fact (Georgian labels like "საქართველოში" are too long for columns). */
    <dl {...revealProps(0)} className={`grid gap-px overflow-hidden rounded-xl border border-white/12 bg-white/12 sm:grid-cols-2 ${className}`}>
      {t.services.facts.map((fact) => (
        <div key={fact.label} className="flex items-center gap-4 bg-navy px-5 py-4 sm:flex-col sm:items-start sm:gap-1 sm:p-8">
          <dd className="order-1 w-20 shrink-0 text-3xl leading-none font-extrabold text-white sm:w-auto sm:text-5xl">
            {fact.value}
          </dd>
          <dt className="order-2 text-light/85 sm:mt-2">{fact.label}</dt>
        </div>
      ))}
    </dl>
  );
}

/** Microsoft CSP partner and the company facts, as a checked list on Navy (Contact, beside the form). */
export function Credentials() {
  const { t } = useLang();
  const p = t.home.proof;
  return (
    <ul className="space-y-3.5">
      {[p.partner, p.since, p.countries].map((item, i) => (
        <li key={item} className="flex gap-3">
          <Check className="mt-1 size-4 shrink-0 text-brand-teal" strokeWidth={3} />
          <span className={i === 0 ? 'font-extrabold text-white' : 'text-light/85'}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** The sectors we work with, as a plain list in columns (no client names: there is no approval to show them). */
export function Sectors({ dark = false }: { dark?: boolean }) {
  const { t } = useLang();
  return (
    <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
      {t.clients.sectors.map((sector) => (
        <li key={sector} className={`border-t pt-3 font-extrabold ${dark ? 'border-white/12 text-white' : 'border-navy/15'}`}>
          {sector}
        </li>
      ))}
    </ul>
  );
}

/** Home page proof: who BUZ Tech is, the sectors it serves and the partnership, leading to About us. */
export function Proof() {
  const { lang, t } = useLang();
  return (
    <section className="bg-navy py-20 text-light lg:py-24">
      <div className="container-x grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <div>
          <h2 {...revealProps(0)} className={`${h2Class} text-white`}>{t.home.proof.heading}</h2>
          <p {...revealProps(1)} className={`${leadClass} text-light/85`}>{t.clients.lead}</p>
          <div {...revealProps(2)} className="mt-10">
            <h3 className="text-xl font-extrabold text-white">{t.clients.sectorsHeading}</h3>
            <div className="mt-5">
              <Sectors dark />
            </div>
          </div>
        </div>

        {/* What the partnership means for the buyer, said once, instead of the bare claim again. */}
        <div {...revealProps(3)} className="lg:border-l lg:border-white/12 lg:pl-12">
          <h3 className="text-xl font-extrabold text-balance text-white">{t.home.proof.partner}</h3>
          <p className="mt-3 text-pretty text-light/85">{t.home.proof.cspText}</p>
          <p className="mt-5 text-light/75">
            {t.home.proof.since} · {t.home.proof.countries}
          </p>
          <a href={pagePath('about', lang)} className={`${btn('ghostOnDark')} mt-10 gap-2`}>
            {t.nav.about}
            <ArrowRight className="size-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
