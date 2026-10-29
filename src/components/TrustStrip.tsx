import { certs } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import { pagePath } from '../routes';
import { revealProps } from '../motion/reveal';
import { ArrowRight } from './icons';
import { btn } from './ui';

/** The three company facts (2018 · 5 countries · 3 ISO), on Navy cells: home trust strip and the About intro. */
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

/** Home page proof in one band: the facts, client names and ISO standards, leading to About us. */
export function TrustStrip() {
  const { lang, t } = useLang();
  const clientNames = t.clients.groups.flatMap((group) => group.items.map((item) => item.name));

  return (
    <section className="bg-navy py-20 text-light lg:py-24">
      <div className="container-x">
        <Facts />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div {...revealProps(0)}>
            <h2 className="text-2xl leading-tight font-extrabold text-white">{t.clients.heading}</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {clientNames.map((name) => (
                <li key={name} className="rounded-md border border-white/15 bg-white/5 px-3 py-1.5 font-extrabold text-white">
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <div {...revealProps(1)}>
            <h2 className="text-2xl leading-tight font-extrabold text-white">{t.certs.heading}</h2>
            <ul className="mt-5 space-y-3">
              {certs.map((cert) => (
                <li key={cert.id} className="flex items-baseline gap-4">
                  <span className="w-28 shrink-0 font-extrabold text-brand-teal">{cert.code}</span>
                  <span className="text-light/85">{t.certs.items[cert.id].name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <a href={pagePath('about', lang)} className={`${btn('ghostOnDark')} mt-12 gap-2`}>
          {t.nav.about}
          <ArrowRight className="size-5" />
        </a>
      </div>
    </section>
  );
}
