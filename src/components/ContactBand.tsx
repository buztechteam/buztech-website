import { site } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import { pagePath } from '../routes';
import { Phone, WhatsApp } from './icons';
import { btn } from './ui';

/** Closes every page except Contact: the price request, WhatsApp and phone, never more than a scroll away. */
export function ContactBand() {
  const { lang, t } = useLang();
  return (
    <section aria-labelledby="contact-band-title" className="surface-teal bg-brand-teal text-ink">
      <div className="container-x flex flex-col gap-8 py-14 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 id="contact-band-title" className="text-[clamp(1.6rem,1.1rem+1.6vw,2.25rem)] leading-tight font-extrabold tracking-tight">
            {t.contact.heading}
          </h2>
          <p className="mt-3 max-w-[34rem] text-lg leading-relaxed">{t.contact.lead}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a href={pagePath('contact', lang)} className={btn('navyOnTeal')}>
            {t.cta}
          </a>
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className={`${btn('outlineOnTeal')} gap-2`}>
            <WhatsApp className="size-5" />
            WhatsApp
          </a>
          <a href={site.phoneHref} className={`${btn('outlineOnTeal')} gap-2`}>
            <Phone className="size-5" />
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
