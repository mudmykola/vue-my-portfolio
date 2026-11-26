# Mykola Mud Portfolio

Персональне портфоліо Mykola Mud — Front-End Engineer. Основний runtime — Nuxt 4 на Cloudflare Workers; Vue-компоненти, маршрути та джерела даних збережені.

Основний стек: Vue 3, Nuxt 4, Vue Router, Pinia, SCSS і Shopify Storefront API для блогу та портфоліо.

## Можливості

- сторінки Home, Portfolio, About, Resume, Blog, Contact і Game;
- SSR/SEO-маршрути Nuxt зі стабільними canonical, sitemap, robots і JSON-LD;
- блог із Shopify Storefront API та локальним fallback-контентом;
- Shopify-колекція `portfolio` як джерело проєктів у Nuxt runtime; JSON fallback для Vite та локального режиму;
- resume і site content із JSON-джерел у `public/data/`;
- responsive layout для desktop, tablet і mobile;
- доступне mobile menu, keyboard focus і reduced-motion підтримка;
- Cloudflare Worker для SSR, Shopify API, contact API та Telegram delivery;
- збережений Vite runtime як тимчасовий rollback path.

## Стек

- Vue 3 + Composition API
- Nuxt 4 + Nitro
- Vite 5 — legacy/static rollback runtime
- Vue Router, Pinia, SCSS
- Font Awesome
- Shopify Storefront API
- Cloudflare Workers
- Firebase Hosting для legacy static Vite build

## Вимоги та встановлення

- Node.js 18+
- npm

```bash
npm install
```

## Локальна розробка

Основний frontend runtime (Nuxt із Shopify API):

```bash
npm run dev
```

Vite dev runtime (legacy rollback path):

```bash
npm run dev:vite
```

## Build і перевірки

```bash
# Nuxt production build for Cloudflare Workers
npm run build

# Тести
npm test

# Тести та production build
npm run verify

# Local Nuxt preview
npm run preview
```

Тести перевіряють route SEO, structured data, Shopify blog normalization, portfolio/blog composables і Cloudflare Worker contract.

## Публічні маршрути

| Route            | Призначення              |
| ---------------- | ------------------------ |
| `/`              | Home                     |
| `/portfolio`     | Portfolio projects       |
| `/about`         | About                    |
| `/resume`        | Resume                   |
| `/blog`          | Shopify-backed blog      |
| `/blog/:handle`  | Individual blog article  |
| `/contact`       | Contact form             |
| `/game`          | Game page                |
| `/design-system` | Live component inventory |

## Конфігурація середовища

Для локальної розробки можна створити `.env` у корені проєкту; він ігнорується Git і не входить у production build як файл. Production значення задаються в Cloudflare Worker Settings → Variables and Secrets.

```env
VITE_SITE_URL=https://mykolamud.pp.ua
VITE_CONTACT_API_URL=/contact
VITE_DEFAULT_OG_IMAGE_PATH=/images/avatar-logo.webp
VITE_DEFAULT_OG_IMAGE_ALT=Mykola Mud front-end engineer portfolio social preview image
VITE_DEFAULT_OG_IMAGE_WIDTH=1200
VITE_DEFAULT_OG_IMAGE_HEIGHT=630

# Optional client-side endpoint overrides
VITE_GITHUB_API_BASE_URL=
VITE_PORTFOLIO_PROJECTS_URL=
VITE_BLOG_POSTS_URL=
VITE_OPENWEATHER_API_KEY=
VITE_OPENWEATHER_API_BASE_URL=
VITE_OPENWEATHER_ICON_BASE_URL=
VITE_CLICK_SOUND_GITHUB_CONTENT_URL=

# Local Nuxt server-only configuration; production uses Cloudflare bindings
NUXT_SHOPIFY_STORE_DOMAIN=
NUXT_SHOPIFY_STOREFRONT_TOKEN=
NUXT_SHOPIFY_STOREFRONT_TOKEN_TYPE=private
NUXT_SHOPIFY_API_VERSION=2026-10
NUXT_SHOPIFY_BLOG_HANDLE=
NUXT_SHOPIFY_PORTFOLIO_COLLECTION_HANDLE=portfolio
```

Правила:

- `VITE_*` значення вбудовуються у frontend build і не підходять для секретів;
- Shopify Storefront token використовуй тільки в server-side конфігурації; Vite dev middleware також читає `NUXT_*` значення лише на сервері;
- у Cloudflare встанови `NUXT_SHOPIFY_STORE_DOMAIN`, `NUXT_SHOPIFY_STOREFRONT_TOKEN`, `NUXT_SHOPIFY_STOREFRONT_TOKEN_TYPE`, `NUXT_SHOPIFY_API_VERSION`, `NUXT_SHOPIFY_PORTFOLIO_COLLECTION_HANDLE` і `NUXT_SHOPIFY_BLOG_HANDLE`; токени зберігай як Secrets;
- контактна форма використовує наявні Cloudflare secrets `TELEGRAM_BOT_TOKEN` і `TELEGRAM_CHAT_ID`;
- `NUXT_PUBLIC_SITE_URL` заданий у `wrangler.jsonc` і має містити production-домен, а не `workers.dev` URL;
- endpoint defaults визначені в `src/config/remoteEndpoints.js`;
- жоден `.env` файл не потрібен для production і не має потрапляти в Git.

## Content і дані

- `public/data/site-content.json` — основний текст, services, testimonials і profile content;
- `public/data/resume.json` — experience та education timeline;
- `public/data/portfolio.json` — локальний fallback; Nuxt runtime читає Shopify collection через `/api/portfolio`;
- `public/data/blog-posts.json` — локальний fallback для блогу;
- `public/images/` — реальні портрети, screenshots і project assets;
- Shopify — production source для blog articles і portfolio projects у Nuxt runtime.
- Для Shopify-продуктів портфоліо заповнюй `title`, `description`, `type`, `vendor`, `tags`, featured image та додаткові product images. `type` формує категорію фільтра, `tags` відображаються як технології, а URL проєкту зчитується з product metafield `custom.project_url` (тип URL, Storefront API access `PUBLIC_READ`).

Не вигадуй проєкти, клієнтів, метрики, відгуки або результати. Зміни контенту не повинні змінювати route contract чи публічне призначення сторінок.

## Структура

```text
app/       # Nuxt app, layouts and pages
server/    # Nuxt server routes, including Shopify blog API
src/       # shared Vue components, composables, services and stores
public/    # data, images and static assets
docs/      # tracked project documentation
tests/     # Node test suite
worker/    # Cloudflare Worker contact API
```

Nuxt pages використовують наявні Vue-компоненти з `src/`, щоб міграція не дублювала бізнес-логіку.

## Design system

Канонічні правила візуального дизайну та interaction/motion описані в [`docs/design-system.md`](docs/design-system.md).

Основні принципи:

- темно-графітова основа, світлий текст і emerald як єдиний UI accent;
- Sora для заголовків, Manrope/Inter для body і navigation;
- спільні header, navigation і footer на всіх сторінках;
- motion пояснює стан і не блокує контент;
- обов’язкова keyboard accessibility і `prefers-reduced-motion`;
- без випадкових градієнтів, паралаксу, tilt-карток і декоративних нескінченних анімацій.

## Deployment

### Cloudflare Workers / Nuxt

```bash
npm run build
npm run preview
```

Nuxt збирається з Nitro `cloudflare_module` preset. Cloudflare runtime bindings для Shopify і Telegram задаються в Worker Settings → Variables and Secrets; токени лишаються server-only. `wrangler.jsonc` задає Worker name, compatibility date, public site URL і генерує Worker assets конфігурацію через Nitro.

Production deployment виконується лише вручну через GitHub Actions → **Build Nuxt and deploy Cloudflare Worker** → **Run workflow**, або локально командою `npm run deploy:worker` після налаштування Wrangler credentials. Автоматичні push перевіряють тести і build, але не перемикають production.

### Legacy static Vite runtime

```bash
npm run build:vite
npx firebase-tools deploy --only hosting
```

`npm run build:vite` залишений як тимчасовий rollback path. Він генерує route snapshots, `dist/sitemap.xml` і `dist/robots.txt`; основний production build — Nuxt.

### Cloudflare Worker

Nuxt Worker обслуговує `POST /api/contact` та сумісний alias `POST /contact`, валідовує payload і надсилає повідомлення через Telegram API. Старий `worker/wrangler.toml` лишається для rollback до static Worker.

```bash
cd worker
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
npx wrangler deploy
```

Не зберігай `TELEGRAM_BOT_TOKEN` або `TELEGRAM_CHAT_ID` у frontend env чи репозиторії.

## Робочий процес

1. Перевір актуальний route, data source, assets і dirty worktree.
2. Зміни роби мінімально, зберігаючи маршрути, факти та публічний API.
3. Для UI перевіряй 1440, 1024, 768, 390 і 320px, keyboard focus та reduced motion.
4. Запускай релевантні тести й production build.
5. Користувач створює commit, push і deploy вручну.
