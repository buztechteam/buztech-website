export type Lang = 'ge' | 'en';

/** Product pages, in menu order. Microsoft 365 always leads; the slug is the id. */
export type ProductPageId = 'microsoft-365' | 'it-equipment' | 'ideahub';
/** notFound is built as 404.html, not as an address. */
export type PageId = 'home' | ProductPageId | 'services' | 'about' | 'contact' | 'privacy' | 'notFound';
/** Header menu entries; "products" opens the product page list. */
export type NavId = 'home' | 'products' | 'services' | 'about' | 'contact';
export type BusinessPlanId = 'business-basic' | 'business-standard' | 'business-premium';
/** Microsoft offers beyond the Business plans (Microsoft 365 page). */
export type MicrosoftExtraId = 'e3' | 'e5' | 'copilot' | 'windows-office';
export type EquipmentId = 'laptops' | 'servers' | 'networking' | 'printers';
/**
 * Everything the price-request form offers. Also the ?product= value of links that pre-select it
 * (inquireHref in routes.ts). 'm365' is "Microsoft 365, plan not chosen yet".
 */
export type ProductId =
  | 'm365'
  | BusinessPlanId
  | MicrosoftExtraId
  | 'azure'
  | 'entra'
  | 'audit'
  | EquipmentId
  | 'ideahub'
  | 'documents';
export type ServiceId = 'setup' | 'support' | 'supply';

type Item = { title: string; text: string };
/** An included item can carry a link that asks for it (the tender documents). */
type IncludedItem = Item & { action?: string };

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
    breadcrumb: string;
    /** Phone bar with call / WhatsApp / price request. */
    quickContact: string;
  };
  notFound: { title: string; lead: string };
  nav: Record<NavId, string>;
  /** Primary call to action. One wording, used everywhere. */
  cta: string;
  hero: {
    title: string;
    lead: string;
    points: string[];
    /** Link to the free licence audit. */
    secondary: string;
    stack: { top: string; mid: string; base: string };
    stackLabel: string;
  };
  /** Product pages: name in menus and links, one-line summary (menu, links, page lead). */
  pages: Record<ProductPageId, { label: string; summary: string }>;
  /** Option names in the price-request form. Microsoft names are the same in both languages. */
  products: Record<ProductId, string>;
  /** "Products" block that links the product pages. */
  productLinks: { heading: string };
  /** The price promise (being tested; the owner may revert it to a plain best-price line). */
  beat: { title: string; text: string };
  /** What every order includes (home, Microsoft 365 page, Contact). */
  included: { heading: string; items: IncludedItem[] };
  home: {
    /** Teaser rows: what is on the Microsoft 365 page. */
    m365: { heading: string; lead: string; compare: string; rows: { name: string; text: string }[] };
    onRequest: { heading: string; lead: string };
    /** cspText says in plain words what being a Microsoft CSP partner means for the buyer. */
    proof: { heading: string; credentials: string; partner: string; cspText: string; since: string; countries: string };
  };
  m365: {
    lead: string;
    business: {
      heading: string;
      lead: string;
      plans: Record<BusinessPlanId, { who: string; includes: string[] }>;
      /** Heads the list of a bigger plan; {plan} is the plan before it. */
      plus: string;
    };
    extras: { heading: string; lead: string; items: Record<MicrosoftExtraId, string> };
    terms: { heading: string; items: { term: string; text: string }[] };
    cloud: { heading: string; lead: string; items: Record<'azure' | 'entra', { text: string; specs: string[] }> };
  };
  equipment: {
    lead: string;
    heading: string;
    items: Record<EquipmentId, string>;
    howHeading: string;
    how: Item[];
  };
  ideahub: { tagline: string; specs: string[]; ask: string; photoAlt: string };
  services: {
    heading: string;
    lead: string;
    audit: { title: string; text: string; points: string[]; cta: string };
    items: ({ id: ServiceId } & Item)[];
    facts: { value: string; label: string }[];
    stepsHeading: string;
    steps: Item[];
  };
  /** No client is named: there is no approval yet. Sectors and countries only. */
  clients: {
    heading: string;
    /** Where we work and where the head office is. */
    lead: string;
    more: string;
    sectorsHeading: string;
    sectors: string[];
  };
  contact: {
    heading: string;
    lead: string;
    /** Heading of the details column beside the form. */
    detailsTitle: string;
    entity: string;
    location: string;
    /** Office street address, written the local way for each language. */
    address: string;
    phone: string;
    /** Link text for the WhatsApp row. */
    whatsapp: string;
    email: string;
    /** Short labels for the call / WhatsApp row above the form on phones. */
    call: string;
    fields: { company: string; email: string; product: string; message: string };
    placeholders: { company: string; email: string; message: string };
    selectPlaceholder: string;
    /** Option groups in the product list. */
    groups: { microsoft: string; equipment: string; company: string };
    /** Under the form: what happens after sending, with no times. */
    next: { heading: string; steps: string[] };
    other: string;
    required: string;
    invalidEmail: string;
    status: { sending: string; success: string; mailto: string; error: string };
    mailSubject: string;
    privacyNote: string;
    privacyLink: string;
  };
  footer: {
    overview: string;
    quickLinks: string;
    contactTitle: string;
    complianceTitle: string;
    rights: string;
    social: string;
    taxId: string;
    /** Label and date written out: browsers can lack Georgian month names, so no Intl. */
    founded: string;
    privacy: string;
  };
  privacy: {
    title: string;
    intro: string;
    sections: { heading: string; body: string }[];
    analyticsOn: string;
    analyticsOff: string;
    updated: string;
  };
}
