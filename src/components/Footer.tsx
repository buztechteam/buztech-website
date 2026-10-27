import { certs, navOrder, site } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import { Facebook, LinkedIn } from './icons';
import { Logo } from './Logo';

const linkClass = 'text-light/85 transition-colors hover:text-brand-teal';

export function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const social = [
    { label: 'Facebook', href: site.social.facebook, Icon: Facebook },
    { label: 'LinkedIn', href: site.social.linkedin, Icon: LinkedIn },
  ].filter((s): s is { label: string; href: string; Icon: typeof Facebook } => Boolean(s.href));

  return (
    <footer className="border-t border-white/10 bg-ink text-light">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
        <div>
          <Logo className="h-10 w-auto" />
          <p lang="en" className="mt-3 text-[0.6875rem] leading-none tracking-[0.22em] text-brand-teal uppercase">
            {site.tagline}
          </p>
          <p className="mt-6 max-w-[26rem] text-light/85">{f.overview}</p>
        </div>

        <nav aria-label={f.quickLinks}>
          <h2 className="text-lg text-white">{f.quickLinks}</h2>
          <ul className="mt-4 space-y-2.5">
            {navOrder.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className={linkClass}>
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-lg text-white">{f.contactTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            <li>{site.legalName}</li>
            <li>
              {site.city}, {site.country}
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

        <div>
          <h2 className="text-lg text-white">{f.complianceTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            {certs.map((cert) => (
              <li key={cert.id}>{cert.code}</li>
            ))}
            <li>Microsoft Solution Partner</li>
            {site.taxId && (
              <li>
                {f.taxId}: {site.taxId}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-6 text-sm text-light/75">
          <p>
            © {new Date().getFullYear()} {site.legalName}. {f.rights}
          </p>
          {social.length > 0 && (
            <ul aria-label={f.social} className="flex gap-3">
              {social.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-lg border border-white/25 text-light transition-colors hover:border-brand-teal hover:text-brand-teal"
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
