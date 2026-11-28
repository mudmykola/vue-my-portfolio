import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  compatibilityDate: '2026-11-26',
  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
  devtools: {
    enabled: false,
  },
  experimental: {
    payloadExtraction: false,
  },
  app: {
    pageTransition: {
      name: 'route-content',
      mode: 'out-in',
    },
    head: {
      meta: [{ name: 'freelancehunt', content: 'bc4842d34e0ac23' }],
      style: [
        {
          children:
            '.mobile-navigation{display:none!important}@media(max-width:640px){.header-nav__menu{display:none!important}.mobile-navigation{display:block!important}}',
        },
      ],
      link: [
        { rel: 'stylesheet', href: '/styles/critical-navigation.css' },
        { rel: 'stylesheet', href: '/styles/critical-blog.css' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          href: 'https://fonts.gstatic.com/s/sora/v17/xMQ9uFFYT72X5wkB_18qmnndmSdSnh2BAfO5mnuyOo1lfiQwV6-xo6eeIw.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@500;600;700&display=optional',
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
          sizes: 'any',
        },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },
  alias: {
    '@': resolve(projectRoot, 'src'),
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/tailwindCSS/main.css',
    '@/assets/style/global-style.scss',
    '@/assets/style/media.scss',
  ],
  runtimeConfig: {
    telegramBotToken: '',
    telegramChatId: '',
    shopifyStoreDomain: '',
    shopifyStorefrontToken: '',
    shopifyStorefrontTokenType: 'public',
    shopifyApiVersion: '2026-10',
    shopifyBlogHandle: 'blog-post',
    shopifyPortfolioCollectionHandle: 'portfolio',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://mykolamud.pp.ua',
      openWeatherApiKey: '',
      defaultOgImagePath:
        process.env.NUXT_PUBLIC_DEFAULT_OG_IMAGE_PATH ||
        '/images/avatar-logo.webp',
      defaultOgImageAlt:
        process.env.NUXT_PUBLIC_DEFAULT_OG_IMAGE_ALT ||
        'Mykola Mud front-end engineer portfolio social preview image',
      defaultOgImageWidth: Number(
        process.env.NUXT_PUBLIC_DEFAULT_OG_IMAGE_WIDTH || 1200
      ),
      defaultOgImageHeight: Number(
        process.env.NUXT_PUBLIC_DEFAULT_OG_IMAGE_HEIGHT || 630
      ),
    },
  },
  typescript: {
    strict: false,
    typeCheck: false,
  },
});
