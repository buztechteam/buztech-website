---
name: buz-tech-design
description: "Use when changing the BUZ Tech website's look, layout or motion: brand tokens, the B+ motion rules, component recipes, competitor look-alikes to avoid, and a QA checklist."
---

# BUZ Tech design system

The rules behind the BUZ Tech (LLC BUZ Tech Georgia) website. Built from this repository and the
brand book only. The `SKILL.md` and `Skills/` folder in the repo root are another company's design
tokens: never read from them, never commit them.

Georgian is the main language (`/`), English lives under `/en/`. Pages are pre-rendered to static
HTML, then hydrated; links are full page loads.

## Working with Impeccable

The Impeccable plugin (`/impeccable …`) is installed for this project only. Use it for design judgement:
- `critique` and `audit` for reviews
- `polish`, `clarify` and `adapt` to finish a page
- `layout` and `typeset` for structure

**This skill wins whenever the two disagree.** Impeccable's suggestions are applied inside these rules, never over them:

- **Palette:** only the six tokens below.
- **Weights:** only 500 and 800.
- **Fonts:** only Inter and Noto Sans Georgian.
- **Motion:** stays B+. Use `ease-soft`, the durations below, and no loops. That applies to every command:
  - `animate`, `delight`, `bolder`, `colorize` and `overdrive` must not add bounce, glow, loops, new colours or decoration.
  - If one of them asks for those, say no and do the closest on-brand thing.
- **Copy:** one CTA wording, and Georgian first.
- **Telemetry:** off for this project, in `.impeccable/config.json`.
- **`/impeccable init` and `document`:** when they write `PRODUCT.md` / `DESIGN.md`, take the brand, audience and rules from this file and the README, not from guesses. BUZ Tech is a B2B IT seller in Georgia: Microsoft licensing, servers, networks and interactive workspaces. Its buyers are companies, and the site's job is to win price requests.

## Brand tokens

Enforced in `src/index.css` `@theme`, which resets Tailwind's palette and weights, so off-brand values
simply don't exist.

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#1c1c1e` | dark sections, text on Brand Teal |
| `navy` | `#112240` | body text on light sections, dark cards, shadows |
| `brand-teal` | `#4bb2bf` | buttons, accents and icons on dark |
| `deep-teal` | `#12899b` | borders, icons, focus rings on light (not body text) |
| `light` | `#f3f8fb` | light sections, text on dark |
| `white` | `#ffffff` | cards on light sections |

- Colours may carry transparency (`text-light/80`, `shadow-navy/15`). Nothing else.
- **Two weights only:** `font-medium` (500) and `font-extrabold` (800).
- **Fonts:** Inter for Latin and numbers, Noto Sans Georgian for Georgian. Inter has no Georgian
  glyphs, so the stack `Inter, Noto Sans Georgian` picks the right face per script.
- **Brand gradient** (`bg-brand-gradient`) is for the hero with the all-white logo only.
- **Focus rings** are 3px with a 3px offset. Brand Teal on dark (default), Deep Teal on light
  sections (`surface-light`), Navy on the teal band (`surface-teal`). Put the surface class on the
  section.
- **Copy rules:** one CTA wording, `t.cta` ("მიიღეთ ფასი დღესვე"). The name is "BUZ Tech", never
  "BUZ Group".

## Motion: "B+"

The owner chose this level: livelier than a bank site, calmer than a course site. Everything a
visitor points at responds, content eases in once, then everything rests. **Nothing loops.**

- **One easing:** `ease-soft` = `cubic-bezier(.2, .9, .25, 1)` (in `@theme`).
- **Durations** (`:root` in `index.css`):
  - `--dur-hover: 250ms` for hover and press
  - `--dur-menu: 200ms` for menus
  - `--dur-arrive: 750ms` for arrivals and reveals
  - `--stagger: 90ms` between siblings
- **Arrive and reveal:** rise 22px, scale .98 → 1, fade in (`@keyframes arrive`).
- **Hover:**
  - Link cards lift 5px with a Navy shadow. The icon tile turns Brand Teal with a Navy icon. The arrow slides 7px.
  - Buttons lift 2px; pressing scales them to .97.
  - Nav links get a Brand Teal underline that grows from the left.
  - Cards that aren't links change border colour only.
- **Menus** fade and slide about 6px.
- **Page changes** cross-fade, while the header and the phone bar stay in place.
- **Never:** bounce, overshoot, 3D tilt, shimmer, floating, pulsing, particles, constant motion.

### Where the gates live (content must never depend on motion to be visible)

- **`motion` class on `<html>`:** added by the inline script at the top of `index.html`, before first paint, only for a visible tab with motion allowed. It gates arrivals and the hero stack animation. The script is allowed by its hash in `public/_headers`: if you edit it, update the hash (`npm test` fails until it matches).
- **`reveal-ready` class:** added by `initReveal()` (`src/motion/reveal.ts`, called once in `App`). It first marks everything on screen with `data-in`, so nothing visible blinks. It gates the hidden state of scroll reveals.
- **No class at all** (pre-rendered HTML, no JavaScript, reduced motion) means everything is visible and still.
- **Movement:** every hover movement uses `motion-safe:`. Tailwind's `hover:` already applies only on devices that can hover, so taps never leave a card "stuck" lifted.

## Recipes: what to use for what

| Element | Use |
| --- | --- |
| Top of a page (hero text, `PageIntro` parts) | `{...arriveProps(i)}` with i = position (0, 1, 2…) |
| Section heading, lead, card, tile below the top | `{...revealProps(i)}`, i = position in its group (capped at 5) |
| Any button or button-like link | `btn(variant, size)` from `ui.ts` |
| Card that is a link (needs `group` and a stretched link) | `cardLink` on the card + its own hover border (`hover:border-deep-teal` on light, `hover:border-brand-teal` on Navy); `cardIcon` on the icon tile; `cardArrow` on the arrow |
| Card that is not a link, light surface | `cardStatic` |
| Card that is not a link, dark surface | `cardStaticDark` |
| Header menus | stay in the DOM, close with `data-open="false"` (`menuMotion` in `Header.tsx`), never `hidden` |
| Section headings | `h2Class`, `leadClass` |

- Don't animate the footer, the phone quick-contact bar or the Contact form: they must be usable at once.
- A reveal plays an animation, not a transition, so a card's own hover transitions keep working.
  Don't add a `transition` to `[data-reveal]`.

## Anti-patterns

- **Looking borrowed from a competitor.** Never use:
  - syntaxacademy.ge's typewriter headline with a blinking cursor, floating pill-shaped nav,
    swaying 3D art, purple glows, graph-paper backgrounds
  - tbcbank.ge's full-width rounded hero slideshow with arrows and dots
  - itconnect.ge's dotted map of Georgia with glowing nodes, a "50+ / 15+ / 7+" stats row under
    the hero button, floating particles
- **Plain beats cheap.** The owner rejected quick SVG sketches. Add a picture or decoration only if it
  looks premium; otherwise leave the space clean.
- **No loops, no animation library,** no large new download.

## Accessibility (WCAG 2.2 AA)

- **Contrast:** Brand Teal buttons carry Ink text (6.8:1). Body text on light sections is Navy; Deep Teal is for icons, borders and focus rings, not body text.
- **Reduced motion** (`prefers-reduced-motion: reduce`): nothing moves, everything is in its final visible state, and hover may change colour only.
- **Keyboard:**
  - A closed menu's links are out of the tab order (`invisible`).
  - The Products menu closes on Esc (focus returns to its button), on an outside click and on blur.
  - The certificate pop-up is a native `<dialog>`.
- **Hydration:** server markup must equal the first client render. Anything that depends on the browser (scroll position, matchMedia) goes in an effect, starting from the same value as on the server.
- **Georgian words are long:** check that nothing is clipped or broken mid-word at 375px.

## QA checklist

1. `npm test` passes. It builds the site, then checks `dist/` for:
   - pages, h1s and links
   - motion gating
   - lift rules gated by hover and motion
   - security headers and the CSP hash
   - form limits
2. Every page in both languages, at 375px and 1280px:
   - no horizontal overflow
   - one h1
   - no console errors or hydration warnings
   - the phone bar everywhere except Contact
3. Scroll to the bottom of `/`, `/about/` and `/services/`: no element is left at opacity 0. Back to a scrolled page: content is visible.
4. With reduced motion emulated, nothing moves and everything is visible.
5. With JavaScript off, every page shows all its content (no `motion`, `reveal-ready` or `data-in` in the HTML).
6. Keyboard: Tab skips closed menus; Enter opens the Products menu; Esc closes it.
7. After a deploy:
   - the security headers are present (`curl -I`)
   - no CSP violations in the console
   - fonts load, the form still sends, and analytics loads if it's enabled
