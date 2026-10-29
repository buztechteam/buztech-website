import { site } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import { pagePath } from '../routes';
import { Phone, WhatsApp } from './icons';
import { btn } from './ui';

/** Height of the bar, so App can leave the same space under the footer. */
export const QUICK_BAR_SPACE = 'h-[calc(4.5rem+env(safe-area-inset-bottom))]';

/* 44px icon buttons and a small CTA keep "მიიღეთ ფასი დღესვე" whole on a 375px phone. */
const iconButton =
  'grid size-11 shrink-0 place-items-center rounded-lg border border-white/25 text-white transition-colors hover:border-brand-teal hover:text-brand-teal';

/**
 * Phones only: call, WhatsApp and the price request, fixed to the bottom edge.
 * Not on the Contact page, where the same details lead the page and the bar could cover the form while typing.
 */
export function QuickContactBar() {
  const { lang, t } = useLang();
  return (
    <nav
      aria-label={t.a11y.quickContact}
      className="fixed inset-x-0 bottom-0 z-30 [view-transition-name:quick-bar] border-t border-white/12 bg-ink/95 backdrop-blur md:hidden"
    >
      <div className="container-x flex items-center gap-2 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <a href={site.phoneHref} aria-label={`${t.contact.phone}: ${site.phone}`} className={iconButton}>
          <Phone className="size-5" />
        </a>
        <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={iconButton}>
          <WhatsApp className="size-5" />
        </a>
        <a
          href={pagePath('contact', lang)}
          className={`${btn('primary', 'sm')} min-h-11 min-w-0 flex-1 max-[360px]:px-3 max-[360px]:text-[0.8125rem]`}
        >
          <span className="truncate">{t.cta}</span>
        </a>
      </div>
    </nav>
  );
}
