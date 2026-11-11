import { useLang } from '../i18n/LanguageContext';
import { pagePath } from '../routes';
import { revealProps } from '../motion/reveal';
import { ArrowRight, Check } from './icons';
import { btn, h2Class, leadClass } from './ui';

/**
 * Where the group is, by name: the head office and the branch countries, under a hairline in the About intro.
 * Names instead of a "5 countries" tile: the list is the fact.
 */
export function Presence({ className = '' }: { className?: string }) {
  const { t } = useLang();
  const p = t.footer.presence;
  const place = 'text-xl leading-snug font-extrabold text-white sm:text-2xl';
  return (
    <dl {...revealProps(0)} className={`grid max-w-[46rem] gap-x-14 gap-y-6 border-t border-white/25 pt-6 sm:grid-cols-[auto_1fr] ${className}`}>
      <div>
        <dt className="text-sm text-light/85">{p.hqLabel}</dt>
        <dd className={`mt-1 ${place}`}>{p.hq}</dd>
      </div>
      <div>
        <dt className="text-sm text-light/85">{p.branchesLabel}</dt>
        <dd className="mt-1">
          <ul className={`flex flex-wrap gap-x-6 gap-y-1 ${place}`}>
            {p.branches.map((country) => (
              <li key={country}>{country}</li>
            ))}
          </ul>
        </dd>
      </div>
    </dl>
  );
}

/** Microsoft CSP partner and the company facts, as a checked list on Navy (Contact, beside the form). */
export function Credentials() {
  const { t } = useLang();
  const p = t.home.proof;
  return (
    <ul className="space-y-3.5">
      {[p.partner, p.since, p.countries].filter((item): item is string => Boolean(item)).map((item, i) => (
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
