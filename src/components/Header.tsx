import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import type { Lang, PageId } from '../i18n/types';
import { htmlLang, isProductPage, pagePath, productPages } from '../routes';
import BuzLogo from './BuzLogo';
import { ChevronDown, Close, Menu, pageIcons } from './icons';
import { btn } from './ui';

/** Each language named in itself; the button shows the short code. */
const LANGS: { id: Lang; code: string; name: string }[] = [
  { id: 'ge', code: 'GE', name: 'ქართული' },
  { id: 'en', code: 'EN', name: 'English' },
  { id: 'az', code: 'AZ', name: 'Azərbaycan dili' },
  { id: 'ru', code: 'RU', name: 'Русский' },
];

/** Pages linked directly from the header (products sit in their own menu). */
const DIRECT = ['services', 'about', 'contact'] as const satisfies readonly PageId[];

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

/*
  Scrolled, the bar slims from 4.5rem to 3.5rem and a 1rem margin takes up the difference, so the page
  below never jumps: height and margin share one duration and easing, so their sum stays constant.
  On phones and tablets the header tucks away while scrolling down. Reduced motion: it snaps.
*/
const headerMotion =
  'transition-[height,margin,translate,box-shadow] duration-(--dur-hover) ease-soft motion-reduce:transition-none';

/**
 * `scrolled`: the page is past `threshold` px (the header slims down and gets a shadow).
 * `down`: the visitor is scrolling down, well below the top (phones and tablets tuck the header away;
 * any scroll up brings it back). Small moves, like iOS's bounce, don't count.
 * Both start false on server and client alike.
 */
function useScrollState(threshold = 8): { scrolled: boolean; down: boolean } {
  const [scrolled, setScrolled] = useState(false);
  const [down, setDown] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > threshold);
      if (Math.abs(y - lastY) < 8) return;
      setDown(y > lastY && y > 160);
      lastY = y;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [threshold]);
  return { scrolled, down };
}

/** Disclosure menu with the product pages, Microsoft 365 first. Opens on hover or click; Esc or a click outside closes it. */
function ProductsMenu() {
  const { lang, page, t } = useLang();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  /*
    A mouse opens the menu by pointing at it, and leaving closes it after a short delay, so the pointer can
    cross the gap between the button and the menu. Touch and keyboard keep the click toggle. A click right
    after a hover-open keeps the menu open instead of closing it under the pointer.
  */
  const closeTimer = useRef<number | undefined>(undefined);
  const hoverOpened = useRef(false);
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);
  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    window.clearTimeout(closeTimer.current);
    if (!open) {
      hoverOpened.current = true;
      setOpen(true);
    }
  };
  const onPointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    closeTimer.current = window.setTimeout(() => {
      hoverOpened.current = false;
      setOpen(false);
    }, 200);
  };
  const onClick = () => {
    if (hoverOpened.current) {
      hoverOpened.current = false;
      setOpen(true);
      return;
    }
    setOpen((v) => !v);
  };

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
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
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
        onClick={onClick}
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
        className={`absolute top-full left-0 mt-3 w-[26rem] rounded-xl border border-white/12 bg-ink p-2 shadow-2xl ${menuMotion}`}
      >
        <ul className="grid gap-1">
          {productPages.map((id) => {
            const Icon = pageIcons[id];
            const cat = t.pages[id];
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

/** The same page in each language, in a small menu. Esc, a click outside or tabbing out closes it. */
function LangMenu() {
  const { lang, page, t } = useLang();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const current = LANGS.find((l) => l.id === lang) ?? LANGS[0];

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
        aria-controls="lang-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-11 items-center gap-1.5 rounded-lg border border-white/25 px-3 text-sm font-extrabold text-white transition-colors duration-(--dur-hover) ease-soft hover:border-white/50"
      >
        <span className="sr-only">{t.a11y.language}: </span>
        {current.code}
        <ChevronDown className={`size-4 transition-transform duration-(--dur-menu) ease-soft ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        id="lang-menu"
        data-open={open}
        className={`absolute top-full right-0 z-10 mt-3 w-56 rounded-xl border border-white/12 bg-ink p-2 shadow-2xl ${menuMotion}`}
      >
        <ul className="grid gap-1">
          {LANGS.map((l) => (
            <li key={l.id}>
              <a
                href={pagePath(page, l.id)}
                hrefLang={htmlLang[l.id]}
                lang={htmlLang[l.id]}
                aria-current={lang === l.id ? 'true' : undefined}
                className="flex min-h-11 items-center justify-between gap-3 rounded-lg px-3 font-extrabold text-light/85 transition-colors hover:bg-white/8 hover:text-white aria-[current=true]:bg-white/8 aria-[current=true]:text-white"
              >
                {l.name}
                <span aria-hidden="true" className="text-sm text-light/60">
                  {l.code}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Header() {
  const { lang, page, t } = useLang();
  const [open, setOpen] = useState(false);
  const { scrolled, down } = useScrollState();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  /* On Contact the form is already here: jump to it instead of reloading the page and losing what was typed. */
  const ctaHref = page === 'contact' ? '#price-form' : pagePath('contact', lang);

  /*
    The phone menu overlays the page, so it must not stay open behind the visitor's back:
    Esc closes it and returns focus to its button; a tap or keyboard focus outside the header closes it.
  */
  useEffect(() => {
    if (!open) return;
    /* The page behind stays put and the phone bar steps aside (QuickContactBar); a wide screen has no phone menu. */
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    root.dataset.menuOpen = 'true';
    const wide = window.matchMedia('(min-width: 64rem)');
    const onWide = () => {
      if (wide.matches) setOpen(false);
    };
    wide.addEventListener('change', onWide);
    const outside = (target: EventTarget | null) => !headerRef.current?.contains(target as Node | null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (outside(e.target)) setOpen(false);
    };
    const onFocus = (e: FocusEvent) => {
      if (outside(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('focusin', onFocus);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('focusin', onFocus);
      wide.removeEventListener('change', onWide);
      root.style.overflow = '';
      delete root.dataset.menuOpen;
    };
  }, [open]);

  const mobileLink =
    'block border-b border-white/10 py-3.5 text-lg font-extrabold text-light/85 hover:text-white aria-[current=page]:text-brand-teal';

  return (
    <header
      ref={headerRef}
      data-scrolled={scrolled}
      data-tucked={down && !open}
      className={`group sticky top-0 z-40 [view-transition-name:site-header] border-b border-white/10 bg-ink/95 backdrop-blur ${headerMotion} data-[scrolled=true]:mb-4 data-[scrolled=true]:shadow-lg data-[scrolled=true]:shadow-ink/30 max-lg:data-[tucked=true]:not-focus-within:-translate-y-full`}
    >
      <div
        className={`container-wide flex h-[4.5rem] items-center justify-between gap-4 ${headerMotion} group-data-[scrolled=true]:h-14`}
      >
        <a
          href={pagePath('home', lang)}
          aria-label={t.a11y.home}
          aria-current={page === 'home' ? 'page' : undefined}
          className="shrink-0 transition-transform duration-(--dur-hover) ease-soft motion-safe:active:scale-97"
        >
          <BuzLogo live className={`h-11 w-auto ${headerMotion} group-data-[scrolled=true]:h-9`} />
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
          <LangMenu />
          <a href={ctaHref} className={`${btn('primary', 'sm')} max-md:hidden`}>
            {t.cta}
          </a>
          <button
            ref={toggleRef}
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
          {/* Georgian has no capitals: uppercase would switch it to Mtavruli, and tracking stretches its long words. */}
          <p className={`pt-3 pb-1 text-sm text-light/60 ${lang === 'ge' ? '' : 'tracking-[0.14em] uppercase'}`}>{t.nav.products}</p>
          <ul>
            {productPages.map((id) => (
              <li key={id}>
                <a href={pagePath(id, lang)} aria-current={page === id ? 'page' : undefined} className={`${mobileLink} pl-4`}>
                  {t.pages[id].label}
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
          {/* Languages are not repeated here: the language button stays in the bar above the open menu. */}
          <a href={ctaHref} onClick={() => setOpen(false)} className={`${btn('primary')} mt-6 w-full`}>
            {t.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}
