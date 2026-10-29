# Motion, Polish and Security Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every shared building block the approved "B+" motion (soft hover responses, one-time arrivals and scroll reveals, smooth page changes, nothing looping) and harden the site (security headers, form limits, pinned Wrangler) without changing pages or copy.

**Architecture:** Motion is CSS-first. Two classes on `<html>` gate it so that content is visible whenever motion cannot run:
- `motion` is set by a tiny inline head script, before first paint, only when the tab is visible and the visitor allows motion. It gates on-load arrivals.
- `reveal-ready` is set by a small client module after hydration, which first marks anything already on screen as shown. It gates scroll reveals.

Pre-rendered HTML never carries either class, so without JavaScript every page is fully visible. Page changes use CSS cross-document view transitions. Interaction styles live as Tailwind class recipes in `src/components/ui.ts`.

**Tech Stack:** React 19, Vite 8, Tailwind CSS 4, TypeScript, pre-render to static HTML, Cloudflare Workers static assets. Tests use Node 24's built-in `node:test` against the built `dist/`, with no new test dependencies.

**Spec:** `docs/superpowers/specs/2026-10-29-motion-polish-security-design.md`

## Global Constraints

- One easing everywhere: `cubic-bezier(.2, .9, .25, 1)`.
- Durations: hover/press 0.2–0.3 s; menus about 0.2 s; arrivals about 0.75 s, staggered about 90 ms between siblings.
- Arrival: rise about 22 px, scale 0.98 → 1, fade in. Reveal when about 30% visible. Once only. **Nothing loops.**
- Hover: link cards lift about 5 px, Navy shadow, Deep Teal border, icon tile Brand Teal with a Navy icon, arrow about 7 px right. Buttons lift about 2 px with a shadow, press about 0.97. Menu items get a Brand Teal underline sliding in from the left. Non-link cards: border colour only, no lift.
- Palette only Ink `#1c1c1e`, Navy `#112240`, Brand Teal `#4bb2bf`, Deep Teal `#12899b`, Light `#f3f8fb`, white (with transparency). Font weights 500 and 800 only.
- `prefers-reduced-motion: reduce`: nothing moves, everything visible, hover may change colour only.
- Content never depends on an animation or script to become visible. Pre-rendered markup must equal the first client render (no hydration warnings).
- No bounce, overshoot, 3D tilt, shimmer, floating, pulsing, particles. No typewriter headline, pill-shaped floating nav, purple glow, graph-paper background, hero slideshow, Georgia dot map, or stats row under the hero button.
- No new drawings or pictures. No animation library. No change to pages, navigation structure or copy.
- Do not use or commit `SKILL.md` or `Skills/` in the repo root (a competitor's design tokens).

## Review Focus

1. **Jumping to a section** (hero "Browse products" → `#products`, or a deep link): content must be visible on arrival, even for elements taller than the viewport. **Owned by Task 3:** a browser check of `/#products`.
2. **A page opened in a background tab:** no arrival animation, and the hero layers are fully visible when the tab is first viewed. **Owned by Task 2:** a background-tab browser check.
3. **Keyboard users with the Products menu closed:** Tab must skip the menu's hidden links, and open menus must stay operable with Esc. **Owned by Task 5:** a keyboard check.
4. **Touch phones:** a tap must not leave a card stuck lifted. **Owned by Task 4:** a test that the built CSS wraps lift rules in `@media (hover:hover)`.
5. **Back/forward navigation:** restored pages must show their content, not reset reveal states to hidden. **Owned by Task 3:** a back-navigation browser check.

---

## File map

| File | Responsibility |
|---|---|
| `tests/site.test.mjs` (new) | Assertions over the built `dist/`: pages, links, CSS rules, headers, form limits |
| `index.html` | Inline motion-gate script in `<head>` |
| `src/index.css` | Motion tokens, `arrive` keyframes, reveal states, view-transition rules, reduced-motion overrides |
| `src/motion/reveal.ts` (new) | `revealProps()`, `arriveProps()`, `initReveal()` |
| `src/components/ui.ts` | Button recipe + card recipes |
| `src/components/Header.tsx` | Underline, animated Products and phone menus, scroll shadow |
| `src/components/*` (cards, sections) | Apply recipes, `arriveProps`, `revealProps` |
| `public/_headers` (new) | Security headers incl. CSP with the gate script's hash |
| `src/components/Contact.tsx` | `maxLength` and submit-time length check |
| `package.json` | `test` script, pinned `wrangler` |
| `.claude/skills/buz-tech-design/SKILL.md` (new) | BUZ Tech design-system skill |

---

### Task 1: Test harness over the built site

**Files:**
- Create: `tests/site.test.mjs`
- Modify: `package.json` (scripts)

**Interfaces:**
- Produces:
  - `npm test` builds, then runs `node --test "tests/**/*.test.mjs"`.
  - Helpers exported for later tasks' tests: `pages(): string[]` (absolute paths of every `dist/**/*.html`), `html(rel: string): string` (contents of `dist/<rel>`), `css(): string` (the built CSS bundle text).

- [ ] **Step 1: Write the tests**

  `test('every built page has exactly one h1')`: for each of the 20 pages, assert the count of `<h1` is 1.

  `test('internal links resolve')`: port the existing link check. For every `href`/`src` starting with `/` or `#`, assert the target file exists (`/x/` → `dist/x/index.html`, ignoring `?query`), and assert every `#anchor` matches an `id` on the same page. Expected count: 0 broken.

  `test('20 pages are built')`: assert `pages().length === 20`.

- [ ] **Step 2: Add `"test": "npm run build && node --test \"tests/**/*.test.mjs\""` to `package.json`**

- [ ] **Step 3: Run `npm test`.** Expected: PASS, 3 tests.

- [ ] **Step 4: Commit:** `git add tests/site.test.mjs package.json && git commit -m "Add build-level tests"`

---

### Task 2: Motion foundation and the robust hero

**Files:**
- Modify: `index.html` (head), `src/index.css`, `src/components/HeroStack.tsx`, `tests/site.test.mjs`

**Interfaces:**
- Produces:
  - `<html>` gets class `motion` from the head script when allowed.
  - CSS custom properties `--ease-soft`, `--dur-hover: 250ms`, `--dur-menu: 200ms`, `--dur-arrive: 750ms`, `--stagger: 90ms`, and the Tailwind utility `ease-soft` (from `@theme --ease-soft`).
  - The CSS contract `.motion [data-arrive] { animation: arrive var(--dur-arrive) var(--ease-soft) both; animation-delay: calc(var(--i, 0) * var(--stagger)); }`.
  - `@keyframes arrive`: from `opacity: 0; transform: translateY(22px) scale(.98)`, to none.

- [ ] **Step 1: Write failing tests**

  `test('pre-rendered pages carry the motion gate but never the motion class')`: every page's `<head>` contains the exact gate script (below), and no page contains `class="motion` on `<html>`.

  `test('arrivals only run under .motion')`: `css()` matches `/\.motion \[data-arrive\]/` and `/@keyframes arrive/`. It matches `/\.motion \.slab\s*\{[^}]*animation/`. It does **not** match `/(^|[}\s,])\.slab\s*\{[^}]*animation/`, i.e. no un-gated slab animation. The same two checks apply for `.wire`. (The CSS is minified: keep regexes whitespace-tolerant.)

  `test('reduced motion and page transitions are declared')`: `css()` matches `/@view-transition\s*\{\s*navigation:\s*auto/`, and inside a `@media (prefers-reduced-motion:\s*reduce)` block it matches `navigation:\s*none`.

- [ ] **Step 2: Run `npm test`.** Expected: the 3 new tests FAIL.

- [ ] **Step 3: Add the gate script as the first child of `<head>` in `index.html`** (exact text; Task 6 hashes it):

  ```html
  <script>if(document.visibilityState==='visible'&&matchMedia('(prefers-reduced-motion: no-preference)').matches)document.documentElement.classList.add('motion')</script>
  ```

- [ ] **Step 4: Update `src/index.css`.**
  - Add the tokens above (put `--ease-soft` in `@theme`).
  - Add `@keyframes arrive` and the `.motion [data-arrive]` rule.
  - Move the existing `.slab` and `.wire` animations under `.motion` (keep their keyframes and delays), so without the class the hero stack renders final and visible.
  - Add `@view-transition { navigation: auto; }` and give the header `view-transition-name: site-header` and the phone bar `view-transition-name: quick-bar` (via a class or utility).
  - Make `::view-transition-old(root), ::view-transition-new(root)` last 300 ms with `var(--ease-soft)`.
  - Under `@media (prefers-reduced-motion: reduce)`: `@view-transition { navigation: none; }`.

- [ ] **Step 5: Run `npm test`.** Expected: PASS (all tests).

- [ ] **Step 6: Background-tab check (Review Focus 2).**
  1. `npm run preview`.
  2. Open `http://localhost:4173/` in a tab created in the background.
  3. Front it, then run `document.documentElement.classList.contains('motion')`. Expected: `false`.
  4. Run `[...document.querySelectorAll('.slab')].map(e => getComputedStyle(e).opacity)`. Expected: `['1','1','1']`.

- [ ] **Step 7: Commit:** `git add index.html src/index.css src/components/HeroStack.tsx tests/site.test.mjs && git commit -m "Motion foundation: gated arrivals, page transitions, visible-by-default hero"`

---

### Task 3: Arrivals and scroll reveals across the site

**Files:**
- Create: `src/motion/reveal.ts`
- Modify:
  - `src/App.tsx` (start reveals after hydration)
  - `src/index.css` (reveal states)
  - `src/components/Hero.tsx`, `PageIntro.tsx` (arrivals)
  - `CategoryCards.tsx`, `TrustStrip.tsx`, `Services.tsx` (`Services`, `Steps`), `CategoryExtras.tsx`, `Products.tsx` (`CategoryPanel` children), `Clients.tsx`, `VendorMarquee.tsx` (`PartnerGrid`), `Certifications.tsx`, `ContactBand.tsx`, `Privacy.tsx` (reveals)
  - `tests/site.test.mjs`

**Interfaces:**
- Consumes: `.motion`, `--ease-soft`, `--dur-arrive`, `--stagger`, `@keyframes arrive` (Task 2).
- Produces, in `src/motion/reveal.ts`:
  - `arriveProps(index = 0): { 'data-arrive': ''; style: CSSProperties }`. The style sets `--i`.
  - `revealProps(index = 0): { 'data-reveal': ''; style: CSSProperties }`. The style sets `--i`.
  - `initReveal(): () => void`. It returns a cleanup function, and does nothing (returns a no-op) when reduced motion is requested or `IntersectionObserver` is missing.
- CSS contract:
  - `.reveal-ready [data-reveal]:not([data-in])` is hidden: opacity 0, `translateY(22px) scale(.98)`.
  - `[data-reveal]` transitions opacity and transform over `var(--dur-arrive)` `var(--ease-soft)`, with delay `calc(var(--i, 0) * var(--stagger))`.

- [ ] **Step 1: Write failing tests**

  `test('every page has an arrival at its top')`: all 20 pages, including both `404.html` files (they use `PageIntro`), contain at least 1 `data-arrive`.

  `test('content below the top can reveal')`: `index.html` (home) has at least 8 `data-reveal` attributes. `contact/index.html` has 0 `data-reveal` inside `<form`.

  `test('no reveal state is baked into HTML')`: no page contains `data-in` or `reveal-ready`.

  `test('reveal hidden state is gated')`: `css()` contains `.reveal-ready [data-reveal]:not([data-in])`.

- [ ] **Step 2: Run `npm test`.** Expected: the 4 new tests FAIL.

- [ ] **Step 3: Implement `src/motion/reveal.ts`.**

  `initReveal()` must do these in order:
  1. Mark every `[data-reveal]` already in the viewport as `data-in`, synchronously.
  2. Only then add `reveal-ready` to `<html>`.
  3. Observe the rest with `IntersectionObserver`, `rootMargin: '0px 0px -15% 0px'`, `threshold: 0`. On intersect, set `data-in` and unobserve. This makes elements taller than the screen still reveal (Review Focus 1).

- [ ] **Step 4: Call `initReveal()` once in a `useEffect` in `App`** (runs after hydration; return its cleanup).

- [ ] **Step 5: Apply the props.**
  - **`arriveProps`:** the Hero text column items (h1, lead, points, buttons; indexes 0–3), and the PageIntro breadcrumb, h1, lead, chips and children (indexes 0–4).
  - **`revealProps`:** each section heading and each card or tile in the listed sections, indexed by position in its group (cap the index at 5 so long lists do not wait).
  - **No reveals on:** the footer, the phone bar, or the Contact form.

- [ ] **Step 6: Run `npm test`.** Expected: PASS.

- [ ] **Step 7: Browser checks (Review Focus 1 and 5).** With `npm run preview`:
  - `/#products` → within 1 s, every card in `#products` has `data-in` and computed opacity `1`.
  - On `/about/`, scroll to the bottom, click "მთავარი", then go back → content on `/about/` is visible, with no element stuck at opacity `0`.
  - Every page shows no console errors or hydration warnings.

- [ ] **Step 8: Commit:** `git add src tests && git commit -m "Arrivals and scroll reveals on shared sections"`

---

### Task 4: Buttons and cards respond softly

**Files:**
- Modify:
  - `src/components/ui.ts`
  - `Footer.tsx`, `QuickContactBar.tsx` (colour-only hover polish)
  - `CategoryCards.tsx`, `CategoryExtras.tsx` (link cards)
  - `Products.tsx`, `Services.tsx`, `Clients.tsx`, `Certifications.tsx`, `VendorMarquee.tsx`, `CategoryExtras.tsx` (`CategoryServices`) (static cards)
  - `tests/site.test.mjs`

**Interfaces:**
- Produces, in `ui.ts`:
  - `btn(variant, size)` (same signature) now includes the hover lift and press.
  - Recipes for link cards (the card element needs `group`):
    - `cardLink`: lift, shadow and Deep Teal border on hover
    - `cardIcon`: Brand Teal tile with Navy icon on `group-hover`
    - `cardArrow`: translate about 7 px on `group-hover`
  - Recipes for static (non-link) cards:
    - `cardStatic`: border to Deep Teal on hover, light surfaces
    - `cardStaticDark`: border to `white/30` on hover, dark surfaces
  - All movement uses `motion-safe:` so reduced motion keeps colour changes only.

- [ ] **Step 1: Write a failing test**

  `test('lift effects only apply on hover-capable devices and with motion allowed')`:
  - find every occurrence of `:hover{` whose rule body sets `--tw-translate-y` (how Tailwind 4 emits `hover:-translate-y-*`)
  - assert there is at least one such occurrence
  - for each, assert the 400 characters before it contain both `hover:hover` and `prefers-reduced-motion:no-preference`, i.e. the rule sits inside both media wrappers

- [ ] **Step 2: Run `npm test`.** Expected: FAIL.

- [ ] **Step 3: Implement the recipes and apply them.**
  - **Link cards** (`CategoryCards` cards, `OtherCategories` cards) get `cardLink`; their icon tile gets `cardIcon` and the arrow `cardArrow`. Replace the existing hover classes.
  - **Every other card or tile** gets `cardStatic` or `cardStaticDark` by surface.
  - Keep the existing `has-[a:focus-visible]` outline on link cards.
  - **Footer social icons and phone-bar icon buttons:** colour transitions only, with `ease-soft` and `--dur-hover` (spec: hover polish only, no movement in the footer or phone bar).

- [ ] **Step 4: Run `npm test`.** Expected: PASS.

- [ ] **Step 5: Browser check.** At laptop width, hovering a home category card moves it about 5 px up (`getComputedStyle(card).transform` shows a y-translate of about -5) and turns its icon tile Brand Teal. At phone width (touch emulation), tapping a card navigates without a lifted state lingering on the previous page.

- [ ] **Step 6: Commit:** `git add src tests && git commit -m "Soft hover and press on buttons and cards"`

---

### Task 5: Header: underline, animated menus, scroll shadow

**Files:**
- Modify: `src/components/Header.tsx`, `tests/site.test.mjs`

**Interfaces:**
- Consumes: `--ease-soft`, `--dur-menu` (Task 2).
- Produces:
  - `useScrolled(threshold = 8): boolean` in `Header.tsx`. It starts `false` (same on server and client) and updates from a passive scroll listener.
  - `<header data-scrolled>` drives a faint shadow.

- [ ] **Step 1: Write failing tests**

  `test('menus are always rendered, closed by visibility')`: in every page's header HTML, `#products-menu` and `#mobile-nav` exist without a `hidden` attribute and carry `data-open="false"`.

  `test('header can show a shadow')`: `css()` matches `/\[data-scrolled=true\][^{]*\{[^}]*box-shadow/`. This is the Tailwind `data-[scrolled=true]:shadow-…` rule on the header.

- [ ] **Step 2: Run `npm test`.** Expected: FAIL.

- [ ] **Step 3: Implement.**
  - **Underline:** nav links use a scale-x underline (`origin-left`, `scale-x-0`) that grows on hover and stays full for `aria-current=page` / `data-active=true`.
  - **Products menu:** stays in the DOM; closed = `invisible opacity-0 -translate-y-1.5`, open = visible, opacity 1, translate 0. It transitions opacity, transform and visibility over `--dur-menu` with `ease-soft`.
  - **Phone menu:** same open/closed pattern with a short fade/slide.
  - **Shadow:** `useScrolled` sets `data-scrolled`.
  - **Keep:** existing Esc / outside-click / blur-close behaviour and `aria-expanded`.

- [ ] **Step 4: Run `npm test`.** Expected: PASS.

- [ ] **Step 5: Keyboard check (Review Focus 3).** On `/`, Tab from the logo with the Products menu closed: focus goes logo → Products button → სერვისები, never into a menu link. Open it with Enter: Tab enters the menu. Esc closes it and returns focus to the button.

- [ ] **Step 6: Commit:** `git add src tests && git commit -m "Header: sliding underline, animated menus, scroll shadow"`

---

### Task 6: Security hardening

**Files:**
- Create: `public/_headers`
- Modify: `src/components/Contact.tsx`, `package.json` (+ `package-lock.json`), `.env.example`, `README.md`, `tests/site.test.mjs`

**Interfaces:**
- Consumes: the exact gate script text (Task 2).
- Produces: `dist/_headers` applied by Cloudflare to every response. Contact limits: `MAX_COMPANY = 120`, `MAX_EMAIL = 254`, `MAX_MESSAGE = 2000` (module constants in `Contact.tsx`).

- [ ] **Step 1: Write failing tests**

  `test('security headers are published')`: `dist/_headers` exists. Its `/*` block contains:
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `X-Frame-Options: DENY`
  - a `Permissions-Policy` with `camera=()`, `microphone=()`, `geolocation=()`
  - a `Content-Security-Policy` including `default-src 'self'`, `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `https://api.web3forms.com`, `https://static.cloudflareinsights.com`, `https://cloudflareinsights.com`

  `test('CSP allows exactly the inline gate script')`: compute `sha256` (base64) of the gate script's text as it appears in `dist/index.html`. Assert the CSP contains `'sha256-<that>'`. Assert no page has any other inline executable `<script>` (JSON-LD `type="application/ld+json"` is exempt).

  `test('form fields are length-limited')`: `contact/index.html` has `maxlength="120"` on `#company`, `maxlength="254"` on `#email`, `maxlength="2000"` on `#message`.

  `test('wrangler is pinned')`: `package.json` `devDependencies.wrangler === "4.154.0"`.

- [ ] **Step 2: Run `npm test`.** Expected: the 4 new tests FAIL.

- [ ] **Step 3: Implement.**
  - **`public/_headers`:** a `/*` block with the headers above. The CSP:
    - `script-src 'self' 'sha256-…' https://static.cloudflareinsights.com`
    - `connect-src 'self' https://api.web3forms.com https://cloudflareinsights.com`
    - `style-src 'self' 'unsafe-inline'`
    - `img-src 'self' data:`
    - `font-src 'self'`
    - plus the directives in the test
  - **No HSTS:** omit it (the custom domain is not set up yet; set it in Cloudflare later).
  - **Contact fields:** add `maxLength` to the three fields. In the submit handler, reject over-long values with the existing `required` style error.
  - **Wrangler:** `npm install --save-dev --save-exact wrangler@4.154.0`.
  - **Docs:** in `.env.example` and the README, note that a `VITE_FORM_ENDPOINT` on another domain must be added to `connect-src` in `public/_headers`.

- [ ] **Step 4: Run `npm test`.** Expected: PASS. Then run `npm audit`. Expected: 0 vulnerabilities (if Wrangler's dependencies report any, record them in the commit message and the hand-off).

- [ ] **Step 5: Commit:** `git add public/_headers src package.json package-lock.json .env.example README.md tests && git commit -m "Security headers, form length limits, pinned Wrangler"`

---

### Task 7: BUZ Tech design-system skill

**Files:**
- Create: `.claude/skills/buz-tech-design/SKILL.md`

**Interfaces:**
- Consumes: tokens and recipe names from Tasks 2–5 (`ease-soft`, `--dur-*`, `arriveProps`, `revealProps`, `btn`, `cardLink`, `cardIcon`, `cardArrow`, `cardStatic`, `cardStaticDark`).

- [ ] **Step 1: Write the skill.**
  - **Frontmatter:** `name: buz-tech-design`; `description:` "Use when changing the BUZ Tech website's look, layout or motion: brand tokens, the B+ motion rules, component recipes, competitor look-alikes to avoid, and a QA checklist."
  - **Body sections:**
    - Brand tokens: palette, the two weights, fonts, focus rings by surface
    - Motion B+: the Global Constraints above, plus where the gates live
    - Recipes: which helper to use for which element
    - Anti-patterns: the competitor list, "plain beats cheap", no loops
    - Accessibility: WCAG 2.2 AA, reduced motion, keyboard
    - QA checklist: the Task 8 checks
  - **Source of truth:** from this repo only, never from the root `SKILL.md`.

- [ ] **Step 2: Verify the skill.** The file parses as YAML frontmatter plus Markdown (`head -4` shows the `---` block), and every helper name it cites exists (`grep` each in `src/`).

- [ ] **Step 3: Commit:** `git add .claude/skills/buz-tech-design/SKILL.md && git commit -m "Add BUZ Tech design-system skill"`

---

### Task 8: Whole-site verification, deploy, live check

**Files:** none (verification); fixes go back to the owning task's files.

- [ ] **Step 1: Run `npm test`.** Expected: PASS, all tests.

- [ ] **Step 2: Browser sweep with `npm run preview`.** For all 20 pages (iframe sweep at 375 and 1280 px):
  - no horizontal overflow
  - exactly 1 h1
  - no console errors
  - the phone bar is present everywhere except Contact

  Plus a scroll pass on `/`, `/about/` and `/services/`: after scrolling to the bottom, no element has computed opacity `0`.

- [ ] **Step 3: JavaScript-off check.** Fetch each built page's HTML and confirm it contains no `motion`, `reveal-ready` or `data-in`. With scripting disabled, everything shows, because the hidden states need those classes.

- [ ] **Step 4: Owner look.** Ask the owner to try the preview and confirm it feels like B+.

- [ ] **Step 5: Push and live checks.** Push only on the owner's go-ahead. Then confirm the Cloudflare build is Ready and check the live site:
  - `curl -I <live URL>` shows the security headers
  - the browser console shows no CSP violations on `/` and `/contact/`
  - fonts load
  - the hero animates on a fresh, visible load

  If a CSP violation names a Cloudflare-injected script, adjust `public/_headers` or disable that Cloudflare feature, per the spec.
