import { useLang } from '../i18n/LanguageContext';
import { revealProps } from '../motion/reveal';
import { includedIcons } from './icons';
import { h2Class } from './ui';

/**
 * What every order includes: VAT invoice, tender documents, renewal reminders, support.
 * A list under hairlines rather than cards, so it reads as one promise. `dark` for Navy surfaces.
 */
export function IncludedList({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  const { t } = useLang();
  return (
    <ul className={`grid gap-x-8 gap-y-7 ${className}`}>
      {t.included.items.map((item, i) => {
        const Icon = includedIcons[i];
        return (
          <li key={item.title} {...revealProps(i)} className={`border-t pt-5 ${dark ? 'border-white/15' : 'border-navy/15'}`}>
            <div className="flex items-center gap-3">
              <Icon className={`size-6 shrink-0 ${dark ? 'text-brand-teal' : 'text-deep-teal'}`} />
              <h3 className={`text-lg leading-snug font-extrabold ${dark ? 'text-white' : ''}`}>{item.title}</h3>
            </div>
            <p className={`mt-2 text-pretty ${dark ? 'text-light/80' : 'text-navy/85'}`}>{item.text}</p>
          </li>
        );
      })}
    </ul>
  );
}

/** Home page section. */
export function IncludedSection() {
  const { t } = useLang();
  return (
    <section className="surface-light bg-light py-20 text-navy lg:py-24">
      <div className="container-x">
        <h2 {...revealProps(0)} className={h2Class}>{t.included.heading}</h2>
        <IncludedList className="mt-10 sm:grid-cols-2 lg:grid-cols-4" />
      </div>
    </section>
  );
}
