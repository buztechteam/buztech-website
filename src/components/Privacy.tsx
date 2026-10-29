import { site } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import { revealProps } from '../motion/reveal';

/** Body of the privacy page; the title and intro sit in the page's PageIntro. */
export function Privacy() {
  const { t } = useLang();
  const p = t.privacy;
  return (
    <section className="surface-light bg-light py-16 text-navy lg:py-20">
      <div className="container-x max-w-[48rem]">
        {p.sections.map((s) => (
          <section key={s.heading} {...revealProps(0)} className="mt-10 first:mt-0">
            <h2 className="text-2xl leading-tight font-extrabold">{s.heading}</h2>
            <p className="mt-3 text-lg text-navy/85">{s.body}</p>
          </section>
        ))}

        {site.analytics && p.analyticsOn && <p className="mt-10 text-lg text-navy/85">{p.analyticsOn}</p>}

        <p className="mt-12 border-t border-navy/15 pt-5 text-sm text-navy/75">
          {site.legalName} · {site.email} · {p.updated}
        </p>
      </div>
    </section>
  );
}
