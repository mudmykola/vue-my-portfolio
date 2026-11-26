import fallbackData from '../../public/data/blog-posts.json' with { type: 'json' };

const BLOG_ARTICLE_FIELDS = `
  id
  handle
  title
  excerpt
  content
  contentHtml
  publishedAt
  tags
  image { url altText width height }
  seo { title description }
`;

export const SHOPIFY_BLOG_QUERY = `#graphql
  query BlogArticles($first: Int!, $after: String) {
    blogs(first: 1) {
      nodes {
        handle
        title
        articles(first: $first, after: $after) {
          nodes { ${BLOG_ARTICLE_FIELDS} }
          pageInfo { hasNextPage endCursor }
        }
      }
    }
  }
`;

export const SHOPIFY_ARTICLE_QUERY = `#graphql
  query BlogArticle($blogHandle: String!, $articleHandle: String!) {
    blog(handle: $blogHandle) {
      handle
      title
      articleByHandle(handle: $articleHandle) { ${BLOG_ARTICLE_FIELDS} }
    }
  }
`;

const stripHtml = (value) =>
  String(value || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const slugify = (value) =>
  String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const normalizeShopifyArticle = (article, blog = {}) => {
  if (!article) return null;
  const contentHtml = String(article.contentHtml || '');
  const excerpt = String(
    article.excerpt || article.seo?.description || stripHtml(contentHtml)
  ).trim();
  const title = String(article.title || '').trim();
  const tags = Array.isArray(article.tags) ? article.tags.filter(Boolean) : [];

  return {
    id: article.id || `shopify-${article.handle || slugify(title)}`,
    handle: article.handle || slugify(title),
    title,
    image: article.image?.url || '',
    imageAlt: article.image?.altText || title,
    excerpt,
    content: stripHtml(article.content || contentHtml),
    contentHtml,
    date: article.publishedAt || '',
    category: tags[0] || blog.title || 'Shopify',
    tags,
    seoTitle: article.seo?.title || title,
    seoDescription: article.seo?.description || excerpt,
    source: 'shopify',
  };
};

export const getFallbackArticles = () => ({
  blog: { handle: 'local', title: 'Front-End Engineering' },
  articles: (fallbackData.posts || []).map((post) =>
    normalizeShopifyArticle(
      {
        ...post,
        handle: post.handle || slugify(post.title),
        publishedAt: post.publishedAt || post.date,
      },
      { title: post.category }
    )
  ),
  pageInfo: { hasNextPage: false, endCursor: null },
});

const getShopifyConfig = (config) => ({
  domain: String(config.shopifyStoreDomain || '')
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, ''),
  token: String(config.shopifyStorefrontToken || ''),
  tokenType: String(
    config.shopifyStorefrontTokenType || 'public'
  ).toLowerCase(),
  version: String(config.shopifyApiVersion || '2026-10'),
  blogHandle: String(config.shopifyBlogHandle || ''),
});

export const hasShopifyConfig = (config) => {
  const { domain, token } = getShopifyConfig(config);
  return Boolean(domain && token);
};

export const getShopifyRequestHeaders = (config) => {
  const { token, tokenType } = getShopifyConfig(config);
  const tokenHeader =
    tokenType === 'private'
      ? 'Shopify-Storefront-Private-Token'
      : 'X-Shopify-Storefront-Access-Token';

  return {
    'Content-Type': 'application/json',
    [tokenHeader]: token,
  };
};

export async function shopifyRequest(config, query, variables) {
  const { domain, token, version } = getShopifyConfig(config);
  const response = await $fetch(
    `https://${domain}/api/${version}/graphql.json`,
    {
      method: 'POST',
      headers: getShopifyRequestHeaders(config),
      body: { query, variables },
    }
  );

  if (response?.errors?.length) {
    throw new Error('Shopify Storefront API returned GraphQL errors.');
  }

  return response?.data || {};
}

export function fallbackArticleByHandle(handle) {
  return (
    getFallbackArticles().articles.find(
      (article) => article.handle === handle
    ) || null
  );
}
