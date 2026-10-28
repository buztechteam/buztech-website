import type { SVGProps } from 'react';
import type { CategoryId, CertId } from '../i18n/types';

type IconProps = SVGProps<SVGSVGElement>;

function Stroke(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

function Solid(props: IconProps) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props} />;
}

export const Check = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Stroke>
);

export const Menu = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Stroke>
);

export const Close = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Stroke>
);

export const ChevronDown = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M6 9l6 6 6-6" />
  </Stroke>
);

export const Phone = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  </Stroke>
);

export const Mail = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </Stroke>
);

export const Pin = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Stroke>
);

export const Building = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 21V5a1 1 0 011-1h9a1 1 0 011 1v16M15 9h4a1 1 0 011 1v11M3 21h18M8 8h3M8 12h3M8 16h3" />
  </Stroke>
);

export const Cloud = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M7 18a4 4 0 010-8 5.5 5.5 0 0110.6 1.5A3.3 3.3 0 0117 18H7z" />
  </Stroke>
);

export const Server = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="4" width="18" height="7" rx="2" />
    <rect x="3" y="13" width="18" height="7" rx="2" />
    <path d="M7 7.5h.01M7 16.5h.01" />
  </Stroke>
);

export const Network = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="5" r="2.2" />
    <circle cx="5" cy="19" r="2.2" />
    <circle cx="19" cy="19" r="2.2" />
    <path d="M12 7.2v4.3M12 11.5L6.3 17M12 11.5l5.7 5.5" />
  </Stroke>
);

export const Board = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4M7 12l3-3 2 2 4-4" />
  </Stroke>
);

export const Award = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="9" r="6" />
    <path d="M8.7 14.2L7.5 21l4.5-2.6 4.5 2.6-1.2-6.8" />
  </Stroke>
);

export const ShieldCheck = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </Stroke>
);

export const Layers = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 13l9 5 9-5" />
  </Stroke>
);

export const Facebook = (p: IconProps) => (
  <Solid {...p}>
    <path d="M13.5 21v-7.5h2.6l.5-3.2h-3.1V8.4c0-.9.4-1.6 1.7-1.6h1.5V4.1c-.3 0-1.2-.1-2.2-.1-2.4 0-3.9 1.4-3.9 4v2.2H8v3.2h2.6V21h2.9z" />
  </Solid>
);

export const LinkedIn = (p: IconProps) => (
  <Solid {...p}>
    <path d="M5 9h3v10H5zM6.5 4.6a1.8 1.8 0 110 3.6 1.8 1.8 0 010-3.6zM10 9h2.9v1.4c.5-.9 1.6-1.6 3.1-1.6 3 0 3.5 2 3.5 4.5V19h-3v-5c0-1.2 0-2.6-1.6-2.6S13 12.7 13 14v5h-3z" />
  </Solid>
);

/** Speech bubble with a handset: reads as WhatsApp without copying its logo. */
export const WhatsApp = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M3.5 20.5l1.3-4.3a8.5 8.5 0 113.4 3.2z" />
    <path d="M9.2 8.6c-.3 2.9 3.2 6.4 6.2 6.2l.9-1.4-2-1.1-.9.7a4.3 4.3 0 01-2.4-2.4l.7-.9-1.1-2z" strokeWidth={1.5} />
  </Stroke>
);

export const categoryIcons: Record<CategoryId, (p: IconProps) => React.JSX.Element> = {
  licensing: Cloud,
  servers: Server,
  networking: Network,
  workspaces: Board,
};

export const certIcons: Record<CertId, (p: IconProps) => React.JSX.Element> = {
  iso9001: Award,
  iso27001: ShieldCheck,
  iso20000: Layers,
};
