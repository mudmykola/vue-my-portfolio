import test from 'node:test';
import assert from 'node:assert/strict';
import {
  fallbackArticleByHandle,
  normalizeShopifyArticle,
  slugify,
} from '../server/utils/shopifyBlog.js';

test('normalizes Shopify articles to the existing blog post contract', () => {
  const article = normalizeShopifyArticle(
    {
      id: 'gid://shopify/Article/1',
      handle: 'nuxt-shopify',
      title: 'Nuxt + Shopify',
      excerpt: 'Headless blog delivery',
      contentHtml: '<p>Content</p>',
      publishedAt: '2026-11-25T10:00:00Z',
      tags: ['Nuxt', 'Shopify'],
      image: { url: 'https://cdn.shopify.com/image.webp', altText: 'Cover' },
      seo: { title: 'Nuxt Shopify SEO', description: 'SEO summary' },
    },
    { title: 'Engineering' }
  );

  assert.deepEqual(
    {
      id: article.id,
      handle: article.handle,
      image: article.image,
      category: article.category,
      date: article.date,
      seoTitle: article.seoTitle,
      source: article.source,
    },
    {
      id: 'gid://shopify/Article/1',
      handle: 'nuxt-shopify',
      image: 'https://cdn.shopify.com/image.webp',
      category: 'Nuxt',
      date: '2026-11-25T10:00:00Z',
      seoTitle: 'Nuxt Shopify SEO',
      source: 'shopify',
    }
  );
});

test('local fallback provides deterministic handles and missing-article behavior', () => {
  assert.equal(
    slugify('Vue + Shopify: Headless Blog'),
    'vue-shopify-headless-blog'
  );
  const first = fallbackArticleByHandle(
    '10-css-life-hacks-that-will-make-your-websites-better'
  );
  assert.equal(first.source, 'shopify');
  assert.equal(fallbackArticleByHandle('missing-article'), null);
});
