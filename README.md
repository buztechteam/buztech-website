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
  index.css                  brand tokens (colours, fonts, weights), gradient, marquee/dialog CSS
  config/site.ts             contact details, tax ID, vendors, product list, ISO certificates (not translated)
  i18n/ge.ts, en.ts          all copy incl. street address and client list; ge.ts is the primary language,
                             types.ts keeps both in sync
  routes.ts                  the page list, addresses per language, page titles/descriptions
  App.tsx                    which sections each page shows
  components/                Header (+Products menu), PageIntro, ContactBand, Hero (+HeroStack), VendorMarquee,
                             Products, Services, Clients, Certifications (+dialog), Contact, Privacy, Footer,
                             BuzLogo (+buzLogoPaths), icons
  entry-server.tsx           renders one page to HTML at build time
scripts/prerender.mjs        writes dist/<page>/index.html for every page in both languages
```

Change a phone number or email in `config/site.ts`; change any wording in `i18n/ge.ts` / `en.ts`.

## Pages

Nine pages, each in Georgian at the root and in English under `/en/`:
`/`, `/licensing/`, `/servers/`, `/networking/`, `/workspaces/`, `/services/`, `/about/`, `/contact/`, `/privacy/`.
The language comes from the address (no browser storage), and the GE/EN switch links to the same page in the other language.

`npm run build` runs three steps: the normal client build, a server build of `entry-server.tsx`, then
`scripts/prerender.mjs`, which writes a complete HTML file per page and language (content, title, description,
`lang`), so every page loads with its content in place and search engines can read both languages.
To add a page: add its id to `PageId` (`i18n/types.ts`) and `pages` (`routes.ts`), give it a title in `pageMeta`,
and its body in `App.tsx`.

`npm run preview` serves the built site, which is the closest local check of what Cloudflare will serve.

## Deploying

Cloudflare Workers Builds runs `npm run build`, then `npx wrangler deploy`, which uploads `dist/` as static assets
using `wrangler.jsonc`. Keep that file: without it Wrangler auto-configures the project, adds the Cloudflare Vite
plugin and rebuilds, and the pre-render step then fails (`Cannot find module .../dist-ssr/entry-server.js`).

## How the brand rules are enforced

| Rule | Where |
| --- | --- |
| Palette only: Ink, Navy, Brand Teal, Deep Teal, Light | `@theme` in `index.css` resets Tailwind's palette, so off-brand colours cannot be used |
| Two weights only: 500 and 800 | `@theme` resets the weight scale; only `font-medium` and `font-extrabold` exist; only those four font files are loaded |
| Noto Sans Georgian for Georgian, Inter for Latin and numbers | font stack `Inter, Noto Sans Georgian`; Inter has no Georgian glyphs, so each script falls to the right face |
| One primary CTA: "მიიღეთ ფასი დღესვე" | `cta` in the dictionaries, used by every button; the retired wording does not exist in the code |
| Never "BUZ Group" / buzgroup.com | not present anywhere in `src/`, `index.html` or `public/` |
| Brand gradient on the hero with the all-white logo | `bg-brand-gradient` in `index.css` |
| Tagline `Consulting · Cloud · Tech` | `site.tagline`, shown in the header and footer |

Contrast notes: buttons are Brand Teal with Ink text (6.8:1). Deep Teal (4.1:1 on white) is used for icons,
borders and focus rings on light sections; body-size text stays Navy. The hero gradient's first stop is too light for
white text (2.2:1), so a Navy scrim fades across the text column.

## Before launch: items only you can supply

1. **Vendor logos.** The marquee shows typeset names because the vendor logo packs and co-branding rules are still an open item in the brand book. Swap in logos once received (`vendors` in `config/site.ts`).
2. **Client logos.** The clients section shows typeset names (`clients` in `i18n/ge.ts` / `en.ts`). Add logos once each client agrees.
3. **ISO certificate details.** Issuer, certificate number, validity and a scan are empty in `certs` (`config/site.ts`). Fill them in and they appear in each dialog automatically.
4. **Product photos.** Add files to `public/products/` and register them in `productImages`; until then the IdeaHub card shows an illustration.
5. **Form delivery.** Create a free Web3Forms key (enter info-ge@buz-cloud.com, the key arrives by email) and set it as `VITE_WEB3FORMS_KEY`. Requests then go only to that inbox. Without a key the form opens the visitor's email app. See `.env.example`.
6. **LinkedIn.** `site.social.linkedin` renders in the footer only when set.
7. **Back the "best prices" claim.** The brand tone rule says to show a price comparison before claiming "best". The hero uses the requested wording; consider adding the comparison.

The legal name, tax ID, founding date (20 September 2018), street address, the five countries, the Czech head office
and the client list come from the company profile (*საქმიანობის მოკლე აღწერილობა*). The profile's letterhead still
carries the retired BUZ Group branding; take facts from it, never branding.

## Site settings (build variables, all optional)

Set these in Cloudflare under Settings > Variables and Secrets (build variables), then redeploy.

| Variable | Effect |
| --- | --- |
| `VITE_WEB3FORMS_KEY` | form submissions delivered by email through Web3Forms |
| `VITE_SITE_URL` | per-page canonical and hreflang links, og:url, og:image, `sitemap.xml` with all 18 addresses, sitemap line in `robots.txt` (e.g. `https://buztech.ge`) |
| `VITE_CF_ANALYTICS_TOKEN` | Cloudflare Web Analytics (cookie-free); the privacy text mentions it automatically |

The social preview image is `public/og-image.png` (1200x630). Privacy policy copy lives in `i18n/ge.ts` / `en.ts` under `privacy`;
it is its own page (`/privacy/`, `/en/privacy/`), linked from the footer and the form note. Have it reviewed before launch.
