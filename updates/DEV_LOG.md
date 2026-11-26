# Dev Log

## 2026-11-26

- Type: Improvement
- Date/time: 2026-11-26 23:04 Europe/Kyiv
- Title: Use Shopify blog tags and author across Blog
- Summary: Scoped the list query to the configured Shopify blog (`blog-post` by default), requested `authorV2.name`, and normalized author plus trimmed tags. Blog topics now include all unique tags with case-insensitive de-duplication; filters match any tag and search includes tags and author. Added author bylines to featured/list metadata, preview modal, and article detail page while retaining legacy category fallback.
- Affected module/route: `server/utils/shopifyBlog.js`, `server/api/blog/index.get.js`, `nuxt.config.ts`, `src/components/blog/usePosts.js`, `BlogItemComponent.vue`, `BlogPostModal.vue`, `app/pages/[...slug].vue`, `/blog`
- Issue reference: #165
- Validation: `npm run build` and scoped Prettier/`git diff --check` passed; Shopify Storefront GraphQL validator accepted the query for API `2026-10`. Cloudflare preview fetched the `blog-post` handle and returned a Shopify article with 7 tags and author `Mykola Mud'`. Browser confirmed topic filtering, author search, byline in the preview and article page, and no horizontal overflow at 1440, 1024, 768, 390, and 320px; console errors: 0. Production deployment not performed.

- Type: Improvement
- Date/time: 2026-11-26 22:45 Europe/Kyiv
- Title: Customize the Blog page to match the editorial reference
- Summary: Reworked `/blog` into an editorial layout with an Insights intro and counts, a featured article index, compact filters, numbered article rows, pagination, and a Home-styled contact CTA. Added a page-local loading skeleton while preserving filters, article routes, and modal previews.
- Affected module/route: `src/components/blog/BlogComponent.vue`, `BlogItemComponent.vue`, `style.scss`, `usePosts.js`, `/blog`
- Issue reference: #164
- Validation: Cloudflare/Nitro `npm run build` passed; scoped Prettier and `git diff --check` passed. The built Wrangler preview rendered matching SSR and client markup without browser errors. Checked filter, search, pagination, modal/Escape behavior, and responsive widths 1440, 1024, 768, 390, and 320px. The already-running Nuxt dev server on port 3000 continued serving stale SSR markup; built preview was clean. No deployment performed.

- Type: Fix
- Date/time: 2026-11-26 22:02 Europe/Kyiv
- Title: Keep header navigation styled on reload
- Summary: Nuxt dev initially rendered the header before component CSS was injected, briefly showing both navigation modes in the default left-aligned flow. Added a small render-blocking public stylesheet for the shared header structure and connected it to Nuxt and Vite.
- Affected module/route/tool: `public/styles/critical-navigation.css`, `nuxt.config.ts`, `index.html`, all routes
- Issue reference: #163
- Validation: Nuxt and Vite production builds passed. Direct Nuxt reload checks at 1440, 1024, 390, and 320px and Vite reload checks at the same widths confirm the desktop links and mobile menu switch at the intended breakpoint with no horizontal overflow. Critical stylesheet returned HTTP 200 in both dev servers. Prettier and `git diff --check` passed. Production deployment not performed.

- Type: Improvement
- Date/time: 2026-11-26 21:43 Europe/Kyiv
- Title: Refresh the site favicon
- Summary: Replaced the plain M tile with a compact angular M monogram in the site’s emerald palette. Added SVG, multi-size ICO, and Apple touch icon assets, with explicit references for both Nuxt and Vite.
- Affected module/route/tool: `public/favicon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png`, `index.html`, `nuxt.config.ts`, all routes
- Issue reference: #162
- Validation: `npm run build:vite` and `npm run build` passed. Confirmed ICO includes 16, 32, 48, and 64px sizes and the Apple icon is 180px. Visual asset preview inspected; production deployment not performed.

## 2026-11-26

- Type: Improvement
- Date/time: 2026-11-26 21:30 Europe/Kyiv
- Title: Add a layout-matched Portfolio loading state
- Summary: Added an immediate Portfolio-page skeleton for filters and six project previews, reserving the responsive card layout while Shopify data loads. The initial state is page-local, so Home behavior is unchanged; reduced-motion support remains in place.
- Affected module/route/tool: `src/components/portfolio/PortfolioComponent.vue`, `src/components/portfolio/PortfolioItemComponent.vue`, `src/components/portfolio/style.scss`, `/portfolio`
- Issue reference: #67
- Validation: `npm run verify` passed (29 tests and Nuxt Cloudflare Worker build); `npm run build:vite`, scoped Prettier, and `git diff --check` passed. Browser confirmed the populated Portfolio page after data load. A delayed API visual check was not performed; production deployment was not performed.

## 2026-11-26

- Type: Improvement
- Date/time: 2026-11-26 21:09 Europe/Kyiv
- Title: Cut Nuxt over to Cloudflare runtime bindings
- Summary: Made Nuxt/Nitro `cloudflare_module` the default build and preview target. Shopify credentials are now runtime-only Cloudflare bindings and are not compiled into client or server build defaults; the portfolio API serves 10 Shopify products in local Cloudflare preview. Preserved Telegram contact endpoints and added health handling. Nuxt output now includes sitemap/robots. If Shopify returns an empty blog, existing local articles remain available, including article routes. Push CI verifies; production deploy requires a manual workflow dispatch.
- Affected module/route/tool: `nuxt.config.ts`, `wrangler.jsonc`, `server/api/portfolio.get.js`, `server/api/blog/index.get.js`, `server/api/blog/[handle].get.js`, `server/api/contact.post.js`, `server/routes/contact.post.js`, `server/routes/health.get.js`, `server/utils/contactSubmission.js`, `package.json`, `.github/workflows/deploy-worker.yml`, `/portfolio`, `/blog`, `/api/contact`
- Issue reference: #150
- Validation: `npm run verify` passed (29 tests and Nuxt Cloudflare Worker build); scoped Prettier and `git diff --check` passed. Wrangler local preview returned 10 Shopify products (`source: shopify`), retained 15 fallback blog articles when Shopify's blog was empty, returned 200 for public routes, health, sitemap, robots and fallback article; malformed contact payload returned 400. Secret token was absent from generated client assets and SSR HTML. Production deployment and production response remain unverified; `.env` remains local-only and ignored by Git.

## 2026-11-26

- Type: Improvement
- Date/time: 2026-11-26 16:07 Europe/Kyiv
- Title: Load Portfolio projects from Shopify collection
- Summary: Added a shared Shopify collection loader for Nuxt and Vite development. Product type drives category filters, tags become technology labels, vendor appears in project details, featured/additional product images populate cards and the gallery, and `custom.project_url` supplies project links. Public and private Storefront token headers are configurable. Nuxt is the default `npm run dev` frontend; Vite dev now serves the same server-side `/api/portfolio` middleware, while static Vite builds keep the local JSON fallback.
- Affected module/route/tool: `package.json`, `README.md`, `vite.config.js`, `src/main.js`, `server/api/portfolio.get.js`, `server/utils/shopifyPortfolio.js`, `server/utils/shopifyBlog.js`, `app/plugins/portfolio-source.js`, `src/components/portfolio/usePortfolioPage.js`, `src/components/portfolio/PortfolioItemComponent.vue`, `/` and `/portfolio`
- Issue reference: #160
- Validation: All 29 tests passed; Storefront GraphQL query validated against the 2026-10 schema; Nuxt production build and Vite static build passed; `git diff --check` and Prettier passed. Browser verified `/portfolio` on both Nuxt (`localhost:3000`) and the requested Vite URL (`localhost:5173`): each renders 10 Shopify products, and Mud Tech Blog opens its `custom.project_url`. Direct read-only query confirmed the metafield is publicly readable on 2 products. The token and URL values were not printed.

## 2026-11-26

- Type: Improvement
- Date/time: 2026-11-26 15:16 Europe/Kyiv
- Title: Make Home the shared Portfolio design reference
- Summary: Extracted Home typography and selected-work spacing/radius into shared tokens, applied the same typography, project media, button and CTA styles to `/portfolio`, and reused Home's circuit-and-meteor field behind the Portfolio content. Home keeps its existing responsive type scale.
- Affected module/route/tool: shared design tokens, Home styles, Portfolio listing/dialog/CTA, `/` and `/portfolio`
- Issue reference: #159
- Validation: Production build passed. Browser verified matching Home/Portfolio semantic type sizes and card radius at 1440, 1024, 768, 390 and 320px; no horizontal overflow; shared CTA atmosphere is present; reduced-motion hides meteors; project dialog opens and closes with Escape and restores focus. No tests were run. Existing VITE_SITE_URL and contact API fallback warnings remain. No commit, push or deploy.

- Type: Fix
- Date/time: 2026-11-26 14:54 Europe/Kyiv
- Title: Align Portfolio gutters with the shared header
- Summary: Removed the viewport breakout from the Portfolio content and let its app-content wrapper span the viewport; matched the page’s horizontal gutters to the shared header navigation at every breakpoint.
- Affected module/route/tool: `src/layout/style.scss`, `src/components/portfolio/style.scss`, `/portfolio`
- Issue reference: #159
- Validation: Browser geometry confirms the Portfolio heading and header brand share the same left coordinate at 1440, 1024, 768, 390 and 320px; no horizontal overflow at any tested width. Production build, scoped Prettier and `git diff --check` passed. Existing VITE_SITE_URL and contact API fallback warnings remain. No tests were run. No commit, push or deploy.

- Type: Improvement
- Date/time: 2026-11-26 14:48 Europe/Kyiv
- Title: Rebuild the Portfolio case-study layout
- Summary: Replaced the uniform project grid with a wide first case, a two-column case grid and a full-row final case when needed. Added the Selected work header, responsive filter toolbar and contact CTA. Refined project details into a gallery-first dialog with thumbnail navigation, focus containment/restoration, Escape/backdrop close and scroll locking.
- Affected module/route/tool: `src/components/portfolio/PortfolioComponent.vue`, `src/components/portfolio/PortfolioItemComponent.vue`, `src/components/portfolio/style.scss`, `/portfolio`
- Issue reference: #159
- Validation: Production build, scoped Prettier, `git diff --check` and browser verification passed. Confirmed six projects, working category filters, image selection, focus loop/restoration, Escape close and no horizontal overflow at 1440, 1024, 768, 390 and 320px; mobile dialog remains scrollable and reduced motion removes transitions. No tests were run. Build retains existing `VITE_SITE_URL` and contact URL fallback warnings. No commit, push or deploy.

- Type: Improvement
- Date/time: 2026-11-26 14:16 Europe/Kyiv
- Title: Move Back to top into a floating control
- Summary: Removed the persistent Back to top link from the footer row. Added a fixed arrow that appears after 400px of scrolling, leaves the fixed mobile navigation clear, and is removed from keyboard navigation while hidden.
- Affected module/route/tool: `src/components/shared/SiteFooter.vue`, all routes
- Issue reference: #158
- Validation: Production build, scoped Prettier, `git diff --check`, and browser checks passed. The control hides at 399px, appears at 401px, returns to `#page-top`, respects reduced motion, and clears mobile navigation at 390px and 320px; no horizontal overflow at 1440, 1024, 768, 390 or 320px. No tests were run. Build retains the existing `VITE_SITE_URL` and contact URL fallback warning. No commit, push or deploy.

- Type: Fix
- Date/time: 2026-11-26 14:06 Europe/Kyiv
- Title: Replace footer outlines with a fog halo
- Summary: Removed the crisp idle ring from footer social links and replaced it with a blurred radial halo that fades softly into the background; hover/focus brightens the mist while icons stay sharp.
- Affected module/route/tool: `src/components/shared/SiteFooter.vue`, all routes
- Issue reference: #158
- Validation: Production build, scoped Prettier and `git diff --check` passed. Browser confirmed a transparent border, diffuse halo, crisp icon glyphs, no horizontal overflow at 320px, and no transition or movement under reduced motion. No tests were run. Build retains the existing `VITE_SITE_URL` and contact URL fallback warning. No commit, push or deploy.

- Type: Improvement
- Date/time: 2026-11-26 14:01 Europe/Kyiv
- Title: Soften the footer social borders
- Summary: Added a restrained emerald halo around the social-link borders and a slightly brighter hover/focus glow while keeping the icon artwork crisp.
- Affected module/route/tool: `src/components/shared/SiteFooter.vue`, all routes
- Issue reference: #158
- Validation: Production build, scoped Prettier and `git diff --check` passed. Browser confirmed the border glow, sharp icon color, and reduced-motion hover state with no transition or movement. No tests were run. Build retains the existing `VITE_SITE_URL` and contact URL fallback warning. No commit, push or deploy.

- Type: Improvement
- Date/time: 2026-11-26 13:58 Europe/Kyiv
- Title: Add a subtle circuit close to the Home CTA
- Summary: Extended the existing Hero circuit into two low-opacity CTA edge traces with three junction nodes, and added a soft emerald radial glow with a restrained inset shadow. Reused the current meteor field and cadence.
- Affected module/route/tool: `src/components/home-content/HomeArtifactField.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: #158
- Validation: Production build, scoped Prettier and `git diff --check` passed. Browser confirmed two traces and three nodes, no horizontal overflow at 1440, 1024, 768, 390 and 320px, and meteor motion is hidden under reduced motion. No tests were run. Build retains the existing `VITE_SITE_URL` and contact URL fallback warning. No commit, push or deploy.

- Type: Fix
- Date/time: 2026-11-26 13:50 Europe/Kyiv
- Title: Align the footer with Home section edges
- Summary: Expanded the footer inner container and copyright row to match the exact horizontal boundaries of `section-cta` and `section-selected-work` at desktop, tablet and mobile widths.
- Affected module/route/tool: `src/components/shared/SiteFooter.vue`, all routes
- Issue reference: #158
- Validation: Browser geometry at 1440, 1024, 768, 390 and 320px confirms exact left/right alignment with Home sections and no horizontal overflow. Production build, scoped Prettier and `git diff --check` passed. Build retains the existing `VITE_SITE_URL` and contact URL fallback warning. No tests were run. No commit, push or deploy.

- Type: Improvement
- Date/time: 2026-11-26 13:45 Europe/Kyiv
- Title: Compact and redistribute the shared footer
- Summary: Removed the identity block, put all six route links in one responsive navigation, kept social links at the opposite edge and spread copyright/Back to top across the bottom row. Reduced footer height to about 119px on desktop and 208px on mobile.
- Affected module/route/tool: `src/components/shared/SiteFooter.vue`, all routes
- Issue reference: #158
- Validation: Production build, scoped Prettier and `git diff --check` passed. Browser checked 1440, 1024, 768, 390 and 320px; no horizontal overflow, identity block absent, six route links and social links visible. Verified keyboard focus and reduced-motion behavior. No tests were run. Build retains the existing `VITE_SITE_URL` and contact URL fallback warning. No commit, push or deploy.

- Type: Improvement
- Date/time: 2026-11-26 13:40 Europe/Kyiv
- Title: Redesign the shared portfolio footer
- Summary: Expanded the footer into a responsive closing block with owner identity, route links, existing social profiles, a contact link, copyright and Back to top. Kept the existing site palette and reduced-motion behavior.
- Affected module/route/tool: `src/components/shared/SiteFooter.vue`, all routes
- Issue reference: #158
- Validation: Production build, scoped Prettier and `git diff --check` passed. Browser checked 1440, 1024, 768, 390 and 320px with no horizontal overflow; verified route-current state, social links, visible keyboard focus and reduced-motion hover behavior. No tests were run. Build retains the existing `VITE_SITE_URL` and contact URL fallback warning. No commit, push or deploy.

- Type: Improvement
- Date/time: 2026-11-26 13:33 Europe/Kyiv
- Title: Accent the Get In Touch CTA heading
- Summary: Applied the shared emerald accent to the Home CTA H2 only; other section headings keep their existing color.
- Affected module/route/tool: `src/components/home-content/style.scss`, `/`
- Issue reference: #158
- Validation: Production build and `git diff --check` passed. Browser computed style confirms the CTA H2 uses `rgb(24, 214, 160)` and a non-CTA Home H2 retains `rgb(243, 247, 245)`. No tests were run. Build reports the existing `VITE_SITE_URL` / contact URL fallback warning. No commit, push or deploy.

- Type: Improvement
- Date/time: 2026-11-26 13:05 Europe/Kyiv
- Title: Give the Home CTA a circuit-led footer close
- Summary: Kept the CTA framed as the closing panel above the global footer and reused Home’s existing shared circuit-trace and meteor layer. Removed the separate CTA route so the same subtle Hero scheme carries through without duplication.
- Affected module/route/tool: `src/components/home-content/HomeCtaSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: #158
- Validation: Production build and `git diff --check` passed. Browser checks at 1440, 1024, 768, 390 and 320px show no horizontal overflow; the shared circuit and meteor layer remains behind CTA text and controls. Tests were not run. Build retains the existing `VITE_SITE_URL` and contact URL fallback warning. No commit, push or deploy.

- Type: Improvement
- Date/time: 2026-11-26 12:57 Europe/Kyiv
- Title: Add a shared portfolio footer
- Summary: Added a restrained site-wide footer with the current year, owner name, and an emerald Back to top link. The shared layout now lets the main content flex to fill the viewport and reserves space after the footer for the fixed mobile navigation.
- Affected module/route/tool: `src/components/shared/SiteFooter.vue`, `src/layout/MainLayoutComponent.vue`, `src/layout/style.scss`, all routes
- Issue reference: #158
- Validation: Production build and `git diff --check` passed. Browser verified the footer on Home and About, the Back to top anchor, and no horizontal overflow at 1440, 1024, 768, 390 and 320px. Tests were not run. Build retains the existing `VITE_SITE_URL` and contact URL fallback warning. No commit, push or deploy.

- Type: Fix
- Date/time: 2026-11-26 12:48 Europe/Kyiv
- Title: Restore the Selected Work eyebrow accent
- Summary: The shared intro copy rule overrode the global eyebrow color. Set the Selected Work eyebrow explicitly to the shared emerald accent token.
- Affected module/route/tool: `src/components/home-content/style.scss`, `/`
- Issue reference: #157
- Validation: Production build and `git diff --check` passed. No tests were run. No commit, push or deploy.

- Type: Improvement
- Date/time: 2026-11-26 12:44 Europe/Kyiv
- Title: Rebuild the Home Selected Work showcase
- Summary: Moved the section heading above the full-width showcase, switched previews to the supplied project screenshots when available, and styled three equal bordered cards with wide media and a right-aligned all-projects link. The grid adapts from three columns to two and then one.
- Affected module/route/tool: `src/components/home-content/HomeSelectedWorkSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: #157
- Validation: Production build and `git diff --check` passed. Browser checks at 1440, 1024, 768, 390 and 320px show three, three, two and one-column layouts with no horizontal overflow; the 2048px rendering matches the supplied composition. Build reports the existing `VITE_SITE_URL` and contact URL fallback. Tests were not run. No commit, push or deploy.

- Type: Improvement
- Date/time: 2026-11-26 12:34 Europe/Kyiv
- Title: Loop the Home workflow ping while visible
- Summary: Repeats the full 8-second handshake with a pause between pings while the workflow is in view. It pulses 01/02/03, routes through the fading beacon 5px before the terminal, shows `ACK`, then idles. It stops offscreen and restarts on return; mobile uses the vertical stage route and reduced-motion users get the static diagram.
- Affected module/route/tool: `src/components/home-content/HomeWorkflowSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: #155
- Validation: Production build, scoped Prettier and `git diff --check` passed. Browser observed two terminal ACK cycles, confirmed the signal stops offscreen, the branch junctions align with a 5px terminal gap, mobile uses the vertical loop, and reduced motion disables animation. Checked widths 1440 and 390px with no horizontal overflow. No commit, push or deploy.

- Type: Improvement
- Date/time: 2026-11-26 12:02 Europe/Kyiv
- Title: Match Home Workflow and Expertise section grids
- Summary: Matched the Workflow intro column and H2 width to Expertise, removing the narrower heading cap, and moved its divider to the exact start of the right content column. At tablet widths both sections switch to full-width intros and matching top dividers to keep workflow copy readable.
- Affected module/route/tool: `src/components/home-content/style.scss`, `/`
- Issue reference: #155
- Validation: Browser geometry confirmed both desktop vertical dividers share the same x-coordinate, Workflow and Expertise intro/H2 widths match exactly at 1440/1024/768px, and tablet layouts use matching top dividers. Checked 1440/1024/768/390px with no horizontal overflow; production build, scoped Prettier and `git diff --check` passed. No commit, push or deploy.

- Type: Improvement
- Date/time: 2026-11-26 11:57 Europe/Kyiv
- Title: Align Home workflow with the Expertise grid
- Summary: Kept the reduced terminal at the section's upper-right, aligned stage circles and headings on a shared left edge, and moved the workflow to a full-width layout at tablet widths so descriptions stay readable.
- Affected module/route/tool: `src/components/home-content/HomeWorkflowSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: #155
- Validation: Vite production build, scoped Prettier, `git diff --check`, and browser checks at 1440/1024/768/390/320px passed. Stage circle/title left edges align on desktop, tablet descriptions gain full-width space, and no horizontal overflow. No commit, push or deploy.

- Type: Improvement
- Date/time: 2026-11-26 11:35 Europe/Kyiv
- Title: Unify Home page typography scale
- Summary: Defined one responsive token per semantic text role and applied it across Home section headings, card and step headings, body copy, eyebrows, supporting labels and buttons. Recorded the hierarchy and decorative microtype exception in the design system.
- Affected module/route/tool: `src/components/home-content/style.scss`, `docs/design-system.md`, `/`
- Issue reference: #156
- Validation: Vite production build, scoped Prettier, `git diff --check`, and browser checks at 1440/1024/768/390/320px passed. Matching H2/H3/body/eyebrow/button roles share computed sizes across sections; no horizontal overflow. Build retains the existing `VITE_SITE_URL` and `VITE_CONTACT_API_URL` fallback warning. No commit, push or deploy.

- Type: Improvement
- Date/time: 2026-11-26 11:21 Europe/Kyiv
- Title: Restyle Home workflow as a connected timeline
- Summary: Reworked the Home workflow into a split heading and three-step timeline with connected numbered circles, short heading rules and an upper-right terminal accent. The timeline switches to a vertical connector on narrow screens; copy remains content-driven.
- Affected module/route/tool: `src/components/home-content/HomeWorkflowSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: #155
- Validation: `npm run build`, targeted Prettier, `git diff --check`, and browser checks at 1440, 1024, 768, 390 and 320px passed. The connector aligns with step centers in both layouts; no horizontal overflow. No commit, push or deploy.

- Type: Improvement
- Date/time: 2026-11-26 11:04 Europe/Kyiv
- Title: Pair Home expertise icons with technology names
- Summary: Paired each brand, local Nuxt or semantic icon with its readable technology name, keeping the grouped layout free of icon cards and preserving accessible labels and responsive wrapping.
- Affected module/route/tool: `src/components/home-content/HomeExpertiseSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: #154
- Validation: `npm run build`, targeted Prettier, `git diff --check`, and browser checks at 1440, 1024, 768, 390 and 320px passed. All 21 icon/name pairs render without horizontal overflow. No commit, push or deploy.

- Type: Fix
- Date/time: 2026-11-26 10:31 Europe/Kyiv
- Title: Keep the Home Hero scroll cue visible on short desktop viewports
- Summary: Reduced the Home hero visual area's minimum height and console stage height on wide, short viewports so the complete scroll cue remains in the first screen without overlapping the hero copy.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `/`
- Issue reference: #152
- Validation: `npm run build` passed. Playwright confirmed the cue fits at 1440×900, 1440×768 and 1920×1080, with no horizontal overflow at 1440, 1024, 768, 390 and 320px widths. On widths at or below 1120px, the existing stacked hero keeps the cue below the hero content. No commit, push or deploy.

- Type: Improvement
- Title: Smooth the Home Hero scroll cue transition
- Summary: Added browser-native smooth scrolling while the Home Hero cue is present. The anchor still updates `#section-about` and preserves browser history; reduced-motion users keep immediate scrolling. Other routes retain their existing scroll behavior.
- Affected module/route/tool: `src/assets/style/global-style.scss`, `docs/design-system.md`, `/`
- Issue reference: #149
- Validation: Vite production build, scoped Prettier and `git diff --check` passed. Playwright confirmed smooth progress, the About target sits 96px below the sticky header, the hash and Back/Forward history work, reduced motion switches to `auto`, and 1440/390/320px have no horizontal overflow. Browser console had no errors. Build uses the existing `VITE_SITE_URL` fallback warning. No commit, push or deploy.

- Type: Improvement
- Title: Turn the Home Hero scroll cue into a circuit transition node
- Summary: Replaced the generic small scroll hint with a prominent central node, converging branching traces, a short signal stem and the “Follow the signal” label; increased the gap between the label and node for clearer hierarchy. The keyboard-accessible native anchor targets About; the arrow is static and traveling signal disabled for reduced motion.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/HomeValuesSection.vue`, `src/components/home-content/style.scss`, `docs/design-system.md`, `/`
- Issue reference: #148
- Validation: Vite production build, scoped Prettier and `git diff --check` passed. Playwright checked 1440/1024/768/390/320px: 76px central node and converging rails stay centered, label gap is 14px, and there is no horizontal overflow; focus ring is visible; hover runs the downward signal; anchor reaches About below the sticky header; reduced motion stops animation. Browser console has no errors. Build emitted the existing `VITE_SITE_URL` fallback warning (`https://example.com`). No commit, push or deploy.

- Type: Fix
- Title: Restore the branching Hero circuit connection
- Summary: Restored the original branching SVG circuitry in Home Hero and attached the page-wide circuit spine to its terminal junction so the Hero traces continue into the remaining Home sections.
- Affected module/route/tool: `src/components/home-content/HomeHeroSection.vue`, `src/components/home-content/HomeArtifactField.vue`, `docs/design-system.md`, `/`
- Issue reference: #147
- Validation: Vite production build passed. Playwright visually confirmed the Hero traces are restored and measured the shared spine junction against the SVG terminal at 1440/1024/768/390/320px; both coordinates match exactly at each width, with no horizontal overflow or browser errors. `git diff --check` passed. The existing `VITE_SITE_URL` fallback warning remains. No commit, push or deploy.

- Type: Improvement
- Title: Unify Home atmosphere and keep meteors falling
- Summary: Replaced disconnected Home-only circuit overlays and the one-shot Hero meteor animation with one page-height SVG artifact aligned to live section positions and a sparse, continuously looping meteor field. Reduced motion hides the meteor field; circuit decoration remains static and behind content.
- Affected module/route/tool: `src/components/home-content/HomeArtifactField.vue`, Home sections, `src/components/home-content/style.scss`, `docs/design-system.md`, `/`
- Issue reference: #147
- Validation: Vite production build passed; Playwright checked 1440/1024/768/390/320px with zero horizontal overflow, six correctly positioned section anchors, pointer-free/aria-hidden decoration and fixed meteor positioning during scroll. Confirmed meteor animation repeats infinitely and is hidden for `prefers-reduced-motion`; scoped Prettier and `git diff --check` passed. Build emitted the existing `VITE_SITE_URL` fallback warning (`https://example.com`). No commit, push or deploy.

- Type: Improvement
- Title: Refine Home Expertise intro copy
- Summary: Replaced the generic Expertise headline and repetitive description with concise, search-relevant copy naming Shopify, Vue/Nuxt, custom themes, integrations, performance and maintainability.
- Affected module/route/tool: `src/components/home-content/HomeExpertiseSection.vue`, `/`
- Issue reference: #146
- Validation: Vite production build passed; agent-browser verified the rendered heading/description at 1440px with no horizontal overflow; scoped Prettier and `git diff --check` passed. No commit, push or deploy.

- Type: Improvement
- Title: Remove divider from Home About section
- Summary: Removed the standalone horizontal rule at the bottom of the Home About section and its unused desktop/mobile styles.
- Affected module/route/tool: `src/components/home-content/HomeValuesSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: #145
- Validation: Vite production build passed; browser confirmed `.about-preview__rule` is absent and the Home route has no horizontal overflow; scoped Prettier and `git diff --check` passed. No commit, push or deploy.

- Type: Improvement
- Title: Extend the circuit atmosphere across major sections
- Summary: Extracted the Home Hero circuit field into reusable SVG/CSS section atmosphere variants and applied sparse, static traces with occasional short meteor-like streaks to selected major sections across Home, About, Portfolio, Resume, Blog and Contact. Kept animated meteors exclusive to the Hero and reduced decoration on narrow screens.
- Affected module/route/tool: `src/components/shared/SectionAtmosphere.vue`, Home/About/Portfolio/Resume/Blog/Contact section components, `src/components/home-content/style.scss`, `docs/design-system.md`, `/`, `/about`, `/portfolio`, `/resume`, `/blog`, `/contact`
- Issue reference: #144
- Validation: `npm test` (22 passed), Vite production build and Nuxt production build passed; agent-browser/Playwright checked `/`, `/about`, `/portfolio`, `/resume`, `/blog`, and `/contact` at 1440/1024/768/390/320px with no horizontal overflow, `aria-hidden` SVG layers, and pointer events disabled; About desktop and Contact mobile reviewed visually; reduced-motion hides Home Hero meteors while atmosphere stays static; scoped Prettier and `git diff --check` passed. GitNexus CLI impact refresh was unavailable because npm registry DNS failed; prior indexed impact for the affected page components was LOW and direct usage/imports were confirmed. No commit, push or deploy.

- Type: Improvement
- Title: Redesign Home Expertise around grouped technologies
- Summary: Rebuilt the Expertise section as a two-column editorial layout with a descriptive left column and three source-backed skill groups on the right. Added responsive wrapping and dividers while preserving the existing dark/emerald visual system.
- Affected module/route/tool: `src/components/home-content/HomeExpertiseSection.vue`, `src/components/home-content/style.scss`, `/`
- Issue reference: #143
- Validation: `npm test` (22 passed), Vite and Nuxt production builds passed; agent-browser reviewed the section at 1440/1024/768/390/320px with three 7-item groups and no horizontal overflow; scoped Prettier and `git diff --check` passed. GitNexus impact for the section was LOW; its index is two commits behind and refresh failed on a registry-lock permission error. No commit, push or deploy.

## 2026-11-25

- Type: Fix
- Title: Restore sticky shared header during page scroll
- Summary: Replaced root-level horizontal overflow hiding with clipping, which had created a nested scroll context and prevented the already-sticky shared header from sticking to the document viewport. Recorded the shared header/overflow rule for future work.
- Affected module/route/tool: `src/assets/style/global-style.scss`, shared header, `/`, `/about`, `/portfolio`, `/resume`, `/blog`, `/contact`
- Issue reference: #142
- Validation: `npm test` (22 passed), Vite production build and Nuxt production build passed; agent-browser confirmed the header remains at viewport top at 400px scroll on all six routes and at 1440/1024/768/390/320px, with the mobile menu opening correctly and no horizontal overflow; scoped Prettier and `git diff --check` passed. GitNexus detect-changes reported LOW risk. No commit, push or deploy.

- Type: Improvement
- Title: Add restrained scroll motion across portfolio pages
- Summary: Added a 2px emerald page-progress line and one-time 14px section reveals on selected major content blocks. A mutation observer attaches scenes after async route content mounts; reduced motion disables reveals and hides the progress line. Native scroll and restoration remain untouched.
- Affected module/route/tool: `src/components/shared/PageScrollMotion.vue`, `src/layout/MainLayoutComponent.vue`, `src/components/home-content/HomeValuesSection.vue`, `src/components/home-content/HomeSelectedWorkSection.vue`, `src/components/about/AboutComponent.vue`, `src/components/portfolio/PortfolioItemComponent.vue`, `src/components/resume/ResumeComponent.vue`, `src/components/blog/BlogComponent.vue`, `src/components/contact/ContactComponent.vue`, `AGENTS.md`, `docs/design-system.md`, `/`, `/about`, `/portfolio`, `/resume`, `/blog`, `/contact`
- Issue reference: #141
- Validation: 22 tests passed; Vite and Nuxt production builds passed; agent-browser checked all six routes, scroll progress and reveal states, reduced motion, and 1440/1024/768/390/320px widths without horizontal overflow; no browser errors; `git diff --check` and scoped Prettier passed. No commit, push or deploy.

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

## 2026-11-26 16:31 EET — Portfolio preview refinement

- Type: Improvement
- Title: Keep project screenshots complete and paginate portfolio
- Summary: Added restrained browser frames sized to the supplied 16:10 screenshots, preserving the full image while reducing empty side gutters; the featured project also gets a subtle second-image preview on larger screens. Added six projects per page with compact pagination. Filters reset to page one, page state clamps when result counts change, and projects without images receive a composed empty preview instead of a broken image.
- Module/routes: portfolio cards and featured project, `/portfolio`
- Issue reference: GitHub `#161`
- Validation: 29 tests, Nuxt production build, Vite production build, desktop and 390px browser checks, modal open, `git diff --check`, and Prettier passed. No horizontal overflow at 390px; four missing Shopify images showed the empty preview without broken images.

## 2026-11-26 16:38 EET — Portfolio loading state

- Type: Improvement
- Title: Add a compact Shopify portfolio preloader
- Summary: Replaced the plain loading sentence with a compact emerald status panel and a restrained spinner. The status is announced to assistive technology, stays within the portfolio section, and becomes static for reduced-motion users.
- Module/routes: `PortfolioItemComponent`, `/portfolio`
- Issue reference: GitHub `#161`
- Validation: 29 tests, Vite and Nuxt production builds, Prettier, and `git diff --check` passed.

## 2026-11-26 16:46 EET — Project domains in preview frames

- Type: Improvement
- Title: Show project domains in portfolio browser frames
- Summary: Added a centered, compact domain label to feature and card preview chrome, derived from each Shopify project URL and truncated responsively when space is limited.
- Module/routes: portfolio feature and project cards, `/portfolio`
- Issue reference: GitHub `#161`
- Validation: 29 tests, Vite and Nuxt production builds, desktop and 320px browser checks, Prettier, and `git diff --check` passed. No horizontal overflow at 320px.

## 2026-11-26 17:02 EET — Fill portfolio preview frames

- Type: Improvement
- Title: Give project screenshots more space in portfolio cards
- Summary: Widened the featured screenshot frame and let card screenshots fill their browser frames. Tuned the media ratio closer to the 16:10 Shopify screenshots, preserving full images without harsh cropping.
- Module/routes: portfolio feature and project cards, `/portfolio`
- Issue reference: GitHub `#161`
- Validation: Vite and Nuxt production builds, desktop and 390/320px browser checks, Prettier, and `git diff --check` passed. No horizontal overflow at mobile widths.

## 2026-11-26 17:18 EET — Unify the portfolio project catalog

- Type: Improvement
- Title: Replace the featured-first layout with equal project cards
- Summary: Replaced the oversized featured project and secondary-card layout with one responsive two-column catalog. Each Shopify project now uses the same preview frame, title, type label, description, technology chips, and case-study affordance. Kept six projects per page, filter-driven page reset, domain labels, missing-image fallback, compact loading state, and the accessible project dialog/gallery. Added reduced-motion handling for card hover movement.
- Module/routes: portfolio project catalog, `/portfolio`
- Issue reference: GitHub `#161`
- Validation: 29 tests, Nuxt and Vite production builds, Prettier, `git diff --check`, and browser checks for six projects on page one, four on page two, filter reset, modal open/Escape close, and no horizontal overflow at 1440/1024/768/390/320px.

## 2026-11-26 17:29 EET — Refine portfolio card badges

- Type: Improvement
- Title: Separate project types from technology tags
- Summary: Moved each project type into a compact floating badge on the preview frame, with an emerald outline and static indicator dot. Restyled technology tags as quiet outlined chips that pick up an emerald tint when the card is hovered or focused. Kept the badge clear of the browser-frame domain label and within narrow cards.
- Module/routes: portfolio project cards, `/portfolio`
- Issue reference: GitHub `#161`
- Validation: 29 tests, Nuxt and Vite production builds, Prettier, `git diff --check`, desktop visual review, and 320/390px checks for badge fit, chip fit, and no horizontal overflow.

## 2026-11-26 17:32 EET — Simplify portfolio case-study metadata

- Type: Improvement
- Title: Hide vendor metadata in project dialogs
- Summary: Removed the `Vendor · …` line from the project dialog and deleted its unused style. Project type and technology details remain visible.
- Module/routes: portfolio project dialog, `/portfolio`
- Issue reference: GitHub `#161`
- Validation: 29 tests, Nuxt and Vite production builds, Prettier, `git diff --check`, and browser verification that the dialog omits vendor metadata while retaining the project type and technology.

## 2026-11-26 17:38 EET — Refine the portfolio case-study dialog

- Type: Improvement
- Title: Give the project dialog a clearer gallery and detail hierarchy
- Summary: Refined the dialog into a framed screenshot stage with consistent SVG gallery arrows, a clearer emerald active-thumbnail state, and technology chips. Grouped the project type, title and description as one introduction; kept project actions at the bottom of the details column. Preserved the desktop split, mobile gallery-first stack, focus handling and reduced-motion behavior.
- Module/routes: portfolio project dialog, `/portfolio`
- Issue reference: GitHub `#161`
- Validation: 29 tests, Nuxt and Vite production builds, Prettier, `git diff --check`, desktop visual review at 1440px, 1024px two-column check, 768/390/320px stacked checks, technology-chip fit, Escape close and focus restoration, and reduced-motion preference.

## 2026-11-26 17:44 EET — Simplify portfolio cards and add a third column

- Type: Improvement
- Title: Reduce card framing and fit three projects on wide screens
- Summary: Removed the outer card and media outlines, leaving one restrained browser-frame border. Changed the type badge to a square-cornered emerald label and flattened technology chips to remove more nested lines. The catalog now uses three columns above 1100px, two at intermediate widths, and one below 768px.
- Module/routes: portfolio project cards, `/portfolio`
- Issue reference: GitHub `#161`
- Validation: 29 tests, Nuxt and Vite production builds, Prettier, `git diff --check`, and browser checks at 1440/1024/768/390/320px confirming the 3/2/1 column breakpoints, badge fit, and no horizontal overflow.

## 2026-11-26 17:55 EET — Fix Home selected-work previews and dialog

- Type: Fix
- Title: Show Shopify previews and open case studies from Home
- Summary: Normalize Shopify image-set entries before rendering Home previews, show a clean fallback for missing images, and open the shared accessible project dialog from each card instead of routing to `/portfolio`. Added compact square-cornered project-type and technology badges.
- Module/routes: Home selected-work section and shared portfolio dialog, `/`, `/portfolio`
- Issue reference: GitHub `#161`
- Validation: 29 tests, Nuxt and Vite production builds, Prettier, and `git diff --check` passed. Browser checks confirmed Shopify image URLs load for the first two Home projects (the third has no Shopify image and shows the fallback), card activation keeps `/` and opens the dialog, Escape restores focus, the shared dialog still works on `/portfolio`, and there is no horizontal overflow at 1440/1024/768/390/320px. Reduced-motion preference was enabled during the mobile dialog check.

## 2026-11-26 18:01 EET — Match portfolio card action to Home

- Type: Improvement
- Title: Use the Home plus action on portfolio cards
- Summary: Replaced the portfolio card arrow with the Home-style square plus control and matched its restrained 45-degree hover/focus turn. Kept the existing card layout, category badge, technology tags, and dialog activation.
- Module/routes: portfolio cards, `/portfolio`
- Issue reference: GitHub `#161`
- Validation: Vite production build, Prettier, and `git diff --check` passed. Browser verified the 30px plus badge and its 45-degree hover state, existing modal activation and Escape close, 3/2/1 responsive columns, and no horizontal overflow at 1440/1024/768/390/320px.

## 2026-11-26 18:06 EET — Keep modal gallery arrows centered on hover

- Type: Fix
- Title: Prevent modal navigation buttons from jumping
- Summary: Prevented shared app-button hover and active transforms from overriding the gallery arrows' vertical centering. The arrows retain their color response without shifting position.
- Module/routes: portfolio project modal, `/portfolio`
- Issue reference: GitHub `#161`
- Validation: Vite production build, Prettier, and `git diff --check` passed. Browser reproduction showed the shared app-button hover moving the next arrow down 22px; after the fix its bounding box stayed identical on hover while its accent color changed.

## 2026-11-26 18:09 EET — Refine portfolio dialog title and type badge

- Type: Improvement
- Title: Reduce case-study title size and clarify project type
- Summary: Reduced the dialog title from the shared 41px section-heading cap to a responsive 25–32px scale and let it use the full details column. Styled the project type as a compact emerald badge with a square corner, matching the portfolio card treatment.
- Module/routes: portfolio project dialog, `/portfolio`
- Issue reference: GitHub `#161`
- Validation: Vite production build, Prettier, and `git diff --check` passed. Browser review confirmed a 32px title in two lines on a wide modal, compact emerald project-type badge, and no horizontal overflow at 1440/1024/768/390/320px.

## 2026-11-26 23:41 EET — Rebuild Blog on shared header rails

- Type: Improvement
- Title: Align Blog content and restore readable article excerpts
- Summary: Removed the Blog route's nested width caps and aligned its page, section edges and CTA to the shared header gutters. Rebalanced the featured story, standardized Blog type sizes on shared tokens, and replaced full-body excerpts with concise text previews. Applied the same outer rails to article routes and constrained long-form article copy to a readable measure.
- Module/routes: Blog listing and article pages, `/blog`, `/blog/:handle`
- Issue reference: GitHub `#166`
- Validation: Nuxt production build, Prettier, and `git diff --check` passed. Playwright verified shared header rails and no horizontal overflow at 1440/1024/768/390/320px; topic filter, search, reset, preview modal, Escape close, scroll lock, focus restoration and reduced-motion behavior worked. Direct article rendering was checked at 320px. The current Shopify response contains two posts, so pagination controls were correctly hidden and could not be exercised in the browser.

## 2026-11-26 23:48 EET — Give the featured Blog story more room

- Type: Improvement
- Title: Widen the featured article title and excerpt
- Summary: Removed the featured content's max-width cap, widened its title measure from 32ch to 48ch and its excerpt from 70ch to 90ch. The copy now uses more of the available column while retaining a readable line length.
- Module/routes: Blog featured article, `/blog`
- Issue reference: GitHub `#166`
- Validation: Nuxt production build, Prettier and `git diff --check` passed. Playwright confirmed the wider text measures at 1440px, containment at 1024px and 768px, and no horizontal overflow.

## 2026-11-26 23:58 EET — Make Blog list rows direct article links

- Type: Improvement
- Title: Remove article previews and clarify clickable Blog rows
- Summary: Removed the Blog preview modal and made each list row a single keyboard-accessible link to its article. Brought category, author, date and reading time above a larger title, kept the excerpt with the story, and added restrained hover, focus and arrow states. The featured index is now decorative; its title and Read article action remain direct links.
- Module/routes: Blog listing, `/blog`, `/blog/:handle`
- Issue reference: GitHub `#166`
- Validation: Nuxt production build, scoped Prettier and `git diff --check` passed. Playwright confirmed row links navigate to article routes, search filters remain functional, no modal is rendered, keyboard focus is visible, reduced-motion removes transitions, and horizontal overflow is 0 at 1440/1024/768/390/320px. Current Shopify data has 3 posts, so pagination is hidden.

## 2026-11-27 00:13 EET — Refine Blog article reading layout

- Type: Improvement
- Title: Add article breadcrumbs and improve long-form reading styles
- Summary: Added accessible Home / Blog / article breadcrumbs and matching schema.org BreadcrumbList data. Centered the article heading and body on the same readable measure, shortened long excerpts used as the article intro without changing body content, formatted publication dates, and refined prose headings, inline/code blocks, lists, quotes, tables, figures, links and source notes. Corrected JSON-LD output so it renders as a valid script body rather than a `children` attribute.
- Module/routes: Blog article page and article SEO, `/blog/:handle`
- Issue reference: GitHub `#166`
- Validation: Nuxt production build, scoped Prettier and `git diff --check` passed. Playwright verified valid JSON-LD with the three visible breadcrumb entries, navigation back to `/blog`, visible breadcrumb focus, 0 horizontal overflow at 1440/1024/768/390/320px, and no browser console errors.

## 2026-11-27 00:23 EET — Add Blog article section navigation

- Type: Improvement
- Title: Break long Blog articles into navigable sections
- Summary: Added generated, duplicate-safe anchors for article H2 headings and a section navigator that stays beside the prose on desktop, highlights the current section, and collapses into a native disclosure on smaller screens. Kept article HTML and native hash navigation intact; reduced-motion users get no nav transitions.
- Module/routes: Blog article page, `/blog/:handle`
- Issue reference: GitHub `#166`
- Validation: Nuxt production build, scoped Prettier and `git diff --check` passed. Playwright verified all 5 H2 anchors and matching links, desktop/mobile navigation modes at 1440/1024/768/390/320px, no horizontal overflow, mobile disclosure and hash navigation, direct fragment loading, reduced-motion transition suppression, and no browser console errors. Dev console retains Vue Router fragment lookup and `definePageMeta` warnings during dynamic route loading; fragment target and active state resolve after render. GitHub issue #166 and both project fields are Done.

## 2026-11-27 00:31 EET — Align Blog article masthead

- Type: Improvement
- Title: Integrate article heading with the reading column
- Summary: Aligned the article category, title and author/date metadata with the prose column and removed the excerpt from the article header so it no longer repeats the opening paragraph. Kept the cover image across the wider reading rail.
- Module/routes: Blog article page, `/blog/:handle`
- Issue reference: GitHub `#166`
- Validation: Nuxt production build, scoped Prettier and `git diff --check` passed. Playwright confirmed header and prose share the same left edge at 1440/1024/768/390/320px, duplicate excerpt is absent, horizontal overflow is 0, and there are no browser console errors.

## 2026-11-27 00:37 EET — Widen Blog article reading column

- Type: Improvement
- Title: Use more of the article page width
- Summary: Expanded the article and prose grid measure from 72ch to 84ch while preserving the compact contents rail and single-column responsive layout.
- Module/routes: Blog article page, `/blog/:handle`
- Issue reference: GitHub `#166`
- Validation: Nuxt production build, scoped Prettier and `git diff --check` passed. Playwright confirmed the prose column widened from 617px to 723px at 1440px, masthead and prose remain aligned at all checked widths, mobile contents mode remains active below 980px, horizontal overflow is 0 at 1440/1024/768/390/320px, and there are no browser console errors.

## 2026-11-27 00:43 EET — Align Blog article to header rails

- Type: Improvement
- Title: Expand article layout to the shared page container
- Summary: Expanded the article masthead, cover image and reading layout to the full shared header rails. Kept prose at a readable 90ch maximum and anchored the compact contents navigation to the right rail; smaller screens remain single-column.
- Module/routes: Blog article page, `/blog/:handle`
- Issue reference: GitHub `#166`
- Validation: Nuxt production build, scoped Prettier and `git diff --check` passed. Playwright verified exact shared header/article rail alignment at 1440/1024/768/390/320px, no horizontal overflow, desktop sidebar and mobile disclosure modes, and no browser console errors.

## 2026-11-27 00:48 EET — Refine Blog article content styles

- Type: Improvement
- Title: Style long-form article content elements
- Summary: Tuned the lead paragraph and H2 rhythm, constrained prose/list/source-note measures, refined inline-code chips, and gave preformatted commands a distinct scrollable code surface. Kept the article container and reading navigation unchanged.
- Module/routes: Blog article page, `/blog/:handle`
- Issue reference: GitHub `#166`
- Validation: Nuxt production build, scoped Prettier and `git diff --check` passed. Playwright rendered representative paragraph, H2, list, inline code, pre/code and source-note markup; verified 0 horizontal overflow at 1440/1024/768/390/320px and no browser console errors.

## 2026-11-27 00:54 EET — Add stronger Blog article color accents

- Type: Improvement
- Title: Emphasize article headings and terminal commands
- Summary: Increased the emerald accent on H2 rules, inline code, list markers and source links. Detects shell command blocks separately and styles them as the site's terminal with a title bar, status lights and a prompt, while keeping regular code blocks in their neutral code surface.
- Module/routes: Blog article page, `/blog/:handle`
- Issue reference: GitHub `#166`
- Validation: Nuxt production build, scoped Prettier and `git diff --check` passed. Playwright verified the real Vite+ article's command block receives the terminal class and title/prompt, with desktop/mobile rendering and 0 horizontal overflow at 1440/1024/768/390/320px; browser console errors: 0.

## 2026-11-27 01:00 EET — Style Blog article breadcrumbs as a path

- Type: Improvement
- Title: Give article breadcrumbs a compact technical path style
- Summary: Changed visible breadcrumb segments to `~ / blog / article title`, used monospace typography for the route, and accented separators with the shared emerald color. Kept Home and Blog destinations, current-page semantics, keyboard focus styling, and natural wrapping on narrow screens.
- Module/routes: Blog article page, `/blog/:handle`
- Issue reference: GitHub `#166`
- Validation: Nuxt production build, scoped Prettier and `git diff --check` passed. Playwright checked breadcrumb links/current-page text, path wrapping and page width at 1440/1024/768/390/320px; browser console errors: 0.

## 2026-11-27 01:03 EET — Keep Blog breadcrumb on one line

- Type: Improvement
- Title: Truncate long article breadcrumb titles
- Summary: Prevented breadcrumb segments from wrapping and made long current-page titles truncate with an ellipsis while retaining the full title in the accessible DOM.
- Module/routes: Blog article page, `/blog/:handle`
- Issue reference: GitHub `#166`
- Validation: Nuxt production build, scoped Prettier and `git diff --check` passed. Playwright injected a long title and confirmed a single-row breadcrumb, ellipsis truncation, and no horizontal overflow at 1440/1024/768/390/320px; browser console errors: 0.

## 2026-11-27 01:17 EET — Scale Blog topic filters for larger tag sets

- Type: Improvement
- Title: Keep Blog topic filters compact with searchable overflow
- Summary: Measure the topic row and show only chips that fit, with the remaining count in a `+N` control. Its anchored dropdown searches all topics, shows matching post counts and keeps the selected topic visible in the chip row. Escape and outside clicks close the menu; reduced-motion users get no chevron movement.
- Module/routes: Blog listing, `/blog`
- Issue reference: GitHub `#167`
- Validation: Nuxt production build, scoped Prettier and `git diff --check` passed. Playwright verified 117 topics (100 temporary QA topics added in-browser) at 1440/1024/768/390/320px: exact hidden counts, no row/page overflow, all topics searchable, menu stays in viewport, selection filters posts, and keyboard/outside/empty-search states work. Reduced-motion and browser console checked; errors: 0.
