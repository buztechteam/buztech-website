import type { CSSProperties } from 'react';

/**
 * Arrivals and scroll reveals ("B+": content eases in once, then rests).
 *
 * Both are progressive enhancement. Pre-rendered HTML carries only the data attributes,
 * which hide nothing on their own:
 * - `data-arrive` animates only under `<html class="motion">` (set by the head script).
 * - `data-reveal` is hidden only under `<html class="reveal-ready">`, which initReveal()
 *   adds after hydration, once everything already on screen is marked `data-in`.
 */

const MAX_INDEX = 5; // long groups should not keep the last items waiting

const indexStyle = (index: number) => ({ '--i': Math.min(index, MAX_INDEX) }) as CSSProperties;

/** On-load arrival at the top of a page. `index` staggers siblings. */
export const arriveProps = (index = 0) => ({ 'data-arrive': '', style: indexStyle(index) });

/** Reveal once when scrolled into view. `index` staggers siblings in a group. */
export const revealProps = (index = 0) => ({ 'data-reveal': '', style: indexStyle(index) });

/** Starts scroll reveals. Returns a cleanup function. */
export function initReveal(): () => void {
  if (
    typeof IntersectionObserver === 'undefined' ||
    !matchMedia('(prefers-reduced-motion: no-preference)').matches
  ) {
    return () => {};
  }

  const root = document.documentElement;
  // data-in="" just stays visible; data-in="reveal" plays the arrive animation (index.css)
  const pending: Element[] = [];

  // Whatever is on screen now (or above it, after a jump to #section) stays visible, unanimated.
  for (const el of document.querySelectorAll('[data-reveal]')) {
    if (el.getBoundingClientRect().top < innerHeight) el.setAttribute('data-in', '');
    else pending.push(el);
  }
  root.classList.add('reveal-ready');

  // When one element reveals, everything before it in the page does too: a jump (restored
  // scroll on Back, a #link) skips past them.
  // Elements that come on screen together get --n, their order on arrival: index.css waits the smaller of --i and --n,
  // so a row of cards still follows one another, but a card that arrives alone (as stacked cards do on a phone)
  // doesn't wait for its place in the row.
  let next = 0;
  const revealUpTo = (upTo: number, state: 'reveal' | '', arriving?: Set<Element>) => {
    let n = 0;
    for (; next <= upTo; next++) {
      const el = pending[next];
      if (arriving?.has(el)) (el as HTMLElement).style.setProperty('--n', String(n++));
      el.setAttribute('data-in', state);
      io.unobserve(el);
    }
  };

  // Phones stack everything in one column and are scrolled in quick flicks: a block starts rising in as soon as it
  // enters, so the screen never shows empty boxes. Wider screens wait until it is 15% up, where the arrival is seen.
  const phone = matchMedia('(max-width: 47.99rem)').matches;
  // threshold 0, so elements taller than the screen still reveal
  const io = new IntersectionObserver(
    (entries) => {
      const arriving = new Set<Element>();
      for (const entry of entries) if (entry.isIntersecting) arriving.add(entry.target);
      if (arriving.size > 0) revealUpTo(Math.max(...[...arriving].map((el) => pending.indexOf(el))), 'reveal', arriving);
    },
    { rootMargin: phone ? '0px' : '0px 0px -15% 0px', threshold: 0 },
  );
  for (const el of pending) io.observe(el);

  // Keyboard focus can land on a block still waiting near the bottom edge: show it at once,
  // so a focused control is never invisible.
  const onFocus = (e: FocusEvent) => {
    const el = (e.target as Element).closest?.('[data-reveal]:not([data-in])');
    if (el) revealUpTo(pending.indexOf(el), '');
  };
  document.addEventListener('focusin', onFocus);

  return () => {
    io.disconnect();
    document.removeEventListener('focusin', onFocus);
  };
}
