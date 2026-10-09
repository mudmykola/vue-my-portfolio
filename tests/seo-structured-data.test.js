import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { applyRouteSeoMeta } from '../src/config/seo.js';
import { buildIdentityNodes } from '../src/config/structuredData.js';

const origin = 'https://mykolamud.pp.ua';
const routes = [
  ['/', 'WebPage'],
  ['/about', 'AboutPage'],
  ['/resume', 'ProfilePage'],
  ['/portfolio', 'CollectionPage'],
  ['/blog', 'CollectionPage'],
  ['/contact', 'ContactPage'],
];

// Only the head APIs used by the public SEO entry point; no browser is required.
function createDocument() {
  const elements = [];
  return {
    head: {
      querySelector(selector) {
        if (selector.startsWith('#'))
          return elements.find((e) => e.id === selector.slice(1));
        const match = selector.match(/^([a-z]+)\[([^=]+)="([^"]+)"\]$/);
        return elements.find(
          (e) => e.tag === match?.[1] && e.attributes[match[2]] === match[3]
        );
      },
      appendChild(element) {
        elements.push(element);
      },
    },
    createElement(tag) {
      return {
        tag,
        attributes: {},
        textContent: '',
        setAttribute(name, value) {
          this.attributes[name] = value;
        },
      };
    },
    elements,
  };
}

function checkGraph(graph, path, type) {
  assert.equal(graph['@context'], 'https://schema.org');
  assert.equal(graph['@graph'].length, 4);
  const canonical = path === '/' ? `${origin}/` : `${origin}${path}`;
  const [website, person, page, breadcrumb] = graph['@graph'];
  assert.deepEqual(
    [website, person],
    buildIdentityNodes(origin, `${origin}/images/avatar-logo.webp`)
  );
  assert.equal(page['@type'], type);
  assert.equal(page.url, canonical);
  assert.equal(page.about['@id'], person['@id']);
  assert.equal(page.isPartOf['@id'], website['@id']);
  assert.equal(breadcrumb['@type'], 'BreadcrumbList');
  assert.equal(breadcrumb.itemListElement.at(-1).item, canonical);
  assert.equal(new Set(graph['@graph'].map((node) => node['@id'])).size, 4);
}

test('route changes update a single JSON-LD script and preserve profile identity', () => {
  const previousDocument = globalThis.document;
  const previousWindow = globalThis.window;
  globalThis.document = createDocument();
  globalThis.window = { location: { origin, pathname: '/' } };
  try {
    for (const [path, schemaType] of [...routes, routes[0]]) {
      applyRouteSeoMeta({
        path,
        meta: {
          seo: {
            schemaType,
            canonicalPath: path,
            breadcrumbLabel: path === '/' ? 'Home' : path.slice(1),
            ogImage: '/images/route-preview.webp',
          },
        },
      });
      const scripts = document.elements.filter((e) => e.tag === 'script');
      assert.equal(scripts.length, 1);
      assert.equal(scripts[0].type, 'application/ld+json');
      checkGraph(JSON.parse(scripts[0].textContent), path, schemaType);
    }
  } finally {
    globalThis.document = previousDocument;
    globalThis.window = previousWindow;
  }
});

test('prerendered core pages use the same Person and WebSite as runtime SEO', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'portfolio-jsonld-'));
  try {
    await mkdir(join(dir, 'dist'));
    const base = await readFile(
      new URL('../index.html', import.meta.url),
      'utf8'
    );
    await writeFile(join(dir, 'dist/index.html'), base);
    execFileSync(
      process.execPath,
      [
        fileURLToPath(
          new URL('../scripts/prerender-route-snapshots.mjs', import.meta.url)
        ),
      ],
      {
        cwd: dir,
        env: {
          ...process.env,
          VITE_SITE_URL: origin,
          VITE_DEFAULT_OG_IMAGE_PATH: '/images/avatar-logo.webp',
        },
      }
    );
    for (const [path, type] of routes) {
      const html = await readFile(
        join(dir, 'dist', path === '/' ? '' : path.slice(1), 'index.html'),
        'utf8'
      );
      const scripts = [
        ...html.matchAll(
          /<script id="app-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/g
        ),
      ];
      assert.equal(scripts.length, 1);
      checkGraph(JSON.parse(scripts[0][1]), path, type);
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
