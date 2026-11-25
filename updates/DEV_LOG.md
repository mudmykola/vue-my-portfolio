# Dev Log

## 2026-11-25

- Type: Improvement
- Title: Redesign the Home About preview
- Summary: Recomposed the section into a responsive portrait, About copy with a verified five-item technology line, and three principle rows with consistent emerald icons and dividers. Kept the existing content and About route link.
- Affected module/route/tool: `src/components/home-content/HomeValuesSection.vue`, `src/components/home-content/HomeComponent.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: #140
- Validation: 22 tests passed; Vite production build and Nuxt production build passed; browser layout checked at 1440, 1024, 768, 390 and 320px with no horizontal overflow; `git diff --check` and scoped Prettier check passed. No commit, push or deploy.

- Type: Improvement
- Title: Refocus the Home Hero description on commerce outcomes
- Summary: Replaced the Hero description with client-focused copy about turning complex commerce requirements into fast, reliable storefronts, naming Shopify, Vue and Nuxt.
- Affected module/route/tool: `public/data/site-content.json`, `src/components/home-content/homeFallbackContent.js`, `/`
- Issue reference: #70
- Validation: JSON parse and copy consistency check, Nuxt production build, `git diff --check`. No commit, push or deploy.

- Type: Fix
- Title: Prevent Home Hero title and architecture overlap
- Summary: Removed the desktop no-wrap collision, made the headline size and wrap within its grid column, stacked the Hero before the diagram at tablet widths, and extended/clipped the diagram background to contain its routes.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `/`
- Issue reference: #70
- Validation: Playwright viewport checks at MacBook, tablet and mobile widths; production build; `git diff --check`. No commit, push or deploy.

- Type: Improvement
- Title: Refocus the Home Hero headline on commerce development
- Summary: Replaced the Home Hero headline with “Thoughtful development for modern commerce.” in both the primary content source and fallback copy.
- Affected module/route/tool: `public/data/site-content.json`, `src/components/home-content/homeFallbackContent.js`, `/`
- Issue reference: #70
- Validation: JSON parse and copy consistency check, `git diff --check`. No commit, push or deploy.

- Type: Fix
- Title: Rebalance Hero architecture tree geometry
- Summary: Rebuilt the visible node layout into a symmetric 14% / 50% / 86% composition and synchronized all route endpoints with the icon centres to remove edge drift and crooked connections.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-reported crooked architecture tree screenshot
- Validation: 22 tests, Nuxt production build, `git diff --check`, mobile fallback. No commit, push or deploy.

- Type: Fix
- Title: Rebuild architecture icon endpoint alignment
- Summary: Repositioned the technology icons into a symmetrical safe-area layout and rewrote the SVG route endpoints to match the actual icon centres, preventing edge clipping and side-entering connections.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-reported architecture screenshot alignment issue
- Validation: 22 tests, Nuxt production build, `git diff --check`. No commit, push or deploy.

- Type: Fix
- Title: Lock architecture icons to connection endpoints
- Summary: Mapped each icon node centre to its SVG viewBox endpoint and corrected the route coordinates so connections meet Vue, Nuxt, Figma, API, Shopify and Cloudflare precisely.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-reported gaps between architecture lines and icons
- Validation: 22 tests, Nuxt production build, `git diff --check`, mobile fallback. No commit, push or deploy.

- Type: Fix
- Title: Remove technology frames and align architecture routes
- Summary: Reduced architecture nodes to clean icon-only marks, removed card borders and text frames, and adjusted route endpoints to terminate at the centre of each icon.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested icon-only architecture presentation
- Validation: 22 tests, Nuxt production build, `git diff --check`, mobile fallback. No commit, push or deploy.

- Type: Fix
- Title: Align icon-only architecture nodes with SVG connections
- Summary: Removed visible technology labels from the board, standardized all node dimensions and repositioned nodes so connection endpoints target the icon centres instead of entering from the side.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-reported technology labels and misaligned Vue connector
- Validation: 22 tests, Nuxt production build, `git diff --check`, mobile fallback. No commit, push or deploy.

- Type: Fix
- Title: Separate architecture nodes from Hero console
- Summary: Repositioned the architecture board into clear top, side and bottom levels, reduced the central console footprint and kept every technology card outside the console surface.
- Affected module/route/tool: `src/components/home-content/style.scss`, `/`
- Issue reference: User-reported technology cards overlapping the console
- Validation: 22 tests, Nuxt production build, `git diff --check`, mobile layout fallback. No commit, push or deploy.

- Type: Fix
- Title: Keep architecture board fully visible in Hero
- Summary: Removed the desktop stage overhang that clipped right-side nodes and reduced the console height/width so the complete architecture board remains readable inside the Hero visual without a large empty console area.
- Affected module/route/tool: `src/components/home-content/style.scss`, `/`
- Issue reference: User-reported clipped architecture board screenshot
- Validation: 22 tests, Nuxt production build, `git diff --check`. No commit, push or deploy.

- Type: Refactor
- Title: Consolidate Hero visual into architecture board
- Summary: Wrapped the entire Hero visual in one bounded `.architecture-board`, moved backdrop, SVG connections, animated dots, equal-sized technology nodes and central code-window inside it, and removed the standalone technology rail.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested architecture board composition
- Validation: 22 tests, Nuxt production build, `git diff --check`, mobile safe-area and reduced-motion fallback. No commit, push or deploy.

- Type: Refactor
- Title: Replace Hero tree with technology architecture map
- Summary: Replaced the tree leaves with equal-sized architecture nodes for Figma, TypeScript, Vue, Nuxt, REST / GraphQL, Shopify and Cloudflare; connected them with animated SVG routes and moving data dots around the console core.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/HomeComponent.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested icon-based technology architecture
- Validation: 22 tests, Nuxt production build, `git diff --check`, mobile and reduced-motion fallbacks. No commit, push or deploy.

- Type: Improvement
- Title: Render technology icons in the Hero tree
- Summary: Replaced text-only stack leaves with technology icons driven by the verified toolkit: JavaScript, GitHub, Figma, Cloudflare, Shopify, API/state icons and a TypeScript monogram; labels remain available for clarity.
- Affected module/route/tool: `src/components/home-content/HomeComponent.vue`, `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested technology icons inside the tree
- Validation: 22 tests, Nuxt production build, `git diff --check`, reduced-motion fallback. No commit, push or deploy.

- Type: Improvement
- Title: Add verified stack leaves to the Hero tree
- Summary: Connected the Hero tree to the existing toolkit data and added confirmed leaves for TypeScript, JavaScript, REST / GraphQL, Pinia / Vuex, Shopify Liquid, Cloudflare Workers, Git / GitHub and Figma with phased loop highlighting.
- Affected module/route/tool: `src/components/home-content/HomeComponent.vue`, `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested expanded technology tree
- Validation: 22 tests, Nuxt production build, `git diff --check`, mobile and reduced-motion fallback. No commit, push or deploy.

- Type: Improvement
- Title: Add a looping data-flow animation to the Hero tree
- Summary: Expanded the tree with multiple branch levels, component/render/storefront nodes and a continuous emerald data-flow loop that returns to the console root; reduced motion disables all loop animation.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested larger animated technology tree
- Validation: 22 tests, Nuxt production build, `git diff --check`, mobile and reduced-motion CSS fallback. No commit, push or deploy.

- Type: Improvement
- Title: Complete the Hero technology tree epic
- Summary: Removed the faint circuit-frame treatment and made the tree visually dominant with a strong trunk, branching paths, terminal twigs, connected technology leaves and staged entrance animation.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested full IT tree implementation
- Validation: 22 tests, Nuxt production build, `git diff --check`, reduced-motion fallback. No commit, push or deploy.

- Type: Improvement
- Title: Build a full Hero technology tree
- Summary: Reworked the console background into a proper trunk-and-branches composition with a CORE root, Vue/Nuxt upper branches, Shopify lower branch, terminal twigs and technology badges placed at the leaves.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested full IT tree concept
- Validation: 22 tests, Nuxt production build, `git diff --check`, responsive and reduced-motion CSS fallback. No commit, push or deploy.

- Type: Improvement
- Title: Add an animated IT tree around Hero console
- Summary: Added a reusable SVG circuit-tree behind the console with a root node, branching technology paths and staged node entrance, while keeping the layer decorative, non-interactive and reduced-motion safe.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested animated technology tree concept
- Validation: 22 tests, Nuxt production build, `git diff --check`, reduced-motion CSS fallback. No commit, push or deploy.

- Type: Improvement
- Title: Refine Home Hero technology kicker
- Summary: Turned the raw technology string into a structured stack marker with a sequence index, emerald signal, separate technology items and restrained separators while preserving the existing content source.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested Hero kicker refinement
- Validation: 22 tests, Nuxt production build, `git diff --check`. No commit, push or deploy.

- Type: Improvement
- Title: Recompose Hero technology rail around console
- Summary: Replaced the isolated bottom rail with an asymmetric console constellation: Shopify, Vue and Nuxt now sit in connected badge surfaces around the editor on desktop and return to a safe three-column layout on mobile.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested technology icon composition refinement
- Validation: 22 tests, Nuxt production build, `git diff --check`, responsive CSS review. No commit, push or deploy.

- Type: Improvement
- Title: Make Hero console read as a real editor
- Summary: Expanded the animated Vue/Nuxt snippet with line numbers, richer component code, a file/runtime label and a build command status so the console has a clear working state instead of empty space.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested console refinement
- Validation: 22 tests, Nuxt production build, `git diff --check`. No commit, push or deploy.

- Type: Fix
- Title: Give Hero console a visibly larger desktop footprint
- Summary: Expanded the Hero grid allocation and allowed the console stage to overhang its column into the empty center space, making the right-side visual materially larger rather than only increasing internal font sizes.
- Affected module/route/tool: `src/components/home-content/style.scss`, `/`
- Issue reference: User-reported Hero scale was still too small
- Validation: 22 tests, Nuxt production build, `git diff --check`. No commit, push or deploy.

- Type: Improvement
- Title: Scale up animated Hero console
- Summary: Increased the right-side console scene, code-window dimensions, code legibility and technology rail scale so the visual carries more weight on wide desktop screens without changing the mobile containment rules.
- Affected module/route/tool: `src/components/home-content/style.scss`, `/`
- Issue reference: User-reported Hero visual was too small
- Validation: 22 tests, Nuxt production build, `git diff --check`, responsive CSS review. No commit, push or deploy.

- Type: Refactor
- Title: Replace Home Hero portrait with animated console scene
- Summary: Removed the problematic portrait composition and rebuilt the right Hero column around a large animated code console, restrained technical grid, pipeline lines and a LIVE BUILD status marker.
- Affected module/route/tool: `src/components/home-content/HomeComponent.vue`, `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested alternative Hero direction
- Validation: 22 tests, Nuxt production build, `git diff --check`, responsive CSS review. No commit, push or deploy.

- Type: Refactor
- Title: Reframe Home Hero portrait composition
- Summary: Replaced the composite person-with-console presentation with the real portrait asset in an editorial frame and separated the animated code window into an independent interface surface.
- Affected module/route/tool: `src/components/home-content/HomeComponent.vue`, `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested alternative Hero portrait direction
- Validation: 22 tests, Nuxt production build, `git diff --check`, responsive CSS review. No commit, push or deploy.

- Type: Improvement
- Title: Refine Home Hero portrait presentation
- Summary: Kept the coherent composite portrait with correctly held console, then improved its stage isolation, responsive scale, emerald backlight and subtle grounding shadow without introducing a detached layered panel.
- Affected module/route/tool: `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested Hero portrait refinement
- Validation: 22 tests, Nuxt production build, `git diff --check`, asset geometry review. No commit, push or deploy.

- Type: Improvement
- Title: Optimize Home Hero composition
- Summary: Refined the Hero viewport rhythm, responsive two-column proportions, headline scale, portrait stage, console legibility and technology rail spacing while preserving the approved content and visual direction.
- Affected module/route/tool: `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested Home Hero optimization
- Validation: 22 tests, Nuxt production build, `git diff --check`, responsive CSS review for desktop/tablet/mobile. No commit, push or deploy.

- Type: Fix
- Title: Keep Hero code preview complete on first paint
- Summary: Initialized the SSR Hero code preview with the complete snippet and delayed the typewriter reset so the first screen never shows an empty console during hydration.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `/`
- Issue reference: User-reported first-screen Hero review
- Validation: 22 tests, Nuxt production build, desktop/mobile checks, no page overflow, and `git diff --check` passed. No commit, push or deploy.

- Type: Fix
- Title: Restore coherent Hero composite artwork
- Summary: Reverted Home to the original composite character asset after visual review showed the generated standalone cutout made the HTML console appear detached from the hands. Preserved the new transparent person asset separately for a future layered/WebM implementation and removed the duplicate CSS panel treatment from the current composite mode.
- Affected module/route/tool: `src/components/home-content/HomeComponent.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-reported broken Hero visual composition
- Validation: Desktop/mobile browser review, coherent console/hand alignment, no page overflow, no browser console errors, `git diff --check` passed. No commit, push or deploy.

- Type: Fix
- Title: Restore Hero composition after character asset replacement
- Summary: Constrained the taller transparent character asset to a responsive portrait stage with contain-fit sizing, restored the Hero height rhythm and reserved bottom space for the technology rail so the new person, console and rail no longer stretch or overlap.
- Affected module/route/tool: `src/components/home-content/style.scss`, `/`
- Issue reference: User-reported broken Home Hero after asset replacement
- Validation: Desktop/mobile Playwright screenshots, controlled stage geometry, no page overflow, no browser console errors, 22 tests, Nuxt production build and `git diff --check` passed. No commit, push or deploy.

- Type: Feature
- Title: Separate Hero character from code console
- Summary: Added a new transparent `hero-mykola-person.png` cutout with the recognizable Mykola portrait, torso, arms and hands without a baked-in console. Home now renders the console as an independent HTML/CSS layer, making the character and interface separately controllable for future animation.
- Affected module/route/tool: `public/images/hero-mykola-person.png`, `src/components/home-content/HomeComponent.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested editable Hero character asset
- Validation: 22 tests, Nuxt production build, desktop/mobile Playwright checks, asset load verification, panel containment and overflow checks, no browser console errors, and `git diff --check` passed. Legacy `hero-mykola-console.webp` retained as rollback only. No commit, push or deploy.

- Type: Improvement
- Title: Add Hero character motion orchestration
- Summary: Added a Vue/Web Animations state sequence for the existing hero artwork: wave, console open, live typing, console close and idle. The sequence runs once on entry and can replay on pointer re-entry; reduced motion disables transforms while preserving the content state.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested animated Hero character
- Validation: 22 tests, Nuxt production build, Playwright state checks across desktop/mobile, no code/page overflow, no browser console errors, and `git diff --check` passed. Natural hand articulation remains limited by the current flattened WebP asset; no commit, push or deploy.

- Type: Improvement
- Title: Rebuild Home hero code window as live typewriter preview
- Summary: Replaced the static snippet with a continuously typed Vue/Nuxt storefront preview. The code resets and types again, the caret follows the active line, pipeline stages update from component to storefront, and the reduced-motion preference switches to a complete static state.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested code-window redesign and continuous typing effect
- Validation: 22 tests, Nuxt production build, desktop/tablet/mobile containment checks, reduced-motion check, no page/code overflow, no browser console errors, and `git diff --check` passed. No commit, push or deploy.

- Type: Fix / Improvement
- Title: Align and animate Home hero code window
- Summary: Anchored the code overlay to the actual composited portrait stage using the console panel proportions, added safe internal padding and kept the full process inside the panel. The progress animation now runs through two visible phases while reduced motion still renders a static completed state.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-reported code-window overflow and missing animation
- Validation: 22 tests, Nuxt production build, desktop/mobile Playwright containment checks, code-window/page overflow checks, no browser console errors, and `git diff --check` passed. No commit, push or deploy.

- Type: Improvement
- Title: Refine Home hero code window process preview
- Summary: Reworked the decorative console into a compact storefront pipeline preview with a real Vue/Nuxt snippet, LIVE/file status, three animated stages and a completed ready state. Tightened the overlay to the composited panel bounds and added reduced-motion fallbacks.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-approved Home hero code-window refinement
- Validation: 22 tests, Nuxt production build, desktop/mobile Playwright checks, code-window and page overflow checks, no browser console errors, and `git diff --check` passed. No commit, push or deploy.

- Type: Improvement
- Title: Add restrained meteor signals to Home hero
- Summary: Added a reusable, aria-hidden meteor field with seven small emerald particles, varied short diagonal trajectories and subtle tails. The effect is one-shot, pointer-free, right-weighted to keep the copy and CTAs clear, reduced on mobile and disabled for reduced-motion users.
- Affected module/route/tool: `src/components/home-content/HeroMeteorField.vue`, `src/components/home-content/HomeHeroSection.vue`, `/`
- Issue reference: User-approved Home hero particle effect
- Validation: 22 tests, Nuxt production build, desktop/mobile Playwright checks, reduced-motion check, no horizontal overflow, no browser console errors, and `git diff --check` passed. No commit, push or deploy.

- Type: Improvement
- Title: Customize hero from approved reference
- Summary: Replaced the rotating hero title with the static “From components to commerce storefronts.” hierarchy and added the existing local portrait, code-editor panel and Vue → Nuxt → Shopify technology rail.
- Affected module/route/tool: `src/components/home-content`, `/`
- Issue reference: User-provided hero reference
- Validation: 22 tests, Nuxt production build and `git diff --check` passed. Browser automation was unavailable in this environment.

- Type: Fix
- Title: Keep Home hero code inside console frame
- Summary: Constrained the decorative code overlay to the hero visual and enabled safe wrapping inside `pre/code`, eliminating the mobile frame overflow without changing the hero content or route behavior.
- Follow-up: Matched the overlay's scale and position to the composited console bounds and shortened the decorative snippet so it remains visually inside the panel.
- Affected module/route/tool: `src/components/home-content/style.scss`, `/`
- Issue reference: User-reported Home hero overflow
- Validation: 22 tests, Nuxt production build, mobile 390px and desktop 1440px Playwright checks, no horizontal overflow, `git diff --check` passed.

- Type: Improvement
- Title: Open up Home hero copy composition
- Summary: Expanded the hero copy column, reduced the grid gap and removed the stale H1 width cap so the approved two-line headline has readable measure and no empty center gap.
- Affected module/route/tool: `src/components/home-content/style.scss`, `/`
- Issue reference: User-reported Home hero composition
- Validation: 22 tests, Nuxt production build, desktop 1440px Playwright check, two-line H1 and no horizontal overflow.

- Type: Improvement
- Title: Refine Home hero technology rail
- Summary: Reduced logo and arrow dominance, aligned the three official brand marks in a consistent visual rhythm, and tightened labels/gaps for a calmer desktop and mobile composition.
- Affected module/route/tool: `src/components/home-content/style.scss`, `/`
- Issue reference: User-reported Home hero technology rail styling
- Validation: 22 tests, Nuxt production build, desktop/mobile Playwright checks and no horizontal overflow.

- Type: Improvement
- Title: Scale Home hero copy for desktop screens
- Summary: Added a desktop-only fluid type scale with `clamp()`, widened the copy measure and increased description size so the left hero column fills the composition without affecting mobile layout.
- Affected module/route/tool: `src/components/home-content/style.scss`, `/`
- Issue reference: User-reported Home hero copy scale
- Validation: 22 tests, Nuxt production build, desktop 1440px and mobile 390px Playwright checks, no horizontal overflow.

- Type: Fix / SEO
- Title: Prevent narrow Hero headline wrapping
- Summary: Expanded the tablet copy measure before the visual stacks, applied a responsive headline size, and refreshed the Hero description with natural Vue, Nuxt, Shopify and headless-commerce search language.
- Affected module/route/tool: `src/components/home-content/style.scss`, `homeFallbackContent.js`, `public/data/site-content.json`, `/`
- Issue reference: User-reported broken Home Hero text
- Validation: 22 tests, Nuxt production build, 976px and 390px Playwright checks, no horizontal overflow.

- Type: Improvement / SEO
- Title: Customize Hero copy line breaks and contrast
- Summary: Locked the desktop/tablet H1 into two intentional lines, reduced the intermediate type scale, and strengthened the dark veil over the signal field behind the text. The Hero description now uses clearer search language for maintainable Vue/Nuxt, Shopify and headless-commerce work.
- Affected module/route/tool: `src/components/home-content/style.scss`, `homeFallbackContent.js`, `public/data/site-content.json`, `/`
- Issue reference: User-provided Home Hero visual feedback
- Validation: 22 tests, Nuxt production build, 976px and 390px Playwright checks, no horizontal overflow.

- Type: Improvement
- Title: Add subdued signal field behind Home hero
- Summary: Added a static SVG circuit field with broken emerald lines, small nodes, a localized halo and a darkening veil behind the hero content. The layer is pointer-free, aria-hidden, responsive and reduced-motion safe.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-approved Home hero effect direction
- Validation: 22 tests, Nuxt production build, desktop/mobile Playwright checks and no horizontal overflow.

- Type: Improvement
- Title: Center and customize Home technology rail
- Summary: Repositioned the technology rail under the hero portrait and replaced hard arrows with restrained connector lines and emerald direction markers between the official brand marks.
- Affected module/route/tool: `src/components/home-content/style.scss`, `/`
- Issue reference: User-reported Home hero technology rail composition
- Validation: 22 tests, Nuxt production build, desktop/mobile Playwright checks and no horizontal overflow.

- Type: Feature
- Title: Implement approved Home hero composition
- Summary: Added the exact hero copy and two-column composition, generated a separate transparent waist-up hero asset with a console, layered readable code markup over it, and replaced placeholder technology marks with official Vue/Shopify brand icons plus the Nuxt Design Kit SVG.
- Affected module/route/tool: `src/components/home-content`, `/`, `public/images/hero-mykola-console.webp`, `public/images/brands/nuxt.svg`
- Issue reference: User-provided approved Home hero reference
- Validation: 22 tests, Nuxt production build, desktop/mobile Playwright QA, navigation/CTA route checks, no horizontal overflow, and `git diff --check` passed. No commit, push or deploy.

- Type: Improvement
- Title: Add selective emerald article and CTA decorations
- Summary: Added reusable static CSS decorations: a soft upper-right arc for article context and two low emerald waves for the final CTA. Both are aria-hidden, pointer-free, layered behind content, responsive and reduced-motion safe.
- Affected module/route/tool: `src/components/shared/DecorativeAccent.vue`, article catch-all route, Home CTA
- Issue reference: User-provided article reference
- Validation: 22 tests, Nuxt production build and `git diff --check` passed. Browser automation was unavailable in this environment.

## 2026-10-09 10:31:45 EEST

- Type: Improvement
- Title: Complete shared Person and WebSite structured data baseline
- Summary: Added a shared configurable profile and identity-node builder for runtime SEO and build-time snapshots. Person profile fields and portrait are consistent across routes, with GitHub/LinkedIn sameAs links; WebSite references Person as publisher. Existing route schema and breadcrumb hooks retained.
- Affected module/route/tool: src/config/structuredData.js, src/config/seo.js, scripts/prerender-route-snapshots.mjs, README.md, tests/seo-structured-data.test.js
- Issue reference: GitHub #115
- Validation: 18 tests and production build passed with the production site URL. Tests exercise six core routes, repeat navigation, one JSON-LD script, graph references and runtime/snapshot identity parity. All six built snapshots checked for one parseable graph with production IDs. No external schema-validator, production proof, commit or deployment.

## 2026-10-09 10:22:28 EEST

- Type: Improvement
- Title: Refresh website profile and resume from October 2026 CVs
- Summary: Updated Home and About copy, services, resume summary and skills; replaced the work timeline with four CV-backed roles and six dated courses; removed duplicate/example roles; refreshed Stony portfolio copy while preserving existing project links and images. NDA identities remain undisclosed. Dynamic experience and PDF downloads preserved.
- Affected module/route/tool: `/`, `/about`, `/resume`, `/portfolio`; public/data/site-content.json, resume.json, portfolio.json
- Issue reference: GitHub #70 (CV content refresh complete; browser QA and other portfolio/link review remain pending)
- Validation: 16 tests and production build passed; JSON structure, unique timeline IDs, local CV links and portfolio image paths verified; git diff --check passed. Browser unavailable in CUA. Existing VITE_SITE_URL warning persists; no deployment.

## 2026-10-09 10:19:03 EEST

- Type: Improvement
- Title: Calculate resume experience years automatically
- Summary: Read both October 2026 CVs and used their January 2022 career start as the configurable experienceStartYear. The subtitle now interpolates completed calendar years (4+ in 2026, 5+ in 2027), with a reactive clock for open-page updates. Added year-boundary and invalid-input tests.
- Affected module/route/tool: `/resume`, ResumeComponent.vue, experienceYears.js, site-content.json
- Issue reference: GitHub #70; this subtitle update is complete, broader content refresh remains In Progress.
- Validation: verification passed with 16 tests and production build; the existing timeline loader remained unchanged. Build warned about an unset production site URL and fallback domain; no deployment.

## 2026-10-09 10:14:03 EEST

- Type: Improvement
- Title: Refresh Vue/Nuxt and Shopify downloadable resumes
- Summary: Replaced both resume PDFs with the October 2026 source files while preserving existing download URLs. Verified PDF signatures, file existence and exact source SHA-256 matches.
- Affected module/route/tool: `/resume`, `public/download/`
- Issue reference: GitHub #70 (resume PDF update complete; broader content refresh remains In Progress)

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

## 2026-11-25

- Type: Feature
- Title: Add technology ping and receive flow to Hero architecture
- Summary: Added the writing → sending → received sequence: the console switches to each technology snippet, its route turns blue, a ping-dot travels to the icon, the node receives an emerald highlight and the next connection begins.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested animated technology transfer interaction
- Validation: 22 tests, Nuxt production build, `git diff --check`, reduced-motion fallback. No commit, push or deploy.

- Type: Feature
- Title: Port portfolio routes and SEO contract to Nuxt
- Summary: Added Nuxt route wrappers for the existing public pages, centralized route SEO metadata and JSON-LD generation, and added SSR-safe guards for weather and clock widgets while preserving the current views and design.
- Affected module/route/tool: Nuxt `app/pages`, `app/composables/usePortfolioSeo.js`, `app/utils/routeSeo.js`, weather/clock widgets, all public routes
- Issue reference: GitHub `#136`

## 2026-11-25

- Type: Feature
- Title: Integrate Shopify Storefront blog into Nuxt
- Summary: Added server-only Shopify Storefront GraphQL endpoints, normalized articles to the existing blog contract, added local fallback data, article routes and Article JSON-LD without exposing Shopify credentials to browser code.
- Affected module/route/tool: Nuxt blog listing/article routes, `/api/blog`, Shopify Storefront GraphQL adapter, blog components and runtime config
- Issue reference: GitHub `#137`

## 2026-11-25

- Type: Feature
- Title: Add architecture-driven Hero code flow
- Summary: Connected the architecture map to the console: the active technology now changes the live snippet and file context, highlights its node, and the SVG data dots animate the transfer paths in a continuous loop.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: User-requested technology-to-code ping flow
- Validation: 22 tests, Nuxt production build, `git diff --check`, reduced-motion fallback. No commit, push or deploy.

- Type: Improvement
- Title: Verify Nuxt shell runtime and SSR routes
- Summary: Verified the Nuxt dev server, all public routes and dynamic blog article SSR; added the Nuxt compatibility date and a deterministic Home display-name fallback to remove the SSR prop warning.
- Affected module/route/tool: Nuxt runtime, `nuxt.config.ts`, Home SSR fallback, public routes
- Issue reference: GitHub `#138`

## 2026-11-25 — Design system foundation

- Type: Refactor / Improvement
- Title: Establish the shared Mykola Mud portfolio design system
- Summary: Recorded the user-provided dark graphite and emerald design system and implemented its shared tokens, typography baseline, Nuxt shell, common header/navigation, accessible mobile menu, button states, focus treatment and reduced-motion support.
- Module/routes: global styles, layout shell, shared navigation, all routes
- Issue reference: Migration epic #134 / user design-system brief

## 2026-11-25 — Home reference redesign

- Type: Improvement
- Title: Rebuild Home around the supplied portfolio reference
- Summary: Added the reference-led Home composition with a focused hero, Vue code preview, real profile content, expertise strip, workflow, selected portfolio work and CTA. Content remains sourced from existing JSON data and portfolio assets.
- Module/routes: `src/components/home-content`, `/`
- Validation: Nuxt production build, 22 tests, desktop/mobile browser snapshots and `git diff --check` passed.

## 2026-11-25 — Hero visual refinement

- Type: Improvement
- Title: Replace hero placeholder with real portfolio work
- Summary: Replaced the synthetic code preview and blobs with a real Airmazing portfolio screenshot in an accessible browser frame, keeping only restrained geometric emerald accents.
- Module/routes: `src/components/home-content`, `/`
- Validation: Nuxt production build, 22 tests, desktop browser snapshot and `git diff --check` passed.

## 2026-11-25 — Component inventory foundation

- Type: Feature / Refactor
- Title: Add the live portfolio design system inventory
- Summary: Added `/design-system` with color, type, button, form, selection, navigation, feedback, surface, icon, spacing, radius/shadow and motion states. Recorded the reusable component inventory and adoption rules in `docs/design-system.md`.
- Module/routes: `src/components/design-system`, `/design-system`, global tokens
- Validation: Nuxt production build, 22 tests, desktop/mobile browser snapshots and `git diff --check` passed.
