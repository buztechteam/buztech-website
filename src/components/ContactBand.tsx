import { officeFor } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import { pagePath } from '../routes';
import { revealProps } from '../motion/reveal';
import { Phone, WhatsApp } from './icons';
import { btn } from './ui';

/**
 * The price request, WhatsApp and the phone, as buttons. On the teal band by default; `onLight` for a light
 * section (Home's people, who ask visitors to contact them directly).
 */
export function ContactActions({ onLight = false, className = '' }: { onLight?: boolean; className?: string }) {
  const { lang, t } = useLang();
  const office = officeFor(lang);
  const outline = btn(onLight ? 'outlineOnLight' : 'outlineOnTeal');
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a href={pagePath('contact', lang)} className={btn(onLight ? 'primaryOnLight' : 'navyOnTeal')}>
        {t.cta}
      </a>
      <a href={office.whatsappHref} target="_blank" rel="noopener noreferrer" className={`${outline} gap-2`}>
        <WhatsApp className="size-5" />
        WhatsApp
      </a>
      <a href={office.phoneHref} className={`${outline} gap-2`}>
        <Phone className="size-5" />
        {office.phone}
      </a>
    </div>
  );
}

/**
 * Closes every page except Contact: the price request, WhatsApp and phone, never more than a scroll away.
 * The heading has its own words, so "Get a price" is said once, on the button.
 */
export function ContactBand() {
  const { t } = useLang();
  return (
    <section aria-labelledby="contact-band-title" className="surface-teal bg-brand-teal text-ink">
      <div className="container-x flex flex-col gap-8 py-14 lg:flex-row lg:items-center lg:justify-between">
        <div {...revealProps(0)}>
          <h2 id="contact-band-title" className="text-[clamp(1.6rem,1.1rem+1.6vw,2.25rem)] leading-tight font-extrabold tracking-tight text-balance">
            {t.contact.bandHeading}
          </h2>
          <p className="mt-3 max-w-[34rem] text-lg leading-relaxed">{t.contact.lead}</p>
        </div>
        <div {...revealProps(1)}>
          <ContactActions />
        </div>
      </div>
    </section>
  );
}
