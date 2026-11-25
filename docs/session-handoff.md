# Session handoff

- Timestamp: 2026-10-09 10:31:45 EEST
- Objective: Complete GitHub #115 Person/WebSite JSON-LD baseline.
- Stage: Implementation and required local checks passed; GitHub #115 confirmed CLOSED; project Status and Workflow confirmed Done.
- Complete: Shared configurable profile in src/config/structuredData.js used by runtime and prerender snapshots; stable person/website IDs, sameAs, publisher, consistent profile portrait. Existing page/breadcrumb hooks retained.
- Verified: VITE_SITE_URL=https://mykolamud.pp.ua npm run verify — 18 tests/build passed; six dist snapshots have one parseable production-domain graph; repeated route changes tested with DOM head adapter; git diff --check. GitNexus index refreshed; impact LOW for changed functions; detect-changes MEDIUM in expected SEO/build flows.
- Limits: No browser available in previous CUA inventory; no external schema validator, search crawler or deployment verification. New untracked config/test files reviewed separately because detect-changes excludes them.
- Pending user input: None required. User commits/pushes/deploys manually.
- Next step: User reviews diff and commits; reindex GitNexus after committing.
- Files: src/config/structuredData.js, src/config/seo.js, scripts/prerender-route-snapshots.mjs, tests/seo-structured-data.test.js, README.md, updates/DEV_LOG.md.
- Runtime/commit: feature/VMP_dev; working tree was clean at start (prior CV work committed by user). No commit/push/deploy this task. Prior #70 remains In Progress for portfolio/link review and visual QA. Previously started Vite state not reverified.

## Migration baseline — GitHub #135

- Timestamp: 2026-11-25 EET
- Objective: Record the current Vue 3 + Vite portfolio baseline before the Nuxt migration.
- Phase: Nuxt migration first; full visual redesign remains a later phase.
- Branch/state: `feature/VMP_dev`; working tree clean before baseline work; no application code changes planned for this issue.
- Public routes: `/`, `/about`, `/resume`, `/portfolio`, `/blog`, `/contact`, `/game` and the catch-all not-found route.
- Stack: Vue 3, Vite 5, Vue Router, Pinia, SCSS/Tailwind CSS, Swiper, Axios, Font Awesome, Firebase Hosting configuration and a Cloudflare Worker for static assets/contact delivery.
- Content sources: `public/data/site-content.json`, `resume.json`, `portfolio.json`, `blog-posts.json`; current local blog contains 15 posts and portfolio contains 6 cards.
- SEO/build: route metadata in `src/router/index.js` and `src/config/seo.js`; shared Person/WebSite JSON-LD in `src/config/structuredData.js`; route snapshots from `scripts/prerender-route-snapshots.mjs`; sitemap/robots from `scripts/generate-seo-assets.mjs`.
- Contact boundary: frontend posts to `/api/contact`; Worker accepts `/api/contact` and legacy `/contact`, validates payloads and sends to Telegram using server-side secrets.
- Verification commands: `npm test` passes 18/18; `VITE_SITE_URL=https://mykolamud.pp.ua npm run build` passes, generates six core route snapshots plus `dist/sitemap.xml` and `dist/robots.txt`; `git diff --check` passes. `npm run format:check` reports one existing formatting warning in `public/data/blog-posts.json`.
- Known process issue: README setup examples use `pnpm`, while the repository scripts and current checks use `npm`; tracked separately in GitHub #94.
- Proof limits: no browser/device visual QA, real Shopify API verification, real Telegram delivery, Firebase/Cloudflare production deploy verification or external crawler/schema validation in this baseline.
- Next step: GitHub #138 — bootstrap the Nuxt 4 shell while preserving the current layout and public behavior.

## Nuxt shell milestone — GitHub #138

- Timestamp: 2026-11-25 EET
- Objective: Bootstrap a Nuxt 4 shell alongside the current Vite app without changing the visual design or public behavior.
- Implemented: Nuxt 4.1.3 dependency, `nuxt.config.ts`, Nuxt `app/` shell, default layout wrapping the existing `MainLayoutComponent`, Home entrypoint, Pinia plugin and FontAwesome plugin.
- Compatibility choice: the existing Vite `src/App.vue` remains the legacy entrypoint; Nuxt uses the root `app/` directory to avoid the case-insensitive `App.vue`/`app.vue` collision on macOS.
- Commands: `npm run build:nuxt` passes; `npm test` passes 18/18; `VITE_SITE_URL=https://mykolamud.pp.ua npm run build` passes; `git diff --check` passes.
- Nuxt output: Nitro `node-server` preset; client and server bundles generated successfully. Cloudflare/Nitro preset selection is not finalized in this shell issue.
- Runtime proof: `npm run dev:nuxt -- --host 127.0.0.1 --port 4123` starts successfully; all public routes and a dynamic article route returned HTTP 200 with SSR HTML.
- Compatibility: added Nuxt `compatibilityDate: '2026-11-25'`; Nuxt still warns that legacy root `vite.config.js` and `postcss.config.js` are not used by Nuxt, while the legacy Vite build continues to use them.
- Scope result: current layout, global styles, plugins and all public routes are wired in Nuxt. Route/content/SEO and Shopify blog work are completed under GitHub #136/#137.
- Remaining proof limits: no browser/device visual QA and no Cloudflare production deployment verification; Nuxt deployment preset remains a deployment decision.
- Next step: final Phase 1 SSR/accessibility/Cloudflare verification before the redesign phase.

## Nuxt route and SEO migration — GitHub #136

- Timestamp: 2026-11-25 EET
- Objective: Port the public portfolio routes, local content integration and existing SEO contract to Nuxt while preserving the current Vue views and design.
- Implemented: Nuxt wrappers for `/`, `/about`, `/resume`, `/portfolio`, `/blog`, `/contact`, `/game` and the catch-all not-found route; existing `src/views` and `public/data` remain the content source.
- SEO: Added route metadata in `app/utils/routeSeo.js` and `app/composables/usePortfolioSeo.js`, including title, description, canonical, robots, Open Graph/Twitter metadata and shared WebSite/Person/page/Breadcrumb JSON-LD.
- SSR compatibility: guarded weather `localStorage` access and moved the clock interval into component mount/unmount; disabled Nuxt payload extraction because Nitro's root prerender payload produced an empty storage key in this environment.
- Verification: `npm test` passes 20/20; `npm run build:nuxt` passes; `NUXT_PUBLIC_SITE_URL=https://mykolamud.pp.ua npm run generate:nuxt` passes and prerenders seven public pages plus `200.html`/`404.html`; generated HTML contains expected title, canonical, robots and JSON-LD markers; `npm run build` and `git diff --check` pass.
- Format limit: `npm run format:check` reports only the pre-existing `public/data/blog-posts.json` warning.
- Proof limits: Nuxt dev-server port binding and browser/device QA remain unavailable in this environment; Shopify blog integration is still GitHub #137; Cloudflare/Nitro deployment is not finalized.
- Next step: GitHub #137 — replace the local Blog data source with Shopify-backed content without changing the public route contract.

## Shopify blog integration — GitHub #137

- Timestamp: 2026-11-25 EET
- Objective: Use Shopify Storefront API as the Nuxt blog CMS while preserving `/blog` and adding `/blog/:handle` article pages.
- Implemented: server-only Nuxt endpoints `/api/blog` and `/api/blog/:handle`; Storefront GraphQL article queries; Shopify Article normalization to the existing post contract; local JSON fallback when credentials are absent or the Storefront request fails; cursor/pageInfo support in the list endpoint.
- Security: Shopify domain/token/API version/blog handle are private Nuxt runtime variables (`NUXT_SHOPIFY_*`); no Storefront token is read from or exposed through `VITE_*` browser config.
- Routes/SEO: `/blog` is SSR-loaded from the server endpoint; article links use `/blog/:handle`; article SSR emits dynamic title, canonical, `og:type=article` and Article JSON-LD. A catch-all route bridge handles `/blog/:handle` because Nuxt's current route manifest otherwise lets the existing catch-all intercept the dynamic child.
- Verification: `npm test` passes 22/22; clean `NITRO_PRESET=node-server npm run build:nuxt` passes; local SSR request verified article title, canonical, article markup and Article JSON-LD; clean `NUXT_PUBLIC_SITE_URL=https://mykolamud.pp.ua npm run generate:nuxt` prerendered `/blog` and six article URLs; old `VITE_SITE_URL=https://mykolamud.pp.ua npm run build` passes; `git diff --check` passes.
- Format limit: `npm run format:check` reports only the existing `public/data/blog-posts.json` warning.
- Real-store boundary: no Shopify domain/token was available, so real Storefront API access, live article freshness, Shopify pagination beyond the fallback fixture, and production deployment remain unverified. The local fixture path is explicit and deterministic.
- Next step: configure a real Shopify Storefront token/domain/blog handle in the deployment secret store, then verify live `/api/blog`, article pagination and production SEO separately.

## Nuxt shell verification — GitHub #138

- Timestamp: 2026-11-25 EET
- Verification: Nuxt dev server started on `127.0.0.1:4123`; `/`, `/about`, `/resume`, `/portfolio`, `/blog`, `/contact`, `/game` and `/blog/:handle` returned HTTP 200. Dynamic article SSR returned route-specific title, canonical, article markup and Article JSON-LD.
- Production proof: `NITRO_PRESET=node-server npm run build:nuxt` passes; existing Vite build remains passing; `HomeHeroSection` now receives the deterministic fallback display name during SSR.
- Limits: Nuxt emits informational warnings for the legacy Vite/PostCSS root configs; browser/device QA and Cloudflare deployment are still separate proof boundaries.
- Status: GitHub #138 completed; no commit, push or deploy performed.

## Design system foundation — 2026-11-25

- User-provided design system is recorded in `docs/design-system.md`.
- Implemented the shared dark graphite/emerald token layer, typography defaults, flat Nuxt shell, shared header brand/navigation, accessible mobile menu, button states, focus styles and reduced-motion support.
- Header navigation now follows `/`, `/portfolio`, `/about`, `/resume`, `/blog`, `/contact`; clock/weather widgets were removed from the shared header to keep the specified navigation contract.
- Validation: `npm test` 22/22, Nuxt production build, Vite production build and `git diff --check` passed. Visual browser verification remains the final proof boundary for the next continuation.
- Remaining scope: page-specific styles still contain legacy visual rules; migrate Home/About/Portfolio/Blog/Contact pages incrementally on top of this foundation without changing factual content or routes.
