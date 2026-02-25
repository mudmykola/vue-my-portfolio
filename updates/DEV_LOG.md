# Dev Log

## 2026-02-25 13:45:11 EET
- Type: Improvement
- Title: Start mobile performance pass with route code-splitting and deferred ads script
- Summary: Converted route views to lazy-loaded chunks, moved Google Fonts loading from SCSS `@import` to head `preconnect + stylesheet`, and deferred AdSense script injection until browser idle to reduce initial mobile bundle parse/execute cost and improve PageSpeed opportunities.
- Affected module/route/tool: router route loading, `App.vue`, `index.html`, global styles font loading
- Issue reference: Linear `MYK-19`

## 2026-02-25 13:35:09 EET
- Type: Improvement
- Title: Document production canonical domain for SEO build environment
- Summary: Updated README and release checklist to pin `VITE_SITE_URL` to the production domain `https://mykolamud.pp.ua` and reduce risk of canonical/JSON-LD/OG fallback values pointing to the Worker subdomain.
- Affected module/route/tool: `README.md`, `RELEASE_CHECKLIST.md`, SEO deployment process
- Issue reference: SEO deployment follow-up

## 2026-02-25 13:29:41 EET
- Type: Improvement
- Title: Add release checklist checks for SEO domain fallback validation
- Summary: Updated the production release checklist to require `VITE_SITE_URL` in GitHub Actions secrets and added post-deploy verification steps to catch accidental `example.com` fallback values in source HTML, sitemap, and robots assets.
- Affected module/route/tool: `RELEASE_CHECKLIST.md`, SEO/deploy QA process
- Issue reference: Follow-up to SEO deployment hardening (`MYK-88`, `MYK-90`)

## 2026-02-25 13:09:39 EET
- Type: SEO
- Title: Add build-time prerendered HTML snapshots for core marketing routes
- Summary: Implemented a head-prerender strategy that generates route-specific HTML snapshots for core marketing routes during build, including route metadata and JSON-LD in `<head>`, while keeping the existing SPA + Cloudflare Worker runtime flow unchanged.
- Affected module/route/tool: build pipeline (`package.json`), `scripts/prerender-route-snapshots.mjs`, `README.md`
- Issue reference: Linear `MYK-90`, GitHub `#114`

## 2026-02-25 13:05:11 EET
- Type: SEO
- Title: Improve image metadata hints and CLS safety across remaining components
- Summary: Added missing image loading and decoding hints across navigation, weather, about, blog, and portfolio image components, improved avatar/weather alt fallbacks, and added width/height metadata where fixed or standardized dimensions are available to reduce layout shifts.
- Affected module/route/tool: navigation header avatar, weather widget, about cards, blog images, portfolio images
- Issue reference: Linear `MYK-94`, GitHub `#118`

## 2026-02-25 13:00:13 EET
- Type: SEO
- Title: Expand social preview metadata strategy for OG and Twitter images
- Summary: Extended the SEO manager with default and route-overridable social image metadata (`og:image`, `og:image:alt`, `og:image:width`, `og:image:height`, `twitter:image`, `twitter:image:alt`) and documented image specs plus route override fields in README.
- Affected module/route/tool: `src/config/seo.js`, `index.html`, `README.md`
- Issue reference: Linear `MYK-93`, GitHub `#117`

## 2026-02-25 12:57:46 EET
- Type: SEO
- Title: Add custom 404 page and noindex catch-all route
- Summary: Added a dedicated NotFound page and router catch-all route with noindex SEO metadata and a stable `/404` canonical path to improve invalid URL handling for users and crawlers.
- Affected module/route/tool: `src/views/NotFoundPage.vue`, router catch-all route, route SEO metadata
- Issue reference: Linear `MYK-92`, GitHub `#116`

## 2026-02-25 12:56:12 EET
- Type: SEO
- Title: Generate robots.txt and sitemap.xml during production build
- Summary: Added build-time generation of `dist/robots.txt` and `dist/sitemap.xml` for core indexable routes using `VITE_SITE_URL` as the canonical origin source, with `/game` disallowed in robots output and README documentation for the SEO asset generation flow.
- Affected module/route/tool: build pipeline (`package.json`), `scripts/generate-seo-assets.mjs`, `README.md`
- Issue reference: Linear `MYK-88`, GitHub `#112`

## 2026-02-25 12:48:48 EET
- Type: SEO
- Title: Standardize full SEO H1 format as title plus keyword context
- Summary: Rewrote full SEO H1 strings across primary pages to a consistent `Title | keyword context` format while preserving short visible UI labels via shared header rendering.
- Affected module/route/tool: Home/About/Resume/Portfolio/Blog/Contact/Game headings, `site-content.json`
- Issue reference: Linear `MYK-95`, GitHub `#120`

## 2026-02-25 12:45:10 EET
- Type: SEO
- Title: Preserve full SEO H1 text for shared page headers with short UI labels
- Summary: Fixed shared page header rendering so short visible labels remain in the UI while full H1 titles are preserved in hidden text for SEO and accessibility, including Resume, Portfolio, and Blog pages where prefix-based suffix splitting was dropping the full heading.
- Affected module/route/tool: `PageSectionHeader.vue`, `AboutSectionHeader.vue`
- Issue reference: Linear `MYK-95`, GitHub `#120`

## 2026-02-25 12:41:36 EET
- Type: SEO
- Title: Add route-aware JSON-LD structured data baseline
- Summary: Implemented centralized JSON-LD generation in the SEO manager with route-aware `WebPage`/`AboutPage`/`CollectionPage`/`ContactPage` nodes plus shared `WebSite`, `Person`, and `BreadcrumbList` graph output updated on route changes.
- Affected module/route/tool: `src/config/seo.js`, router SEO metadata config
- Issue reference: Linear `MYK-91`, GitHub `#115`

## 2026-02-25 12:36:17 EET
- Type: Improvement
- Title: Shorten visible page H1 labels while preserving full SEO headings
- Summary: Updated top-level page H1 rendering to show short labels in the UI while keeping the full SEO heading text in visually hidden spans inside the same H1 for semantic and crawler-friendly output.
- Affected module/route/tool: Home/About/Resume/Portfolio/Blog/Contact/Game page headers, shared section header components
- Issue reference: Linear `MYK-95`, GitHub `#120`

## 2026-02-25 12:30:19 EET
- Type: Improvement
- Title: Align route SEO copy lengths and page H1 headings with SEMrush-friendly ranges
- Summary: Added semantic H1 support to shared page headers, set visible H1 headings across key pages, normalized route SEO titles/descriptions to target length ranges, and updated Home/Game H1 text plus content titles for better SEO audits.
- Affected module/route/tool: shared page headers, Home/About/Resume/Portfolio/Blog/Contact/Game headings, router SEO meta config, `site-content.json`
- Issue reference: Linear `MYK-89`, Linear `MYK-95`, GitHub `#113`, GitHub `#120`

## 2026-02-25 12:18:41 EET
- Type: Feature
- Title: Implement route-level SEO metadata manager for SPA routes
- Summary: Added centralized route-level SEO metadata management (title, description, canonical, robots, Open Graph, Twitter tags) with immediate route-change syncing, route SEO config in router meta, and improved base SEO placeholders in `index.html`.
- Affected module/route/tool: `src/config/seo.js`, `src/router/index.js`, `src/App.vue`, `index.html`, `README.md`
- Issue reference: Linear `MYK-87`, GitHub `#111`

## 2026-02-25 12:02:39 EET
- Type: Refactor
- Title: Centralize site-content loading into single shared composable
- Summary: Removed duplicate `site-content.json` loaders (`useAboutPage`, navigation avatar fetch helper) and switched About/Navigation consumers to `useSiteContent` as the single authoritative content loader with shared caching/error behavior.
- Affected module/route/tool: `useSiteContent`, About page, Navigation header avatar
- Issue reference: Linear `MYK-26`, GitHub `#88`

## 2026-02-25 11:54:20 EET
- Type: Improvement
- Title: Centralize external endpoint URLs in env-driven config layer
- Summary: Replaced hardcoded remote API hosts in blog, portfolio, audio, testimonial, services, fun facts, and weather modules with `src/config/remoteEndpoints.js`, added environment override support, and documented optional `VITE_*` endpoint variables in README.
- Affected module/route/tool: `src/config/remoteEndpoints.js`, blog/portfolio composables, Pinia stores, weather widget, `README.md`
- Issue reference: Linear `MYK-28`, GitHub `#89`

## 2026-02-25 11:46:04 EET
- Type: Fix
- Title: Remove frontend Telegram secret env references from docs
- Summary: Completed the MYK-6 cleanup by removing legacy `VITE_TELEGRAM_*` variables from README examples and keeping the documented contact flow on Worker proxy endpoint plus server-side Cloudflare secrets only.
- Affected module/route/tool: Documentation (`README.md`), contact delivery setup docs
- Issue reference: Linear `MYK-6`, GitHub `#65`

## 2026-02-25 11:40:08 EET
- Type: Improvement
- Title: Enable dev refresh for site-content without manual reload
- Summary: Added dev-only cache busting and lightweight polling for shared site-content loaders so JSON edits are re-fetched during local development while production caching behavior remains unchanged.
- Affected module/route/tool: `useSiteContent`, `useAboutPage`, navigation avatar content fetch
- Issue reference: Linear `MYK-34`, GitHub `#97`

## 2026-02-25 11:21:16 EET
- Type: Refactor
- Title: Move Home hero rotating text content from homeData.js to JSON
- Summary: Moved Home hero display name and rotating title strings to `site-content.json` and refactored `homeData.js` into a rotation-only composable that consumes a reactive titles list.
- Affected module/route/tool: Home hero (`/`), `homeData.js`, `HomeComponent.vue`, `site-content.json`
- Issue reference: Linear `MYK-85`, GitHub `#105`

## 2026-02-25 11:14:26 EET
- Type: Improvement
- Title: Improve Home hero toolkit panel readability
- Summary: Reworked the Home hero toolkit panel to show top technologies by default and moved the full list behind an expand/collapse action, removing duplicated pill rendering in the default state.
- Affected module/route/tool: Home page hero panel (`/`), `HomeHeroSection.vue`, `home-content/style.scss`
- Issue reference: Linear `MYK-84`, GitHub `#104`

## 2026-02-25 11:10:28 EET
- Type: Refactor
- Title: Split Home page into presentational sections
- Summary: Decomposed `HomeComponent.vue` into section components (Hero, Values, Workflow, CTA) and moved fallback home copy to a dedicated module while preserving JSON-driven content and current UI.
- Affected module/route/tool: Home page (`/`), `home-content/*`
- Issue reference: Linear `MYK-83`, GitHub `#103`

## 2026-02-25 11:05:31 EET
- Type: Refactor
- Title: Move Home page default text to site-content JSON
- Summary: Extracted Home page static copy (hero, values, workflow, CTA, and fallback toolkit labels) from `HomeComponent.vue` into `public/data/site-content.json` and kept fallback values in the component for safe rendering.
- Affected module/route/tool: Home page (`/`), `HomeComponent.vue`, `site-content.json`
- Issue reference: Linear `MYK-82`, GitHub `#102`
