import { useEffect, useRef, useState } from 'react';
import { eventPhotos } from '../config/site';
import { useLang } from '../i18n/LanguageContext';
import { revealProps } from '../motion/reveal';
import { ArrowRight } from './icons';
import { h2Class, leadClass } from './ui';

/*
  A round arrow button under the photo row. Like the other buttons it lifts on hover and presses in; at either end of
  the row it fades and stops responding. That is aria-disabled, not disabled, so a keyboard keeps its focus on the
  button when the row reaches its end.
*/
const arrowButton =
  'inline-flex size-12 items-center justify-center rounded-full border border-deep-teal bg-white text-navy transition-[color,background-color,border-color,opacity,box-shadow,translate,scale] duration-(--dur-hover) ease-soft not-aria-disabled:hover:border-navy not-aria-disabled:hover:bg-navy not-aria-disabled:hover:text-white motion-safe:not-aria-disabled:hover:-translate-y-0.5 motion-safe:not-aria-disabled:hover:shadow-md motion-safe:not-aria-disabled:hover:shadow-navy/25 motion-safe:not-aria-disabled:active:translate-y-0 motion-safe:not-aria-disabled:active:scale-97 aria-disabled:cursor-default aria-disabled:opacity-35';

/**
 * About page: one gallery of the events we attended and our own Huawei eKit event, each photo with what it was and
 * where and when (owner, 19 November 2026: one eKit photo joins the gallery, no separate eKit section). Nobody, no
 * organiser and no sponsor is named.
 * Below lg the photos sit in one row: arrow buttons move it one photo at a time (owner, 19 November 2026), and a
 * finger can still swipe it. The row reveals as one, so a photo brought into view is never left hidden.
 * A wide screen shows all four photos side by side, with no buttons.
 */
export function Events() {
  const { t } = useLang();
  const e = t.events;
  const row = useRef<HTMLDivElement>(null);
  // The server can't measure the row, so it starts at the first photo: "previous" off, "next" on.
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  /**
   * One photo forward or back. It aims at the photo next to the one the row is nearest to, not "one width further",
   * so quick presses during a scroll never overshoot or stop between photos. It reads the row itself, not `edge`
   * (which follows scroll events), and at either end the target is the photo already shown, so nothing moves.
   */
  const move = (direction: 1 | -1) => {
    const el = row.current;
    if (!el) return;
    const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    const rowLeft = el.getBoundingClientRect().left;
    // where the row's scroll position puts each photo at the start of the row
    const stops = [...el.querySelectorAll('li')].map((li) => li.getBoundingClientRect().left - rowLeft + el.scrollLeft - pad);
    if (stops.length === 0) return;
    const nearest = stops.reduce((best, stop, i) => (Math.abs(stop - el.scrollLeft) < Math.abs(stops[best] - el.scrollLeft) ? i : best), 0);
    const target = Math.min(stops.length - 1, Math.max(0, nearest + direction));
    const still = !matchMedia('(prefers-reduced-motion: no-preference)').matches;
    el.scrollTo({ left: stops[target], behavior: still ? 'auto' : 'smooth' });
  };

  return (
    <section id="events" className="surface-light bg-white py-20 text-navy lg:py-24">
      <div className="container-x">
        <h2 {...revealProps(0)} className={h2Class}>{e.heading}</h2>
        <p {...revealProps(1)} className={`${leadClass} text-navy/85`}>{e.lead}</p>
        {/*
          The row is a focusable, named region, so a keyboard can scroll it too (the photos hold no links).
          Its edges meet the screen's edges below lg, so the focus ring is drawn inside them there.
          The arrow buttons replace the scrollbar as the visible control.
        */}
        <div
          {...revealProps(2)}
          ref={row}
          id="events-row"
          tabIndex={0}
          role="region"
          aria-label={e.heading}
          className="-mx-5 mt-10 snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 [scrollbar-width:none] max-lg:focus-visible:-outline-offset-3 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex gap-4 lg:grid lg:grid-cols-4 lg:gap-5">
            {eventPhotos.map(({ id, height }) => {
              const item = e.items[id];
              return (
                <li key={id} className="w-[85%] max-w-[26rem] shrink-0 snap-start lg:w-auto lg:max-w-none">
                  <figure>
                    <img
                      src={`/events/${id}-960.webp`}
                      srcSet={`/events/${id}-480.webp 480w, /events/${id}-960.webp 960w`}
                      sizes="(min-width: 1024px) 18rem, 85vw"
                      alt={item.alt}
                      width={960}
                      height={height}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] h-auto w-full rounded-xl bg-navy/10 object-cover"
                    />
                    <figcaption className="mt-4">
                      <span className="block text-lg leading-snug font-extrabold text-balance">{item.title}</span>
                      <span className="mt-1 block text-navy/80">{item.place}</span>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ul>
        </div>
        <div {...revealProps(3)} className="mt-6 flex gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-disabled={edge.start}
            aria-label={e.previous}
            aria-controls="events-row"
            className={arrowButton}
          >
            <ArrowRight className="size-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-disabled={edge.end}
            aria-label={e.next}
            aria-controls="events-row"
            className={arrowButton}
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
