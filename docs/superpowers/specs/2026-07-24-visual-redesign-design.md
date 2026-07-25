# Visual Redesign & Real Content — Design

## Context

The site had zero CSS since the initial scaffold — pure unstyled semantic HTML. The
owner asked for it to look "more dynamic," with real photos and motion, instead of
plain unstyled markup and SVG placeholders. This design covers the first real visual
pass: a warm/rustic color and type system, a real homepage layout, scroll/hover
motion, and replacing placeholder department copy/images with real photos and
descriptions sourced from the owner's own phone photos of the store's assortment.

Validated interactively via the Superpowers visual-companion browser tool across
several rounds — see decisions below.

## Visual direction

- **Palette**: cream background (`#faf3e8`), dark warm-brown text (`#3a2a1c`),
  terracotta accent for buttons/links (`#c96f42`), muted sage-green as a secondary
  accent. Chosen over two other candidates (wheat/brick/gold, off-white/clay) for
  reading as the warmest, most "bakery storefront" of the three.
- **Typography**: Playfair Display (serif) for headings, Inter (sans-serif) for body
  text, loaded via Google Fonts `@import`.
- Applies site-wide (palette/type live at the layout level), not just the homepage.

## Homepage hero

**Split-screen layout**: text + CTAs (heading, subheading, DoorDash/Uber Eats
buttons) on one side, a single full-bleed photo on the other. Chosen over a
full-bleed-photo-with-text-overlay option and a photo-collage-grid option —
split screen keeps text always readable with no dark scrim needed, and reads
calmer/more editorial than the alternatives.

Hero photo is `bread-logo-banner` from the owner's separate "bread" phone-photo
folder (baguette + sliced bread on a cooling rack) — swapped in after the
owner flagged the original hero photo (from the "asortiment" source) as
looking wrong/awkwardly cropped.

No hero carousel, no parallax — explicitly decided against for v1 (see
"Explicitly deferred" below) in favor of shipping the simpler, already-validated
version.

## Department sections (Bakery / Deli / Grocery)

Each department section is a two-column layout: a fixed-width text column (heading +
description) beside a **3×2 grid of square photo tiles** (`aspect-ratio: 1/1`,
6 photos per department). Square tiles were chosen after an earlier thin
4-per-row strip read as "too narrow to see the product" — going to squares
fixed that; the grid grew from an initial 2×2 (4 photos) to 3×2 (6 photos) per
the owner's request for more photo variety per department. Sections alternate
a subtle background tint (cream / slightly darker cream) for visual rhythm
down the page.

Real photos are pulled from the owner's own "asortiment" phone photos (see
"Photo sourcing" below), not the placeholder SVGs or the earlier Instagram Story
screenshot set. Bakery's 6 photos are deliberately non-bread (croissants,
crepes, and dessert/pastry case shots) since bread now has its own dedicated
subsection (below) — a duplicate bread tile in the top grid would be
redundant.

## Bread subsection (nested under Bakery)

A dedicated "Our Bread" subsection sits directly under the Bakery department
section, showing all 15 bread varieties from the owner's separate "bread"
phone-photo folder (professional-looking studio shots, distinct from the
"asortiment" source) in a denser 5-column tile grid, each tile labeled with
the variety's name (translated per locale — see `src/data/bread.ts`). Same
scroll-reveal + hover-zoom motion as the department sections, alternating
reveal direction and background tint to match its neighbors.

## Motion

Two effects, both plain CSS + a small vanilla-JS `IntersectionObserver` script — no
new npm dependencies, consistent with this project's existing "no client framework"
convention (matches the contact form's own vanilla-JS pattern):

1. **Scroll-triggered reveals**: each department section starts at `opacity: 0` with
   a `translateY`/`translateX` offset, and gets an `.is-visible` class added by an
   `IntersectionObserver` once ~20% of it enters the viewport, triggering a
   `opacity`/`transform` CSS transition. Sections alternate reveal direction
   (up vs. from-the-left) for visual variety.
2. **Hover zoom**: department photo tiles scale up slightly (`scale(1.05–1.06)`)
   and gain a drop shadow on hover, via a plain CSS `transition`.

Both were demoed live in-browser (not just described) and approved.

### Explicitly deferred (not in this pass)

- **Hero image carousel** — user confirmed the static single-photo hero is enough
  for v1; can revisit later.
- **Parallax scrolling** — same; confirmed unnecessary for v1, adds complexity/perf
  cost without a validated need.

## Real content: photo sourcing

Three source folders on the owner's Desktop were reviewed:

- `~/Desktop/images/` — saved Instagram post pages ("Save Page As, Complete"
  snapshots). Mostly tracking-pixel/UI-chrome junk; a small set of genuine content
  photos were recoverable by filtering for distinct (non-repeated), reasonably-sized
  JPEGs. Used only during early mockup rounds for a placeholder hero/bakery photo,
  since superseded by the sources below.
- `~/Desktop/asortiment/` — 28 real, direct phone photos (no Instagram Story
  overlays beyond a small title banner) documenting the actual product assortment,
  with real category lists (bread varieties, prepared foods, borscht/soups,
  chebureki, varenyky, dairy, bakalia, fish, pharmacy items, pharmacy shelf,
  imported candy, etc.). This is the primary source for the department photo
  grids — 18 photos curated across the three departments (6 each), all distinct,
  no repeats.
- `~/Desktop/bread/` — 15 professional-looking studio photos of individual bread
  varieties, plus one wider shot (`bread-logo-banner`) used as the homepage hero.
  Reviewed separately from `asortiment` at the owner's request, once the owner
  wanted a dedicated "Our Bread" subsection and a better hero photo. All 15 are
  used in the Bread subsection; none needed cropping (no overlay text at all).

All photo tiles are **physically cropped** (via `sips`) to remove any
Instagram-Highlight-style overlay text/caption banners — not just CSS
`background-position` tricks, which still left banner text partially visible in
some tiles during an earlier pass. Authentic in-store price signage and product
packaging text (e.g. handwritten price tags, sausage-case labels, kefir bottle
labels) is left in deliberately — that's real storefront detail, not an
Instagram graphic overlay, and removing it would mean cropping out the product
itself. The owner has said they'll provide better/more photos later — nothing
here is meant to be final photography, just a real, honest upgrade over the SVG
placeholders.

## Real content: department descriptions

Replaced the generic one-sentence placeholder descriptions with copy that reflects
what the "asortiment" photos actually list:

- **Bakery**: ~15 bread varieties, fresh croissants, cakes/pastries from their own
  confectioner (cheesecake, Napoleon, red velvet, tiramisu), crepes, Saturday
  pirozhki.
- **Deli**: ready-made meals (cutlets, chops, goulash, cabbage rolls, potato
  pancakes, salads), Ukrainian borscht/soups, Saturday chebureki and varenyky,
  shawarma, sausages/hams/cheeses/salo.
- **Grocery**: produce, dairy (kefir, yogurts, farmer's cheese), bakalia (flour,
  groats, tea, coffee), frozen vareniki/pelmeni, fish, Ukrainian/Polish pharmacy
  items.

These replace the current `home.md` frontmatter `departments.*.description` fields
(English first; uk/pl will need the same AI-drafted-then-flagged treatment already
used elsewhere in this project, not silently translated without the `translated`
flag convention this project already established).

## Scope

**In scope for this pass:**
- Global palette/typography (`src/styles/global.css`, imported by `BaseLayout.astro`).
- Homepage hero: rebuilt as split-screen (`Hero.astro`) using the `bread-logo-banner` photo.
- `DepartmentSection.astro`: rebuilt as text-column + 3×2 square photo grid (6
  photos per department), with scroll-reveal and hover-zoom motion.
- `BreadSection.astro`: new subsection nested under Bakery showing all 15 bread
  varieties in a 5-column tile grid, each labeled with its name
  (`src/data/bread.ts`, translated per locale).
- Real curated photos copied into `public/images/{bakery,deli,grocery,bread,hero}/`
  replacing the SVG placeholders for these sections specifically.
- Updated `home.md` department descriptions (en/uk/pl; uk/pl follow the existing
  AI-drafted-translation convention, same as the rest of this site's content).
- `MEDIA-TODO.md` updated to reflect which slots now have real (if rough-cropped)
  photos vs. still-placeholder.

**Out of scope for this pass** (not requested, not blocking):
- About/Catering/Contact page-specific visual treatment beyond inheriting the new
  global palette/typography — no new layout work on those pages.
- Hero carousel, parallax (explicitly deferred, see above).
- Final, professionally-cropped photography — owner will supply more/better photos
  later; this pass upgrades from SVG placeholders to real (if physically cropped
  clean of overlay text) photos, not a final photography pass.
- Any change to the contact form, infra, or SES/deploy pipeline — unrelated to this
  visual work.

## Verification

- `npx astro build` succeeds, all locale pages still render.
- Visual check in a real browser (per this project's existing convention of testing
  UI changes live): scroll-reveal triggers correctly per section, hover-zoom works
  on photo tiles, hero split-layout renders correctly, real photos display (not
  broken image links), department descriptions read correctly in en (and uk/pl once
  translated).
- Confirm no regressions to existing pages (About/Catering/Contact/Privacy/Terms
  still render with the new global palette/typography inherited from
  `BaseLayout.astro`).
