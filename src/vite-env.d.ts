/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_KEY?: string;
  readonly VITE_FORM_ENDPOINT?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_CF_ANALYTICS_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** The year the site was built (vite.config.ts `define`). */
declare const __BUILD_YEAR__: number;
