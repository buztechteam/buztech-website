import { vendors } from '../config/site';
import { useLang } from '../i18n/LanguageContext';

function VendorSet({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {vendors.map((vendor) => (
        <li
          key={vendor.name}
          className="flex items-center border-r border-white/12 px-8 whitespace-nowrap sm:px-12"
        >
          <span className="text-2xl font-extrabold text-light/85 sm:text-3xl">{vendor.name}</span>
          {vendor.note && (
            <span lang="en" className="ml-3 rounded-md border border-brand-teal/70 px-2 py-0.5 text-xs text-brand-teal">
              {vendor.note}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/** Each half of the track holds three copies, so it is always wider than the screen. */
const COPIES = [0, 1, 2];

export function VendorMarquee() {
  const { t } = useLang();
  return (
    <section id="partners" className="border-y border-white/10 bg-ink py-10 sm:py-12">
      <div className="container-x">
        <h2 className="text-xl leading-tight font-extrabold tracking-tight sm:text-2xl">{t.partners.heading}</h2>
        <p className="mt-2 max-w-[38rem] text-light/75">{t.partners.lead}</p>
      </div>

      <div className="marquee mt-8 overflow-hidden" role="group" aria-label={t.a11y.partnerList}>
        <div className="marquee-track flex w-max">
          {[0, 1].flatMap((half) =>
            COPIES.map((copy) => (
              <VendorSet key={`${half}-${copy}`} hidden={half !== 0 || copy !== 0} />
            )),
          )}
        </div>
      </div>
    </section>
  );
}
