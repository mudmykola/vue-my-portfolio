# Mykola Mud — Portfolio & Technical Blog

[![Build and verification](https://github.com/mudmykola/vue-my-portfolio/actions/workflows/deploy-worker.yml/badge.svg?branch=master)](https://github.com/mudmykola/vue-my-portfolio/actions/workflows/deploy-worker.yml)
[![Live website](https://img.shields.io/badge/Website-mykolamud.pp.ua-00d9a1?logo=cloudflare&logoColor=white)](https://mykolamud.pp.ua/)

Personal portfolio and technical blog for **Mykola Mud, Front-End Engineer**. The site is built with Nuxt and Vue, reads portfolio projects and blog posts from Shopify, and runs in production on Cloudflare Workers.

**Live site:** [mykolamud.pp.ua](https://mykolamud.pp.ua/)

## What’s included

- Home, About, Resume, Portfolio, Blog, Contact and Game pages.
- Shopify-backed portfolio projects and articles, with local JSON fallback content for development and recovery.
- Portfolio filters, project galleries and detail modals; searchable, filterable and paginated blog listings.
- Server-rendered Nuxt pages with route metadata, canonical URLs, sitemap, robots directives and structured data.
- A Cloudflare Worker contact endpoint that validates form submissions and forwards them to Telegram.
- Responsive layouts, keyboard-accessible navigation and reduced-motion support.

## Tech stack

- **App:** Vue 3, Nuxt 4, Vue Router, Pinia
- **Styling:** SCSS, Tailwind CSS utilities
- **Content API:** Shopify Storefront API
- **Production runtime:** Cloudflare Workers (Nitro `cloudflare_module` preset)
- **Checks:** Node.js test runner, GitHub Actions, Prettier

## Run locally

Requirements: **Node.js 20.19+** (or 22.12+) and npm.

```bash
npm ci
npm run dev
```

Nuxt starts at `http://localhost:3000`. Without Shopify credentials, the portfolio and blog use the project’s local fallback data.

Create a root `.env` only when you need Shopify-backed local content or optional integrations:

```dotenv
NUXT_PUBLIC_SITE_URL=https://mykolamud.pp.ua
NUXT_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NUXT_SHOPIFY_STOREFRONT_TOKEN=
NUXT_SHOPIFY_STOREFRONT_TOKEN_TYPE=public
NUXT_SHOPIFY_API_VERSION=2026-10
NUXT_SHOPIFY_BLOG_HANDLE=blog-post
NUXT_SHOPIFY_PORTFOLIO_COLLECTION_HANDLE=portfolio

# Optional: weather widget
VITE_OPENWEATHER_API_KEY=
```

Use `NUXT_SHOPIFY_STOREFRONT_TOKEN_TYPE=private` for a private Storefront token. Keep Shopify tokens server-side; never use a `VITE_` variable for credentials. Local `.env` files are ignored by Git.

## Validate and build

```bash
npm test          # run the Node.js test suite
npm run build     # build the Nuxt application for Cloudflare Workers
npm run verify    # run tests and the production build
npm run preview   # preview the Nuxt build locally
```

## Deploy to Cloudflare Workers

The production deployment target is Cloudflare Workers. GitHub Actions runs verification on pushes to `master` or `main`; it deploys only when **Build Nuxt and deploy Cloudflare Worker** is started manually with **Run workflow**. The deploy job requires the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets.

Set Shopify Storefront values and the contact endpoint’s `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as Cloudflare Worker variables/secrets. Store private credentials as secrets. The canonical public URL is configured in `wrangler.jsonc`.

For a local CLI deployment, authenticate Wrangler with Cloudflare and run:

```bash
npm run deploy:worker
```

This command runs the test/build verification before deploying the generated Worker from `.output`.

## Where content lives

- `public/data/site-content.json` — shared page copy and profile content
- `public/data/resume.json` — experience, education and skills
- `public/data/portfolio.json` — portfolio fallback data
- `public/data/blog-posts.json` — blog fallback data
- Shopify collection `portfolio` — production portfolio projects
- Shopify blog `blog-post` — production articles
- `public/images/` — portraits, project previews and other image assets

For Shopify portfolio products, fill in the title, description, product type, vendor, tags, featured image and additional images. The product type is used for portfolio filters, tags describe project technologies, and the project URL comes from the `custom.project_url` URL metafield.

## Repository structure

```text
app/       Nuxt pages and layouts
server/    Nuxt API routes and Shopify server utilities
src/       shared Vue components, composables, services and stores
public/    static assets and local content fallbacks
worker/    contact Worker and its legacy configuration
tests/     Node.js test suite
docs/      design system and project documentation
```

The legacy Vite scripts remain available for compatibility, but Nuxt on Cloudflare Workers is the production application and deployment path.
