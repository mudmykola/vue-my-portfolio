import fallbackData from '../../public/data/blog-posts.json' with { type: 'json' };

const BLOG_ARTICLE_FIELDS = `
  id
  handle
  title
  authorV2 { name }
  excerpt
  content
  contentHtml
  publishedAt
  tags
  image { url altText width height }
  seo { title description }
`;

export const SHOPIFY_BLOG_QUERY = `#graphql
  query BlogArticles($blogHandle: String!, $first: Int!, $after: String) {
    blog(handle: $blogHandle) {
      handle
      title
      articles(first: $first, after: $after) {
        nodes { ${BLOG_ARTICLE_FIELDS} }
        pageInfo { hasNextPage endCursor }
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

const decodeHtmlEntities = (value) =>
  String(value || '')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, code) => {
      const point = Number(code);
      return point <= 0x10ffff ? String.fromCodePoint(point) : '';
    })
    .replace(/&#x([\da-f]+);/gi, (_, code) => {
      const point = parseInt(code, 16);
      return point <= 0x10ffff ? String.fromCodePoint(point) : '';
    });

const cleanSeoText = (value) =>
  decodeHtmlEntities(stripHtml(value)).replace(/\s+/g, ' ').trim();

const truncateSeoDescription = (value, maxLength = 160) => {
  const text = cleanSeoText(value);
  if (text.length <= maxLength) return text;

  const candidate = text.slice(0, maxLength - 1);
  const wordBoundary = candidate.lastIndexOf(' ');
  const truncated = candidate.slice(
    0,
    wordBoundary > 100 ? wordBoundary : maxLength - 1
  );

  return `${truncated.trimEnd()}…`;
};

const getFirstArticleParagraph = (contentHtml) => {
  const paragraphs = String(contentHtml || '').matchAll(
    /<p\b[^>]*>([\s\S]*?)<\/p>/gi
  );
  const candidates = [...paragraphs].map(([, paragraph]) =>
    cleanSeoText(paragraph)
  );

  return (
    candidates.find((paragraph) => paragraph.length >= 70) ||
    candidates[0] ||
    ''
  );
};

const buildSeoDescription = (article, excerpt, contentHtml) => {
  const explicitDescription = cleanSeoText(article.seo?.description);
  if (explicitDescription) return explicitDescription;

  const excerptText = cleanSeoText(excerpt);
  const fallbackText =
    excerptText ||
    getFirstArticleParagraph(contentHtml) ||
    cleanSeoText(article.content || contentHtml);

  return truncateSeoDescription(fallbackText);
};

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
  const tags = Array.isArray(article.tags)
    ? article.tags.map((tag) => String(tag).trim()).filter(Boolean)
    : [];
  const author = String(
    article.authorV2?.name || article.author?.name || article.author || ''
  ).trim();

  return {
    id: article.id || `shopify-${article.handle || slugify(title)}`,
    handle: article.handle || slugify(title),
    title,
    author,
    image: article.image?.url || '',
    imageAlt: article.image?.altText || title,
    excerpt,
    content: stripHtml(article.content || contentHtml),
    contentHtml,
    date: article.publishedAt || '',
    category: tags[0] || blog.title || 'Shopify',
    tags,
    seoTitle: cleanSeoText(article.seo?.title) || title,
    seoDescription: buildSeoDescription(article, article.excerpt, contentHtml),
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
