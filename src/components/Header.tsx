import { useEffect, useState } from 'react';
import { navOrder, pageOrder, site } from '../config/site';
import { useActiveSection } from '../hooks/useActiveSection';
import { useLang } from '../i18n/LanguageContext';
import type { Lang, SectionId } from '../i18n/types';
import { Close, Menu } from './icons';
import { Logo } from './Logo';
import { btn } from './ui';

const LANGS: { id: Lang; label: string; htmlLang: string }[] = [
  { id: 'ge', label: 'GE', htmlLang: 'ka' },
  { id: 'en', label: 'EN', htmlLang: 'en' },
];

function LangToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div
      role="group"
      aria-label={t.a11y.language}
      className="flex rounded-lg border border-white/25 p-0.5 text-sm"
    >
      {LANGS.map((l) => (
        <button
          key={l.id}
          type="button"
          lang={l.htmlLang}
          aria-pressed={lang === l.id}
          onClick={() => setLang(l.id)}
          className={`rounded-md px-3 py-1.5 font-extrabold transition-colors ${
            lang === l.id ? 'bg-brand-teal text-ink' : 'text-light/80 hover:text-white'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const active = useActiveSection(pageOrder);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const renderLink = (id: SectionId, className: string) => (
    <a
      key={id}
      href={`#${id}`}
      onClick={() => setOpen(false)}
      aria-current={active === id ? 'location' : undefined}
      className={className}
    >
      {t.nav[id]}
    </a>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 backdrop-blur">
      <div className="container-wide flex h-[4.5rem] items-center justify-between gap-4">
        <a href="#home" aria-label={t.a11y.home} className="flex shrink-0 flex-col gap-1.5 py-2">
          <Logo className="h-9 w-auto" />
          <span
            lang="en"
            className="text-[0.6875rem] leading-none tracking-[0.16em] whitespace-nowrap text-brand-teal uppercase max-sm:hidden"
          >
            {site.tagline}
          </span>
        </a>

        {/* Six Georgian labels need ~1300px of header: the full nav starts at 1360px, the menu button covers everything below. */}
        <nav aria-label={t.a11y.mainNav} className="hidden items-center min-[1360px]:flex">
          {navOrder.map((id) =>
            renderLink(
              id,
              'relative px-2.5 py-2 text-[0.9rem] font-extrabold whitespace-nowrap text-light/80 transition-colors hover:text-white aria-[current=location]:text-white after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-0.5 after:bg-brand-teal after:opacity-0 aria-[current=location]:after:opacity-100',
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <LangToggle />
          <a href="#contact" className={`${btn('primary', 'sm')} max-md:hidden`}>
            {t.cta}
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-lg border border-white/25 text-white min-[1360px]:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-white/10 bg-ink min-[1360px]:hidden ${open ? 'block' : 'hidden'}`}
      >
        <nav aria-label={t.a11y.mainNav} className="container-x flex flex-col py-3">
          {navOrder.map((id) =>
            renderLink(
              id,
              'border-b border-white/10 py-3.5 text-lg font-extrabold text-light/85 hover:text-white aria-[current=location]:text-brand-teal',
            ),
          )}
          <a href="#contact" onClick={() => setOpen(false)} className={`${btn('primary')} mt-4`}>
            {t.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}
