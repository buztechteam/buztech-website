import { vendors } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import { revealProps } from '../motion/reveal';
import { cardStaticDark } from './ui';

/** Home page: the vendors as one still row of typeset names (nothing loops; logos once the packs arrive). */
export function PartnerStrip() {
  const { t } = useLang();
  return (
    <section id="partners" className="border-y border-white/10 bg-ink py-10 sm:py-12">
      <div className="container-x">
        <h2 className="text-xl leading-tight font-extrabold tracking-tight sm:text-2xl">{t.partners.heading}</h2>
        <p className="mt-2 max-w-[38rem] text-light/75">{t.partners.lead}</p>

        {/* one row spread edge to edge from 1280px; below that the names wrap */}
        <ul
          aria-label={t.a11y.partnerList}
          className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4 sm:gap-x-14 xl:justify-between xl:gap-x-8"
        >
          {vendors.map((vendor) => (
            <li key={vendor.name} className="flex items-center whitespace-nowrap">
              <span className="text-2xl font-extrabold text-light/85 sm:text-3xl">{vendor.name}</span>
              {vendor.note && (
                <span lang="en" className="ml-3 rounded-md border border-brand-teal/70 px-2 py-0.5 text-xs text-brand-teal">
                  {vendor.note}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** About page: the same vendors as still tiles (typeset names until the logo packs arrive). */
export function PartnerGrid() {
  const { t } = useLang();
  return (
    <section className="border-y border-white/10 bg-ink py-16 lg:py-20">
      <div className="container-x">
        <h2 {...revealProps(0)} className="text-[clamp(1.75rem,1.1rem+2.2vw,2.75rem)] leading-[1.15] font-extrabold tracking-tight text-white">
          {t.partners.heading}
        </h2>
        <p {...revealProps(1)} className="mt-4 max-w-[38rem] text-lg leading-relaxed text-light/80">{t.partners.lead}</p>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {vendors.map((vendor, i) => (
            <li
              key={vendor.name}
              {...revealProps(i)}
              className={`flex min-h-28 flex-col justify-center gap-2 rounded-xl border border-white/12 bg-white/5 px-5 py-6 ${cardStaticDark}`}
            >
              <span className="text-xl leading-tight font-extrabold text-white sm:text-2xl">{vendor.name}</span>
              {vendor.note && (
                <span lang="en" className="self-start rounded-md border border-brand-teal/70 px-2 py-0.5 text-xs text-brand-teal">
                  {vendor.note}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
