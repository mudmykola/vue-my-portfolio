import fs from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const outputDir = path.resolve(
  projectRoot,
  process.env.NUXT_SEO_OUTPUT_DIR || 'dist'
);

const INDEXABLE_ROUTES = [
  '/',
  '/about',
  '/resume',
  '/portfolio',
  '/blog',
  '/contact',
];
const DISALLOWED_ROUTES = ['/game'];

const trimTrailingSlash = (value = '') => String(value).replace(/\/+$/, '');
const ensureLeadingSlash = (value = '') =>
  String(value).startsWith('/') ? String(value) : `/${value}`;

const deriveOriginFromContactApiUrl = (value = '') => {
  try {
    if (!value) return '';
    const parsed = new URL(value);
    return trimTrailingSlash(parsed.origin);
  } catch {
    return '';
  }
};

const siteUrl = trimTrailingSlash(
  process.env.NUXT_PUBLIC_SITE_URL ||
    import.meta.env?.VITE_SITE_URL ||
    process.env.VITE_SITE_URL ||
    'https://mykolamud.pp.ua'
);
const contactApiOrigin = deriveOriginFromContactApiUrl(
  import.meta.env?.VITE_CONTACT_API_URL ||
    process.env.VITE_CONTACT_API_URL ||
    ''
);
const origin = siteUrl || contactApiOrigin || 'https://example.com';

if (!siteUrl && !contactApiOrigin) {
  console.warn(
    '[seo-assets] VITE_SITE_URL is not set and VITE_CONTACT_API_URL is not absolute. Using https://example.com fallback for sitemap/robots generation.'
  );
} else if (!siteUrl && contactApiOrigin) {
  console.warn(
    `[seo-assets] VITE_SITE_URL is not set. Using ${contactApiOrigin} derived from VITE_CONTACT_API_URL for sitemap/robots generation.`
  );
}

const now = new Date().toISOString();

const buildSitemapXml = () => {
  const urlEntries = INDEXABLE_ROUTES.map((route) => {
    const loc =
      route === '/' ? `${origin}/` : `${origin}${ensureLeadingSlash(route)}`;

    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${now}</lastmod>`,
      '    <changefreq>weekly</changefreq>',
      route === '/'
        ? '    <priority>1.0</priority>'
        : '    <priority>0.8</priority>',
      '  </url>',
    ].join('\n');
  }).join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlEntries,
    '</urlset>',
    '',
  ].join('\n');
};

const buildRobotsTxt = () => {
  const disallowLines = DISALLOWED_ROUTES.map(
    (route) => `Disallow: ${ensureLeadingSlash(route)}`
  ).join('\n');

  return [
    'User-agent: *',
    'Allow: /',
    disallowLines,
    '',
    `Sitemap: ${origin}/sitemap.xml`,
    '',
  ].join('\n');
};

await fs.mkdir(outputDir, { recursive: true });
await fs.writeFile(
  path.join(outputDir, 'sitemap.xml'),
  buildSitemapXml(),
  'utf8'
);
await fs.writeFile(
  path.join(outputDir, 'robots.txt'),
  buildRobotsTxt(),
  'utf8'
);

console.log(
  `[seo-assets] Generated sitemap.xml and robots.txt in ${outputDir}`
);
