# Mykola Mud Portfolio — Design System

Canonical visual and interaction rules for the portfolio redesign. The site is a personal
Front-End Engineer portfolio built with Vue, Nuxt and Shopify. Preserve the existing facts,
routes and data sources; redesign the presentation without inventing projects, metrics,
testimonials or client claims.

## Direction

- Dark graphite interface with light text and emerald as the only UI accent.
- Modern, restrained, technology-oriented personal portfolio; not an agency or SaaS dashboard.
- Use real assets from `public/images` and project data.
- Keep generous whitespace, clear hierarchy and one consistent header/navigation/footer system.
- Use the reusable `SectionAtmosphere` SVG layer for occasional circuit traces and junction marks
  on major section containers. Keep each section's variant sparse, low-opacity and behind content;
  do not add the layer to repeating cards or stack it with an existing decorative accent.
- On Home and Portfolio, reuse the same branching circuit and sparse meteor atmosphere from
  `HomeArtifactField.vue`; keep it low-opacity behind content and disable meteor motion for reduced
  motion users. Other routes use static circuit traces with occasional short diagonal streaks only;
  decorations must be
  `aria-hidden`, pointer-free, absolutely positioned and excluded from layout/scroll dimensions.
  Reduce their opacity on mobile and respect reduced motion.
- Do not use lime, purple UI accents, serif or decorative fonts, arbitrary gradients, excessive
  cards, invented social proof or invented metrics.

## Tokens

```css
:root {
  --color-bg: #080f0e;
  --color-surface: #0d1815;
  --color-surface-raised: #13211d;
  --color-project-card: rgba(5, 15, 13, 0.72);
  --color-border: rgba(190, 215, 204, 0.14);
  --color-text: #f3f7f5;
  --color-text-secondary: #b5c2bc;
  --color-text-muted: #7f9088;
  --color-accent: #18d6a0;
  --color-accent-hover: #2ce5b1;
  --color-accent-soft: rgba(24, 214, 160, 0.12);
  --color-accent-border: rgba(24, 214, 160, 0.42);
  --color-text-on-accent: #052219;
  --color-success: #18d6a0;
  --color-warning: #f4bf58;
  --color-error: #ff7373;
  --color-info: #76b9ff;
  --type-section: clamp(1.8rem, 3vw, 2.5625rem);
  --type-subheading: clamp(1.05rem, 1.38vw, 1.55rem);
  --type-body: clamp(0.95rem, 1.12vw, 1.15rem);
  --type-supporting: 0.875rem;
  --type-eyebrow: 0.75rem;
  --radius-card: 16px;
  --section-content-gap: clamp(1.25rem, 2vw, 1.75rem);
  --project-grid-gap: clamp(0.75rem, 1vw, 1.25rem);
  --project-card-padding: 0.8rem 1rem 0.9rem;
}
```

Technology brand colors are restricted to their official logos: Vue `#42B883`, Nuxt `#00DC82`,
Shopify `#95BF47`. They are not UI palette colors.

## Typography

- Headings: `Sora`, fallback `Manrope`, `sans-serif`.
- Body and navigation: `Manrope`, fallback `Inter`, `sans-serif`.
- Home hero H1 is its own display tier; keep its responsive scale and weight 800.
- Home section H2: `clamp(1.8rem, 3vw, 2.5625rem)` (41px maximum at a 16px root), weight 700, line-height 1.12.
- Home card and step H3: `clamp(1.05rem, 1.38vw, 1.55rem)`, weight 650–700, line-height 1.2.
- Home body: `clamp(0.95rem, 1.12vw, 1.15rem)`, line-height 1.55–1.65.
- Home supporting labels: `0.875rem`. Eyebrow: `0.75rem` (12px), uppercase, weight 800, line-height 1.3, letter-spacing 0.13em.
- On Home, use the same size token for each semantic role across sections. Do not add per-section font-size overrides for H2, H3, eyebrow or body copy. Keep microtype inside decorative code and product-interface artwork at the scale of that artwork.
- Navigation: 15px desktop, 16px mobile, weight 600.
- Text columns target approximately 60–70 characters.

Home is the canonical visual reference. Shared type roles live in `:root` as `--type-display`,
`--type-section`, `--type-subheading`, `--type-body`, `--type-supporting`, and `--type-eyebrow`;
Home aliases its existing `--home-type-*` names to these shared values. Use the shared roles on
Portfolio and future routes rather than copying values into route-specific selectors. Keep the
display tier's Home breakpoint values unchanged.

## Layout

- Shared page width: route content, section borders, grids, filters, pagination and CTAs align to
  the same left and right rails as the header's inner container. Use the shared fluid gutter
  `clamp(1rem, 3vw, 3rem)`; do not add a narrower route-level `max-width` that pulls a page inward.
- Internal reading measure may be narrower for long-form text, while the section and page edges
  remain aligned to the shared header rails.
- Desktop 12-column grid / 24px gap; tablet 8 columns / 20px; mobile 4 columns / 16px.
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120px.
- Reuse `--section-content-gap`, `--project-grid-gap`, and `--radius-card` for the Home and Portfolio
  selected-work patterns.
- Large section spacing: 88–112px desktop, 64–80px tablet, 48–64px mobile.
- Align every route's sections to the shared header container edges. Avoid horizontal overflow.

## Header and navigation

Every page uses the same shell. Desktop brand: emerald geometric `M`, `Mykola Mud`, and
`FRONT-END ENGINEER`. Navigation order is Home, Portfolio, About, Resume, Blog, Contact.
There is no Stack item. Active navigation uses emerald text plus a visible underline or border,
not color alone. Desktop header height is 72–80px. Mobile uses a visible menu button and an
accessible panel with `aria-expanded`, keyboard focus and 44px minimum targets.

## Controls and motion

- Primary buttons: 48px high, 20–24px horizontal padding, emerald background, dark text,
  8–10px radius.
- Secondary buttons: transparent, light text and 1px border.
- Links are text links; emerald is reserved for hover/focus and active states.
- All interactive elements require hover, `:focus-visible` and pressed states.
- Transitions: 160–220ms, `cubic-bezier(0.2, 0.7, 0.2, 1)`.
- Respect `prefers-reduced-motion`.
- Cards lift at most 2px and images scale at most 1.02; no tilt or decorative infinite motion outside
  the intentionally sparse Home meteor field.
- The Home Hero scroll cue may use a larger circuit-transition node with converging traces and a
  short signal traveling toward the next section on hover/focus. Keep native anchor behavior and
  smooth the in-page transition while the Home cue is present; reduced-motion users retain an
  immediate transition. Stop the arrow loop and hide traveling signals for reduced-motion users.

## Motion and interaction system

Motion explains a state change or responds to a user action. Keep the shared header and footer
stable between route changes; animate only the main page content. Prefer `transform` and
`opacity`, and do not animate layout properties such as `width`, `height`, `margin`, `top` or
`left`. Never combine CSS and JavaScript animation on the same element.

```css
:root {
  --motion-fast: 140ms;
  --motion-ui: 200ms;
  --motion-panel: 260ms;
  --ease-standard: cubic-bezier(0.2, 0.7, 0.2, 1);
  --ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
  --shadow-card: 0 8px 24px rgba(0, 0, 0, 0.18);
  --shadow-popover: 0 16px 44px rgba(0, 0, 0, 0.32);
  --shadow-modal: 0 24px 72px rgba(0, 0, 0, 0.48);
  --focus-ring: 0 0 0 3px rgba(24, 214, 160, 0.32);
}
```

- Hover and focus use 140–200ms; panels, menus and dialogs use 200–260ms; ordinary transitions
  never exceed 300ms.
- Page transitions use Nuxt `pageTransition` or Vue `<Transition>` around the page content only:
  opacity plus no more than 6–8px vertical movement. Preserve Back/Forward and scroll restoration.
- Modals use an opacity backdrop and a small 6–8px translate or 0.985→1 scale. They must trap
  focus, close with Escape/close control/backdrop, lock background scrolling and restore focus.
- Navigation exposes `aria-current="page"`; menus expose `aria-expanded`; toggles use
  `aria-pressed`; tabs use tab semantics.
- Cards lift no more than 2px; images scale no more than 1.02. Do not tilt cards, animate large
  shadows, use parallax, or add decorative infinite loops.
- Mobile menus open with a short fade and vertical movement, close after navigation/Escape/outside
  click, and keep interactive targets at least 44px.
- Respect `prefers-reduced-motion: reduce`: remove movement, scale, parallax and decorative
  reveals; retain an understandable state change or a short fade.
- Scroll effects use the shared 2px progress line and one-time reveals on selected major content
  sections. Mark only those section roots with `data-scroll-scene`; never animate each card, text
  row or every section by default. Use `IntersectionObserver` with a visible-by-default fallback
  when JavaScript or the API is unavailable.
- Scroll reveals use only `opacity` and `transform`, move at most 14px and finish within 300ms.
  Preserve native scrolling, browser scroll restoration and stable shared header/footer. The
  progress line is decorative and pointer-free; hide it and remove reveal movement for users who
  request reduced motion.
- Use browser-native smooth scrolling for the Home Hero’s About anchor while its cue is present;
  preserve its URL fragment and history entry. Reduced-motion users get immediate scrolling.
- Keep the shared `.app-header` sticky at `top: 0` during document scrolling. Do not apply
  `overflow-x: hidden` to `html`, `body` or `#app`: it can create a nested scroll container and
  disable viewport sticky positioning. Use `overflow-x: clip` where clipping is needed, then
  verify sticky behavior and horizontal overflow across supported widths.
- Use Vue transitions and CSS first. Do not add an animation library for simple interactions;
  consider `motion-v` only for a demonstrated coordinated animation or complex gesture need.

## Media and content

- Use real portraits, project screenshots, logos and images from project assets/data.
- Preserve image proportions; use `object-fit: cover` only when important content is not cropped.
- Portfolio features the first available case in a wide, image-led two-column row; remaining cases
  use a spacious two-column grid, with an unmatched final case spanning the row, collapsing to one
  column at 768px. Selecting a case opens a
  gallery-and-details dialog with keyboard focus contained and restored on close. Align its
  content gutters to the shared header navigation.
- A card may contain image, real title, category, description and stack where available.
- Do not invent facts, client logos, testimonials, numbers, reviews or outcomes.

## Responsive acceptance

Verify at 1440, 1024, 768, 390 and 320px. At 768px and below, multi-column blocks become one
column. Long titles wrap naturally, filters may scroll horizontally, and the page must not gain
horizontal overflow. Check keyboard navigation, focus visibility, contrast, loading, empty,
error and success states.

## Component inventory

The live reference is available at `/design-system` and is intentionally not part of the primary
site navigation. It demonstrates the states that reusable components must support before they are
used across Home, Portfolio, About, Resume, Blog or Contact.

| Area        | Required reusable elements                                                         | Status                                       |
| ----------- | ---------------------------------------------------------------------------------- | -------------------------------------------- |
| Tokens      | Color, type, spacing, radius, shadow, motion and focus tokens                      | Foundation implemented                       |
| Buttons     | Primary, secondary, text/ghost, hover, focus, pressed, disabled and loading        | Inventory implemented; page adoption ongoing |
| Form fields | Input, email, textarea and select with default, focus, error, disabled and success | Inventory implemented; page adoption ongoing |
| Selection   | Checkbox, radio, switch, filter chip and active state                              | Inventory implemented; page adoption ongoing |
| Navigation  | Brand lockup, nav links, active/hover/focus and social links                       | Shared header implemented                    |
| Feedback    | Success, error, warning, validation and toast                                      | Inventory implemented; page adoption ongoing |
| Surfaces    | Project card, modal/dialog, tooltip and pagination                                 | Inventory implemented; page adoption ongoing |
| Icons       | Font Awesome Solid for UI and official Brands for services/technologies            | Shared icon rule implemented                 |

New reusable UI must first use the existing tokens and match the states shown on the inventory page.
Page-specific styling is allowed only when the component has a clear content or layout reason.

## Agent implementation rules

1. Inspect the real route, data and assets before editing.
2. Preserve public routes and route purpose.
3. Use these tokens instead of page-specific palettes.
4. Reuse existing Font Awesome icons; do not add another icon library.
5. Keep content sourced from current project data.
6. Implement structure before decoration and verify desktop/mobile behavior.
7. Check active, hover, focus-visible, pressed, disabled and loading states with mouse and keyboard.
8. Verify page transitions, modal focus behavior, reduced motion, scroll locking, layout stability and
   absence of horizontal overflow at 1440, 1024, 768, 390 and 320px.
