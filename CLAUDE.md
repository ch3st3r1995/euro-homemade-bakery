# Euro Homemade Bakery & Deli — Project Build Plan

This file is the working spec for building this site. It covers infra, site
structure/design pattern, repo layout, and execution order. Read this fully
before making changes; keep it updated as decisions get finalized.

## 0. Project snapshot

> **Agent instruction**: your first task is to scaffold the **entire** repo
> and Terraform structure described in this doc — Section 3's full directory
> tree, all Astro components/pages/content stubs, and all Terraform files
> under `infra/` (root config + every module in Section 5), including
> `infra/bootstrap/`. Create real files, not just the tree — Terraform files
> should be complete/valid (even if some values are placeholders pending the
> domain registration), so that once bootstrap is run, `terraform plan`
> against the rest of `infra/` works with no further scaffolding needed.
> **Do not run `infra/bootstrap/` yourself.** The owner will run that step
> personally, locally, once their AWS account and ACM certificate are ready —
> it's the one manual step in this whole plan, deliberately excluded from
> anything an agent executes.

- **Business**: Euro Homemade Bakery and Deli — single-location Polish/European
  bakery, deli, and grocery store, Chicago area.
- **Instagram**: @euro.homemade (source of truth for brand voice/imagery until
  real assets are dropped in — see Section 4).
- **Repo**: `github.com/ch3st3r1995/euro-homemade-bakery`
- **No online payment/ordering yet** — DoorDash and Uber Eats currently handle
  online orders. Site links out to those; no cart/checkout is being built now.
- **Content ownership**: a developer maintains content via code + redeploy.
  No CMS, no admin UI — by design (see conversation history / decision log).
- **Full competitor analysis**: see `COMPETITIVE-NOTES.md` in this repo for
  the detailed writeup this plan is derived from.

## 1. Open decisions — resolve before/while building

- [x] **Final domain name: `eurohomemadebakery.com`.** Not yet registered —
      confirm availability and register before Section 5 proceeds past the
      ACM/Route 53 steps. If unavailable, fallbacks in priority order:
      `eurohomemade.com`, `eurohomemadefoods.com`, `shopeurohomemade.com` /
      `.co` / `.shop`.
- [x] **Tuesday promo specifics** — resolved: every Tuesday, 20% off all
      items (excluding household chemicals and medication); every Friday,
      10% off for seniors. Source: the business's own Instagram promo
      content. Implemented in `src/content/{en,uk,pl}/promo.md`.
- [ ] **WIC/LINK/EBT acceptance** — if yes, include the badge (Caputo's does
      this; builds trust in grocery context).
- [x] **Newsletter** — resolved: out for v1. No signup form/embed anywhere
      in the site; may be revisited post-launch.
- [ ] **Real photos/videos** — pending Instagram data export (Meta's
      "Download Your Information" tool). Until provided, use placeholders per
      the convention in Section 4. Do not scrape or hotlink Instagram content
      directly.

## 2. Site structure & design pattern

**Static site generator**: use **Astro** (or 11ty as a lighter alternative)
— both compile to flat static output (fits the S3+CloudFront hosting model)
while giving proper templating and built-in i18n routing, which matters here
because of the trilingual requirement below. Do not reach for a
server-rendered framework (Next.js SSR mode, etc.) — nothing on this site
needs a running server.

**Languages — trilingual: English, Ukrainian, Polish**
- URL structure: `/en/`, `/uk/`, `/pl/` subpaths (same pattern Deli 4 You
  uses for EN/PL). Do not use query params or a JS-only client-side switcher.
- Every page exists in all three locales. Shared layout/components, per-locale
  content files (e.g. Astro content collections or per-locale markdown/JSON).
- Add a simple language switcher in the header/footer, present on every page.
- Root `/` should redirect to a sensible default locale (likely `/en/`)
  unless/until there's a reason to geo/browser-detect.
- Translation source not yet decided — draft in English first per page, flag
  each page clearly for PL/UK translation pass rather than guessing.

**Pages (×3 locales each)**:
1. **Home** — hero, department/product highlights, this-week promo block,
   links to DoorDash/Uber Eats ordering, hours+address summary.
2. **History / About Us** — the business's story (heritage-story pattern from
   competitor review — this is a high-leverage page, don't treat as filler).
3. **Catering** — menu/info, "call or email to order," no payment flow.
4. **Contact** — hours, address, embedded map, phone, one-tap directions link.
5. *(Optional, later)* Promotions/specials archive if the Tuesday promo
   content outgrows a single homepage block.

**Content blocks to componentize** (reusable across pages):
- Department/product storytelling section (bakery / deli / grocery), each
  with a short description + image gallery placeholder — this was the
  single highest-leverage pattern from the competitor review.
- Weekly promo banner (Tuesday promo).
- Hours/address/map block.
- Order-online links (DoorDash / Uber Eats badges/buttons).
- Footer: legal pages (privacy/terms — low priority, stub is fine for v1),
  social links, newsletter signup if in scope.

## 3. Repo structure (proposed)

```
euro-homemade-bakery/
├── CLAUDE.md                     # this file
├── COMPETITIVE-NOTES.md
├── astro.config.mjs
├── package.json
├── public/
│   └── images/                   # see Section 4 for placeholder convention
├── src/
│   ├── components/
│   │   ├── DepartmentSection.astro
│   │   ├── PromoBanner.astro
│   │   ├── HoursAddressMap.astro
│   │   ├── OrderOnlineLinks.astro
│   │   ├── LanguageSwitcher.astro
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── content/
│   │   ├── en/  (home.md, about.md, catering.md, contact.md, promo.md)
│   │   ├── uk/  (same set)
│   │   └── pl/  (same set)
│   └── pages/
│       ├── index.astro           # redirect to /en/
│       ├── en/...
│       ├── uk/...
│       └── pl/...
├── functions/
│   └── contact-form/              # Lambda source for the contact form (Section 6)
├── infra/
│   ├── bootstrap/                 # one-time, LOCAL state, run manually — see Section 5
│   │   └── main.tf                # state bucket, lock table, OIDC provider, IAM roles
│   ├── modules/
│   │   ├── dns-and-cert/          # Route 53 zone + ACM cert (us-east-1) + validation
│   │   ├── site-hosting/          # S3 bucket + CloudFront + OAC + Route 53 alias records
│   │   ├── email/                 # SES domain identity + DKIM/SPF
│   │   ├── contact-form/          # Lambda + API Gateway wiring
│   │   └── budget/                # AWS Budgets alert
│   ├── main.tf                    # wires modules together, remote state from here on
│   ├── variables.tf
│   ├── outputs.tf                 # bucket name / CloudFront distribution ID, etc.
│   └── backend.tf                 # points at the bootstrap-created state bucket
└── .github/
    └── workflows/
        ├── infra.yml               # terraform plan (PR) / apply (main)
        └── deploy.yml               # site content build + sync + invalidate
```

## 4. Media placeholder convention

Until the Instagram export is done and real assets are dropped in:

- Path convention: `public/images/{section}/placeholder-{n}.{ext}`
  e.g. `public/images/bakery/placeholder-1.jpg`,
  `public/images/deli/placeholder-1.jpg`, `public/images/history/placeholder-1.jpg`
- Maintain a `MEDIA-TODO.md` checklist enumerating every placeholder slot by
  path, what it should eventually show (e.g. "bakery case, fresh bread"),
  and its status (`placeholder` / `real asset added`). This makes swapping in
  real photos later a mechanical find-and-replace instead of a redesign.
- When real assets do land: resize/compress for web (originals from
  Instagram/phone exports are typically far larger than needed), convert to
  WebP/AVIF, generate responsive size variants. Flag any photos/videos with
  identifiable customers in them for an owner consent check before publishing.

## 5. Infra plan — AWS, static hosting, provisioned via Terraform

**Architecture** (unchanged from earlier planning, now provisioned as code
rather than by hand): S3 (private bucket, Block Public Access on) ← CloudFront
(CDN + TLS, reached via Origin Access Control) ← Route 53 (DNS). ACM
certificate issued in `us-east-1` regardless of the working region elsewhere.
No ECS/EC2/containers — nothing here needs a persistent server process.

**The bootstrap problem**: Terraform needs a remote state backend (S3 bucket
+ a lock mechanism), and CI needs an OIDC-trusted IAM role to run Terraform —
but nothing can create those two things via CI, since CI doesn't have a role
to assume until they exist. Solve this with a one-time, manual, **local-state**
bootstrap step (`infra/bootstrap/`), run once from a developer machine using
an IAM admin user's credentials — never via CI, never touched again afterward
unless the bootstrap resources themselves change. It creates:

- **Terraform state bucket** — S3, versioned, encrypted, Block Public Access on.
- **State lock mechanism** — DynamoDB table (or S3-native locking if the
  Terraform version in use is ≥1.10 and that feature is preferred instead).
- **GitHub OIDC identity provider** for this AWS account (account-wide —
  skip creating a second one if this account already has one from another
  project).
- **Two OIDC-trusted IAM roles**, both trusted only by this specific repo:
  - `terraform-apply` — broader permissions (S3, CloudFront, Route 53, ACM,
    SES, Lambda, API Gateway, Budgets, plus the IAM permissions needed to
    manage those resources). This is the one deliberate exception to
    least-privilege-by-default in this plan, since Terraform itself needs to
    create/modify these resource types. Still scope to this AWS
    account/resource set, not `*`.
  - `content-deploy` — unchanged from the original plan: narrow, S3 write +
    CloudFront invalidate only, used solely by the site-content deploy
    workflow, never by Terraform.

**Everything past bootstrap is real Terraform, remote state, run through CI**
(`infra/main.tf` + `infra/modules/*` per the repo structure in Section 3):

- `modules/dns-and-cert` — Route 53 hosted zone + ACM cert (us-east-1
  provider alias) + `aws_acm_certificate_validation`, which natively handles
  the "records must exist before the cert can validate" dependency — no
  manual waiting/copying required like the old console-driven flow.
- `modules/site-hosting` — S3 bucket (named `eurohomemadebakery.com`,
  Block Public Access on) + CloudFront distribution via OAC (not legacy OAI)
  + Route 53 alias records at apex and `www`.
- `modules/email` — SES domain identity + DKIM/SPF records (only if the
  Lambda+SES contact form path is used).
- `modules/contact-form` — Lambda + API Gateway for the contact form.
- `modules/budget` — AWS Budgets alert (e.g. $10/mo threshold).
- Root `variables.tf` holds the domain name and other inputs; `outputs.tf`
  exposes the bucket name / CloudFront distribution ID that the content-deploy
  workflow needs.

**CI/CD — two separate workflows, deliberately not one**:
1. `.github/workflows/infra.yml` — triggers on changes under `infra/**`
   (excluding `infra/bootstrap/`, which is never run via CI). `terraform plan`
   on pull requests (post the plan as a PR comment for review), `terraform
   apply` on merge to `main`. Uses the `terraform-apply` OIDC role. Recommend
   gating the apply step behind a GitHub Environment with required reviewers,
   since this role's permissions are broader than content-deploy's.
2. `.github/workflows/deploy.yml` — triggers on changes under `src/**` /
   `public/**`. Builds the Astro site, `aws s3 sync ./dist s3://<bucket>
   --delete`, `aws cloudfront create-invalidation`. Uses the narrow
   `content-deploy` OIDC role. Reads the bucket name/distribution ID from
   Terraform's outputs.

**Ordered sequence**:
1. Bootstrap (`infra/bootstrap/`) — run locally, once.
2. Confirm `eurohomemadebakery.com` availability and register it.
3. Write the Terraform root config + modules in `infra/`.
4. Open a PR — CI runs `terraform plan`; review the diff.
5. Merge to `main` — CI runs `terraform apply` (behind the approval gate).
6. If the domain wasn't registered directly through Route 53, update the
   registrar's nameservers to the ones Terraform's Route 53 zone output gives.
7. Confirm the CloudFront distribution + Route 53 records resolve over HTTPS.
8. Wire up `deploy.yml` once the bucket/distribution outputs exist from step 5.

**Cost expectation**: same ~$1–5/month as before, plus a negligible few cents
for the Terraform state bucket and (if used) the DynamoDB lock table.

**Explicitly deferred / not part of this phase**: ECS/Fargate, EC2, ALB, any
persistent compute, any CMS/headless-CMS integration, cart/checkout/payment
processing, loyalty programs. If/when direct online ordering is wanted later,
re-open the buy-vs-build discussion in `COMPETITIVE-NOTES.md` (custom
Lambda+DynamoDB+Stripe vs. a Shopify/Square storefront on a `shop.` subdomain)
rather than assuming the custom path by default.

## 6. Contact form

- API Gateway + Lambda (in `functions/contact-form/`) → SES to email the
  store. Free-tier scale covers this comfortably.
- Lambda has no other responsibilities — it is the only piece of compute in
  this entire architecture.

## 7. Execution order (for the agent picking this up)

1. Scaffold the Astro project with the folder structure in Section 3.
2. Build shared layout/components (header, footer, language switcher).
3. Build the componentized content blocks (Section 2) with placeholder media
   (Section 4) and English copy first.
4. Wire up the `/en/ /uk/ /pl/` routing structure; duplicate English content
   into `uk/`/`pl/` content files as untranslated placeholders flagged for
   translation.
5. Build the contact form Lambda + local test harness (no AWS deploy yet).
6. Scaffold all Terraform files under `infra/` per Section 5 (root config +
   every module, plus `infra/bootstrap/`) — real, complete files, not just
   folders. **Do not run `infra/bootstrap/`** — that step is run personally
   by the owner, locally, once their AWS account and ACM certificate are
   ready.
7. Confirm `eurohomemadebakery.com` availability; owner registers it.
8. Owner runs `infra/bootstrap/` locally (state bucket, lock table, OIDC
   provider, both IAM roles).
9. Open a PR against the rest of `infra/`, review the `terraform plan`
   output, merge to trigger `terraform apply`.
9. Update registrar nameservers if needed; confirm HTTPS resolves.
10. Wire up `deploy.yml` using Terraform's outputs (bucket name, distribution
    ID); do a full deploy and verify all three locales resolve and the
    contact form round-trips through SES.
11. Swap placeholders for real media once the Instagram export lands, per the
    `MEDIA-TODO.md` checklist.
