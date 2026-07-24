# Euro Homemade Bakery & Deli — Competitive Notes & Site Requirements

_Last updated: 2026-07-19_

## 1. Competitor Analysis

### Deli 4 You (deliforyou.com) — 4 locations, Chicago suburbs
- **Platform**: WordPress + Elementor. Full CMS, chosen because non-technical staff push frequent promo graphics/calendar updates across multiple stores.
- **Languages**: English + Polish (`/en/`, `/pl/` paths).
- **Notable features**: store locator, catering menu, "What's Happening" media/blog section, monthly downloadable promo calendar image, recurring named promos ("Crazy Wednesday," "Senior Tuesday" — both 20% off), newsletter signup, gift cards, job application page, donations/request form, vendor page, detailed policy pages (return/coupon/payment/no-solicitation).

### KD Market (mykdmarket.com) — 6 locations, Chicago suburbs (incl. Crystal Lake)
- **Platform**: Shopify + Shogun page builder. Full e-commerce — cart, checkout, Shop Pay, "KD Club" loyalty deals, GrubHub ordering link.
- **Notable features**: per-location landing pages, embedded Google Map per store, department-by-department sections (produce, prepared foods, deli, meat, bakery, grocery/dairy/frozen, liquor) each with appetite-driving photography and short copy, weekly deals page, time-boxed single-day promos (e.g., "20% off, Saturday only").

### Angelo Caputo's Fresh Markets (shopcaputos.com) — larger regional chain
- **Platform**: Webflow for the marketing site + a **separate Shopify subdomain** (`shop.shopcaputos.com`) for actual e-commerce.
- **Why it matters for us**: this is the "buy vs. build" version of the phased approach we already planned — keep the brand/content site simple and static, add commerce later as an independent service/subdomain rather than rebuilding anything. They chose to buy (Shopify) for that layer; we could choose to buy or build when the time comes.
- **Notable features**: family heritage front and center ("Owned and operated by the Angelo Caputo Family since 1958"), "Shop by Category" grid, weekly ad PDFs, recipes/blog section (separate subdomain), catering page, WIC/LINK acceptance badges, careers page.

### Cross-cutting patterns worth adopting
- Department/product storytelling with real photography (bakery, deli, grocery) — no e-commerce required, just good static content.
- Family/heritage story as a first-class page, not an afterthought — proven pattern in this exact niche.
- Hours, address, embedded map, one-tap directions link.
- Named recurring promos drive habitual visits.
- Catering as its own page/menu, independent of any online payment capability.
- Newsletter signup.
- Standard legal/policy footer pages (returns, privacy, terms).
- (Caputo's) Government assistance badges (WIC/LINK) if applicable — worth checking whether Euro Homemade accepts these.

### Patterns intentionally skipped for now
Loyalty programs, cart/checkout, weekly-ad PDFs, multi-location logic — all present because those businesses are larger or already commerce-enabled. Not relevant at this stage.

---

## 2. Confirmed Requirements — Euro Homemade Site v1

Pages/sections confirmed so far:

- **Home**
- **About / Business History** — the actual founding story (needs input from the owner: founding year, name origin/rebrand history, family background)
- **Catering** — menu/offerings; no online payment yet, inquire via phone/email (consistent with current DoorDash/Uber Eats-only ordering model)
- **Hours & Location** — address, embedded map, phone, one-tap directions link
- **Weekly Promo** — recurring **Tuesday** special (needs confirmation from owner: exact discount/mechanic, e.g. senior discount vs. storewide %)
- **Contact**

### Trilingual: English / Ukrainian / Polish
- Confirmed requirement — notably **more ambitious than any competitor reviewed** (Deli 4 You is only EN/PL; KD Market and Caputo's are English-only). Given the overlapping Polish/Ukrainian customer base in this market, this is a genuine differentiator.
- Structurally this doesn't change the infra plan — still a static site — but it does raise **open questions to settle before build**:
  - URL scheme: path-based like Deli 4 You's `/en/`, `/pl/`, `/uk/` (recommended — simplest for a static site, good for SEO per-language) vs. subdomain-based.
  - Scope: does *every* page get all 3 languages, or just the high-value ones (Home, Hours, Contact, Catering) while deeper content (e.g., blog/recipes if added later) stays English-only initially?
  - Translation source: who's producing/reviewing the Ukrainian and Polish copy — needs a real person fluent in each, not just machine translation, especially for the history/about page where tone matters.

### Open items to confirm with the owner
1. Exact business history details.
2. Exact mechanics of the Tuesday promo.
3. Whether all 3 languages apply to every page or a defined subset.
4. Whether EBT/LINK or WIC is accepted (trust badge, if applicable).
