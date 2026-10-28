import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import { matchPath } from './routes';

const { page, lang } = matchPath(window.location.pathname);
const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <LanguageProvider lang={lang} page={page}>
      <App />
    </LanguageProvider>
  </StrictMode>
);

/* Built pages arrive pre-rendered and are hydrated; the dev server sends an empty root. */
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
