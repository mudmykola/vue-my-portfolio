# Vue My Portfolio

Personal portfolio website built with Vue 3 + Vite, focused on modern UI/UX, responsive layout, and clean component architecture.

## Stack

- Vue 3 (Composition API)
- Vite 5
- Vue Router
- Pinia
- SCSS
- Swiper
- Firebase Hosting (frontend deploy)
- Cloudflare Worker (recommended contact proxy)

## Features

- Multi-page portfolio: Home, About, Resume, Portfolio, Blog, Contact, Game
- Responsive desktop/mobile layout
- Portfolio modal gallery
- Blog filters/sorting/search
- Weather + clock widgets in header
- JSON-driven content (`public/data/site-content.json`)

## Project Setup

### Requirements

- Node.js 18+
- pnpm

### Install

```bash
pnpm install
```

### Run locally

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Preview build

```bash
pnpm preview
```

### Tests

```bash
pnpm test
pnpm test:watch
```

## Environment Variables

Create `.env` in project root:

```env
VITE_OPENWEATHER_API_KEY=
VITE_CONTACT_API_URL=/contact
VITE_SITE_URL=
VITE_DEFAULT_OG_IMAGE_PATH=/images/avatar-logo.webp
VITE_DEFAULT_OG_IMAGE_ALT=Mykola Mud front-end engineer portfolio social preview image
VITE_DEFAULT_OG_IMAGE_WIDTH=1200
VITE_DEFAULT_OG_IMAGE_HEIGHT=630

# Optional remote endpoint overrides (defaults are built in)
VITE_GITHUB_TEST_API_BASE_URL=
VITE_CONTENT_API_BASE_URL=
VITE_GITHUB_API_BASE_URL=
VITE_BLOG_POSTS_URL=
VITE_PORTFOLIO_PROJECTS_URL=
VITE_AVATAR_DATA_URL=
VITE_CLICK_SOUND_GITHUB_CONTENT_URL=
VITE_OPENWEATHER_API_BASE_URL=
VITE_OPENWEATHER_ICON_BASE_URL=
```

Important:

- `VITE_*` values are embedded at build time.
- Do not store real secrets in frontend env for production.
- Prefer server-side secret handling via Cloudflare Worker.
- `VITE_CONTACT_API_URL` defaults to `/contact` (same domain Worker API).
- `VITE_SITE_URL` is used for absolute canonical/OG URLs in runtime SEO metadata and for generated `sitemap.xml` / `robots.txt`.
- `VITE_DEFAULT_OG_IMAGE_PATH` sets a default social preview image path for SEO metadata.
- `VITE_DEFAULT_OG_IMAGE_ALT`, `VITE_DEFAULT_OG_IMAGE_WIDTH`, `VITE_DEFAULT_OG_IMAGE_HEIGHT` control default social image metadata.
- External content/API hosts can be overridden via optional `VITE_*` endpoint vars; sane defaults are defined in `src/config/remoteEndpoints.js`.

### Social Preview Image Strategy (SEO)

- Default social preview image is configured globally via `VITE_DEFAULT_OG_IMAGE_PATH` (used for both Open Graph and Twitter).
- Route-specific override is supported in router SEO config via `meta.seo.ogImage`.
- Optional route-specific social image metadata overrides:
  - `meta.seo.ogImageAlt`
  - `meta.seo.ogImageWidth`
  - `meta.seo.ogImageHeight`

Recommended image spec (Open Graph / Twitter large card):

- Size: `1200x630`
- Format: `webp` or `jpg`
- Keep key text/logo inside a centered safe area (avoid edges for platform crops)
- Use clear contrast and minimal text for better share previews

## Deployment

Release runbook:

- `RELEASE_CHECKLIST.md`
- `npm run build` also generates SEO crawl assets in `dist/`:
  - `dist/sitemap.xml`
  - `dist/robots.txt`

### Firebase Hosting (frontend)

```bash
pnpm build
firebase deploy --only hosting
```

Current Firebase config:

- Hosting public dir: `dist`
- SPA rewrite: `** -> /index.html`
- Project alias from `.firebaserc`

### Cloudflare Worker (frontend + Contact API)

Worker serves built frontend (`dist`) and handles contact submissions via `POST /contact`.

High-level flow:

1. Worker serves SPA on `https://<worker>.workers.dev/`
2. Frontend sends form data to Worker endpoint (`/contact`)
3. Worker validates payload and applies CORS policy
4. Worker reads secrets from environment
5. Worker sends message to Telegram API
6. Worker returns normalized JSON response

Suggested secrets in Worker:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Frontend now calls `/contact` by default.

## Content Management

Main content source:

- `public/data/site-content.json`

Update this file to refresh text, cards, testimonials, and resume data without changing component logic.

## Project Structure

```text
src/
  components/
    about/
    blog/
    contact/
    home-content/
    navigation/
    portfolio/
    resume/
  composables/
  layout/
  services/
  views/
public/
  data/site-content.json
firebase.json
```

## Troubleshooting

### `firebase: command not found`

Use:

```bash
npx firebase-tools deploy --only hosting
```

or install globally:

```bash
npm i -g firebase-tools
```

### Env changes are not applied after deploy

`VITE_*` vars are compiled into the build. Rebuild before deploy:

```bash
pnpm build
firebase deploy --only hosting
```

### Contact form security

If contact form uses Telegram token in frontend, token is exposed publicly. Move to Worker proxy for production.

## Workflow

- Track tasks in Linear and GitHub Project backlog.
- Start task: set `In Progress`.
- After implementation + confirmation: set `Done`.
- New idea from discussion: create issue and put in `Backlog`.

## Cloudflare Worker Auto Deploy (GitHub Actions)

Added workflow:

- `.github/workflows/deploy-worker.yml`

It deploys Worker automatically on every push/merge to `main`.

### Required GitHub Secrets

In repo settings add:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### Worker Files

- `worker/wrangler.toml`
- `worker/src/index.js`

### Worker Secrets (Cloudflare)

Set once with Wrangler (local):

```bash
cd worker
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
```

Optional CORS origin is in `worker/wrangler.toml`:

- `ALLOWED_ORIGIN` (set your real domain instead of `*` for production)

### Manual Deploy Check

```bash
cd worker
npx wrangler deploy
```
