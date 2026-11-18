import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { htmlLang, pageMeta } from '../routes';
import type { Dict, Lang, PageId } from './types';

interface LanguageValue {
  lang: Lang;
  t: Dict;
  /** The page being shown: language and page both come from the address (see routes.ts). */
  page: PageId;
}

const LanguageContext = createContext<LanguageValue | null>(null);

/**
 * `t` is the page's dictionary: the build passes it from dictionaries.ts, the browser loads it first
 * (loadDictionary.ts), so the first render in the browser equals the pre-rendered HTML.
 */
export function LanguageProvider({ lang, page, t, children }: { lang: Lang; page: PageId; t: Dict; children: ReactNode }) {
  const value = useMemo<LanguageValue>(() => ({ lang, t, page }), [lang, t, page]);

  /* Pre-rendered pages already carry these; this keeps the dev server in step. */
  useEffect(() => {
    const meta = pageMeta(page, t);
    document.documentElement.lang = htmlLang[lang];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [lang, page, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
