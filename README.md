# Mykola Mud Portfolio

Персональне портфоліо Mykola Mud — Front-End Engineer. Проєкт поступово мігрує з Vue/Vite на Nuxt без зміни публічних маршрутів, фактичного контенту та джерел даних.

Основний стек: Vue 3, Nuxt 4, Vue Router, Pinia, SCSS і Shopify Storefront API для блогу.

## Можливості

- сторінки Home, Portfolio, About, Resume, Blog, Contact і Game;
- SSR/SEO-маршрути Nuxt зі стабільними canonical, sitemap, robots і JSON-LD;
- блог із Shopify Storefront API та локальним fallback-контентом;
- portfolio, resume і site content із JSON-джерел у `public/data/`;
- responsive layout для desktop, tablet і mobile;
- доступне mobile menu, keyboard focus і reduced-motion підтримка;
- Cloudflare Worker для contact API та Telegram delivery;
- збережений Vite runtime як перехідний compatibility layer до завершення міграції.

## Стек

- Vue 3 + Composition API
- Nuxt 4 + Nitro
- Vite 5 — legacy/static runtime під час міграції
- Vue Router, Pinia, SCSS
- Font Awesome
- Shopify Storefront API
- Cloudflare Workers
- Firebase Hosting для статичного Vite build

## Вимоги та встановлення

- Node.js 18+
- npm

```bash
npm install
```

## Локальна розробка

Nuxt runtime:

```bash
npm run dev:nuxt
```

Legacy Vite runtime:

```bash
npm run dev
```

Nuxt preview після production build:

```bash
npm run preview:nuxt
```

## Build і перевірки

```bash
# Nuxt production build
npm run build:nuxt

# Vite static build + route snapshots + sitemap/robots
npm run build

# Тести
npm test

# Повна перевірка legacy/static pipeline
npm run verify
```

Тести перевіряють route SEO, structured data, Shopify blog normalization, portfolio/blog composables і Cloudflare Worker contract.

## Публічні маршрути

| Route           | Призначення             |
| --------------- | ----------------------- |
| `/`             | Home                    |
| `/portfolio`    | Portfolio projects      |
| `/about`        | About                   |
| `/resume`       | Resume                  |
| `/blog`         | Shopify-backed blog     |
| `/blog/:handle` | Individual blog article |
| `/contact`      | Contact form            |
| `/game`         | Game page               |

## Конфігурація середовища

Створи локальний `.env` у корені проєкту. Реальні секрети не додавай у Git.

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

# Nuxt server-only Shopify configuration
NUXT_SHOPIFY_STORE_DOMAIN=
NUXT_SHOPIFY_STOREFRONT_TOKEN=
NUXT_SHOPIFY_API_VERSION=2025-10
NUXT_SHOPIFY_BLOG_HANDLE=
```

Правила:

- `VITE_*` значення вбудовуються у frontend build і не підходять для секретів;
- Shopify Storefront token використовуй тільки через server-side Nuxt config;
- `VITE_SITE_URL` має містити production-домен, а не `workers.dev` URL;
- endpoint defaults визначені в `src/config/remoteEndpoints.js`;
- contact secrets зберігаються у Cloudflare Worker environment.

## Content і дані

- `public/data/site-content.json` — основний текст, services, testimonials і profile content;
- `public/data/resume.json` — experience та education timeline;
- `public/data/portfolio.json` — portfolio projects;
- `public/data/blog-posts.json` — локальний fallback для блогу;
- `public/images/` — реальні портрети, screenshots і project assets;
- Shopify — production source для blog articles у Nuxt runtime.

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

### Nuxt

```bash
npm run build:nuxt
npm run preview:nuxt
```

Перед production deploy перевір server-only Shopify env і canonical production URL.

### Firebase Hosting / static Vite runtime

```bash
npm run build
npx firebase-tools deploy --only hosting
```

Static build генерує route snapshots для SEO-сторінок, `dist/sitemap.xml` і `dist/robots.txt`.

### Cloudflare Worker

Worker обслуговує contact endpoint `POST /contact`, валідовує payload і надсилає повідомлення через Telegram API.

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
