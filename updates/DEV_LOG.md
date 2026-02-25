# Dev Log

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
