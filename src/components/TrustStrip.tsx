import { useLang } from '../i18n/LanguageContext';
import { inquireHref, pagePath } from '../routes';
import { revealProps } from '../motion/reveal';
import { ArrowRight, Check, FileCheck } from './icons';
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

/**
 * The sectors we work with, as plain text in columns (no client names: there is no approval to show them).
 * No rules and no bold, so it never reads like the linked rows of a list that leads somewhere.
 */
export function Sectors({ dark = false }: { dark?: boolean }) {
  const { t } = useLang();
  return (
    <ul className={`grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4 ${dark ? 'text-light/85' : 'text-navy/85'}`}>
      {/* A long word (Горнодобывающая) is hyphenated or wrapped on a 320px phone instead of widening the page. */}
      {t.clients.sectors.map((sector) => (
        <li key={sector} className="min-w-0 hyphens-auto break-words">
          {sector}
        </li>
      ))}
    </ul>
  );
}

/**
 * About page: the Microsoft CSP partnership, the first partnership on the page and on Navy, so it carries more weight
 * than the Huawei eKit section after it. Beside it, what tender teams come for: the documents, and a button that asks for them.
 */
export function MicrosoftPartner() {
  const { lang, t } = useLang();
  const p = t.home.proof;
  const documents = t.included.items.find((item) => item.icon === 'documents');
  return (
    <section id="microsoft-csp" className="bg-navy py-20 text-light lg:py-24">
      <div className="container-x grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start">
          <h2 {...revealProps(0)} className={`${h2Class} text-white`}>{p.partner}</h2>
          <p {...revealProps(1)} className={`${leadClass} text-light/85`}>{p.cspText}</p>
          <a {...revealProps(2)} href={inquireHref('m365', lang)} className={`${btn('primary')} mt-8`}>
            {t.cta}
          </a>
        </div>
        {documents?.action && (
          <div {...revealProps(3)} className="flex flex-col items-start lg:border-l lg:border-white/12 lg:pl-12">
            <FileCheck className="size-8 text-brand-teal" />
            <h3 className="mt-4 text-xl font-extrabold text-balance text-white">{documents.title}</h3>
            <p className="mt-3 text-pretty text-light/85">{documents.text}</p>
            <a href={inquireHref('documents', lang)} className={`${btn('ghostOnDark')} mt-8`}>
              {documents.action}
            </a>
          </div>
        )}
      </div>
    </section>
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
