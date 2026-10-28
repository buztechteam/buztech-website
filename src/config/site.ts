import type { CategoryId, CertId, ProductId, ServiceId } from '../i18n/types';

/**
 * Single source of truth for facts that are NOT translated.
 * Source: BUZ Tech Brand Guidelines 2026 v2 (contact block, name usage).
 */
export const site = {
  name: 'BUZ Tech',
  legalName: 'LLC BUZ Tech Georgia',
  /** Official tagline format from the brand book. */
  tagline: 'Consulting · Cloud · Tech',
  /** The street address itself is translated (contact.address in the dictionaries). */
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=Zakaria+Paliashvili+St+83+Tbilisi+Georgia',
  phone: '+995 599 13 77 23',
  phoneHref: 'tel:+995599137723',
  /** Same number as the phone. */
  whatsappHref: 'https://wa.me/995599137723',
  email: 'info-ge@buz-cloud.com',
  social: {
    facebook: 'https://www.facebook.com/LLCBUZTechGeorgia',
    linkedin: 'https://ge.linkedin.com/company/llc-buz-tech-georgia' as string | undefined,
  },
  /** Company ID, shown in the footer compliance block. */
  taxId: '405291786' as string | undefined,
  /**
   * Price-request form delivery (see .env.example). Priority:
   * 1. Web3Forms access key  2. any JSON endpoint  3. fall back to the visitor's email app.
   */
  web3formsKey: import.meta.env.VITE_WEB3FORMS_KEY || undefined,
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || undefined,
  /** True when Cloudflare Web Analytics is switched on at build time (changes the privacy wording). */
  analytics: Boolean(import.meta.env.VITE_CF_ANALYTICS_TOKEN),
} as const;

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

/** Brand names in a category, e.g. Dell · HPE · Lenovo (home cards and the category page intro). */
export const brandNames = (id: CategoryId): string[] =>
  (categories.find((c) => c.id === id)?.products ?? []).map((p) => productMeta[p].name);

/** Services shown on each category page, by id (services.items in the dictionaries). */
export const categoryServices: Record<CategoryId, ServiceId[]> = {
  licensing: ['licensing', 'cloud', 'audit'],
  servers: ['infrastructure', 'sizing'],
  networking: ['infrastructure', 'sizing'],
  workspaces: ['workspaces', 'sizing'],
};

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
