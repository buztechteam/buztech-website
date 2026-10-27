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
  config/site.ts             contact details, vendors, product list, ISO certificates (not translated)
  i18n/ge.ts, en.ts          all copy; ge.ts is the primary language, types.ts keeps both in sync
  components/                Header, Hero (+HeroStack), VendorMarquee, Products, Services,
                             Certifications (+dialog), Contact, Footer, Logo, icons
```

Change a phone number or email in `config/site.ts`; change any wording in `i18n/ge.ts` / `en.ts`.

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

1. **Master logo files.** `components/Logo.tsx` is a rebuilt approximation (the brand book says the same of its own wordmark). The book defines primary, icon and vertical lockups; the horizontal lockup in the header is derived from them. Replace the component with the master SVGs.
2. **Vendor logos.** The marquee shows typeset names because the vendor logo packs and co-branding rules are still an open item in the brand book. Swap in logos once received (`vendors` in `config/site.ts`).
3. **ISO certificate details.** Issuer, certificate number, validity and a scan are empty in `certs` (`config/site.ts`). Fill them in and they appear in each dialog automatically.
4. **Product photos.** Add files to `public/products/` and register them in `productImages`; until then the IdeaHub card shows an illustration.
5. **Form delivery.** Set `VITE_FORM_ENDPOINT` (see `.env.example`) to POST requests to Formspree or your own API. Without it, the form opens the visitor's email app addressed to info-ge@buz-cloud.com.
6. **Optional footer items.** `site.social.linkedin` and `site.taxId` render only when set.
7. **Back the "best prices" claim.** The brand tone rule says to show a price comparison before claiming "best". The hero uses the requested wording; consider adding the comparison.
8. **Confirm the facts in the Services block:** 2018, 5 countries and 3 ISO standards come from the company brief and your request.
