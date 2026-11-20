import { officeFor } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import { pagePath } from '../routes';
import { revealProps } from '../motion/reveal';
import { Mail, Phone, WhatsApp } from './icons';
import { btn } from './ui';

/**
 * The price request, WhatsApp and the phone, as buttons. On the teal band by default; `onLight` for a light
 * section (Home's people, who ask visitors to contact them directly). `mail` adds the office's email after the
 * phone (Home's people, owner's request of 20 November 2026); the band keeps three buttons, so it stays one row.
 */
export function ContactActions({
  onLight = false,
  mail = false,
  className = '',
}: {
  onLight?: boolean;
  mail?: boolean;
  className?: string;
}) {
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
      {mail && (
        <a href={`mailto:${office.email}`} className={`${outline} gap-2`}>
          <Mail className="size-5" />
          {office.email}
        </a>
      )}
    </div>
  );
}

/**
 * Closes every page except Contact: the price request, WhatsApp and phone, never more than a scroll away.
 * The heading has its own words, so the call to action ("Get a quote") is said once, on the button.
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
        <div {...revealProps(1)} className="xl:shrink-0">
          <ContactActions />
        </div>
      </div>
    </section>
  );
}
