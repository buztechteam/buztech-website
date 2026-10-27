import type { CategoryId, CertId, ProductId, SectionId } from '../i18n/types';

/**
 * Single source of truth for facts that are NOT translated.
 * Source: BUZ Tech Brand Guidelines 2026 v2 (contact block, name usage).
 */
export const site = {
  name: 'BUZ Tech',
  legalName: 'LLC BUZ Tech Georgia',
  /** Official tagline format from the brand book. */
  tagline: 'Consulting · Cloud · Tech',
  city: 'Tbilisi',
  country: 'Georgia',
  phone: '+995 599 13 77 23',
  phoneHref: 'tel:+995599137723',
  email: 'info-ge@buz-cloud.com',
  social: {
    facebook: 'https://www.facebook.com/LLCBUZTechGeorgia',
    /** Add the company LinkedIn URL here; the icon appears in the footer automatically. */
    linkedin: undefined as string | undefined,
  },
  /** Optional: set to show the company ID in the footer compliance block. */
  taxId: undefined as string | undefined,
  /** Optional: POST target for the price-request form (see .env.example). */
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || undefined,
} as const;

/** Order of the links in the header and footer. */
export const navOrder: SectionId[] = ['home', 'products', 'services', 'certifications', 'partners', 'contact'];

/** Order of the sections on the page (used for the active-link highlight). */
export const pageOrder: SectionId[] = ['home', 'partners', 'products', 'services', 'certifications', 'contact'];

export const productMeta: Record<ProductId, { name: string; line?: string }> = {
  m365: { name: 'Microsoft 365' },
  azure: { name: 'Azure' },
  entra: { name: 'Entra ID' },
  dell: { name: 'Dell', line: 'PowerEdge' },
  hpe: { name: 'HPE', line: 'ProLiant' },
  lenovo: { name: 'Lenovo', line: 'ThinkSystem' },
  zyxel: { name: 'Zyxel' },
  tplink: { name: 'TP-Link' },
  ideahub: { name: 'Huawei IdeaHub' },
};

/** Licensing & Cloud is the flagship and always comes first. */
export const categories: { id: CategoryId; products: ProductId[] }[] = [
  { id: 'licensing', products: ['m365', 'azure', 'entra'] },
  { id: 'servers', products: ['dell', 'hpe', 'lenovo'] },
  { id: 'networking', products: ['zyxel', 'tplink'] },
  { id: 'workspaces', products: ['ideahub'] },
];

/** Microsoft 365 apps shown on the flagship panel (names only, no vendor logos). */
export const m365Apps = ['Teams', 'Outlook', 'OneDrive', 'Word', 'Excel', 'PowerPoint'] as const;

/**
 * Real product photos. Put image files in /public/products and register them here,
 * e.g. ideahub: '/products/ideahub-front.png'. Until then an illustration is shown.
 */
export const productImages: Partial<Record<ProductId, string>> = {};

/**
 * Vendor marquee. Typeset names, NOT logos: the brand book lists the vendor logo packs
 * (with each vendor's co-branding rules) as an open item. Swap in logos once received.
 */
export const vendors: { name: string; note?: string }[] = [
  { name: 'Microsoft', note: 'Solution Partner' },
  { name: 'Dell' },
  { name: 'HPE' },
  { name: 'Lenovo' },
  { name: 'Zyxel' },
  { name: 'TP-Link' },
  { name: 'Huawei IdeaHub' },
];

/**
 * ISO certificates. Issuer, number, validity and the scan are intentionally empty:
 * fill them in from the real certificates and they appear in the dialog automatically.
 */
export const certs: {
  id: CertId;
  code: string;
  standard: string;
  issuer?: string;
  number?: string;
  validUntil?: string;
  file?: string;
}[] = [
  { id: 'iso9001', code: 'ISO 9001', standard: 'ISO 9001' },
  { id: 'iso27001', code: 'ISO 27001', standard: 'ISO/IEC 27001' },
  { id: 'iso20000', code: 'ISO 20000-1', standard: 'ISO/IEC 20000-1' },
];
