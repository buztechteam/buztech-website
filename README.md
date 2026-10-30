# BUZ Tech website

Corporate B2B site for **LLC BUZ Tech Georgia**, built to the *BUZ Tech Brand Guidelines 2026 v2*.
React 19 · Vite · Tailwind CSS 4 · TypeScript. Georgian first, with a GE/EN toggle.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve dist/ locally
```

## Structure

```
src/
  index.css                  brand tokens (colours, fonts, weights), gradient, motion, dialog CSS
  config/site.ts             contact details, tax ID, form options, plan names, approved brand names, ISO certificates
                             (not translated)
  i18n/ge.ts, en.ts          all copy incl. street address and client list; ge.ts is the primary language,
                             types.ts keeps both in sync
  routes.ts                  the page list, addresses per language, page titles/descriptions
  App.tsx                    which sections each page shows
  components/                Header (+Products menu), PageIntro, ContactBand, Hero (+HeroStack), Home (Microsoft 365
                             teaser), Microsoft365, Equipment (+IdeaHub), ProductLinks, Included, TrustStrip (proof),
                             Services, Clients, Certifications (+dialog), Contact, Privacy, Footer, BuzLogo, icons
  entry-server.tsx           renders one page to HTML at build time
scripts/prerender.mjs        writes dist/<page>/index.html for every page in both languages
```

Change a phone number or email in `config/site.ts`; change any wording in `i18n/ge.ts` / `en.ts`.

## Pages

Eight pages, each in Georgian at the root and in English under `/en/`:
`/`, `/microsoft-365/`, `/it-equipment/`, `/ideahub/`, `/services/`, `/about/`, `/contact/`, `/privacy/`.
The first version's addresses (`/licensing/`, `/servers/`, `/networking/`, `/workspaces/`) redirect permanently to
their new pages (`public/_redirects`), so old links and search results keep working.
The language comes from the address (no browser storage), and the GE/EN switch links to the same page in the other language.

`npm run build` runs three steps: the normal client build, a server build of `entry-server.tsx`, then
`scripts/prerender.mjs`, which writes a complete HTML file per page and language (content, title, description,
`lang`), so every page loads with its content in place and search engines can read both languages.
To add a page: add its id to `PageId` (`i18n/types.ts`) and `pages` (`routes.ts`), give it a title in `pageMeta`,
and its body in `App.tsx`.

Unknown addresses get a "page not found" page: the build also writes `dist/404.html` and `dist/en/404.html`
(`noindex`, not in the sitemap), and `wrangler.jsonc` tells Cloudflare to serve the nearest one with a 404 status.

On phones a quick-contact bar (call, WhatsApp, price request) stays at the bottom of every page except Contact
(`QuickContactBar.tsx`).

`npm run preview` serves the built site, which is the closest local check of what Cloudflare will serve
(it does not imitate the 404 handling; open `/404.html` or `/en/404.html` directly to see those pages).

## Deploying

Cloudflare Workers Builds runs `npm run build`, then `npx wrangler deploy`, which uploads `dist/` as static assets
using `wrangler.jsonc`. Keep that file: without it Wrangler auto-configures the project, adds the Cloudflare Vite
plugin and rebuilds, and the pre-render step then fails (`Cannot find module .../dist-ssr/entry-server.js`).
Wrangler is pinned in `devDependencies`, so deploys don't pull a new version on every build.

`npm test` builds the site and checks the output in `dist/`: one h1 per page and no skipped heading levels, links that
resolve, the redirects, the motion gating, the security headers, the form limits, and the positioning rules below.

## Security headers

`public/_headers` sends a Content-Security-Policy and the usual protective headers with every response. The policy
allows only what the site uses: its own files, Web3Forms (the price form) and Cloudflare Web Analytics.

- The inline script at the top of `index.html` (it turns animation on) is allowed by its hash. If you change it, update
  the `sha256-…` value in `_headers`; `npm test` fails until they match.
- A `VITE_FORM_ENDPOINT` on another domain must be added to `connect-src`, or the browser blocks the request.
- HSTS is not sent yet: turn it on in Cloudflare once the custom domain is live.
- After a deploy, open the live site's console: a CSP error there usually means a Cloudflare feature (Rocket Loader,
  email obfuscation) injected a script. Turn that feature off or allow it in the policy.

## How the brand rules are enforced

| Rule | Where |
| --- | --- |
| Palette only: Ink, Navy, Brand Teal, Deep Teal, Light | `@theme` in `index.css` resets Tailwind's palette, so off-brand colours cannot be used |
| Two weights only: 500 and 800 | `@theme` resets the weight scale; only `font-medium` and `font-extrabold` exist; only those four font files are loaded |
| Noto Sans Georgian for Georgian, Inter for Latin and numbers | font stack `Inter, Noto Sans Georgian`; Inter has no Georgian glyphs, so each script falls to the right face |
| One primary CTA: "მიიღეთ ფასი" / "Get a price" (no "today": a price takes time to arrive) | `cta` in the dictionaries, used by every button; `npm test` fails on დღესვე / today |
| Never "BUZ Group" / buzgroup.com | not present anywhere in `src/`, `index.html` or `public/` |
| Brand gradient on the hero with the all-white logo | `bg-brand-gradient` in `index.css` |
| Tagline `Consulting · Cloud · Tech` | `site.tagline`, shown in the header and footer |

Contrast notes: buttons are Brand Teal with Ink text (6.8:1). Deep Teal (4.1:1 on white) is used for icons,
borders and focus rings on light sections; body-size text stays Navy. The hero gradient's first stop is too light for
white text (2.2:1), so a Navy scrim fades across the text column.

## Positioning rules (owner, October 2026)

- **Microsoft 365 first, everything else on request.** Hardware is never presented as the core.
- **Only Microsoft and Huawei are named.** There is no approval to name other vendors or distributors, so there is no
  partners section. Brand names for the IT equipment page go in `equipmentBrands` (`config/site.ts`) once approved, and
  nowhere else. `npm test` fails if an unapproved name reaches the built site.
- **"Official Microsoft CSP partner"**, never "Solution Partner".
- **No prices and no reply times.** Prices come from the group office and differ every time, so every path ends in a
  price request. `npm test` fails on a price or a time promise.
- **The price promise is a test:** "Send us any Microsoft 365 quote — we'll beat it" (`beat` and `hero.lead` in the
  dictionaries). The owner may change it back to a plain best-price line.

## Before launch: items only you can supply

1. **Brand names on the IT equipment page.** Generic until the owner approves names (`equipmentBrands` in `config/site.ts`).
2. **Client logos.** The clients section shows typeset names (`clients` in `i18n/ge.ts` / `en.ts`). Add logos once each client agrees.
3. **ISO certificate details.** Issuer, certificate number, validity and a scan are empty in `certs` (`config/site.ts`). Fill them in and a Details button with a dialog appears on each certificate.
4. **IdeaHub photo.** Add a file to `public/products/` and set `ideahubImage`; until then the IdeaHub page shows an illustration.
5. **Form delivery.** Create a free Web3Forms key (enter info-ge@buz-cloud.com, the key arrives by email) and set it as `VITE_WEB3FORMS_KEY`. Requests then go only to that inbox. Without a key the form opens the visitor's email app. See `.env.example`.
6. **LinkedIn.** `site.social.linkedin` renders in the footer only when set.

The legal name, tax ID, founding date (20 September 2018), street address, the five countries, the Czech head office
and the client list come from the company profile (*საქმიანობის მოკლე აღწერილობა*). The profile's letterhead still
carries the retired BUZ Group branding; take facts from it, never branding.

## Site settings (build variables, all optional)

Set these in Cloudflare under Settings > Variables and Secrets (build variables), then redeploy.

| Variable | Effect |
| --- | --- |
| `VITE_WEB3FORMS_KEY` | form submissions delivered by email through Web3Forms |
| `VITE_FORM_ENDPOINT` | alternative to Web3Forms: any endpoint that accepts a JSON POST; add its domain to `connect-src` in `public/_headers` |
| `VITE_SITE_URL` | per-page canonical and hreflang links, og:url, og:image, `sitemap.xml` with all 16 addresses, sitemap line in `robots.txt` (e.g. `https://buztech.ge`) |
| `VITE_CF_ANALYTICS_TOKEN` | Cloudflare Web Analytics (cookie-free); the privacy text mentions it automatically |

The social preview image is `public/og-image.png` (1200x630). Privacy policy copy lives in `i18n/ge.ts` / `en.ts` under `privacy`;
it is its own page (`/privacy/`, `/en/privacy/`), linked from the footer and the form note. Have it reviewed before launch.
