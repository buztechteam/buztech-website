import type { Dict, Lang } from './types';

/**
 * Each language is its own chunk, so a page downloads only its own dictionary. scripts/prerender.mjs adds a
 * modulepreload link for it to every page, so it arrives together with the main script, not after it.
 */
const loaders: Record<Lang, () => Promise<Dict>> = {
  ge: () => import('./ge').then((m) => m.ge),
  en: () => import('./en').then((m) => m.en),
  az: () => import('./az').then((m) => m.az),
  ru: () => import('./ru').then((m) => m.ru),
};

export const loadDictionary = (lang: Lang): Promise<Dict> => loaders[lang]();
