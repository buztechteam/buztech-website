# BUZ Tech website: motion, polish and security pass

Date: 2026-10-29 · Status: approved in conversation, ready for planning

## Intent and why

The site works and reads well, but it feels static: menus snap open, sections just sit there, and
each click to another page is a hard cut. The owner wants it to feel alive **without** feeling
flashy: "somewhere in between" the very lively syntaxacademy.ge and the very calm tbcbank.ge.

The owner will restructure the product pages later (there should not even be a separate Servers
page). So this pass improves the **shared building blocks** every page is made of, not individual
pages, and the polish carries over to whatever pages exist later. The copy is not part of this pass.

A short security pass rides along: the code is clean (no known-vulnerable dependencies, no secrets,
safe external links, no raw HTML), but the site sends no protective headers and the form fields
have no length limits.

## Goals

1. **Motion level "B+"** across all shared components (the owner picked it in a live demo).
   Everything a visitor points at responds softly. Content eases in once (on load at the top of a page,
   as you scroll further down), then everything rests. **Nothing loops.**
2. **Smooth page changes:** moving between pages cross-fades while the header stays in place.
3. **The hero never shows blank:** today its three layers start invisible and depend on an animation
   to appear (crawlers, link previews and background tabs can capture them empty).
4. **Security headers** on every response, **length limits** on the form fields, a **pinned
   Wrangler** version for deploys.
5. **A BUZ Tech design-system file** (a project skill) that records the brand tokens and these motion
   rules, so future work stays consistent.

## Non-goals

- Changing which pages exist, the navigation structure or any copy.
- New illustrations, product pictures or decorative artwork. Page tops stay text-only for now.
- Spam protection for the price form (Turnstile or similar). Deferred until the Web3Forms key is live,
  because it needs a small server-side check that is not worth adding before the form is switched on.
- Analytics, cookie banners, a CMS.

## Anti-goals (would be a failure even if it "works")

- Anything flashy: bounce, overshoot, 3D tilt, shimmer, floating, pulsing, particles, constant motion.
  The owner saw and rejected these levels ("C" and "B++").
- **Looking borrowed from a competitor.** Never use these signature effects:
  - syntaxacademy.ge: a typewriter headline with a blinking cursor, a floating pill-shaped nav bar,
    swaying 3D art, purple glows, graph-paper backgrounds
  - tbcbank.ge: a full-width rounded hero slideshow with arrows and dots
  - itconnect.ge: a dotted map of Georgia with glowing network nodes, a "50+ / 15+ / 7+" stats row
    directly under the hero button, floating particles
- **Decoration that looks cheap.** The owner judged quick SVG sketches as cheap; plain beats cheap.
- Content that is invisible until an animation or script runs. Pre-rendered HTML must show everything.
- Slower pages: no animation library, no large new download.

## Constraints

- **Stack:** React 19, Vite 8, Tailwind CSS 4, TypeScript. Pages are pre-rendered at build time
  (`scripts/prerender.mjs`) into `dist/` in Georgian (`/`) and English (`/en/`), then hydrated.
  Links are full page loads (multi-page site, no client router). Deployed by Cloudflare Workers
  Builds as static assets (`wrangler.jsonc`, `not_found_handling: "404-page"`).
- **Brand book (enforced in `src/index.css` `@theme`):** only Ink `#1c1c1e`, Navy `#112240`,
  Brand Teal `#4bb2bf`, Deep Teal `#12899b`, Light `#f3f8fb` and white; two font weights only
  (500, 800); Inter for Latin, Noto Sans Georgian for Georgian. Shadows may use these colours with
  transparency. Focus rings: Brand Teal on dark, Deep Teal on light (`.surface-light`), Navy on the
  teal band (`.surface-teal`).
- **Accessibility:** WCAG 2.2 AA. Keyboard and screen-reader behaviour must not regress (the Products
  menu is a disclosure with Esc/outside-click close; the certificate pop-up is a native `<dialog>`).
- **Reduced motion:** with `prefers-reduced-motion: reduce`, nothing moves; every element is in its
  final, visible state; hover feedback may change colour but not position.
- **Hydration:** pre-rendered markup and the first client render must match (no hydration warnings).
- **Georgian text** is long; motion must not cause layout shift or clipped words.

## Decided by the owner

### Motion level B+ (from the live demo, kept as the reference)

The demo the owner approved used these values. They are the target feel; the builder may tune them
by eye within the same character.

- **One easing everywhere:** a quick start with a soft settle, `cubic-bezier(.2, .9, .25, 1)`.
- **Hover/press:** 0.2–0.3 s. **Menus:** about 0.2 s. **Arrivals:** about 0.75 s, staggered about
  90 ms between siblings in a group.
- **Pointing at things:**
  - Cards lift about 5 px, gain a soft Navy shadow and a Deep Teal border; their icon tile turns
    Brand Teal with a Navy icon; the arrow (where present) slides about 7 px right.
  - Buttons lift about 2 px with a soft shadow; pressing scales them to about 0.97.
  - Header menu items get a Brand Teal underline that slides in from the left.
- **Menus:** the Products menu fades in while sliding down about 6 px; the phone menu opens with a
  short fade/slide instead of snapping.
- **Arriving:** on load, the top of each page (the home hero, or the intro band on inner pages)
  eases in: rises about 22 px with a touch of zoom (0.98 → 1) and fades in. Further down, sections
  and card groups do the same **once** as they scroll into view (about 30% visible).
- **Logo wings:** the home hero's wires keep drawing in once (as today).
- **Resting:** after arriving, nothing moves on its own. No loops anywhere.

### Also agreed

- **Same behaviour on every page**, including the intro band on inner pages.
- **Smooth page changes:** cross-fade between pages with the header staying put. Browsers that do
  not support it simply navigate as today.
- **Header shadow:** the sticky header gains a faint shadow once the page is scrolled.
- **Scope = shared components only:** header and its menus, buttons, all card types, the page intro
  band, the home hero, sections that reveal, the teal contact band, the footer, the phone
  quick-contact bar.
- **No new drawings or pictures.** A decoration only goes in if it looks premium.
- **Security:** protective headers, form length limits, pinned Wrangler. Spam protection later.
- **A BUZ Tech design-system file**, built from the brand, not from the competitor file.

## Where it applies (current components)

- `src/index.css`: tokens, keyframes, reduced-motion rules, page-transition CSS
- `src/components/ui.ts`: button recipes (hover lift, press)
- `Header.tsx`: underline on menu items, Products menu and phone menu motion, scroll shadow
- **Cards:**
  - `CategoryCards.tsx`
  - `CategoryExtras.tsx` (service cards, other-category cards)
  - `Services.tsx`
  - `Clients.tsx`
  - `Certifications.tsx`
  - `Products.tsx` (product cards, flagship panel, featured card)
  - `VendorMarquee.tsx` (partner tiles)
- **Arrival and reveal:**
  - `PageIntro.tsx` and `Hero.tsx` (arrival)
  - `HeroStack.tsx` (make the layers visible without the animation)
  - `TrustStrip.tsx`, `Services.tsx` steps, `ContactBand.tsx`, `Contact.tsx` (reveal)
- `QuickContactBar.tsx`, `Footer.tsx`: hover polish only; the footer and phone bar do not animate in
- `public/_headers` (new), `Contact.tsx` (field limits), `package.json` (pinned Wrangler)

Clients, Certifications, ISO and partner cards have no arrow; they get the lift/border treatment
only. Cards that are not links (service cards, client cards, partner tiles) get a quieter hover
(border colour only, no lift), so nothing suggests a click that does nothing.

## Security details

- **`public/_headers`** (Cloudflare Workers static assets apply it to every response):
  - `Content-Security-Policy` that allows exactly what the site uses:
    - scripts: self, and `https://static.cloudflareinsights.com` (only loaded when
      `VITE_CF_ANALYTICS_TOKEN` is set)
    - connections: self, `https://api.web3forms.com`, and `https://cloudflareinsights.com`
    - styles: self and `'unsafe-inline'` (React `style` attributes carry CSS variables)
    - fonts and images: self, plus `data:` for images
    - `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` turning off camera, microphone and geolocation
  - `X-Frame-Options: DENY` for older browsers
- If someone later sets `VITE_FORM_ENDPOINT` to another service, its origin must be added to the
  CSP: note this in `.env.example` and the README.
- **Form limits:** company about 120 characters, email 254, message about 2,000, enforced with
  `maxLength` and checked in the submit handler.
- **Pin Wrangler** as a devDependency at the version the deploys use today (4.154.0), so
  `npx wrangler deploy` uses it instead of downloading the newest on every build.
- `npm audit` stays at zero findings.

## Calls made while writing this up (not the owner's words; easy to change)

- **Hover effects only where hovering exists** (`@media (hover: hover)`), so phones do not get
  "stuck" lifted cards after a tap. Press feedback still applies on touch.
- **On the Contact page the form itself does not animate in**: only the intro band arrives and the
  "How we work" steps reveal, so the main action is usable at once.
- **CSP is verified on the live domain** after deploy: Cloudflare features such as email
  obfuscation or Rocket Loader can inject scripts that a strict policy would block. Adjust the
  policy, or switch the feature off, if the browser console reports a CSP violation.

## Left to the builder

- How reveals are triggered: an `IntersectionObserver` adding a class, CSS scroll-driven
  animations, or a mix. Hard requirement either way: progressive enhancement, so content is visible
  when scripts or the feature are unavailable, and server and client markup match.
- How page changes are done (expected: CSS cross-document view transitions) and which elements keep
  their position across pages.
- How the header shadow is detected (a small scroll listener or a scroll-driven animation).
- Exact timings and distances within the B+ character, the CSS organisation, and naming.
- Whether HSTS is sent from `_headers` or left to Cloudflare's domain settings (the custom domain is
  not set up yet).
- The design-system file's location and format (expected: a project skill under
  `.claude/skills/`). The two untracked `SKILL.md` files in the repo root and `Skills/` are a
  competitor's design tokens: do not use them, and do not commit them.

## Done means

- Every page, in both languages, on phone (375 px) and laptop (1280 px) widths:
  - no horizontal overflow and no console errors or hydration warnings
  - all internal links resolve (the link check over `dist/`)
- With reduced motion emulated, nothing moves and everything is visible.
- With JavaScript disabled, every pre-rendered page shows all its content.
- On the live site after deploy: the headers are present (checked with the browser's network panel or
  `curl -I`), and the site still loads fonts, the form still sends, and analytics (if enabled)
  still loads.
- The owner has looked at it in the preview and says it feels like B+.
