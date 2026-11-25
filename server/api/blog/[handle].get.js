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

  if (!hasShopifyConfig(config)) {
    const fallback = fallbackArticleByHandle(handle);
    if (!fallback)
      throw createError({
        statusCode: 404,
        statusMessage: 'Article not found',
      });
    return { article: fallback };
  }

  try {
    const blogHandle = String(config.shopifyBlogHandle || '');
    if (!blogHandle)
      throw new Error('NUXT_SHOPIFY_BLOG_HANDLE is not configured.');

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
    console.error('[blog] Shopify article request failed.');
    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to load article',
    });
  }
});
