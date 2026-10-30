import type { SVGProps } from 'react';
import type { EquipmentId, ProductPageId, ServiceId } from '../i18n/types';

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

export const ArrowRight = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
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

export const Laptop = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="4" y="5" width="16" height="11" rx="1.5" />
    <path d="M2 19h20" />
  </Stroke>
);

export const Printer = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M7 9V4h10v5" />
    <rect x="3" y="9" width="18" height="8" rx="2" />
    <path d="M7 14h10v6H7z" />
  </Stroke>
);

export const ClipboardCheck = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4V3h6v1M9 13l2 2 4-4" />
  </Stroke>
);

/** Cloud with an arrow up: setup and migration. */
export const CloudUp = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M7 18a4 4 0 010-8 5.5 5.5 0 0110.6 1.5A3.3 3.3 0 0117 18" />
    <path d="M12 12v8M9 15l3-3 3 3" />
  </Stroke>
);

export const Headset = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 14v-2a8 8 0 0116 0v2" />
    <rect x="3" y="14" width="4" height="6" rx="1.5" />
    <rect x="17" y="14" width="4" height="6" rx="1.5" />
  </Stroke>
);

export const Package = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
    <path d="M4 7.5l8 4.5 8-4.5M12 12v9" />
  </Stroke>
);

export const Receipt = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" />
    <path d="M9 8h6M9 12h6" />
  </Stroke>
);

export const FileCheck = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
    <path d="M14 3v5h5M9 14l2 2 4-4" />
  </Stroke>
);

export const Bell = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M6 16v-5a6 6 0 0112 0v5l1.5 2h-15L6 16z" />
    <path d="M10 20.5a2 2 0 004 0" />
  </Stroke>
);

type Icon = (p: IconProps) => React.JSX.Element;

export const serviceIcons: Record<ServiceId, Icon> = {
  setup: CloudUp,
  support: Headset,
  supply: Package,
};

export const pageIcons: Record<ProductPageId, Icon> = {
  'microsoft-365': Cloud,
  'it-equipment': Laptop,
  ideahub: Board,
};

export const equipmentIcons: Record<EquipmentId, Icon> = {
  laptops: Laptop,
  servers: Server,
  networking: Network,
  printers: Printer,
};

/** In the order of included.items in the dictionaries: invoice, documents, reminders, support. */
export const includedIcons: Icon[] = [Receipt, FileCheck, Bell, Headset];
