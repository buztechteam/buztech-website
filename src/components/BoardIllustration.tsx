/**
 * Stand-in artwork for the Huawei IdeaHub card: a meeting-room screen with a whiteboard sketch
 * and video tiles. Register a real product photo in config/site.ts (productImages) to replace it.
 */
export function BoardIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 260" aria-hidden="true" className={className}>
      <rect x="20" y="14" width="320" height="188" rx="14" className="fill-ink stroke-brand-teal" strokeWidth="3" />
      <path
        d="M46 72c28-34 54 40 84 4s52-34 78 2"
        className="fill-none stroke-brand-teal"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M46 114h128M46 140h92M46 166h112" className="fill-none stroke-light/70" strokeWidth="4" strokeLinecap="round" />
      <circle cx="190" cy="140" r="9" className="fill-none stroke-brand-teal" strokeWidth="4" />
      <rect x="232" y="36" width="86" height="58" rx="8" className="fill-navy stroke-light/30" strokeWidth="1.5" />
      <circle cx="275" cy="58" r="9" className="fill-brand-teal" />
      <path d="M254 86c4-12 38-12 42 0" className="fill-none stroke-brand-teal" strokeWidth="4" strokeLinecap="round" />
      <rect x="232" y="104" width="86" height="58" rx="8" className="fill-navy stroke-light/30" strokeWidth="1.5" />
      <circle cx="275" cy="126" r="9" className="fill-light" />
      <path d="M254 154c4-12 38-12 42 0" className="fill-none stroke-light" strokeWidth="4" strokeLinecap="round" />
      <path d="M130 202l-16 40M230 202l16 40M92 242h176" className="fill-none stroke-brand-teal" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
