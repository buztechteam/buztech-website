# BUZ Tech website: Azerbaijani and Russian versions

Date: 2026-11-03 · Status: draft for the owner's approval

## 1. Intent

The owner wants the site to be international. BUZ Tech (formerly BUZ Group) started in Baku and works in Georgia, Azerbaijan, Turkey, Uzbekistan and Kazakhstan, but the new site only speaks Georgian and English.

This adds:
- an Azerbaijani version
- a Russian version
- automatic language choice on the home page

It must not look like the old buz-group.com. The visual world stays exactly as it is (`.claude/skills/buz-tech-design/SKILL.md`).

**Success:**
- A visitor from Baku lands on an Azerbaijani (or Russian) page that shows the Baku office and makes no claim only the Georgian company can make.
- The Georgian and English versions keep working exactly as today.

## 2. Goals, non-goals, anti-goals

**Goals:**
- AZ and RU versions of every page:
  - home
  - microsoft-365
  - it-equipment
  - ideahub
  - services
  - about
  - contact
  - privacy
  - 404
- A language menu with four languages.
- The home page sends a first-time visitor to their language.
- AZ and RU show the Baku office.

**Non-goals:**
- Turkish, Uzbek or Kazakh versions.
- Separate content per country beyond what is listed here.
- Prices or currencies.
- A Baku legal entity block, because we have no Baku company facts.

**Anti-goals** (failure even if it works):
- Any AZ or RU page claiming things only LLC BUZ Tech Georgia can claim (see section 5).
- Georgian or English pages changing, except the one English addition in section 6.
- Google indexing only one language because the home page redirects crawlers.
- Copying text, layout or the look from buz-group.com.

## 3. Addresses and languages (decided)

| Language | Address | `lang` / hreflang | og:locale | Contacts shown |
| --- | --- | --- | --- | --- |
| Georgian | `/` | `ka` | `ka_GE` | Tbilisi (as today) |
| English | `/en/` | `en` | `en_US` (as today) | Tbilisi (as today) |
| Azerbaijani | `/az/` | `az` | `az_AZ` | Baku office |
| Russian | `/ru/` | `ru` | `ru_RU` | Baku office |

**Routing:**
- `Lang` becomes `'ge' | 'en' | 'az' | 'ru'`.
- Slugs stay Latin and identical across languages.
- `pagePath`, `matchPath`, `langs`, the prerender `HTML_LANG` / `OG_LOCALE` maps, the hreflang links and the 404 pages all cover four languages.
- `x-default` stays `/`.
- Cloudflare serves the nearest 404: `dist/az/404.html` and `dist/ru/404.html`.
- **Site address (my call):** hreflang, canonical, og:url and `sitemap.xml` are written only when `VITE_SITE_URL` is set, as today. The custom domain is still a deferred pre-launch item, so these switch on with it. The tests build with a test-only `VITE_SITE_URL` to check them. The automatic language choice in section 8 works with or without it.

## 4. The Baku office (owner confirmed 2026-11-03)

- **Address:** Ziya Bunyadov Ave. 1965, Chinar Park Business Center, Building 2, Baku, Azerbaijan. It is translated per language, like the Tbilisi address.
- **Phone and WhatsApp:** +994 70 860 89 86 (`tel:+994708608986`, `https://wa.me/994708608986`). The owner said any of the old site's numbers would do; I chose the mobile one so that WhatsApp works.
- **Email:** info@buz-cloud.com.
- **Map link:** a Google Maps search for the address, built like the Tbilisi one.
- **No social icons** (Facebook, LinkedIn) on AZ and RU. The WhatsApp icon stays and uses the Baku number.

**Office data model:**
- `config/site.ts` gains an `offices` record (`tbilisi`, `baku`). Each office has `phone`, `phoneHref`, `whatsappHref`, `email`, `mapsHref` and `social`.
- `officeFor(lang)` returns `tbilisi` for ge/en and `baku` for az/ru.
- Every component that reads `site.phone`, `site.whatsappHref`, `site.email`, `site.mapsHref` or `site.social` switches to the office for the current language:
  - Contact
  - ContactBand
  - Footer
  - QuickContactBar
- The exceptions are form delivery and the Privacy page. Both keep LLC BUZ Tech Georgia and info-ge@buz-cloud.com in every language (section 7).

## 5. What AZ and RU leave out (decided: "we dont have baku's facts")

The Georgian and English dictionaries stay as they are. In the AZ and RU dictionaries:
- **Drop the country from claims.** "the best Microsoft 365 prices in Georgia" becomes "the best Microsoft 365 prices", and "official Microsoft CSP partner in Tbilisi" becomes "official Microsoft CSP partner".
- **Remove these lines:**
  - every "VAT invoice in GEL" item, or its "issued by LLC BUZ Tech Georgia" text
  - "invoiced in GEL"
  - "In Georgia since 2018"
  - the "2018 / in Georgia since" stat
- **Remove VAT invoices entirely in AZ and RU (my call).** We don't know what the Baku side invoices, so drop it from:
  - `equipment.lead` ("VAT included")
  - `equipment.how[2]` ("Delivered with a VAT invoice")
  - the services "supply" item ("delivered with a VAT invoice")
  - any other VAT mention
- **Keep tender documents and ISO certificates in AZ and RU (my call).** The company is long established in Baku and ISO is company-wide. Requests reach Tbilisi, which passes them on. So the "Documents for tenders" Included item, the form's `documents` option and its price links stay. If an Included item is dropped, its icon must move with it: `includedIcons` matches icons to items by position.
- **Rewrite lines that mix a fact with a Georgia-only part, keeping the fact.** For example, "Delivered to your office, with a VAT invoice in GEL and the manufacturer's warranty" becomes "Delivered to your office, with the manufacturer's warranty".
- **Remove the company line.**
  - The footer shows no legal name and no tax ID.
  - The copyright reads "© {year} BUZ Tech".
  - The `legalName · taxId · founded` line in `App.tsx` does not render.
  - The legal name under the Contact details does not render.
- **Keep company-wide facts:**
  - the Czech headquarters
  - the five countries
  - the sectors
  - ISO
  - the events (the captions keep their real places, such as "Tbilisi, July 2026")

**How the code does it:**
- Georgia-only fields become optional in `Dict`, or a list simply has fewer items. Components render nothing for an absent field.
- `showsCompanyDetails(lang)` (true for ge/en) gates the legal name, tax ID and founded line.
- Every one of the 22 Georgia/GEL/Tbilisi mentions in `en.ts`, and every VAT mention, must have a decided AZ/RU counterpart: kept, rewritten or dropped.

**Structured data (my call).** The JSON-LD Organization block in `index.html` is built per language by the prerender step:
- **GE and EN:** keep today's block unchanged.
- **AZ and RU:** a brand-only Organization. It has the name "BUZ Tech", the url, the logo, and the Baku office's telephone, email and address. It has no legal name, no tax ID and no `sameAs` links.

## 6. English version: one addition (my call; the owner said "up to you")

The English Contact page gets one short line under the Tbilisi details: "In Azerbaijan? Our Baku office:", followed by the Baku phone and email as links. English is the fallback for everyone outside the four languages, including people in Azerbaijan whose browser is in English. Georgian stays unchanged.

## 7. Price requests and Privacy (proposed, owner did not object)

**Form delivery stays as it is.** All four languages send price requests to the Tbilisi inbox, through the same Web3Forms key or the mailto fallback to info-ge@buz-cloud.com. The request names its language (GE / EN / AZ / RU), so the Tbilisi team can pass AZ and RU requests to Baku.

**Privacy copy:**
- In AZ and RU, the Privacy page still names LLC BUZ Tech Georgia and info-ge@buz-cloud.com as the recipient of a request. This is true, and the only lawful wording until a Baku legal name exists.
- The "Cookies and language" paragraph changes in all four languages:
  - Old: "(GE or EN)"
  - New: "the language is part of the page address; the home page may pick a language for you from your country and browser settings, and nothing is stored."
- Georgian copy changes only in this paragraph. Tell the owner, because Georgian wording is theirs to approve.

## 8. Automatic language on the home page

A small Worker runs before the static assets for `/` only (`main` plus `assets.binding` and `assets.run_worker_first: ["/"]` in `wrangler.jsonc`). Every other address is served exactly as today.

The choice is a pure function, `chooseLang({ acceptLanguage, country, referer, userAgent, host })`, tested on its own:
1. **Same-site navigation** (a `referer` from our own host): serve `/` as is. Clicking "ქართული" in the menu, or the Georgian logo, always lands on Georgian. This is how a choice is "remembered" without cookies. The site promises no cookies, so we keep that promise. **My call:** a choice is remembered within a visit, not across visits.
2. **Crawlers and link-preview bots** (the `userAgent` matches a bot list, or there is no `Accept-Language`): serve `/` as is.
3. **The browser's first language,** if it is Georgian, Azerbaijani or Russian (`ka*`, `az*`, `ru*`). English is skipped on purpose, because many people in Georgia and Azerbaijan use an English browser.
4. **The country** (`request.cf.country`):
   - GE → ge
   - AZ → az
   - RU, BY, KZ, KG, UZ, TJ → ru. **My call:** Kazakhstan, Uzbekistan and their neighbours get Russian. The owner can change this list.
   - any other country → en
5. **No country:** en.

**Result:**
- `ge`: serve the Georgian home (`env.ASSETS.fetch`).
- Anything else: `302` to `/en/`, `/az/` or `/ru/`, keeping the query string, with `Cache-Control: private, no-store` and `Vary: Accept-Language`.

**Must be verified after deploy:**
- the security headers from `public/_headers` are still present on `/` (they are normally applied to asset responses; check with `curl -I`)
- the CSP hash test still passes

## 9. Language menu

`LangToggle` (a two-way GE/EN switch) becomes a menu of four:
- Each link goes to the same page in that language (`pagePath(page, l)`).
- Each language is named in itself: ქართული, English, Azərbaycan dili, Русский.
- It has `hrefLang` / `lang` attributes.

It follows the header menu rules in the design skill:
- it stays in the DOM, with `data-open`
- Esc closes it and returns focus
- outside clicks and blur close it
- closed links are out of the tab order

The button shows the short code (GE / EN / AZ / RU). The mobile menu lists all four as plain links. Brand tokens, weights and B+ motion are unchanged.

## 10. Fonts

Add the `@fontsource/inter` subsets `latin-ext` (Azerbaijani ə ğ ş ı İ) and `cyrillic` (Russian), at weights 500 and 800. `unicode-range` means each visitor downloads only what the page uses. The font stack is unchanged.

## 11. Copy

- **The CTA,** one wording per language (`t.cta`):
  - AZ: "Qiymət alın"
  - RU: "Получить цену"
- **Rules for every language:**
  - no prices
  - no reply times
  - no "today"
  - plain hyphens only, never an em dash
  - only Microsoft and Huawei named
  - "official Microsoft CSP partner" (AZ: "rəsmi Microsoft CSP partnyoru"; RU: "официальный CSP-партнёр Microsoft")
- **Source:** AZ and RU are translated from our own GE/EN copy. Use the old site only as a reference for IT terms.
- **Review:** the drafts are mine. The owner arranges a native-speaker read for AZ and RU before the versions are announced.
- **Layout:** long Azerbaijani and Russian words must not clip at 375px. Headings already have `break-words`; add soft hyphens where a heading breaks badly.

## 12. Tests (extend `tests/site.test.mjs`)

- Every page exists in four languages with exactly one h1, the right `lang`, four hreflang links plus x-default, and the right og:locale.
- The AZ and RU pages contain none of:
  - `405291786`
  - `GEL`
  - `₾`
  - `Paliashvili`
  - `+995`
  - `info-ge@` (outside the Privacy page)
  - `LLC BUZ Tech Georgia` (outside the Privacy page)

  They do contain `+994708608986` and `info@buz-cloud.com`.
- The AZ and RU pages carry no Facebook or LinkedIn links. This checks the JSON-LD too, which must contain none of the Georgian entity's facts listed above.
- The GE and EN pages are unchanged apart from the English Baku line and the cookie paragraph. Tbilisi contacts appear and no `+994` appears, except on the English Contact page.
- The existing rules (no em dash, no prices, unapproved names) run over all four languages.
- `chooseLang` unit cases, one per rule in section 8:
  - a Georgian browser abroad → ge
  - an English browser in Baku → az
  - a Russian browser in Tbilisi → ru
  - Turkey → en
  - Googlebot → served as is
  - same-site referer → served as is

## 13. Left to the builder

- The exact AZ/RU wording, within section 11.
- How the optional fields are typed.
- The bot list.
- The menu's markup.
- Whether a sitemap is added (none exists today).
