export type Lang = 'ge' | 'en';

export type SectionId = 'home' | 'partners' | 'products' | 'services' | 'certifications' | 'contact';
export type CategoryId = 'licensing' | 'servers' | 'networking' | 'workspaces';
export type ProductId =
  | 'm365'
  | 'azure'
  | 'entra'
  | 'dell'
  | 'hpe'
  | 'lenovo'
  | 'zyxel'
  | 'tplink'
  | 'ideahub';
export type CertId = 'iso9001' | 'iso27001' | 'iso20000';

export interface ProductCopy {
  tagline: string;
  specs: string[];
}

export interface Dict {
  meta: { title: string; description: string };
  a11y: {
    skip: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    close: string;
    mainNav: string;
    home: string;
    partnerList: string;
    tabs: string;
  };
  nav: Record<SectionId, string>;
  /** Primary call to action. One wording, used everywhere. */
  cta: string;
  hero: {
    title: string;
    lead: string;
    points: string[];
    secondary: string;
    stack: { top: string; mid: string; base: string };
    stackLabel: string;
  };
  partners: { heading: string; lead: string };
  products: {
    heading: string;
    lead: string;
    flagship: string;
    plansLabel: string;
    plans: string[];
    planNote: string;
    categories: Record<CategoryId, { label: string; summary: string }>;
    items: Record<ProductId, ProductCopy>;
    serversNote: string[];
  };
  services: {
    heading: string;
    lead: string;
    items: { title: string; text: string }[];
    facts: { value: string; label: string }[];
    stepsHeading: string;
    steps: { title: string; text: string }[];
  };
  certs: {
    heading: string;
    lead: string;
    details: string;
    standardLabel: string;
    benefitsTitle: string;
    issuer: string;
    number: string;
    valid: string;
    view: string;
    items: Record<CertId, { name: string; summary: string; benefits: string[] }>;
  };
  contact: {
    heading: string;
    lead: string;
    entity: string;
    location: string;
    phone: string;
    email: string;
    fields: { company: string; email: string; product: string; message: string };
    placeholders: { company: string; email: string; message: string };
    selectPlaceholder: string;
    other: string;
    required: string;
    invalidEmail: string;
    status: { sending: string; success: string; mailto: string; error: string };
    mailSubject: string;
  };
  footer: {
    overview: string;
    quickLinks: string;
    contactTitle: string;
    complianceTitle: string;
    rights: string;
    social: string;
    taxId: string;
  };
}
