import fallbackData from '../../public/data/portfolio.json' with { type: 'json' };

export const SHOPIFY_PORTFOLIO_QUERY = `#graphql
  query PortfolioProducts($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      handle
      products(first: $first, after: $after) {
        nodes {
          id
          handle
          title
          description
          productType
          vendor
          tags
          onlineStoreUrl
          projectUrl: metafield(namespace: "custom", key: "project_url") {
            value
          }
          featuredImage { url altText }
          images(first: 20) { nodes { url altText } }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`;

const cleanText = (value) =>
  String(value || '')
    .replace(/\s+/g, ' ')
    .trim();

export const normalizeShopifyPortfolioProduct = (product) => {
  if (!product) return null;

  const name = cleanText(product.title);
  const descriptionFull = cleanText(product.description);
  const images = (product.images?.nodes || [])
    .filter((image) => image?.url)
    .map((image) => ({
      src: image.url,
      alt: cleanText(image.altText) || name,
    }));
  const featuredImage = product.featuredImage?.url
    ? {
        src: product.featuredImage.url,
        alt: cleanText(product.featuredImage.altText) || name,
      }
    : images[0];

  if (
    featuredImage &&
    !images.some((image) => image.src === featuredImage.src)
  ) {
    images.unshift(featuredImage);
  } else if (featuredImage) {
    images.sort(
      (a, b) =>
        Number(b.src === featuredImage.src) -
        Number(a.src === featuredImage.src)
    );
  }

  const tags = Array.isArray(product.tags)
    ? product.tags.map(cleanText).filter(Boolean)
    : [];

  return {
    id: product.id || product.handle || name,
    name,
    category: cleanText(product.productType) || 'Other',
    vendor: cleanText(product.vendor),
    image: featuredImage?.src || '',
    imageAlt: featuredImage?.alt || name,
    imageSet: images,
    description:
      descriptionFull.length > 180
        ? `${descriptionFull.slice(0, 177).trimEnd()}…`
        : descriptionFull,
    descriptionFull,
    technology: tags.join(', '),
    link: cleanText(product.projectUrl?.value || product.onlineStoreUrl),
  };
};

export const getFallbackPortfolio = () => ({
  portfolioCard: fallbackData.portfolioCard || [],
  source: 'fallback',
});

export const hasShopifyPortfolioConfig = (config) =>
  Boolean(config.shopifyStoreDomain && config.shopifyStorefrontToken);

export async function fetchShopifyPortfolio(config, fetchImpl = fetch) {
  if (!hasShopifyPortfolioConfig(config)) return getFallbackPortfolio();

  const domain = String(config.shopifyStoreDomain)
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '');
  const version = String(config.shopifyApiVersion || '2026-10');
  const collectionHandle = String(
    config.shopifyPortfolioCollectionHandle || 'portfolio'
  );
  const tokenType = String(config.shopifyStorefrontTokenType || 'public')
    .trim()
    .toLowerCase();
  const tokenHeader =
    tokenType === 'private'
      ? 'Shopify-Storefront-Private-Token'
      : 'X-Shopify-Storefront-Access-Token';
  const portfolioCard = [];
  let after = null;

  while (true) {
    const response = await fetchImpl(
      `https://${domain}/api/${version}/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [tokenHeader]: String(config.shopifyStorefrontToken),
        },
        body: JSON.stringify({
          query: SHOPIFY_PORTFOLIO_QUERY,
          variables: { handle: collectionHandle, first: 40, after },
        }),
      }
    );

    if (!response.ok) {
      throw Object.assign(
        new Error(`Shopify Storefront request failed with ${response.status}.`),
        { statusCode: response.status }
      );
    }

    const result = await response.json();
    if (result?.errors?.length) {
      throw new Error('Shopify Storefront API returned GraphQL errors.');
    }

    const collection = result?.data?.collection;
    const connection = collection?.products;
    if (!collection || !connection) return getFallbackPortfolio();

    portfolioCard.push(
      ...(connection.nodes || [])
        .map(normalizeShopifyPortfolioProduct)
        .filter(Boolean)
    );

    if (!connection.pageInfo?.hasNextPage) break;
    after = connection.pageInfo.endCursor;
    if (!after) {
      throw new Error('Shopify portfolio pagination returned no cursor.');
    }
  }

  return { portfolioCard, source: 'shopify', collection: collectionHandle };
}
