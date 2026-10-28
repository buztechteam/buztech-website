import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { pageMeta } from '../routes';
import { ge } from './ge';
import { en } from './en';
import type { Dict, Lang, PageId } from './types';

export const dictionaries: Record<Lang, Dict> = { ge, en };

interface LanguageValue {
  lang: Lang;
  t: Dict;
  /** The page being shown: language and page both come from the address (see routes.ts). */
  page: PageId;
}

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ lang, page, children }: { lang: Lang; page: PageId; children: ReactNode }) {
  const value = useMemo<LanguageValue>(() => ({ lang, t: dictionaries[lang], page }), [lang, page]);

  /* Pre-rendered pages already carry these; this keeps the dev server in step. */
  useEffect(() => {
    const meta = pageMeta(page, dictionaries[lang]);
    document.documentElement.lang = lang === 'ge' ? 'ka' : 'en';
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [lang, page]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
