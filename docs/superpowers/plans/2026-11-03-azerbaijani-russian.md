# Azerbaijani and Russian versions: implementation plan

> **For agentic workers:** this runs natively in the owner's session (the owner said "build it"). The two translations go to helper agents.

**Goal:** Add `/az/` and `/ru/` versions that show the Baku office and make no Georgia-only claims. Pick the home-page language automatically. Leave GE and EN as they are.

**Architecture:**
- `Lang` grows to four.
- Contact facts move into an `offices` record, chosen per language.
- Georgia-only dictionary fields become optional.
- A small Worker answers `/` only.

**Tech stack:** React 19, Vite 8, Tailwind 4, `@fontsource/inter`, Cloudflare Workers static assets (Wrangler 4.154.0), `node:test`.

**Spec:** `docs/superpowers/specs/2026-11-03-azerbaijani-russian-design.md`

## Global constraints

- Brand tokens, weights 500/800, Inter + Noto Sans Georgian, B+ motion (`.claude/skills/buz-tech-design/SKILL.md`).
- **Copy:**
  - no prices, reply times or "today"
  - plain hyphens only
  - only Microsoft and Huawei named
  - "official Microsoft CSP partner"
- **CTA:**
  - AZ: "Qiymət alın"
  - RU: "Получить цену"
- **AZ and RU never contain** `405291786`, `GEL`, `₾`, `Paliashvili`, `+995`, VAT, or any Facebook or LinkedIn link. `LLC BUZ Tech Georgia` and `info-ge@` appear on Privacy only.
- **Baku office:**
  - Ziya Bunyadov Ave. 1965, Chinar Park Business Center, Building 2, Baku
  - `+994 70 860 89 86`
  - `info@buz-cloud.com`
- **English Contact:** shows both offices, Tbilisi first (owner: "show both of them").
- **No commits** unless the owner asks.

## Review focus

1. A visitor on `/az/` or `/ru/` clicks "ქართული". They must land on Georgian `/` and not be redirected away. Same-site referer rule; unit test.
2. Googlebot fetches `/`. It must get the Georgian page with a 200. Unit test plus a curl check after deploy.
3. A long Azerbaijani or Russian heading at 375px must not overflow. Browser check.
4. The security headers must be present on `/` once the Worker answers it. curl check after deploy.
5. An Included item dropped in AZ/RU must not shift the other items' icons. Icons are keyed, not positional.

## Tasks

1. **Types.**
   - `Lang` = `'ge' | 'en' | 'az' | 'ru'`.
   - `IncludedItem.icon`: `'invoice' | 'documents' | 'renewals' | 'support'`, with `includedIcons` keyed by it.
   - Optional fields:
     - `home.proof.since`
     - `footer.taxId`
     - `footer.founded`
     - `contact.otherOffice?: { title; address }` (EN only)
   - Add the `icon` keys to `ge.ts` and `en.ts`.
2. **Translations (helpers, in parallel):**
   - Write `src/i18n/az.ts` and `src/i18n/ru.ts` from `en.ts` and `ge.ts`, following spec section 5 and the constraints above.
   - Each must type-check against `Dict`.
3. **Plumbing:**
   - `routes.ts`: `langs`, `pagePath`, `matchPath`.
   - `LanguageContext`: the dictionaries and the html `lang`.
   - `prerender.mjs`:
     - `HTML_LANG` and `OG_LOCALE`
     - JSON-LD per language: AZ/RU brand-only with Baku contacts
     - the 404 pages
   - Fonts: Inter `latin-ext` and `cyrillic`, at 500 and 800.
   - `site.ts`:
     - `offices`, `officeFor(lang)`, `showsCompanyDetails(lang)`
     - the form still goes to Tbilisi
   - Components switch to `officeFor(lang)`: Contact, ContactBand, Footer, QuickContactBar.
   - The company line, `Footer` compliance and the Contact legal entity are gated.
   - EN Contact gets a Baku block.
   - `TrustStrip` filters out absent facts.
   - The Privacy cookie paragraph is updated in GE and EN.
4. **Language menu:**
   - `LangToggle` becomes a four-language menu that follows the header menu rules.
   - The mobile menu lists all four.
5. **Worker:**
   - `worker/index.js` with `chooseLang()` (pure function, exported).
   - `wrangler.jsonc`: `main`, `assets.binding: "ASSETS"`, `run_worker_first: ["/"]`.
   - A unit test for each rule in spec section 8.
6. **Tests:** extend `tests/site.test.mjs` per spec section 12. Run `npm test`.
7. **Browser check:**
   - every language at 375 and 1280
   - the language menu by keyboard
   - Contact in AZ and EN
   - no console errors
8. **Review:** one fresh reviewer over the whole change. Fix what's found, then hand over, without committing.
