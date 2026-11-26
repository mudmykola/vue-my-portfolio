import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  compatibilityDate: '2026-11-25',
  devtools: {
    enabled: false,
  },
  experimental: {
    payloadExtraction: false,
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
    shopifyStoreDomain: process.env.NUXT_SHOPIFY_STORE_DOMAIN || '',
    shopifyStorefrontToken: process.env.NUXT_SHOPIFY_STOREFRONT_TOKEN || '',
    shopifyStorefrontTokenType:
      process.env.NUXT_SHOPIFY_STOREFRONT_TOKEN_TYPE || 'public',
    shopifyApiVersion: process.env.NUXT_SHOPIFY_API_VERSION || '2026-10',
    shopifyBlogHandle: process.env.NUXT_SHOPIFY_BLOG_HANDLE || '',
    shopifyPortfolioCollectionHandle:
      process.env.NUXT_SHOPIFY_PORTFOLIO_COLLECTION_HANDLE || 'portfolio',
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
