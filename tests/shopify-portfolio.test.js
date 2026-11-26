import test from 'node:test';
import assert from 'node:assert/strict';
import {
  fetchShopifyPortfolio,
  getFallbackPortfolio,
  normalizeShopifyPortfolioProduct,
} from '../server/utils/shopifyPortfolio.js';

test('normalizes Shopify product fields to the portfolio card contract', () => {
  const project = normalizeShopifyPortfolioProduct({
    id: 'gid://shopify/Product/1',
    handle: 'mud-tech-blog',
    title: 'Mud Tech Blog',
    description: 'Built a technology blog with search and topic filters.',
    productType: 'Vue',
    vendor: 'Mud Studio',
    tags: ['Vue', 'JavaScript', 'Firebase Hosting'],
    onlineStoreUrl: 'https://example.com',
    projectUrl: { value: 'https://mud-tech.example' },
    featuredImage: {
      url: 'https://cdn.shopify.com/cover.webp',
      altText: 'Cover',
    },
    images: {
      nodes: [
        { url: 'https://cdn.shopify.com/other.webp', altText: 'Article page' },
        { url: 'https://cdn.shopify.com/cover.webp', altText: 'Cover' },
      ],
    },
  });

  assert.deepEqual(project, {
    id: 'gid://shopify/Product/1',
    name: 'Mud Tech Blog',
    category: 'Vue',
    vendor: 'Mud Studio',
    image: 'https://cdn.shopify.com/cover.webp',
    imageAlt: 'Cover',
    imageSet: [
      { src: 'https://cdn.shopify.com/cover.webp', alt: 'Cover' },
      { src: 'https://cdn.shopify.com/other.webp', alt: 'Article page' },
    ],
    description: 'Built a technology blog with search and topic filters.',
    descriptionFull: 'Built a technology blog with search and topic filters.',
    technology: 'Vue, JavaScript, Firebase Hosting',
    link: 'https://mud-tech.example',
  });
});

test('uses safe defaults for optional Shopify product fields', () => {
  const project = normalizeShopifyPortfolioProduct({ title: 'No type yet' });

  assert.equal(project.category, 'Other');
  assert.equal(project.vendor, '');
  assert.equal(project.image, '');
  assert.equal(project.technology, '');
  assert.equal(project.link, '');
  assert.equal(normalizeShopifyPortfolioProduct(null), null);
});

test('falls back to the Shopify product URL when project URL is empty', () => {
  const project = normalizeShopifyPortfolioProduct({
    title: 'Fallback link',
    onlineStoreUrl: 'https://store.example/products/fallback-link',
    projectUrl: { value: '' },
  });

  assert.equal(project.link, 'https://store.example/products/fallback-link');
});

test('provides local portfolio JSON as the API fallback', () => {
  const fallback = getFallbackPortfolio();
  assert.equal(fallback.source, 'fallback');
  assert.ok(fallback.portfolioCard.length > 0);
});

test('loads the Shopify collection through the private Storefront header', async () => {
  let requestOptions;
  const result = await fetchShopifyPortfolio(
    {
      shopifyStoreDomain: 'example.myshopify.com',
      shopifyStorefrontToken: 'private-token',
      shopifyStorefrontTokenType: 'private',
      shopifyPortfolioCollectionHandle: 'portfolio',
    },
    async (_url, options) => {
      requestOptions = options;
      return {
        ok: true,
        async json() {
          return {
            data: {
              collection: {
                products: {
                  nodes: [
                    {
                      id: 'product-1',
                      title: 'Shopify Project',
                      productType: 'Vue',
                      tags: ['Nuxt'],
                      projectUrl: { value: 'https://project.example' },
                    },
                  ],
                  pageInfo: { hasNextPage: false, endCursor: null },
                },
              },
            },
          };
        },
      };
    }
  );

  assert.equal(
    requestOptions.headers['Shopify-Storefront-Private-Token'],
    'private-token'
  );
  assert.equal(result.source, 'shopify');
  assert.equal(result.portfolioCard[0].link, 'https://project.example');
});

test('paginates Shopify products across collection pages', async () => {
  const cursors = [];
  const result = await fetchShopifyPortfolio(
    {
      shopifyStoreDomain: 'example.myshopify.com',
      shopifyStorefrontToken: 'token',
      shopifyPortfolioCollectionHandle: 'portfolio',
    },
    async (_url, options) => {
      const variables = JSON.parse(options.body).variables;
      cursors.push(variables.after);
      return {
        ok: true,
        async json() {
          return {
            data: {
              collection: {
                products: {
                  nodes: [
                    { id: `product-${cursors.length}`, title: 'Project' },
                  ],
                  pageInfo:
                    cursors.length === 1
                      ? { hasNextPage: true, endCursor: 'next-page' }
                      : { hasNextPage: false, endCursor: null },
                },
              },
            },
          };
        },
      };
    }
  );

  assert.deepEqual(cursors, [null, 'next-page']);
  assert.equal(result.portfolioCard.length, 2);
});
