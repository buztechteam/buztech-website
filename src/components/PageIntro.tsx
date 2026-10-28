import { useLang } from '../i18n/LanguageContext';
import { isProductPage, pagePath } from '../routes';

/**
 * Top band of every inner page: breadcrumb, the page's one h1 and its lead.
 * Same gradient and Navy scrim as the home hero, so the pages read as one site.
 */
export function PageIntro({ title, lead }: { title: string; lead?: string }) {
  const { lang, page, t } = useLang();
  const trail = [t.nav.home, ...(isProductPage(page) ? [t.nav.products] : [])];

  return (
    <section className="relative isolate overflow-hidden bg-brand-gradient text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 from-navy/80 via-navy/45 to-navy/10 max-lg:bg-linear-to-b lg:bg-linear-to-r"
      />
      <div className="container-x py-12 sm:py-16">
        <nav aria-label={t.a11y.breadcrumb}>
          <ol className="flex flex-wrap items-center gap-x-2 text-sm text-light/85">
            {trail.map((label, index) => (
              <li key={label} className="flex items-center gap-2">
                {index === 0 ? (
                  <a href={pagePath('home', lang)} className="underline-offset-4 hover:text-white hover:underline">
                    {label}
                  </a>
                ) : (
                  <span>{label}</span>
                )}
                <span aria-hidden="true">/</span>
              </li>
            ))}
            <li aria-current="page" className="font-extrabold text-white">
              {title}
            </li>
          </ol>
        </nav>
        <h1 className="mt-4 text-[clamp(2rem,1.2rem+2.4vw,3.25rem)] leading-[1.15] font-extrabold tracking-tight text-balance">
          {title}
        </h1>
        {lead && <p className="mt-4 max-w-[40rem] text-lg leading-relaxed text-light">{lead}</p>}
      </div>
    </section>
  );
}
