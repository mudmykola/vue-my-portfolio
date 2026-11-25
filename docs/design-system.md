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
- Do not use lime, purple UI accents, serif or decorative fonts, arbitrary gradients, excessive
  cards, invented social proof or invented metrics.

## Tokens

```css
:root {
  --color-bg: #080f0e;
  --color-surface: #0d1815;
  --color-surface-raised: #13211d;
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
}
```

Technology brand colors are restricted to their official logos: Vue `#42B883`, Nuxt `#00DC82`,
Shopify `#95BF47`. They are not UI palette colors.

## Typography

- Headings: `Sora`, fallback `Manrope`, `sans-serif`.
- Body and navigation: `Manrope`, fallback `Inter`, `sans-serif`.
- H1: 60–68px desktop, 38–44px mobile, weight 700–800, line-height 1.05–1.12.
- H2: 40–48px desktop, 30–36px mobile, weight 700, line-height 1.1–1.2.
- H3: 26–30px desktop, 22–26px mobile, weight 650–700.
- Lead: 18–20px desktop, 17–18px mobile, line-height 1.55–1.65.
- Body: 16px, line-height 1.6–1.7. Small: 14px. Eyebrow: 12px uppercase with 0.12em spacing.
- Navigation: 15px desktop, 16px mobile, weight 600.
- Text columns target approximately 60–70 characters.

## Layout

- Max content width: `1200px`.
- Horizontal padding: 64px desktop, 32px tablet, 20–24px mobile.
- Desktop 12-column grid / 24px gap; tablet 8 columns / 20px; mobile 4 columns / 16px.
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120px.
- Large section spacing: 88–112px desktop, 64–80px tablet, 48–64px mobile.
- Align sections to shared container edges. Avoid horizontal overflow.

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
- Cards lift at most 2px and images scale at most 1.02; no tilt or decorative infinite motion.

## Media and content

- Use real portraits, project screenshots, logos and images from project assets/data.
- Preserve image proportions; use `object-fit: cover` only when important content is not cropped.
- Portfolio may feature the first case; other cases use spacious two-column layouts.
- A card may contain image, real title, category, description and stack where available.
- Do not invent facts, client logos, testimonials, numbers, reviews or outcomes.

## Responsive acceptance

Verify at 1440, 1024, 768, 390 and 320px. At 768px and below, multi-column blocks become one
column. Long titles wrap naturally, filters may scroll horizontally, and the page must not gain
horizontal overflow. Check keyboard navigation, focus visibility, contrast, loading, empty,
error and success states.

## Agent implementation rules

1. Inspect the real route, data and assets before editing.
2. Preserve public routes and route purpose.
3. Use these tokens instead of page-specific palettes.
4. Reuse existing Font Awesome icons; do not add another icon library.
5. Keep content sourced from current project data.
6. Implement structure before decoration and verify desktop/mobile behavior.
