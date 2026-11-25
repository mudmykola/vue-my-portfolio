import {
  SHOPIFY_BLOG_QUERY,
  getFallbackArticles,
  hasShopifyConfig,
  normalizeShopifyArticle,
  shopifyRequest,
} from '../../utils/shopifyBlog.js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const query = getQuery(event);
  const first = Math.min(Math.max(Number(query.first) || 50, 1), 100);
  const after = query.after ? String(query.after) : null;

  if (!hasShopifyConfig(config)) {
    const fallback = getFallbackArticles();
    return {
      ...fallback,
      articles: fallback.articles.slice(0, first),
    };
  }

  try {
    const data = await shopifyRequest(config, SHOPIFY_BLOG_QUERY, {
      first,
      after,
    });
    const blog = data.blogs?.nodes?.[0];
    const connection = blog?.articles;

    if (!blog || !connection) return getFallbackArticles();

    return {
      blog: { handle: blog.handle, title: blog.title },
      articles: (connection.nodes || []).map((article) =>
        normalizeShopifyArticle(article, blog)
      ),
      pageInfo: connection.pageInfo,
    };
  } catch (error) {
    console.error(
      '[blog] Shopify Storefront request failed; using local fallback.'
    );
    return getFallbackArticles();
  }
});
