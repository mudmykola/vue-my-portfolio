import {
  SHOPIFY_ARTICLE_QUERY,
  fallbackArticleByHandle,
  hasShopifyConfig,
  normalizeShopifyArticle,
  shopifyRequest,
} from '../../utils/shopifyBlog.js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const handle = String(getRouterParam(event, 'handle') || '');
  const fallback = fallbackArticleByHandle(handle);
  const blogHandle = String(config.shopifyBlogHandle || '');

  if (!hasShopifyConfig(config) || !blogHandle) {
    if (!fallback)
      throw createError({
        statusCode: 404,
        statusMessage: 'Article not found',
      });
    return { article: fallback };
  }

  try {
    const data = await shopifyRequest(config, SHOPIFY_ARTICLE_QUERY, {
      blogHandle,
      articleHandle: handle,
    });
    const blog = data.blog;
    const article = normalizeShopifyArticle(blog?.articleByHandle, blog);

    if (!article)
      throw createError({
        statusCode: 404,
        statusMessage: 'Article not found',
      });
    return { article };
  } catch (error) {
    if (error?.statusCode === 404) throw error;
    if (fallback) return { article: fallback };
    console.error('[blog] Shopify article request failed.');
    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to load article',
    });
  }
});
