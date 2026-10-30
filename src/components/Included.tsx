import { useLang } from '../i18n/LanguageContext';
import { revealProps } from '../motion/reveal';
import { inquireHref } from '../routes';
import { includedIcons } from './icons';

/**
 * What every order includes: VAT invoice, tender documents, renewal reminders, support.
 * A list under hairlines rather than cards, so it reads as one promise. `dark` for Navy surfaces.
 * The documents item links to the form with "company documents" chosen, for tender teams.
 */
export function IncludedList({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  const { lang, t } = useLang();
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
            {item.action && (
              <a
                href={inquireHref('documents', lang)}
                className={`mt-1 inline-flex min-h-11 items-center font-extrabold underline decoration-2 underline-offset-4 ${dark ? 'text-white decoration-brand-teal hover:text-brand-teal' : 'text-navy decoration-deep-teal'}`}
              >
                {item.action}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
