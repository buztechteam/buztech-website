import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import { loadDictionary } from './i18n/loadDictionary';
import { matchPath } from './routes';

const { page, lang } = matchPath(window.location.pathname);
/* Only this language's dictionary is downloaded (preloaded by the page), and before the first render, so it equals the pre-rendered HTML. */
const t = await loadDictionary(lang);
const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <LanguageProvider lang={lang} page={page} t={t}>
      <App />
    </LanguageProvider>
  </StrictMode>
);

/* Built pages arrive pre-rendered and are hydrated; the dev server sends an empty root. */
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
