import type { CSSProperties } from 'react';
import { useLang } from '../i18n/LanguageContext';

/**
 * The hero's one memorable moment: Microsoft 365 sits on Entra ID, which sits on Azure.
 * That is the headline claim ("backed by Azure and Entra ID") drawn as a stack of three
 * isometric layers, wired together with the three "wings" from the logo.
 * On load the layers drop into place once, then the wires draw in (CSS only, gated by the `motion` class in index.css,
 * so without it the layers simply render in place).
 */
const W = 200; // half width of a slab's top face
const H = 100; // half height
const T = 28; // slab thickness
const CX = 320;

const pts = (points: [number, number][]) => points.map(([x, y]) => `${x},${y}`).join(' ');

interface SlabProps {
  cy: number;
  delay: number;
  faces: { top: string; left: string; right: string };
  label: string;
  caption: string;
  labelClass: string;
  captionClass: string;
}

function Slab({ cy, delay, faces, label, caption, labelClass, captionClass }: SlabProps) {
  const top = pts([[CX, cy - H], [CX + W, cy], [CX, cy + H], [CX - W, cy]]);
  const left = pts([[CX - W, cy], [CX, cy + H], [CX, cy + H + T], [CX - W, cy + T]]);
  const right = pts([[CX + W, cy], [CX, cy + H], [CX, cy + H + T], [CX + W, cy + T]]);
  return (
    <g className="slab" style={{ '--d': `${delay}ms` } as CSSProperties}>
      <polygon points={left} className={faces.left} />
      <polygon points={right} className={faces.right} />
      <polygon points={top} className={`${faces.top} stroke-white/25`} strokeWidth="1.5" strokeLinejoin="round" />
      {/* text lies on the top face, following the isometric plane */}
      <g transform={`translate(${CX} ${cy}) matrix(0.894 0.447 -0.894 0.447 0 0)`}>
        <text y="-2" textAnchor="middle" className={`text-[27px] font-extrabold ${labelClass}`}>
          {label}
        </text>
        <text y="26" textAnchor="middle" className={`text-[15px] max-sm:hidden ${captionClass}`}>
          {caption}
        </text>
      </g>
    </g>
  );
}

export function HeroStack() {
  const { t } = useLang();
  const rows = [
    { cy: 120, wire: 640 },
    { cy: 285, wire: 460 },
    { cy: 450, wire: 280 },
  ];

  return (
    <svg
      viewBox="0 0 640 600"
      role="img"
      aria-label={t.hero.stackLabel}
      className="mx-auto h-auto w-full max-w-[36rem] lg:mx-0 lg:ml-auto"
    >
      {/* vertical links between layers */}
      {[CX - W, CX + W].map((x) => (
        <g key={x} className="stroke-light/70">
          <line x1={x} y1={120 + T} x2={x} y2={285} strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round" />
          <line x1={x} y1={285 + T} x2={x} y2={450} strokeWidth="2" strokeDasharray="1 7" strokeLinecap="round" />
          <circle cx={x} cy={285} r="5" className="fill-light stroke-none" />
          <circle cx={x} cy={450} r="5" className="fill-light stroke-none" />
        </g>
      ))}

      {/* wings from the logo: one wire into each layer */}
      {rows.map(({ cy, wire }) => (
        <g key={cy}>
          <path
            d={`M0 ${cy} H${CX - W}`}
            pathLength={1}
            strokeWidth="3.5"
            strokeLinecap="round"
            className="wire fill-none stroke-light"
            style={{ '--d': `${wire}ms` } as CSSProperties}
          />
        </g>
      ))}

      <Slab
        cy={450}
        delay={0}
        faces={{ top: 'fill-ink', left: 'fill-navy', right: 'fill-navy/80' }}
        label="Azure"
        caption={t.hero.stack.base}
        labelClass="fill-white"
        captionClass="fill-brand-teal"
      />
      <Slab
        cy={285}
        delay={180}
        faces={{ top: 'fill-navy', left: 'fill-ink', right: 'fill-ink/85' }}
        label="Entra ID"
        caption={t.hero.stack.mid}
        labelClass="fill-white"
        captionClass="fill-brand-teal"
      />
      <Slab
        cy={120}
        delay={360}
        faces={{ top: 'fill-light', left: 'fill-brand-teal', right: 'fill-deep-teal' }}
        label="Microsoft 365"
        caption={t.hero.stack.top}
        labelClass="fill-navy"
        captionClass="fill-navy/80"
      />

      {/* nodes where the wires meet each layer */}
      {rows.map(({ cy }) => (
        <circle key={cy} cx={CX - W} cy={cy} r="7" className="fill-light stroke-navy" strokeWidth="3" />
      ))}
    </svg>
  );
}
