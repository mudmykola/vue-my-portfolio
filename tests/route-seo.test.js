import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCanonicalUrl, routeSeo } from '../app/utils/routeSeo.js';

test('Nuxt route SEO preserves the public route contract', () => {
  assert.deepEqual(
    Object.values(routeSeo).map((route) => route.canonicalPath),
    [
      '/',
      '/about',
      '/resume',
      '/portfolio',
      '/blog',
      '/contact',
      '/game',
      '/404',
    ]
  );
  assert.equal(routeSeo.game.noindex, true);
  assert.equal(routeSeo.notFound.noindex, true);
});

test('Nuxt route SEO builds production-domain canonical URLs', () => {
  assert.equal(
    buildCanonicalUrl('https://mykolamud.pp.ua/', '/portfolio'),
    'https://mykolamud.pp.ua/portfolio'
  );
  assert.equal(
    buildCanonicalUrl('https://mykolamud.pp.ua', '/'),
    'https://mykolamud.pp.ua/'
  );
});
