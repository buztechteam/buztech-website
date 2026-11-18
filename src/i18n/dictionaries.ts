import { az } from './az';
import { en } from './en';
import { ge } from './ge';
import { ru } from './ru';
import type { Dict, Lang } from './types';

/**
 * Every language at once, for the build only (entry-server.tsx, scripts/prerender.mjs).
 * The browser loads just the page's own language (loadDictionary.ts).
 */
export const dictionaries: Record<Lang, Dict> = { ge, en, az, ru };
