import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import type { Lang, PageId } from '../i18n/types';
import { isProductPage, pagePath, productPages } from '../routes';
import BuzLogo from './BuzLogo';
import { categoryIcons, ChevronDown, Close, Menu } from './icons';
import { btn } from './ui';

const LANGS: { id: Lang; label: string; htmlLang: string }[] = [
  { id: 'ge', label: 'GE', htmlLang: 'ka' },
  { id: 'en', label: 'EN', htmlLang: 'en' },
];

/** Pages linked directly from the header (products sit in their own menu). */
const DIRECT = ['services', 'about', 'contact'] as const satisfies readonly PageId[];

/** Links to the same page in the other language. */
function LangToggle() {
  const { lang, page, t } = useLang();
  return (
    <div role="group" aria-label={t.a11y.language} className="flex rounded-lg border border-white/25 p-0.5 text-sm">
      {LANGS.map((l) => (
        <a
          key={l.id}
          href={pagePath(page, l.id)}
          hrefLang={l.htmlLang}
          lang={l.htmlLang}
          aria-current={lang === l.id ? 'true' : undefined}
          className="rounded-md px-3 py-1.5 font-extrabold text-light/80 transition-colors hover:text-white aria-[current=true]:bg-brand-teal aria-[current=true]:text-ink"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}

/* A Brand Teal underline slides in from the left on hover and stays for the current page. */
const navLink =
  'relative px-3 py-2 text-[0.95rem] font-extrabold whitespace-nowrap text-light/80 transition-colors duration-(--dur-hover) ease-soft hover:text-white aria-[current=page]:text-white data-[active=true]:text-white after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand-teal after:transition-transform after:duration-(--dur-hover) after:ease-soft motion-reduce:after:transition-none hover:after:scale-x-100 aria-[current=page]:after:scale-x-100 data-[active=true]:after:scale-x-100';

/*
  Menus stay in the DOM and close by visibility, so they can fade and slide (about 6px) instead of
  snapping. `invisible` also takes the closed menu's links out of the tab order. Visibility only
  transitions on close (it stays visible while fading out); on open it flips at once, so a Tab
  pressed right after Enter already lands inside the menu.
*/
const menuMotion =
  'transition-[opacity,translate,visibility] data-[open=true]:transition-[opacity,translate] duration-(--dur-menu) ease-soft data-[open=false]:invisible data-[open=false]:opacity-0 motion-safe:data-[open=false]:-translate-y-1.5';

/** True once the page is scrolled past `threshold` px. Starts false on server and client alike. */
function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [threshold]);
  return scrolled;
}

/** Disclosure menu with the four product categories. Esc or a click outside closes it. */
function ProductsMenu() {
  const { lang, page, t } = useLang();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="products-menu"
        data-active={isProductPage(page)}
        onClick={() => setOpen((v) => !v)}
        className={`${navLink} flex items-center gap-1.5`}
      >
        {t.nav.products}
        <ChevronDown
          className={`size-4 transition-transform duration-(--dur-menu) ease-soft ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        id="products-menu"
        data-open={open}
        className={`absolute top-full left-0 mt-3 w-[36rem] rounded-xl border border-white/12 bg-ink p-2 shadow-2xl ${menuMotion}`}
      >
        <ul className="grid grid-cols-2 gap-1">
          {productPages.map((id) => {
            const Icon = categoryIcons[id];
            const cat = t.products.categories[id];
            return (
              <li key={id}>
                <a
                  href={pagePath(id, lang)}
                  aria-current={page === id ? 'page' : undefined}
                  className="flex h-full gap-3 rounded-lg p-3 transition-colors hover:bg-white/8 aria-[current=page]:bg-white/8"
                >
                  <Icon className="mt-0.5 size-5 shrink-0 text-brand-teal" />
                  <span>
                    <span className="block font-extrabold text-white">{cat.label}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-light/75">{cat.summary}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function Header() {
  const { lang, page, t } = useLang();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const mobileLink =
    'block border-b border-white/10 py-3.5 text-lg font-extrabold text-light/85 hover:text-white aria-[current=page]:text-brand-teal';

  return (
    <header
      data-scrolled={scrolled}
      className="sticky top-0 z-40 [view-transition-name:site-header] border-b border-white/10 bg-ink/95 backdrop-blur transition-shadow duration-(--dur-menu) ease-soft data-[scrolled=true]:shadow-lg data-[scrolled=true]:shadow-ink/30"
    >
      <div className="container-wide flex h-[4.5rem] items-center justify-between gap-4">
        <a
          href={pagePath('home', lang)}
          aria-label={t.a11y.home}
          aria-current={page === 'home' ? 'page' : undefined}
          className="shrink-0"
        >
          <BuzLogo className="h-11 w-auto" />
        </a>

        <nav aria-label={t.a11y.mainNav} className="hidden items-center gap-1 lg:flex">
          <ProductsMenu />
          {DIRECT.map((id) => (
            <a key={id} href={pagePath(id, lang)} aria-current={page === id ? 'page' : undefined} className={navLink}>
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <LangToggle />
          <a href={pagePath('contact', lang)} className={`${btn('primary', 'sm')} max-md:hidden`}>
            {t.cta}
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-lg border border-white/25 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Overlays the page under the header; scrolls on its own on short screens. */}
      <div
        id="mobile-nav"
        data-open={open}
        className={`absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-y border-white/10 bg-ink lg:hidden ${menuMotion}`}
      >
        <nav aria-label={t.a11y.mainNav} className="container-x py-3">
          <p className="pt-3 pb-1 text-sm tracking-[0.14em] text-light/60 uppercase">{t.nav.products}</p>
          <ul>
            {productPages.map((id) => (
              <li key={id}>
                <a href={pagePath(id, lang)} aria-current={page === id ? 'page' : undefined} className={`${mobileLink} pl-4`}>
                  {t.products.categories[id].label}
                </a>
              </li>
            ))}
            {DIRECT.map((id) => (
              <li key={id}>
                <a href={pagePath(id, lang)} aria-current={page === id ? 'page' : undefined} className={mobileLink}>
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
          <a href={pagePath('contact', lang)} className={`${btn('primary')} mt-4 w-full`}>
            {t.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}
