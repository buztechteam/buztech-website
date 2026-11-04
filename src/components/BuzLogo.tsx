import { useId } from 'react';
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

function Mark({ variant, liveId }: { variant: BuzLogoVariant; liveId?: string }) {
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
      {liveId && <LightRun id={liveId} />}
    </>
  );
}

/**
 * The light that runs along each wing into its dot when the logo is pointed at (the hero's
 * heartbeat in miniature). Invisible at rest; index.css `.logo-live` plays it.
 */
function LightRun({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-light`}>
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {WINGS.map((wing, i) => (
          <clipPath key={wing.cy} id={`${id}-wing${i}`}>
            <path d={wing.bar} />
            <circle cx={wing.cx} cy={wing.cy} r={WING_RADIUS} />
          </clipPath>
        ))}
      </defs>
      {WINGS.map((wing, i) => (
        <g key={wing.cy} style={{ '--i': i } as React.CSSProperties}>
          <g clipPath={`url(#${id}-wing${i})`}>
            <rect data-logo-run="" x="-220" y={wing.cy - 45} width="220" height="90" fill={`url(#${id}-light)`} />
          </g>
          <circle data-logo-flash={i === WINGS.length - 1 ? 'last' : ''} cx={wing.cx} cy={wing.cy} r={WING_RADIUS} className="fill-white" />
        </g>
      ))}
    </>
  );
}

interface BuzLogoProps {
  variant?: BuzLogoVariant;
  layout?: BuzLogoLayout;
  width?: number | string;
  height?: number | string;
  className?: string;
  /** Pointing at the logo with a mouse runs a light along the wings into the dots (the header logo). */
  live?: boolean;
}

export default function BuzLogo({
  variant = 'on-dark',
  layout = 'horizontal',
  width,
  height,
  className,
  live = false,
}: BuzLogoProps) {
  const liveId = useId().replace(/[^\w-]/g, '');
  /*
    The run plays in full once per pointing: it starts on pointer enter, ignores new enters while it
    plays, and ends when the last dot's flash does. The attribute is set on the DOM directly, so the
    server markup and the first render stay the same.
  */
  const play = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    if (e.pointerType !== 'mouse' || svg.hasAttribute('data-play')) return;
    svg.setAttribute('data-play', '');
  };
  const done = (e: React.AnimationEvent<SVGSVGElement>) => {
    if ((e.target as Element).getAttribute('data-logo-flash') === 'last') {
      e.currentTarget.removeAttribute('data-play');
    }
  };
  return (
    <svg
      viewBox={viewBox[layout]}
      width={width}
      height={height ?? (width == null ? 40 : undefined)}
      role="img"
      aria-label="BUZ Tech"
      className={live ? `logo-live ${className ?? ''}` : className}
      onPointerEnter={live ? play : undefined}
      onAnimationEnd={live ? done : undefined}
    >
      <Mark variant={variant} liveId={live ? liveId : undefined} />
      {layout !== 'icon' && (
        <g transform={wordmarkTransform[layout]} className={accentFill[variant]}>
          <path d={BUZ_PATH} />
          <path d={TECH_PATH} fillRule="evenodd" />
        </g>
      )}
    </svg>
  );
}
