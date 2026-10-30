/**
 * Shared class recipes. Buttons follow the brand book:
 * Brand Teal / Deep Teal for interactive elements; Navy text on light sections.
 * Brand Teal buttons carry Ink text (6.8:1), which keeps them readable on every surface.
 */
type Variant = 'primary' | 'primaryOnLight' | 'ghostOnDark' | 'outlineOnLight' | 'navyOnTeal' | 'outlineOnTeal';
type Size = 'md' | 'sm';

/*
  Motion "B+": everything a visitor points at responds softly. Tailwind's hover: only applies on
  devices that can hover (no "stuck" lift after a tap); motion-safe: keeps movement off under
  reduced motion, where only colours change.
*/
const soft = 'transition duration-(--dur-hover) ease-soft';

/* min-h-11: every button is at least 44px tall, the touch-target minimum. */
const base = `inline-flex min-h-11 items-center justify-center rounded-lg font-extrabold leading-tight whitespace-nowrap ${soft} motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md motion-safe:hover:shadow-navy/25 motion-safe:active:translate-y-0 motion-safe:active:scale-97`;

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-base',
  sm: 'px-5 py-2.5 text-sm',
};

const variants: Record<Variant, string> = {
  primary: 'bg-brand-teal text-ink hover:bg-light',
  primaryOnLight:
    'border border-deep-teal bg-brand-teal text-ink hover:border-navy hover:bg-navy hover:text-white',
  ghostOnDark: 'border border-white/35 text-white hover:bg-white/10',
  outlineOnLight:
    'border border-deep-teal text-navy hover:border-navy hover:bg-navy hover:text-white',
  /* On the Brand Teal contact band, where a teal button would vanish. */
  navyOnTeal: 'bg-navy text-white hover:bg-ink',
  outlineOnTeal: 'border border-ink/50 text-ink hover:border-ink hover:bg-ink hover:text-white',
};

export const btn = (variant: Variant, size: Size = 'md') => `${base} ${sizes[size]} ${variants[variant]}`;

/**
 * Card recipes. A link card lifts with a soft Navy shadow; it keeps its own hover border colour
 * (Deep Teal on light cards, Brand Teal on the Navy flagship) and needs `group` for the parts.
 */
export const cardLink = `${soft} motion-safe:hover:-translate-y-[5px] motion-safe:hover:shadow-xl motion-safe:hover:shadow-navy/15`;
/** The link card's icon tile: Brand Teal with a Navy icon while the card is pointed at. */
export const cardIcon = `${soft} group-hover:bg-brand-teal group-hover:text-navy`;
/** The link card's arrow slides right. */
export const cardArrow = `${soft} motion-safe:group-hover:translate-x-[7px]`;
/** Cards that are not links: border colour only, so nothing suggests a click that does nothing. */
export const cardStatic = `${soft} hover:border-deep-teal`;
export const cardStaticDark = `${soft} hover:border-white/30`;

/** Type scale. Headlines: Noto Sans Georgian / Inter ExtraBold, tight leading, left-aligned. */
export const h2Class =
  'text-[clamp(1.75rem,1.1rem+2.2vw,2.75rem)] font-extrabold leading-[1.15] tracking-tight text-balance';
export const leadClass = 'mt-4 max-w-[38rem] text-lg leading-relaxed text-pretty';
