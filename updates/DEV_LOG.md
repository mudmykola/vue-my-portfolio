# Dev Log

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
