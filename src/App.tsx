import { useEffect, type ReactNode } from 'react';
import { brandNames } from './config/site';
import { CategoryCards } from './components/CategoryCards';
import { CategoryServices, OtherCategories } from './components/CategoryExtras';
import { Certifications } from './components/Certifications';
import { Clients } from './components/Clients';
import { Contact } from './components/Contact';
import { ContactBand } from './components/ContactBand';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PageIntro } from './components/PageIntro';
import { Privacy } from './components/Privacy';
import { QUICK_BAR_SPACE, QuickContactBar } from './components/QuickContactBar';
import { ProductCategory } from './components/Products';
import { Services, StepsSection } from './components/Services';
import { Facts, TrustStrip } from './components/TrustStrip';
import { PartnerGrid, PartnerStrip } from './components/Partners';
import { useLang } from './i18n/LanguageContext';
import { initReveal } from './motion/reveal';
import type { Dict, Lang, PageId } from './i18n/types';
import { btn } from './components/ui';
import { isProductPage, pagePath } from './routes';

/** What each page shows. Existing sections are reused; the copy is unchanged. */
function pageBody(page: PageId, t: Dict, lang: Lang): ReactNode {
  if (isProductPage(page)) {
    const category = t.products.categories[page];
    return (
      <>
        <PageIntro title={category.label} lead={category.summary} chips={brandNames(page)} />
        <ProductCategory id={page} />
        <CategoryServices id={page} />
        <OtherCategories current={page} />
      </>
    );
  }
  switch (page) {
    case 'home':
      return (
        <>
          <Hero />
          <PartnerStrip />
          <CategoryCards />
          <TrustStrip />
        </>
      );
    case 'services':
      return (
        <>
          <PageIntro title={t.services.heading} lead={t.services.lead} />
          <Services />
          <StepsSection />
          <OtherCategories />
        </>
      );
    case 'about':
      return (
        <>
          <PageIntro title={t.nav.about} lead={t.footer.overview}>
            <Facts className="mt-10" />
          </PageIntro>
          <Clients />
          <PartnerGrid />
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
    case 'notFound':
      return (
        <>
          <PageIntro title={t.notFound.title} lead={t.notFound.lead}>
            <a href={pagePath('home', lang)} className={`${btn('primary')} mt-8`}>
              {t.nav.home}
            </a>
          </PageIntro>
          <OtherCategories />
        </>
      );
  }
}

export default function App() {
  const { lang, page, t } = useLang();
  const quickBar = page !== 'contact';
  // after hydration, so server and client markup match
  useEffect(() => initReveal(), []);
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
        {pageBody(page, t, lang)}
        {page !== 'contact' && <ContactBand />}
      </main>
      <Footer />
      {quickBar && (
        <>
          {/* Keeps the end of the footer clear of the fixed phone bar. */}
          <div aria-hidden="true" className={`${QUICK_BAR_SPACE} md:hidden`} />
          <QuickContactBar />
        </>
      )}
    </>
  );
}
