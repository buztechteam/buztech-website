# BUZ Tech restructure: confirmed brief

Date: 2026-10-30 · Status: confirmed by the owner ("Yes, build it")

Inputs:
- `PRODUCT.md`: the product truth, binding.
- The Impeccable critique snapshot in `.impeccable/critique/`: audit 16/20, design 22/32.
- `.claude/skills/buz-tech-design/SKILL.md`: the brand world, which wins over generic advice.

This is a restructure inside the existing visual world, not a redesign.

## 1. Job and audience
- **Who arrives:** IT managers, SMB owners and directors, and procurement or tender teams in Georgia. They come looking for Microsoft licences.
- **What they need:** to trust BUZ Tech fast, and to request a price with no effort.
- **Mode:** Persuade.

## 2. Outcome and proof
- **The one action on every page:** "მიიღეთ ფასი" / "Get a price", by form, phone or WhatsApp.
- **Proof** (real and approved only):
  - Microsoft CSP partner
  - named clients, including the public sector
  - ISO, with "Details" hidden until the data exists
- **What every order includes:**
  - a VAT invoice in GEL from LLC BUZ Tech Georgia
  - company documents and ISO certificates, ready for tenders and supplier files
  - renewal reminders
  - support after the sale ("friends after they buy")
- **Price promise (test, reversible):** "Send us any Microsoft 365 quote — we'll beat it."

## 3. Direction
Keep the BUZ look and the B+ motion. The structural idea: **Microsoft first, everything else on request.**

## 4. Pages (7 per language, plus Privacy and 404)

### Home
- **Hero:** the best Microsoft 365 prices in Georgia, plus beat-any-quote.
  - main CTA "მიიღეთ ფასი"
  - second option: the free licence audit
- Microsoft 365 plans teaser
- "Everything else, on request": IT equipment and IdeaHub cards
- proof row
- what every order includes
- contact band
- Remove the partners strip.

### Microsoft 365 (`/microsoft-365/`, replaces `/licensing/`)
- **Plan comparison:** who each plan is for and what's included, in plain words, with MFA, SSO and Intune explained simply.
  - Business Basic, Standard, Premium (up to 300 users)
  - Enterprise E3 / E5
  - Microsoft 365 Copilot (add-on)
  - Windows and Office licences
- Azure and Entra ID section
- what your quote includes
- beat-any-quote and the free audit
- CTA that preselects the product in the form
- No prices anywhere.

### IT equipment (`/it-equipment/`, new, replaces `/servers/` and `/networking/`)
- "Need hardware too? We'll source it."
- **Generic categories, no brand names:**
  - laptops and PCs
  - servers and storage
  - networking
  - printers, peripherals and "anything else you need"
- How sourcing works: you tell us → we find the best price → delivered with a VAT invoice.
- CTA.

### Huawei IdeaHub (`/ideahub/`, from `/workspaces/`)
- Today's content, kept. The Huawei name is allowed.

### Services
- Leads with the **free licence audit**.
- Setup and migration (Microsoft 365, Azure, Entra ID).
- Ongoing support of all kinds.
- Equipment supply.
- **"How we work" appears only here.**

### About
- Company facts, clients and ISO.
- No partner tiles.

### Contact
- **On phones, the form comes first,** with one call/WhatsApp row above it.
- Proof and "what every order includes" sit beside the form.
- The success message makes no timeframe promise.

## 5. Site-wide
- **Menu:** Products (Microsoft 365 · IT equipment · IdeaHub) · Services · About · Contact.
- **Redirects** (Cloudflare `_redirects`, in GE and EN):
  - `/licensing/` → `/microsoft-365/`
  - `/servers/` and `/networking/` → `/it-equipment/`
  - `/workspaces/` → `/ideahub/`
- **Names:** remove Dell, HPE, Lenovo, Zyxel and TP-Link everywhere (config, i18n, footer, illustrations). "Solution Partner" becomes "CSP partner".
- **CTA wording:** "მიიღეთ ფასი" / "Get a price". Update the brand skill and README too.
- **Review fixes to fold in:**
  - heading order
  - placeholder contrast at /70 or more
  - buttons at least 44px on phones
  - balanced headline wrapping
  - one "How we work"
  - no duplicated intros or tags
  - replace the M365 app tiles with the comparison
- **Tests:** update `tests/site.test.mjs` for the new pages, redirects and the removed partner strip. `npm test` must stay green.

## 6. Never
- prices or "from" prices
- response-time promises
- unapproved names
- invented numbers, testimonials or savings
- flashy or looping motion

## 7. Open, decided later
- **Product brand names on the IT equipment page** (e.g. "Lenovo ThinkPad"): waiting on the boss. Build generic, and keep any brand mentions in one place so they're easy to add.
- **Copy:** Claude drafts in GE and EN, and the owner checks the Georgian.
- **ISO details and logos:** waiting on the owner.
