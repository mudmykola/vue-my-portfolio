# Release Checklist

Use this checklist before every production release.

## 1) Pre-Flight (Local)

- Confirm target branch is up to date (`master`).
- Confirm clean working tree (`git status`).
- Install deps and validate lockfile sync:
  - `npm ci`
- Run tests:
  - `npm test`
- Build production bundle:
  - `npm run build`

## 2) Secrets and Environment

GitHub Actions secrets required:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `VITE_OPENWEATHER_API_KEY`
- Optional: `VITE_CONTACT_API_URL` (defaults to `/contact`)

Cloudflare Worker secrets required:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Verify Cloudflare account before setting secrets:

- `npx wrangler whoami --config worker/wrangler.toml`

Set Worker secrets:

- `npx wrangler secret put TELEGRAM_BOT_TOKEN --config worker/wrangler.toml`
- `npx wrangler secret put TELEGRAM_CHAT_ID --config worker/wrangler.toml`

## 3) Deploy

- Merge feature branch into `master`.
- Confirm GitHub Actions run `Deploy Cloudflare Worker` is green.

Manual deploy fallback:

- `npm run build`
- `npx wrangler deploy --config worker/wrangler.toml`

## 4) Post-Deploy Validation

- Open site:
  - `https://vue-my-portfolio-contact.freelance-mud.workers.dev/`
- Health endpoint:
  - `GET /health` should return `success: true`
- Contact API smoke test:
  - `curl -i -X POST 'https://vue-my-portfolio-contact.freelance-mud.workers.dev/contact' -H 'Content-Type: application/json' --data '{"fullName":"Test User","email":"test@example.com","message":"Ping"}'`
  - Expect `HTTP 200` and `{"success":true}`
- UI sanity checks (desktop + mobile):
  - Navigation and page transitions
  - Contact form submit popup
  - Weather widget data loaded

## 5) Rollback Procedure

If release is broken:

- Revert the merge commit on `master`.
- Push revert commit.
- Confirm `Deploy Cloudflare Worker` runs successfully after revert.
- Re-run post-deploy validation checklist.

## 6) Release Tracking

- Linear: set task `In Progress` before work and `Done` after verification.
- GitHub Project: keep Status/Workflow and priority labels in sync.
