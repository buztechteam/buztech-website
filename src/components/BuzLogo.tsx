import {
  BUZ_PATH,
  GEAR_PATH,
  ICON_H,
  ICON_W,
  LOCKUP_H,
  LOCKUP_W,
  TECH_PATH,
  WING_RADIUS,
  WINGS,
  WORDMARK_H,
  WORDMARK_W,
  WORDMARK_X,
  WORDMARK_Y,
} from './buzLogoPaths';

/**
 * BUZ Tech logo, drawn from the master artwork geometry in buzLogoPaths.ts.
 *
 * Variants:
 *  - on-dark  : white gear, teal wings and wordmark (default, on Ink/Navy)
 *  - on-light : navy gear (on light backgrounds)
 *  - mono     : everything in currentColor, e.g. `text-white` on the gradient or photos
 *
 * Layouts: horizontal (gear beside BUZ TECH), stacked (gear above it), icon (gear only).
 * Size it with classes (`h-9 w-auto`) or the width/height props; without either it is 40px tall.
 */
export type BuzLogoVariant = 'on-dark' | 'on-light' | 'mono';
export type BuzLogoLayout = 'horizontal' | 'stacked' | 'icon';

const gearFill: Record<BuzLogoVariant, string> = {
  'on-dark': 'fill-white',
  'on-light': 'fill-navy',
  mono: 'fill-current',
};
const accentFill: Record<BuzLogoVariant, string> = {
  'on-dark': 'fill-brand-teal',
  'on-light': 'fill-brand-teal',
  mono: 'fill-current',
};

/** Stacked lockup: the wordmark at 80%, centred under the icon. */
const STACK_SCALE = 0.8;
const STACK_X = (ICON_W - WORDMARK_W * STACK_SCALE) / 2;
const STACK_Y = ICON_H + 48;
const STACK_H = STACK_Y + WORDMARK_H * STACK_SCALE;

const viewBox: Record<BuzLogoLayout, string> = {
  horizontal: `0 0 ${LOCKUP_W} ${LOCKUP_H}`,
  stacked: `0 0 ${ICON_W} ${STACK_H}`,
  icon: `0 0 ${ICON_W} ${ICON_H}`,
};

const wordmarkTransform: Record<Exclude<BuzLogoLayout, 'icon'>, string> = {
  horizontal: `translate(${WORDMARK_X} ${WORDMARK_Y})`,
  stacked: `translate(${STACK_X} ${STACK_Y}) scale(${STACK_SCALE})`,
};

function Mark({ variant }: { variant: BuzLogoVariant }) {
  return (
    <>
      <path d={GEAR_PATH} className={gearFill[variant]} />
      <g className={accentFill[variant]}>
        {WINGS.map((wing) => (
          <g key={wing.cy}>
            <path d={wing.bar} />
            <circle cx={wing.cx} cy={wing.cy} r={WING_RADIUS} />
          </g>
        ))}
      </g>
    </>
  );
}

interface BuzLogoProps {
  variant?: BuzLogoVariant;
  layout?: BuzLogoLayout;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function BuzLogo({
  variant = 'on-dark',
  layout = 'horizontal',
  width,
  height,
  className,
}: BuzLogoProps) {
  return (
    <svg
      viewBox={viewBox[layout]}
      width={width}
      height={height ?? (width == null ? 40 : undefined)}
      role="img"
      aria-label="BUZ Tech"
      className={className}
    >
      <Mark variant={variant} />
      {layout !== 'icon' && (
        <g transform={wordmarkTransform[layout]} className={accentFill[variant]}>
          <path d={BUZ_PATH} />
          <path d={TECH_PATH} fillRule="evenodd" />
        </g>
      )}
    </svg>
  );
}
