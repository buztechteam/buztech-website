import { useCallback, useState } from 'react';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { Services } from './components/Services';
import { VendorMarquee } from './components/VendorMarquee';
import { useLang } from './i18n/LanguageContext';

export default function App() {
  const { t } = useLang();
  /* nonce lets the same product be chosen twice in a row and still re-select it in the form */
  const [inquiry, setInquiry] = useState({ product: '', nonce: 0 });
  const onInquire = useCallback(
    (product: string) => setInquiry((prev) => ({ product, nonce: prev.nonce + 1 })),
    [],
  );

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
        <Hero />
        <VendorMarquee />
        <Products onInquire={onInquire} />
        <Services />
        <Certifications />
        <Contact inquiry={inquiry} />
      </main>
      <Footer />
    </>
  );
}
