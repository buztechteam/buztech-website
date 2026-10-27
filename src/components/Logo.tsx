import { useId } from 'react';

/**
 * BUZ Tech logo, rebuilt as inline SVG from the brand book description
 * (gear + three circuit "wings" + italic wordmark). The brand book itself notes the wordmark
 * is a rebuilt trace: replace this component with the master SVG when it is available.
 *
 * Variants (brand book, page 04):
 *  - dark  : white gear, teal wings and wordmark (default, on Ink/Navy)
 *  - light : navy gear (on light backgrounds)
 *  - white : all white (on the brand gradient or busy images)
 */
export type LogoVariant = 'dark' | 'light' | 'white';

const gearFill: Record<LogoVariant, string> = {
  dark: 'fill-white',
  light: 'fill-navy',
  white: 'fill-white',
};
const gearStroke: Record<LogoVariant, string> = {
  dark: 'stroke-white',
  light: 'stroke-navy',
  white: 'stroke-white',
};
const accentFill: Record<LogoVariant, string> = {
  dark: 'fill-brand-teal',
  light: 'fill-brand-teal',
  white: 'fill-white',
};

const TEETH = Array.from({ length: 12 }, (_, i) => i * 30);

/** The gear and wings, drawn in a 64 x 64 box. */
function MarkShapes({ variant }: { variant: LogoVariant }) {
  const maskId = `gear-open-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <g>
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
          <rect width="64" height="64" fill="white" />
          {/* opening on the left where the wings pass through */}
          <polygon points="36,32 -8.6,72.1 -8.6,-8.1" fill="black" />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>
        <circle cx="36" cy="32" r="18" fill="none" strokeWidth="7" className={gearStroke[variant]} />
        {TEETH.map((angle) => (
          <rect
            key={angle}
            x="33"
            y="5.5"
            width="6"
            height="6"
            rx="0.8"
            transform={`rotate(${angle} 36 32)`}
            className={gearFill[variant]}
          />
        ))}
      </g>
      <g className={accentFill[variant]}>
        <polygon points="4,17.5 30,17.5 30,22.5 0,22.5" />
        <polygon points="10,29.5 37,29.5 37,34.5 6,34.5" />
        <polygon points="14,41.5 28,41.5 28,46.5 10,46.5" />
        <circle cx="30" cy="20" r="3.6" />
        <circle cx="37" cy="32" r="4.2" />
        <circle cx="28" cy="44" r="3.6" />
      </g>
    </g>
  );
}

interface LogoProps {
  variant?: LogoVariant;
  /** "icon" is the gear only (profile picture / social); "horizontal" is the full lockup. */
  layout?: 'horizontal' | 'icon';
  className?: string;
}

export function Logo({ variant = 'dark', layout = 'horizontal', className }: LogoProps) {
  if (layout === 'icon') {
    return (
      <svg viewBox="0 0 64 64" role="img" aria-label="BUZ Tech" className={className}>
        <MarkShapes variant={variant} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 256 64" role="img" aria-label="BUZ Tech" className={className}>
      <MarkShapes variant={variant} />
      <text
        transform="translate(84 45) skewX(-10)"
        fontSize="36"
        textLength="166"
        lengthAdjust="spacingAndGlyphs"
        className={`font-extrabold ${accentFill[variant]}`}
      >
        BUZ TECH
      </text>
    </svg>
  );
}
