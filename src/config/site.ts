import type { BusinessPlanId, CertId, EquipmentId, MicrosoftExtraId, ProductId } from '../i18n/types';

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

/** The price-request form's options, in groups (names: products in the dictionaries). */
export const productGroups: { id: 'microsoft' | 'equipment'; products: ProductId[] }[] = [
  {
    id: 'microsoft',
    products: ['m365', 'business-basic', 'business-standard', 'business-premium', 'e3', 'e5', 'copilot', 'windows-office', 'azure', 'entra', 'audit'],
  },
  { id: 'equipment', products: ['laptops', 'servers', 'networking', 'printers', 'ideahub'] },
];

/** Microsoft 365 Business plans (up to 300 users), smallest first. Microsoft's names, the same in every language. */
export const businessPlans: { id: BusinessPlanId; name: string }[] = [
  { id: 'business-basic', name: 'Business Basic' },
  { id: 'business-standard', name: 'Business Standard' },
  { id: 'business-premium', name: 'Business Premium' },
];
export const microsoftExtras: MicrosoftExtraId[] = ['e3', 'e5', 'copilot', 'windows-office'];
export const equipment: EquipmentId[] = ['laptops', 'servers', 'networking', 'printers'];

/**
 * Brand names on the IT equipment page. Empty on purpose: only Microsoft and Huawei are approved
 * to be named on the site. Once the owner approves more, list them per category here, e.g.
 * laptops: ['Brand Series'], and they appear under that category. Nowhere else names a vendor.
 */
export const equipmentBrands: Partial<Record<EquipmentId, string[]>> = {};

/** A real Huawei IdeaHub photo: put the file in /public/products and set it here. Until then an illustration is shown. */
export const ideahubImage: string | undefined = undefined;

/**
 * ISO certificates. Issuer, number, validity and the scan are intentionally empty:
 * fill them in from the real certificates and they appear in the certificate dialog (its Details button shows once one of them is set).
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
