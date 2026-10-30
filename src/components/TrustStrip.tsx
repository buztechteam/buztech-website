import { certs } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import { pagePath } from '../routes';
import { revealProps } from '../motion/reveal';
import { ArrowRight, Check } from './icons';
import { btn, h2Class } from './ui';

/** The three company facts (2018 · 5 countries · 3 ISO), on Navy cells: the About intro. */
export function Facts({ className = '' }: { className?: string }) {
  const { t } = useLang();
  return (
    /* Phone: one compact row per fact (Georgian labels like "საქართველოში" are too long for three columns). */
    <dl {...revealProps(0)} className={`grid gap-px overflow-hidden rounded-xl border border-white/12 bg-white/12 sm:grid-cols-3 ${className}`}>
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

/** Microsoft CSP partner, the ISO standards and the company facts, as a checked list on Navy (home proof, Contact). */
export function Credentials() {
  const { t } = useLang();
  const p = t.home.proof;
  return (
    <ul className="space-y-3.5">
      <li className="flex gap-3">
        <Check className="mt-1 size-4 shrink-0 text-brand-teal" strokeWidth={3} />
        <span className="font-extrabold text-white">{p.partner}</span>
      </li>
      {certs.map((cert) => (
        <li key={cert.id} className="flex gap-3">
          <Check className="mt-1 size-4 shrink-0 text-brand-teal" strokeWidth={3} />
          <span>
            <span className="font-extrabold text-white">{cert.code}</span>
            <span className="text-light/80"> · {t.certs.items[cert.id].name}</span>
          </span>
        </li>
      ))}
      {[p.since, p.countries].map((fact) => (
        <li key={fact} className="flex gap-3">
          <Check className="mt-1 size-4 shrink-0 text-brand-teal" strokeWidth={3} />
          <span className="text-light/85">{fact}</span>
        </li>
      ))}
    </ul>
  );
}

/** Home page proof: named clients set as a list (not chips), the credentials beside them, leading to About us. */
export function Proof() {
  const { lang, t } = useLang();
  const clients = t.clients.groups.flatMap((group) => group.items);

  return (
    <section className="bg-navy py-20 text-light lg:py-24">
      <div className="container-x grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <div>
          <h2 {...revealProps(0)} className={`${h2Class} text-white`}>{t.home.proof.heading}</h2>
          <ul {...revealProps(1)} className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {clients.map((client) => (
              <li key={client.name} className="border-t border-white/12 pt-4">
                <p className="text-lg leading-snug font-extrabold text-white">{client.name}</p>
                <p className="mt-0.5 text-sm text-light/75">{client.sector}</p>
              </li>
            ))}
          </ul>
        </div>

        <div {...revealProps(2)} className="lg:border-l lg:border-white/12 lg:pl-12">
          <h3 className="text-xl font-extrabold text-white">{t.home.proof.credentials}</h3>
          <div className="mt-6">
            <Credentials />
          </div>
          <a href={pagePath('about', lang)} className={`${btn('ghostOnDark')} mt-10 gap-2`}>
            {t.nav.about}
            <ArrowRight className="size-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
