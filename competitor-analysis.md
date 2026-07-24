# Competitor Analysis — Euro Homemade Bakery & Deli

Sites reviewed:
1. **Deli 4 You Market** — deliforyou.com (5 locations: Schaumburg, Norridge, Prospect Heights, Algonquin, Niles — WordPress/Elementor)
2. **KD Market** — mykdmarket.com (6 locations incl. Crystal Lake — Shopify)
3. **Angelo Caputo's Fresh Markets** — shopcaputos.com (Italian grocery chain since 1958 — Webflow + separate Shopify commerce subdomain)

All three are the same fundamental business type as Euro Homemade: bakery + deli + European/ethnic grocery, family-owned origin story, serving the Chicagoland market.

---

## Patterns worth adopting

**Department-by-department storytelling.** All three break the store into sections with a photo + a few sentences: bakery, deli, meat, produce, grocery/frozen, liquor. This is content Euro Homemade can build as a single static page with no backend — just needs real photos and short copy for each department they actually carry.

**Genuine "Our Story" section.** Every site leads with the family narrative (Deli 4 You: mother-daughter duo; Caputo's: "Owned and operated by the Angelo Caputo Family since 1958," with a real family photo). This is a differentiator, not filler — worth getting real specifics from the owner (when did they start, what's the personal/immigrant story, any signature item) rather than generic "family owned" copy.

**Location page structure, even for one location.** KD Market and Deli 4 You both give every location its own URL (`/pages/crystallake`, `/en/sklepy/...`) with address, hours, phone, embedded map. Worth structuring Euro Homemade's site the same way now — e.g. a `/location/montclare`-style page — even with only one location, so a second location later is "add a page," not "restructure the site." Directly relevant to the earlier domain-naming decision (avoiding neighborhood-specific naming).

**Linking out to third-party delivery instead of building a full cart.** KD Market just has an "Order GRUBHUB" nav link. This validates the current plan — Euro Homemade linking to DoorDash/Uber Eats instead of building checkout is exactly what a comparable competitor does, not a corner being cut.

**Real trust signals in the footer.** Caputo's shows accepted payment methods (incl. Illinois LINK/EBT and WIC) directly in the footer. If Euro Homemade accepts LINK/WIC in-store, surfacing that is a real conversion factor for the demographic this store serves — cheap to add, meaningful to the audience.

**Weekly ad / flyer PDF.** Caputo's posts a "Weekly Ad" and "Sneak Peek" as linked PDFs. Low-effort pattern: a developer-updated PDF or image posted weekly/monthly, no CMS or backend required — could work well for holiday/pierogi-season specials.

**Recipes/content section.** Caputo's has a dedicated Recipes area and a blog; this is clearly there for SEO and repeat engagement, not just decoration. Deli 4 You and KD Market don't really do this well — it's a gap Euro Homemade could fill relatively cheaply as static Markdown pages (no backend), and it's a genuine SEO opportunity none of the direct competitors are exploiting hard.

---

## What to avoid

**Deli 4 You's promo calendar is a static scanned image per month.** Discounts ("Crazy Wednesday," "Senior Tuesday") are communicated as JPGs of a calendar graphic — not readable by search engines or screen readers, and stale the moment a date changes. Euro Homemade should present current promos as real text/HTML content instead.

**Banner-overload homepage.** Deli 4 You's homepage is mostly stacked promotional banner images with little real text — reads dated and is SEO-thin (search engines can't read image text). Favor real copy with supporting images over image-as-content.

**Nothing here handles special/custom orders well.** None of the three sites have an obvious path for something like "order a custom cake" or "pre-order pierogi for Easter." Given Euro Homemade already has a Lambda+SES contact form planned for the infra, a simple "Special Orders" inquiry form (no payment needed) could be a real differentiator over all three competitors — low build cost, fills a gap they all share.

---

## Nav structure comparison

| Deli 4 You | KD Market | Caputo's |
|---|---|---|
| Home, About, Stores, Catering, Gallery, What's Happening, Contact | Home, Locations, Weekly Deals, KD Club Deals, Order Catering, Order Grubhub | Home, Locations, Weekly Ad, Catering, Careers, Recipes, About, Shop |

Common denominator across all three: **Home / About / Locations / Catering-or-Order / Contact.** A reasonable starting nav for Euro Homemade: `Home · Our Story · Menu/Departments · Order (DoorDash/Uber Eats links) · Gallery · Contact`, with `Locations` added later if a second store opens.

---

## Phase 2 ideas (post-launch, not needed for v1)
- Loyalty program, à la KD Club Deals — meaningful once there's repeat local traffic, not a v1 concern.
- Full e-commerce shop-by-category (Caputo's model) — only worth it if Euro Homemade eventually drops DoorDash/Uber Eats in favor of owning the transaction; ties back to the "add payments later" path already planned in the infra.
- Recipes/blog section — good candidate for an early Phase 1.5 addition since it's static content, no backend needed, and none of the direct local competitors do it well.
