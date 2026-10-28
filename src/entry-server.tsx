import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { dictionaries, LanguageProvider } from './i18n/LanguageContext';
import type { Lang, PageId } from './i18n/types';
import { pageMeta } from './routes';

export { langs, pagePath, pages } from './routes';

/** Used only at build time by scripts/prerender.mjs. */
export function render(page: PageId, lang: Lang) {
  const html = renderToString(
    <StrictMode>
      <LanguageProvider lang={lang} page={page}>
        <App />
      </LanguageProvider>
    </StrictMode>,
  );
  return { html, meta: pageMeta(page, dictionaries[lang]) };
}
