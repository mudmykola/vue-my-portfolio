import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { copy } from 'fs-extra';
import {
  fetchShopifyPortfolio,
  getFallbackPortfolio,
} from './server/utils/shopifyPortfolio.js';

const portfolioApiPlugin = (env) => ({
  name: 'shopify-portfolio-api',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/api/portfolio', async (request, response) => {
      if (request.method !== 'GET') {
        response.statusCode = 405;
        response.end();
        return;
      }

      response.setHeader('Content-Type', 'application/json; charset=utf-8');
      response.setHeader('Cache-Control', 'no-store');

      try {
        const data = await fetchShopifyPortfolio({
          shopifyStoreDomain: env.NUXT_SHOPIFY_STORE_DOMAIN,
          shopifyStorefrontToken: env.NUXT_SHOPIFY_STOREFRONT_TOKEN,
          shopifyStorefrontTokenType:
            env.NUXT_SHOPIFY_STOREFRONT_TOKEN_TYPE || 'public',
          shopifyApiVersion: env.NUXT_SHOPIFY_API_VERSION || '2026-10',
          shopifyPortfolioCollectionHandle:
            env.NUXT_SHOPIFY_PORTFOLIO_COLLECTION_HANDLE || 'portfolio',
        });

        response.statusCode = 200;
        response.end(JSON.stringify(data));
      } catch (error) {
        console.error(
          '[portfolio] Shopify request failed in Vite; using local fallback.',
          { status: error?.statusCode || null }
        );
        response.statusCode = 200;
        response.end(JSON.stringify(getFallbackPortfolio()));
      }
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      vue(),
      portfolioApiPlugin(env),
      {
        name: 'copy-assets',
        apply: 'build',
        writeBundle() {
          const assetFolders = ['audio', 'download', 'images'];
          assetFolders.forEach((folder) => {
            copy(
              resolve(__dirname, `src/assets/${folder}`),
              resolve(__dirname, `dist/assets/${folder}`)
            )
              .then(() => console.log(`Folder ${folder} copied successfully!`))
              .catch((error) =>
                console.error(`Error copying folder ${folder}:`, error)
              );
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  };
});
