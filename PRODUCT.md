# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Companies in Georgia buying IT. Three kinds of buyer reach the site, often for the same company:

- **IT managers.** They know what they need (Microsoft 365 plans, seats, Azure, Entra ID) and want the best licence price from a supplier they can trust.
- **Owners and directors of small and mid-size businesses.** They need guidance on what to buy, and plain language rather than acronyms.
- **Procurement teams and public-sector tenders.** They compare suppliers and need official documents for their files: company documents, ISO certificates and VAT invoices.

## Product Purpose

The website for LLC BUZ Tech Georgia ("BUZ Tech"). Its job is to turn visits into price requests, by phone, WhatsApp or the price-request form. Success means more qualified requests for Microsoft 365 licences, and for any other IT a client needs.

## Positioning

- **Microsoft 365 licences first.** BUZ Tech offers the best Microsoft prices in Georgia. The reason is confidential and must never be explained on the site.
- **The price promise (being tested):** "Send us any Microsoft 365 quote — we'll beat it." The owner may revert it to a plain best-price statement.
- **Official Microsoft CSP partner.** Wording: "CSP partner", never "Solution Partner".
- **Everything else, on request.** Laptops, servers, switches, Huawei IdeaHub boards and more, sourced for the client. Hardware is secondary to Microsoft and is never presented as the core.
- **A relationship after the sale.** The owner's words: "we are friends after they buy from us". This means support of all kinds, not a one-off sale.

## Operating Context

- **Prices are never fixed.** Every quote is requested from the group's Azerbaijan office and differs each time. A client calls, texts or sends the form, and BUZ Tech replies with a price once it arrives (usually about a day; never state a turnaround on the site).
- **Every order includes:**
  - a VAT invoice in GEL from LLC BUZ Tech Georgia
  - company documents and ISO certificates, ready for tenders and supplier files
  - renewal reminders before licences renew
- **Services, all real:**
  - a free licence audit
  - setup and migration (Microsoft 365, Azure, Entra ID)
  - ongoing support of all kinds
  - equipment supply
- **Part of an international integrator.** Headquarters in the Czech Republic, working in five countries.

## Capabilities and Constraints

- **Languages:** Georgian first (`/`), English under `/en/`. Georgian words are long.
- **No prices on the site,** not even "from" prices. Every pricing path ends in a quote request.
- **CTA wording:** "მიიღეთ ფასი" / "Get a price". "Today" was dropped, and the site never promises same-day or any timed reply.
- **Third-party names:** only Microsoft and Huawei may appear. There is no approval to name any other vendor or distributor (no Dell, HPE, Lenovo, Zyxel, TP-Link, MUK or ERC), so there is no "partners" section.
- **Planned page set (agreed direction):**
  - Home, Microsoft-led
  - Microsoft 365: plans, with Azure and Entra ID inside
  - IT equipment: everything else, generic, no unapproved brands
  - Huawei IdeaHub: its own page
  - Services, About, Contact, Privacy

  The separate Servers, Networking and Workspaces pages go away.
- **Microsoft products to present:** Business Basic, Standard and Premium; Enterprise E3/E5; Microsoft 365 Copilot; Windows and Office licences.
- **IT equipment categories:** laptops and PCs, servers and storage, networking, printers and more. No brand names until the boss approves product names.
- **Price requests** go to an email inbox (Web3Forms key pending). No CRM. The owner edits the site with Claude; there is no CMS.
- **Hosting:** static pre-rendered site on Cloudflare Workers, protected by security headers.

## Brand Commitments

- **Name:** "BUZ Tech" (legal name LLC BUZ Tech Georgia), never "BUZ Group".
- **Brand rules:** the brand book's palette, fonts, weights and calm motion are binding. They are recorded in `.claude/skills/buz-tech-design/SKILL.md`, which wins over generic design advice.
- **Logo:** the BUZ Tech logo. The owner allows adjusting it.

## Evidence on Hand

- **Clients, named with permission:**
  - Telasi, TBC Insurance, Evex, Borjomi Likani
  - public sector: Enterprise Georgia and the Financial Monitoring Service of Georgia
  - in Azerbaijan: Azergold, Azerbaijan Airlines (AZAL), AgroDairy
  - the full list is in `src/i18n/*.ts`
- **Company facts:** founded 20 September 2018, plus the tax ID and address (`src/config/site.ts`).
- **ISO 9001, 27001 and 20000-1 are held,** but the issuer, number, validity and scans are not yet supplied. Never invent them.
- **Missing, and not to be fabricated:**
  - testimonials, case studies, prices and savings figures
  - partner or client logos
  - photos of the team, office or installations

## Product Principles

1. **Microsoft first, everything else on request.** Every page should make the licensing offer obvious within seconds.
2. **Every path ends in "get a price".** Make the request effortless. Never show prices or promise a timeframe.
3. **Claim only what is approved and true.** No unapproved names, and no invented proof or figures.
4. **Serve three buyers at once.** Give specifics for the IT manager, plain guidance for the owner, and documents for procurement.
5. **Sell the relationship.** Free audit before the sale, support and renewal care after it.

## Accessibility & Inclusion

WCAG 2.2 AA. Keyboard and screen-reader use must keep working. With reduced motion, nothing moves. The pages must work at 375px with long Georgian words.
