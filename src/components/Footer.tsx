import { certs, site } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import { isProductPage, pagePath, pages } from '../routes';
import BuzLogo from './BuzLogo';
import { Facebook, LinkedIn, WhatsApp } from './icons';

const linkClass = 'text-light/85 transition-colors duration-(--dur-hover) ease-soft hover:text-brand-teal';

export function Footer() {
  const { lang, t } = useLang();
  const f = t.footer;
  const quickLinks = pages
    .filter((page) => page !== 'privacy')
    .map((page) => ({
      page,
      label: isProductPage(page) ? t.pages[page].label : t.nav[page as 'home' | 'services' | 'about' | 'contact'],
    }));
  const social = [
    { label: 'Facebook', href: site.social.facebook, Icon: Facebook },
    { label: 'LinkedIn', href: site.social.linkedin, Icon: LinkedIn },
    { label: 'WhatsApp', href: site.whatsappHref, Icon: WhatsApp },
  ].filter((s): s is { label: string; href: string; Icon: typeof Facebook } => Boolean(s.href));

  return (
    <footer className="border-t border-white/10 bg-ink text-light">
      {/* Phone: two columns throughout, the overview hidden (About carries it), smaller lists. */}
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-10 py-12 max-sm:text-sm sm:gap-12 sm:py-16 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
        <div className="col-span-2 lg:col-span-1">
          <BuzLogo className="h-10 w-auto" />
          <p lang="en" className="mt-3 text-[0.6875rem] leading-none tracking-[0.22em] text-brand-teal uppercase">
            {site.tagline}
          </p>
          <p className="mt-6 max-w-[26rem] text-light/85 max-sm:hidden">{f.overview}</p>
        </div>

        <nav aria-label={f.quickLinks} className="col-span-2 sm:col-span-1">
          <h2 className="text-lg text-white">{f.quickLinks}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-1">
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
          <h2 className="text-lg text-white">{f.contactTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            <li>{site.legalName}</li>
            <li>
              <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {t.contact.address}
              </a>
            </li>
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
          </ul>
        </div>

        <div className="min-w-0">
          <h2 className="text-lg text-white">{f.complianceTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            {certs.map((cert) => (
              <li key={cert.id}>{cert.code}</li>
            ))}
            <li>{t.home.proof.partner}</li>
            {site.taxId && (
              <li>
                {f.taxId}: {site.taxId}
              </li>
            )}
            <li>{f.founded}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-6 text-sm text-light/75">
          <p>
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
