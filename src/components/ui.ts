/**
 * Shared class recipes. Buttons follow the brand book:
 * Brand Teal / Deep Teal for interactive elements; Navy text on light sections.
 * Brand Teal buttons carry Ink text (6.8:1), which keeps them readable on every surface.
 */
type Variant = 'primary' | 'primaryOnLight' | 'ghostOnDark' | 'outlineOnLight';
type Size = 'md' | 'sm';

const base =
  'inline-flex items-center justify-center rounded-lg font-extrabold leading-tight whitespace-nowrap transition-colors';

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
};

export const btn = (variant: Variant, size: Size = 'md') => `${base} ${sizes[size]} ${variants[variant]}`;

/** Type scale. Headlines: Noto Sans Georgian / Inter ExtraBold, tight leading, left-aligned. */
export const h2Class =
  'text-[clamp(1.75rem,1.1rem+2.2vw,2.75rem)] font-extrabold leading-[1.15] tracking-tight text-balance';
export const leadClass = 'mt-4 max-w-[38rem] text-lg leading-relaxed';
