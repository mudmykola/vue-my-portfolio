import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { buildIdentityNodes } from '../src/config/structuredData.js';
import { buildStructuredDataScript } from '../app/utils/structuredDataScript.js';

const origin = 'https://mykolamud.pp.ua';

test('shared structured data defines stable website and profile identities', () => {
  const [website, person] = buildIdentityNodes(
    origin,
    `${origin}/images/avatar-logo.webp`
  );

  assert.equal(website['@type'], 'WebSite');
  assert.equal(website['@id'], `${origin}#website`);
  assert.equal(person['@type'], 'Person');
  assert.equal(person['@id'], `${origin}#person`);
  assert.equal(person.image, `${origin}/images/avatar-logo.webp`);
});

test('Nuxt writes JSON-LD into the structured data script body', () => {
  const graph = buildIdentityNodes(origin, `${origin}/images/avatar-logo.webp`);
  const script = buildStructuredDataScript(graph);

  assert.equal(script.type, 'application/ld+json');
  assert.deepEqual(JSON.parse(script.textContent), {
    '@context': 'https://schema.org',
    '@graph': graph,
  });
  assert.equal('children' in script, false);
});

test('Nuxt sitemap and robots assets use the configured public origin', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'portfolio-seo-assets-'));
  const outputDir = join(dir, 'public');

  try {
    execFileSync(
      process.execPath,
      [
        fileURLToPath(
          new URL('../scripts/generate-seo-assets.mjs', import.meta.url)
        ),
      ],
      {
        cwd: dir,
        env: {
          ...process.env,
          NUXT_PUBLIC_SITE_URL: origin,
          NUXT_SEO_OUTPUT_DIR: outputDir,
        },
      }
    );

    const sitemap = await readFile(join(outputDir, 'sitemap.xml'), 'utf8');
    const robots = await readFile(join(outputDir, 'robots.txt'), 'utf8');

    assert.match(sitemap, new RegExp(`${origin}/portfolio`));
    assert.match(sitemap, new RegExp(`${origin}/blog`));
    assert.match(robots, new RegExp(`Sitemap: ${origin}/sitemap\\.xml`));
    assert.match(robots, /Disallow: \/game/);
    assert.doesNotMatch(sitemap, /example\.com/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
