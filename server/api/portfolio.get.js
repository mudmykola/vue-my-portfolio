import {
  fetchShopifyPortfolio,
  getFallbackPortfolio,
  hasShopifyPortfolioConfig,
} from '../utils/shopifyPortfolio.js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  if (!hasShopifyPortfolioConfig(config)) return getFallbackPortfolio();

  try {
    return await fetchShopifyPortfolio(config);
  } catch (error) {
    console.error(
      '[portfolio] Shopify Storefront request failed; using local fallback.',
      {
        status: error?.statusCode || error?.status || null,
        causeCode: error?.cause?.code || null,
        message: error?.message || 'Unknown request error',
      }
    );
    return getFallbackPortfolio();
  }
});
