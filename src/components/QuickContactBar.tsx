import { useEffect, useState } from 'react';
import { officeFor } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import { pagePath } from '../routes';
import { Phone, WhatsApp } from './icons';
import { btn } from './ui';

/** Height of the bar, so App can leave the same space under the footer. */
export const QUICK_BAR_SPACE = 'h-[calc(4.5rem+env(safe-area-inset-bottom))]';

/* 44px icon buttons and a small CTA keep "მიიღეთ ფასი" whole on a 375px phone. */
const iconButton =
  'grid size-11 shrink-0 place-items-center rounded-lg border border-white/25 text-white transition-colors duration-(--dur-hover) ease-soft hover:border-brand-teal hover:text-brand-teal';

/**
 * Phones only: call, WhatsApp and the price request, fixed to the bottom edge.
 * Not on the Contact page, where the same details lead the page and the bar could cover the form while typing.
 * Pages that open with their own price buttons (data-hero-cta) hide it until those leave the screen, so the first
 * screen never offers the same button twice; it is hidden from the first paint, so it never flashes in and out.
 */
export function QuickContactBar() {
  const { lang, t } = useLang();
  const office = officeFor(lang);
  const [ctaInView, setCtaInView] = useState(true);

  useEffect(() => {
    const ctas = [...document.querySelectorAll('[data-hero-cta]')];
    if (ctas.length === 0) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setCtaInView(visible.size > 0);
    });
    for (const el of ctas) io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label={t.a11y.quickContact}
      data-cta-in-view={ctaInView}
      className="fixed inset-x-0 bottom-0 z-30 [view-transition-name:quick-bar] border-t border-white/12 bg-ink/95 backdrop-blur md:hidden [body:has([data-hero-cta])_&[data-cta-in-view=true]]:hidden [html[data-menu-open]_&]:hidden"
    >
      <div className="container-x flex items-center gap-2 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <a href={office.phoneHref} aria-label={`${t.contact.phone}: ${office.phone}`} className={iconButton}>
          <Phone className="size-5" />
        </a>
        <a href={office.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={iconButton}>
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
