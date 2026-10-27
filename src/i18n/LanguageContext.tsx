import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ge } from './ge';
import { en } from './en';
import type { Dict, Lang } from './types';

const dictionaries: Record<Lang, Dict> = { ge, en };
const STORAGE_KEY = 'buz-lang';

interface LanguageValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
}

const LanguageContext = createContext<LanguageValue | null>(null);

/** Georgian first: it is the default no matter what the browser language is. */
function readInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'ge' || stored === 'en') return stored;
  } catch {
    /* storage unavailable: fall through to the default */
  }
  return 'ge';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const dict = dictionaries[lang];
    document.documentElement.lang = lang === 'ge' ? 'ka' : 'en';
    document.title = dict.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', dict.meta.description);
  }, [lang]);

  const value = useMemo<LanguageValue>(() => ({ lang, setLang, t: dictionaries[lang] }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
