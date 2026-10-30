import { useEffect, type ReactNode } from 'react';
import { Clients } from './components/Clients';
import { Contact } from './components/Contact';
import { ContactBand } from './components/ContactBand';
import { Equipment, IdeaHub } from './components/Equipment';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { M365Teaser } from './components/Home';
import { IncludedSection } from './components/Included';
import { Microsoft365, PriceActions } from './components/Microsoft365';
import { PageIntro } from './components/PageIntro';
import { Privacy } from './components/Privacy';
import { ProductLinks } from './components/ProductLinks';
import { QUICK_BAR_SPACE, QuickContactBar } from './components/QuickContactBar';
import { Services, StepsSection } from './components/Services';
import { Facts, Proof } from './components/TrustStrip';
import { useLang } from './i18n/LanguageContext';
import { initReveal } from './motion/reveal';
import type { Dict, Lang, PageId } from './i18n/types';
import { btn } from './components/ui';
import { pagePath } from './routes';

/** What each page shows. Microsoft 365 leads; every page ends in a price request (ContactBand, or the form itself). */
function pageBody(page: PageId, t: Dict, lang: Lang): ReactNode {
  const priceButton = (
    <a href={pagePath('contact', lang)} className={`${btn('primary')} mt-8`}>
      {t.cta}
    </a>
  );
  switch (page) {
    case 'home':
      return (
        <>
          <Hero />
          <M365Teaser />
          <ProductLinks
            ids={['it-equipment', 'ideahub']}
            heading={t.home.onRequest.heading}
            lead={t.home.onRequest.lead}
            prominent
          />
          <Proof />
          <IncludedSection />
        </>
      );
    case 'microsoft-365':
      return (
        <>
          <PageIntro title={t.pages[page].label} lead={t.m365.lead}>
            <PriceActions className="mt-8" />
          </PageIntro>
          <Microsoft365 />
          <ProductLinks current={page} />
        </>
      );
    case 'it-equipment':
      return (
        <>
          <PageIntro title={t.pages[page].label} lead={t.equipment.lead}>
            {priceButton}
          </PageIntro>
          <Equipment />
          <ProductLinks current={page} />
        </>
      );
    case 'ideahub':
      return (
        <>
          <PageIntro title={t.pages[page].label} lead={t.pages[page].summary} />
          <IdeaHub />
          <ProductLinks current={page} />
        </>
      );
    case 'services':
      return (
        <>
          <PageIntro title={t.services.heading} lead={t.services.lead} />
          <Services />
          <StepsSection />
          <ProductLinks />
        </>
      );
    case 'about':
      return (
        <>
          <PageIntro title={t.nav.about} lead={t.footer.overview}>
            <Facts className="mt-10" />
          </PageIntro>
          <Clients />
        </>
      );
    case 'contact':
      return (
        <>
          <PageIntro title={t.contact.heading} lead={t.contact.lead} />
          <Contact />
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
          <ProductLinks />
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
