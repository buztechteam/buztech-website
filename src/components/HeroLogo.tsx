import { useEffect, useId, useRef } from 'react';
import { GEAR_PATH, WING_RADIUS, WINGS } from './buzLogoPaths';
import { HERO_VIEWBOX, WING_LEFT, startHeroLogo } from '../motion/heroLogo';

const INTRO_KEY = 'buz-hero-intro';

/** Was the arrival already played in this tab? (Storage can be blocked: then just play it.) */
function introSeen(): boolean {
  try {
    if (sessionStorage.getItem(INTRO_KEY)) return true;
    sessionStorage.setItem(INTRO_KEY, '1');
  } catch {
    /* no storage: play it */
  }
  return false;
}

/**
 * The hero's art: our logo, alive. The markup is the logo at rest (that is what pre-rendered
 * HTML, no JavaScript and reduced motion show); src/motion/heroLogo.ts brings it to life.
 * It renders its two canvases as siblings so they cover the whole hero section: the flowing
 * gradient below the scrim, the lines between the scrim and the content.
 * Decorative: the logo is in the header, so the art is hidden from screen readers.
 */
export function HeroLogo() {
  const art = useRef<HTMLDivElement>(null);
  const id = useId().replace(/[^\w-]/g, '');

  useEffect(() => {
    if (!art.current) return;
    const still = !matchMedia('(prefers-reduced-motion: no-preference)').matches;
    // played once per tab; skipped too if a slow load already showed the logo at rest
    const intro = !still && document.documentElement.classList.contains('motion') && performance.now() < 2400 && !introSeen();
    return startHeroLogo(art.current, { intro, still });
  }, []);

  const { x, y, w, h } = HERO_VIEWBOX;
  return (
    <>
      <canvas data-hl="bg" aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 size-full opacity-0 transition-opacity duration-700" />
      <canvas data-hl="lines" aria-hidden="true" className="hero-lines pointer-events-none absolute inset-0 -z-5 size-full opacity-0 transition-opacity duration-700" />
      <div
        ref={art}
        data-hero-art=""
        aria-hidden="true"
        className="mx-auto w-full max-w-[34rem] cursor-pointer touch-manipulation select-none max-lg:max-w-[26rem] lg:mx-0 lg:ml-auto"
      >
        <svg viewBox={`${x} ${y} ${w} ${h}`} data-landed="" className="hero-logo block h-auto w-full overflow-visible">
          <defs>
            {WINGS.map((wing, i) => (
              <clipPath key={i} id={`${id}-wing${i}`}>
                <rect data-hl="clip" x={WING_LEFT[i] - 4} y={wing.cy - 30} width={wing.cx - WING_LEFT[i] + 4} height="60" />
              </clipPath>
            ))}
            <mask id={`${id}-sweep`} maskUnits="userSpaceOnUse" x="-200" y="-200" width="1100" height="900">
              <circle data-hl="sweep" r="190" fill="none" stroke="#fff" strokeWidth="380" pathLength={1} strokeDasharray="1 1" />
            </mask>
          </defs>
          <g data-hl="logo" className="fill-white">
            {WINGS.map((wing, i) => (
              <g key={i}>
                <g data-hl="bar">
                  <path d={wing.bar} />
                </g>
                <g data-hl="dot">
                  <circle cx={wing.cx} cy={wing.cy} r={WING_RADIUS} />
                </g>
              </g>
            ))}
            <g data-hl="gear">
              <path d={GEAR_PATH} fillRule="evenodd" />
            </g>
          </g>
        </svg>
      </div>
    </>
  );
}
