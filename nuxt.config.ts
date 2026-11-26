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
    head: {
      link: [
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
    shopifyBlogHandle: '',
    shopifyPortfolioCollectionHandle: 'portfolio',
    public: {
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL ||
        process.env.VITE_SITE_URL ||
        'https://mykolamud.pp.ua',
      defaultOgImagePath:
        process.env.NUXT_PUBLIC_DEFAULT_OG_IMAGE_PATH ||
        process.env.VITE_DEFAULT_OG_IMAGE_PATH ||
        '/images/avatar-logo.webp',
      defaultOgImageAlt:
        process.env.NUXT_PUBLIC_DEFAULT_OG_IMAGE_ALT ||
        process.env.VITE_DEFAULT_OG_IMAGE_ALT ||
        'Mykola Mud front-end engineer portfolio social preview image',
      defaultOgImageWidth: Number(
        process.env.NUXT_PUBLIC_DEFAULT_OG_IMAGE_WIDTH ||
          process.env.VITE_DEFAULT_OG_IMAGE_WIDTH ||
          1200
      ),
      defaultOgImageHeight: Number(
        process.env.NUXT_PUBLIC_DEFAULT_OG_IMAGE_HEIGHT ||
          process.env.VITE_DEFAULT_OG_IMAGE_HEIGHT ||
          630
      ),
    },
  },
  typescript: {
    strict: false,
    typeCheck: false,
  },
});
