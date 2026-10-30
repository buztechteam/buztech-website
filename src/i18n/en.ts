import type { Dict } from './types';

/** English mirror of ge.ts. Product names are identical in both languages. */
export const en: Dict = {
  meta: {
    title: 'BUZ Tech — Microsoft 365 licences at the best prices in Georgia',
    description:
      'Microsoft 365 licences at the best prices in Georgia, from an official Microsoft CSP partner. Send us any quote — we’ll beat it. Laptops, servers, networking and Huawei IdeaHub on request.',
  },
  a11y: {
    skip: 'Skip to main content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    close: 'Close',
    mainNav: 'Main navigation',
    home: 'BUZ Tech — home',
    breadcrumb: 'Breadcrumb',
    quickContact: 'Quick contact',
  },
  notFound: {
    title: 'Page not found',
    lead: 'The address may be mistyped, or the page has moved. Pick a section below.',
  },
  nav: {
    home: 'Home',
    products: 'Products',
    services: 'Services',
    about: 'About us',
    contact: 'Contact',
  },
  cta: 'Get a price',
  hero: {
    title: 'Microsoft 365 licences at the best prices in Georgia',
    lead: 'Send us any Microsoft 365 quote — we’ll beat it. Licences, setup and support from an official Microsoft CSP partner in Tbilisi.',
    points: ['Official Microsoft CSP partner', 'VAT invoice in GEL', 'Support after the sale'],
    secondary: 'Free licence audit',
    stack: { top: 'Apps', mid: 'Access and MFA', base: 'Cloud' },
    stackLabel: 'Microsoft 365, Entra ID and Azure working as one system',
  },
  pages: {
    'microsoft-365': {
      label: 'Microsoft 365',
      summary: 'Business and Enterprise plans, Copilot, Windows and Office.',
    },
    'it-equipment': {
      label: 'IT equipment',
      summary: 'Laptops, servers, networking and more, sourced on request.',
    },
    ideahub: {
      label: 'Huawei IdeaHub',
      summary: 'Interactive boards for meeting rooms and learning spaces.',
    },
  },
  products: {
    m365: 'Microsoft 365 — not sure which plan',
    'business-basic': 'Microsoft 365 Business Basic',
    'business-standard': 'Microsoft 365 Business Standard',
    'business-premium': 'Microsoft 365 Business Premium',
    e3: 'Microsoft 365 E3',
    e5: 'Microsoft 365 E5',
    copilot: 'Microsoft 365 Copilot',
    'windows-office': 'Windows and Office licences',
    azure: 'Azure',
    entra: 'Entra ID',
    audit: 'Free licence audit',
    laptops: 'Laptops and PCs',
    servers: 'Servers and storage',
    networking: 'Networking',
    printers: 'Printers and other equipment',
    ideahub: 'Huawei IdeaHub',
  },
  productLinks: { heading: 'Products' },
  beat: {
    title: 'Send us any quote — we’ll beat it',
    text: 'Have a Microsoft 365 offer from another supplier? Send it to us and we’ll come back with a better price.',
  },
  included: {
    heading: 'What every order includes',
    items: [
      { title: 'VAT invoice in GEL', text: 'Issued by LLC BUZ Tech Georgia, ready for your accounts.' },
      { title: 'Documents for tenders', text: 'Company documents and ISO certificates, ready for tenders and supplier files.' },
      { title: 'Renewal reminders', text: 'We remind you before your licences renew, so nothing lapses.' },
      { title: 'Support after the sale', text: 'Questions, changes, new users — we stay in touch.' },
    ],
  },
  home: {
    m365: {
      heading: 'Microsoft 365 for every company size',
      lead: 'From a few mailboxes to thousands of users. We help you pick the plan that fits, then set it up.',
      compare: 'Compare plans',
      rows: [
        { name: 'Business Basic, Standard, Premium', text: 'For companies up to 300 users' },
        { name: 'E3 and E5', text: 'For larger organisations, with no user limit' },
        { name: 'Copilot', text: 'The AI assistant in Word, Excel, Outlook and Teams' },
        { name: 'Windows and Office', text: 'Licences for your computers' },
      ],
    },
    onRequest: {
      heading: 'Everything else, on request',
      lead: 'Need laptops, a server or a meeting-room board too? Tell us what you need — we’ll source it.',
    },
    proof: {
      heading: 'Trusted by companies and public bodies',
      credentials: 'Partnership and standards',
      partner: 'Official Microsoft CSP partner',
      since: 'In Georgia since 2018',
      countries: 'Working in 5 countries',
    },
  },
  m365: {
    lead: 'Microsoft 365 licences for every company size, from an official Microsoft CSP partner. Send us any quote — we’ll beat it.',
    business: {
      heading: 'Business plans, up to 300 users',
      lead: 'Three plans for small and mid-size companies. Not sure which one fits? We’ll recommend one, free.',
      plans: {
        'business-basic': {
          who: 'For teams that work in the browser: email, chat and files.',
          includes: [
            'Business email in Outlook, and Teams',
            '1 TB of OneDrive storage per person',
            'Word, Excel and PowerPoint in the browser and on phones',
            'Sign-in protected by MFA',
          ],
        },
        'business-standard': {
          who: 'For teams that need the full Office apps on their computers.',
          includes: [
            'Desktop Word, Excel, PowerPoint and Outlook',
            'On up to 5 PCs or Macs per person, plus tablets and phones',
          ],
        },
        'business-premium': {
          who: 'For companies that hold sensitive data or manage many devices.',
          includes: [
            'Device management with Intune',
            'Advanced protection against phishing and malware',
            'Conditional access: rules for who signs in, and from where',
          ],
        },
      },
      plus: 'Everything in {plan}, plus:',
    },
    extras: {
      heading: 'Larger companies and add-ons',
      lead: 'For organisations over 300 users, for AI in everyday work, and for computers that need only Windows or Office.',
      items: {
        e3: 'For larger organisations: the full Office apps, device management and compliance tools, with no limit on users.',
        e5: 'Everything in E3, plus Microsoft’s most advanced security, compliance and analytics.',
        copilot:
          'An add-on to your Microsoft 365 plan: the AI assistant in Word, Excel, PowerPoint, Outlook and Teams, working with your company’s data.',
        'windows-office':
          'Windows and Office licences, including one-time purchase versions for computers that don’t need a subscription.',
      },
    },
    terms: {
      heading: 'In plain words',
      items: [
        {
          term: 'MFA',
          text: 'Multi-factor authentication: a second check, such as a code on the phone, when someone signs in. A stolen password alone is no longer enough.',
        },
        {
          term: 'SSO',
          text: 'Single sign-on: one company account for email, files and other work apps, instead of a separate password for each.',
        },
        {
          term: 'Intune',
          text: 'One place to set up and protect company laptops and phones: settings, updates, and wiping a lost device.',
        },
      ],
    },
    cloud: {
      heading: 'Azure and Entra ID',
      lead: 'The cloud and the sign-in system behind Microsoft 365, from the same partner.',
      items: {
        azure: {
          text: 'Microsoft’s cloud: servers, storage, backup and AI services.',
          specs: ['Cloud servers and storage', 'Backup and recovery', 'AI services'],
        },
        entra: {
          text: 'Sign-in and access for your whole team, in one place.',
          specs: ['Single sign-on (SSO)', 'Multi-factor authentication (MFA)', 'Conditional access'],
        },
      },
    },
  },
  equipment: {
    lead: 'Need hardware too? Tell us what you need — we’ll source it at a good price and deliver it with a VAT invoice in GEL.',
    heading: 'What we can source',
    items: {
      laptops: 'Business laptops, desktops and monitors, for one employee or a whole office.',
      servers: 'Servers, storage and backup, sized to your company.',
      networking: 'Switches, Wi-Fi access points, routers and firewalls.',
      printers: 'Printers, peripherals, accessories — and anything else your office needs.',
    },
    howHeading: 'How sourcing works',
    how: [
      {
        title: 'Tell us what you need',
        text: 'A model, a spec, or just the job it has to do. Call, write on WhatsApp or send the form.',
      },
      { title: 'We find the best price', text: 'We request prices from our suppliers and come back with an offer.' },
      {
        title: 'Delivered with a VAT invoice',
        text: 'Delivered to your office, with a VAT invoice in GEL and the manufacturer’s warranty.',
      },
    ],
  },
  ideahub: {
    tagline: 'One screen instead of a projector and a whiteboard.',
    specs: ['Interactive whiteboard', 'Video conferencing', 'Wireless presentation', 'For meeting rooms and learning spaces'],
    ask: 'Not sure which size fits your room? We’ll advise you, free.',
  },
  services: {
    heading: 'Services',
    lead: 'A free licence audit before you buy. Setup, support and renewal reminders after. We stay in touch.',
    audit: {
      title: 'Free licence audit',
      text: 'We review the Microsoft licences you already have and show you what to keep, change or cancel. Free, with no obligation.',
      points: [
        'Unused licences',
        'Plans that don’t match how people work',
        'Duplicate subscriptions',
        'Renewal dates, in one list',
      ],
      cta: 'Request a free audit',
    },
    items: [
      {
        id: 'setup',
        title: 'Setup and migration',
        text: 'Microsoft 365, Azure and Entra ID set up for you, with email and files moved over from your old system.',
      },
      {
        id: 'support',
        title: 'Ongoing support',
        text: 'Questions, new users, changes, problems — support of every kind after the sale.',
      },
      {
        id: 'supply',
        title: 'Equipment supply',
        text: 'Laptops, servers, networking and Huawei IdeaHub, sourced for you and delivered with a VAT invoice.',
      },
    ],
    facts: [
      { value: '2018', label: 'in Georgia since' },
      { value: '5', label: 'countries of operation' },
      { value: '3', label: 'ISO standards' },
    ],
    stepsHeading: 'How we work',
    steps: [
      { title: 'Request', text: 'Call, write on WhatsApp or send the form.' },
      { title: 'Offer', text: 'We come back with a price and the plan or equipment that fits.' },
      { title: 'Delivery and setup', text: 'Licences activated and equipment delivered, with a VAT invoice in GEL.' },
      { title: 'Support', text: 'We stay in touch: renewal reminders and help whenever you need it.' },
    ],
  },
  clients: {
    heading: 'Our clients',
    lead: 'BUZ Tech is an international IT integrator headquartered in the Czech Republic. We work in Georgia, Azerbaijan, Turkey, Uzbekistan and Kazakhstan, with both the private and the public sector.',
    groups: [
      {
        country: 'Georgia',
        items: [
          { name: 'Telasi', sector: 'Energy' },
          { name: 'TBC Insurance', sector: 'Insurance' },
          { name: 'Evex', sector: 'Healthcare' },
          { name: 'Enterprise Georgia', sector: 'Public sector' },
          { name: 'Financial Monitoring Service of Georgia', sector: 'Public sector' },
          { name: 'Borjomi Likani', sector: 'Hospitality' },
        ],
      },
      {
        country: 'Azerbaijan',
        items: [
          { name: 'Azergold', sector: 'Mining' },
          { name: 'Azerbaijan Airlines (AZAL)', sector: 'Aviation' },
          { name: 'AgroDairy', sector: 'Agriculture and dairy' },
        ],
      },
    ],
    more: 'Also: many public bodies on Microsoft solutions, and leading state and private companies in Turkey, Uzbekistan and Kazakhstan.',
  },
  certs: {
    heading: 'ISO certificates',
    lead: 'Quality, information security and IT service management to international standards.',
    details: 'Details',
    standardLabel: 'Standard',
    benefitsTitle: 'What it means for you',
    issuer: 'Issued by',
    number: 'Certificate number',
    valid: 'Valid until',
    view: 'View certificate',
    items: {
      iso9001: {
        name: 'Quality management',
        summary:
          'The standard sets out clear processes, measurable quality and continual improvement.',
        benefits: [
          'Work is carried out to one standard',
          'Requirements are recorded and their delivery is checked',
          'The service improves based on feedback',
        ],
      },
      iso27001: {
        name: 'Information security',
        summary:
          'The standard defines how information is protected: its confidentiality, integrity and availability.',
        benefits: [
          'Information risks are identified and managed',
          'Access to data is controlled',
          'Security processes are reviewed regularly',
        ],
      },
      iso20000: {
        name: 'IT service management',
        summary:
          'The standard describes how IT services are planned, delivered, supported and improved.',
        benefits: [
          'Support requests are handled systematically',
          'The service level is measurable',
          'Changes and incidents are managed through a process',
        ],
      },
    },
  },
  contact: {
    heading: 'Get a price',
    lead: 'Tell us your company and what you need — we’ll come back with a price.',
    detailsTitle: 'Contact details',
    entity: 'Legal entity',
    location: 'Location',
    address: 'Zakaria Paliashvili St. 83, 0179 Tbilisi, Georgia',
    phone: 'Phone',
    whatsapp: 'Message us on WhatsApp',
    email: 'Email',
    call: 'Call',
    fields: {
      company: 'Company name',
      email: 'Email',
      product: 'What you need',
      message: 'Message',
    },
    placeholders: {
      company: 'e.g., Your Company LLC',
      email: 'name@company.ge',
      message: 'For example: the number of users or devices, your current plan',
    },
    selectPlaceholder: 'Choose',
    groups: { microsoft: 'Microsoft', equipment: 'IT equipment' },
    other: 'Something else',
    required: 'Fill in this field',
    invalidEmail: 'Enter a valid email, e.g., name@company.ge',
    status: {
      sending: 'Sending…',
      success: 'Thank you — your request is in. We’ll get back to you with a price.',
      mailto: 'Your email app has opened. Press “Send” there to finish the request.',
      error: 'The request was not sent. Try again or write to info-ge@buz-cloud.com.',
    },
    mailSubject: 'Price request',
    privacyNote: 'We use your details only to reply to this request.',
    privacyLink: 'Privacy',
  },
  footer: {
    overview:
      'BUZ Tech is an official Microsoft CSP partner in Tbilisi. We supply Microsoft 365 licences at the best prices in Georgia, and source the rest of a company’s IT on request: laptops, servers, networking and Huawei IdeaHub. Our head office is in the Czech Republic, with branches in Georgia, Azerbaijan, Turkey, Uzbekistan and Kazakhstan.',
    quickLinks: 'Quick links',
    contactTitle: 'Contact',
    complianceTitle: 'Standards and partnership',
    rights: 'All rights reserved.',
    social: 'Social media',
    taxId: 'Tax ID',
    founded: 'Founded: 20 September 2018',
    privacy: 'Privacy',
  },
  privacy: {
    title: 'Privacy policy',
    intro: 'This page explains what data the price-request form collects and how we use it.',
    sections: [
      {
        heading: 'What we collect',
        body: 'In the form you give your company name, email, what you need and a message. The website asks for no other personal data.',
      },
      {
        heading: 'What we use it for',
        body: 'We use the data only to process your request and to contact you about a price.',
      },
      {
        heading: 'Who receives it',
        body: 'The request is delivered to the LLC BUZ Tech Georgia mailbox, info-ge@buz-cloud.com. A form-delivery service may carry it there; it passes the data only to that address.',
      },
      {
        heading: 'Cookies and language',
        body: 'The website uses no cookies and stores nothing in your browser. The language (GE or EN) is part of the page address.',
      },
      {
        heading: 'Your rights',
        body: 'To find out what data we hold about you, or to ask for it to be deleted, write to info-ge@buz-cloud.com.',
      },
    ],
    analyticsOn: 'We count website visits with Cloudflare Web Analytics. It uses no cookies and collects no personal data.',
    analyticsOff: '',
    updated: 'Updated: October 2026',
  },
};
