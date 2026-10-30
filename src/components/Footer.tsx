import { isoStandards, site } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import { isProductPage, pagePath, pages } from '../routes';
import BuzLogo from './BuzLogo';
import { Facebook, LinkedIn, WhatsApp } from './icons';

/* inline-block py-1: taller tap targets on phones without changing the look. */
const linkClass = 'inline-block py-1 text-light/85 transition-colors duration-(--dur-hover) ease-soft hover:text-brand-teal';

/**
 * Kept short: the logo, the pages, how to reach us and the company facts. The company overview lives on About,
 * Home is the logo's link and the legal name sits in the copyright line.
 */
export function Footer() {
  const { lang, t } = useLang();
  const f = t.footer;
  const quickLinks = pages
    .filter((page) => page !== 'privacy' && page !== 'home')
    .map((page) => ({
      page,
      label: isProductPage(page) ? t.pages[page].label : t.nav[page as 'services' | 'about' | 'contact'],
    }));
  const social = [
    { label: 'Facebook', href: site.social.facebook, Icon: Facebook },
    { label: 'LinkedIn', href: site.social.linkedin, Icon: LinkedIn },
    { label: 'WhatsApp', href: site.whatsappHref, Icon: WhatsApp },
  ].filter((s): s is { label: string; href: string; Icon: typeof Facebook } => Boolean(s.href));

  return (
    <footer className="border-t border-white/10 bg-ink text-light">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-8 py-10 text-sm sm:gap-x-10 sm:py-12 sm:text-base lg:grid-cols-[1fr_1fr_1.3fr_1fr]">
        <div className="col-span-2 lg:col-span-1">
          <a href={pagePath('home', lang)} aria-label={t.a11y.home} className="inline-block">
            <BuzLogo className="h-10 w-auto" />
          </a>
          <p lang="en" className="mt-3 text-[0.6875rem] leading-none tracking-[0.22em] text-brand-teal uppercase">
            {site.tagline}
          </p>
        </div>

        {/* Phones have the header menu and the quick-contact bar, so the page list is left out there. */}
        <nav aria-label={f.quickLinks} className="max-sm:hidden">
          <h2 className="text-base text-white sm:text-lg">{f.quickLinks}</h2>
          <ul className="mt-2 space-y-1">
            {quickLinks.map(({ page, label }) => (
              <li key={page}>
                <a href={pagePath(page, lang)} className={linkClass}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0">
          <h2 className="text-base text-white sm:text-lg">{f.contactTitle}</h2>
          <ul className="mt-3 space-y-2">
            <li>
              <a href={site.phoneHref} className={linkClass}>
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {t.contact.address}
              </a>
            </li>
          </ul>
        </div>

        <div className="min-w-0">
          <h2 className="text-base text-white sm:text-lg">{f.complianceTitle}</h2>
          <ul className="mt-3 space-y-2">
            <li>{t.home.proof.partner}</li>
            {site.taxId && (
              <li>
                {f.taxId}: {site.taxId}
              </li>
            )}
            <li>{f.founded}</li>
            <li className="text-light/70">{isoStandards.join(' · ')}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5 text-sm text-light/75">
          <p className="text-pretty">
            © {__BUILD_YEAR__} {site.legalName}. {f.rights}
          </p>
          <a href={pagePath('privacy', lang)} className="underline underline-offset-4 transition-colors duration-(--dur-hover) ease-soft hover:text-brand-teal">
            {f.privacy}
          </a>
          {social.length > 0 && (
            <ul aria-label={f.social} className="flex gap-3">
              {social.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-lg border border-white/25 text-light transition-colors duration-(--dur-hover) ease-soft hover:border-brand-teal hover:text-brand-teal"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
