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
  const blogHandle = String(config.shopifyBlogHandle || '');
  const first = Math.min(Math.max(Number(query.first) || 50, 1), 100);
  const after = query.after ? String(query.after) : null;
  const fallbackPage = () => {
    const fallback = getFallbackArticles();
    return { ...fallback, articles: fallback.articles.slice(0, first) };
  };

  if (!hasShopifyConfig(config) || !blogHandle) return fallbackPage();

  try {
    const data = await shopifyRequest(config, SHOPIFY_BLOG_QUERY, {
      blogHandle,
      first,
      after,
    });
    const blog = data.blog;
    const connection = blog?.articles;

    if (!blog || !connection) return fallbackPage();

    const articles = (connection.nodes || []).map((article) =>
      normalizeShopifyArticle(article, blog)
    );
    if (!articles.length) {
      return fallbackPage();
    }

    return {
      blog: { handle: blog.handle, title: blog.title },
      articles,
      pageInfo: connection.pageInfo,
    };
  } catch (error) {
    console.error(
      '[blog] Shopify Storefront request failed; using local fallback.'
    );
    return fallbackPage();
  }
});
