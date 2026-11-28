# Nuxt Release Checklist

Use this checklist before releasing the Nuxt application to Cloudflare Workers.

## 1. Pre-flight

- Confirm the target branch is reviewed and up to date.
- Run `npm ci`.
- Run `npm run verify` (Node tests and Nuxt production build).
- Confirm the build output exists in `.output/`.

## 2. Runtime configuration

Configure these values as Cloudflare Worker variables/secrets, not GitHub Actions
build secrets:

- `NUXT_PUBLIC_SITE_URL=https://mykolamud.pp.ua` (public canonical origin; also
  declared in `wrangler.jsonc`).
- `NUXT_SHOPIFY_STORE_DOMAIN`, `NUXT_SHOPIFY_STOREFRONT_TOKEN`, and any required
  Shopify blog/portfolio settings. Keep private Storefront tokens secret.
- `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` for the contact Worker.
- Optional `NUXT_PUBLIC_OPEN_WEATHER_API_KEY` for the client-side weather widget.

GitHub Actions requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` only
for the manually triggered deploy job. The verification job builds without
production credentials.

## 3. Deploy

- Review the GitHub Actions verification run.
- Deploy only after explicit release approval. Use the manual workflow or run
  `npm run deploy:worker` after authenticating Wrangler.

## 4. Post-deploy checks

- Open `https://mykolamud.pp.ua/` and directly load `/about`, `/resume`,
  `/portfolio`, `/blog`, `/contact`, and a blog article URL.
- Confirm canonical, Open Graph and JSON-LD URLs use `https://mykolamud.pp.ua`.
- Confirm `/sitemap.xml`, `/robots.txt`, `/health`, Shopify-backed pages,
  and contact form behavior.
- Check desktop and mobile navigation and page transitions.

## 5. Rollback

- Revert the release commit through the normal reviewed repository workflow.
- Re-run `npm run verify`, then deploy the reviewed rollback build after approval.
