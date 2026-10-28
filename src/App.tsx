import type { ReactNode } from 'react';
import { Certifications } from './components/Certifications';
import { Clients } from './components/Clients';
import { Contact } from './components/Contact';
import { ContactBand } from './components/ContactBand';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PageIntro } from './components/PageIntro';
import { Privacy } from './components/Privacy';
import { ProductCategory, Products } from './components/Products';
import { Services } from './components/Services';
import { VendorMarquee } from './components/VendorMarquee';
import { useLang } from './i18n/LanguageContext';
import type { Dict, PageId } from './i18n/types';
import { isProductPage } from './routes';

/** What each page shows. Existing sections are reused; the copy is unchanged. */
function pageBody(page: PageId, t: Dict): ReactNode {
  if (isProductPage(page)) {
    const category = t.products.categories[page];
    return (
      <>
        <PageIntro title={category.label} lead={category.summary} />
        <ProductCategory id={page} />
      </>
    );
  }
  switch (page) {
    case 'home':
      return (
        <>
          <Hero />
          <VendorMarquee />
          <Products />
        </>
      );
    case 'services':
      return (
        <>
          <PageIntro title={t.services.heading} lead={t.services.lead} />
          <Services intro={false} />
        </>
      );
    case 'about':
      return (
        <>
          <PageIntro title={t.nav.about} lead={t.footer.overview} />
          <Clients />
          <Certifications />
        </>
      );
    case 'contact':
      return (
        <>
          <PageIntro title={t.contact.heading} lead={t.contact.lead} />
          <Contact intro={false} />
        </>
      );
    case 'privacy':
      return (
        <>
          <PageIntro title={t.privacy.title} lead={t.privacy.intro} />
          <Privacy />
        </>
      );
  }
}

export default function App() {
  const { page, t } = useLang();
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-brand-teal px-4 py-3 font-extrabold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t.a11y.skip}
      </a>
      <Header />
      <main id="main">
        {pageBody(page, t)}
        {page !== 'contact' && <ContactBand />}
      </main>
      <Footer />
    </>
  );
}
