import fs from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');
const distIndexPath = path.join(distDir, 'index.html');

const trimTrailingSlash = (value = '') => String(value).replace(/\/+$/, '');
const siteOrigin = trimTrailingSlash(process.env.VITE_SITE_URL || '') || 'https://example.com';
const defaultOgImagePath = process.env.VITE_DEFAULT_OG_IMAGE_PATH || '/images/avatar-logo.webp';
const defaultOgImageAlt =
  process.env.VITE_DEFAULT_OG_IMAGE_ALT || 'Mykola Mud front-end engineer portfolio social preview image';
const defaultOgImageWidth = String(process.env.VITE_DEFAULT_OG_IMAGE_WIDTH || '1200');
const defaultOgImageHeight = String(process.env.VITE_DEFAULT_OG_IMAGE_HEIGHT || '630');

const absoluteUrl = (value) => {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  return `${siteOrigin}${String(value).startsWith('/') ? value : `/${value}`}`;
};

const ROUTES = [
  {
    path: '/',
    title: 'Vue and Nuxt Front-End Engineer Portfolio | Mykola Mud',
    description:
      'Explore Mykola Mud’s front-end engineering portfolio featuring Vue and Nuxt interfaces, Shopify storefront implementation, performance optimization, reusable component architecture, and production-focused UX delivery for real products.',
    schemaType: 'WebPage',
    breadcrumbLabel: 'Home',
    noindex: false,
  },
  {
    path: '/about',
    title: 'About Mykola Mud Front-End Engineer | Mykola Mud',
    description:
      'Learn about Mykola Mud’s front-end engineering background, services, client collaborations, testimonials, and workflow strengths across Vue, Nuxt, Shopify, and performance-focused user interface development projects.',
    schemaType: 'AboutPage',
    breadcrumbLabel: 'About',
    noindex: false,
  },
  {
    path: '/resume',
    title: 'Front-End Engineer Resume and Experience | Mykola Mud',
    description:
      'Review Mykola Mud’s front-end engineer resume with professional experience, education history, core stack, tooling, and downloadable CV options covering Vue, Nuxt, Shopify, and modern interface delivery work.',
    schemaType: 'ProfilePage',
    breadcrumbLabel: 'Resume',
    noindex: false,
  },
  {
    path: '/portfolio',
    title: 'Front-End Portfolio Projects and Case Studies | Mykola Mud',
    description:
      'Browse selected front-end portfolio projects and case studies built with Vue, Nuxt, Shopify, and performance-first UI architecture, including implementation details, visual solutions, and technical stack decisions.',
    schemaType: 'CollectionPage',
    breadcrumbLabel: 'Portfolio',
    noindex: false,
  },
  {
    path: '/blog',
    title: 'Front-End Engineering Blog and Case Notes | Mykola Mud',
    description:
      'Read front-end engineering blog notes, implementation case studies, and practical articles on Vue, Nuxt, eCommerce UI architecture, maintainability, and performance optimization for production-ready interfaces.',
    schemaType: 'CollectionPage',
    breadcrumbLabel: 'Blog',
    noindex: false,
  },
  {
    path: '/contact',
    title: 'Contact Mykola Mud for Front-End Projects | Mykola Mud',
    description:
      'Contact Mykola Mud to discuss Vue, Nuxt, Shopify frontend, and performance-focused front-end engineering work, request project estimates, or start collaboration on product interface improvements.',
    schemaType: 'ContactPage',
    breadcrumbLabel: 'Contact',
    noindex: false,
  },
];

const WEBSITE_NODE_ID = '#website';
const PERSON_NODE_ID = '#person';

const buildBreadcrumbNode = (route, canonicalUrl) => {
  const segments = route.path.split('/').filter(Boolean);
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${siteOrigin}/`,
    },
  ];

  if (segments.length === 0) {
    return {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement,
    };
  }

  let current = '';
  segments.forEach((segment, index) => {
    current += `/${segment}`;
    itemListElement.push({
      '@type': 'ListItem',
      position: itemListElement.length + 1,
      name: index === segments.length - 1 ? route.breadcrumbLabel : segment,
      item: index === segments.length - 1 ? canonicalUrl : `${siteOrigin}${current}`,
    });
  });

  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement,
  };
};

const buildJsonLd = (route, canonicalUrl, ogImageUrl) =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteOrigin}${WEBSITE_NODE_ID}`,
        url: `${siteOrigin}/`,
        name: 'Mykola Mud',
        inLanguage: 'en',
      },
      {
        '@type': 'Person',
        '@id': `${siteOrigin}${PERSON_NODE_ID}`,
        name: 'Mykola Mud',
        url: `${siteOrigin}/about`,
        image: ogImageUrl,
        jobTitle: 'Front-End Engineer',
      },
      {
        '@type': route.schemaType,
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: route.breadcrumbLabel,
        description: route.description,
        isPartOf: { '@id': `${siteOrigin}${WEBSITE_NODE_ID}` },
        about: { '@id': `${siteOrigin}${PERSON_NODE_ID}` },
        inLanguage: 'en',
      },
      buildBreadcrumbNode(route, canonicalUrl),
    ],
  });

const replaceTagContent = (html, pattern, value) => html.replace(pattern, `$1${value}$2`);

const setMetaContent = (html, selector, content) => {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(<meta[^>]+${escapedSelector}[^>]+content=\")[^\"]*(\"[^>]*>)`);
  return replaceTagContent(html, regex, content);
};

const setLinkHref = (html, rel, href) => {
  const regex = new RegExp(`(<link[^>]+rel=\"${rel}\"[^>]+href=\")[^\"]*(\"[^>]*>)`);
  return replaceTagContent(html, regex, href);
};

const setTitle = (html, title) => html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

const setStructuredData = (html, jsonLd) => {
  const scriptTag = `<script id=\"app-structured-data\" type=\"application/ld+json\">${jsonLd}</script>`;
  if (html.includes('id="app-structured-data"')) {
    return html.replace(
      /<script id="app-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/,
      scriptTag
    );
  }
  return html.replace('</head>', `    ${scriptTag}\n  </head>`);
};

const buildRouteHtml = (baseHtml, route) => {
  const canonicalUrl = route.path === '/' ? `${siteOrigin}/` : `${siteOrigin}${route.path}`;
  const ogImageUrl = absoluteUrl(defaultOgImagePath);
  const robots = route.noindex ? 'noindex, nofollow' : 'index, follow';

  let html = baseHtml;
  html = setTitle(html, route.title);
  html = setMetaContent(html, 'name="description"', route.description);
  html = setMetaContent(html, 'name="robots"', robots);
  html = setMetaContent(html, 'property="og:title"', route.title);
  html = setMetaContent(html, 'property="og:description"', route.description);
  html = setMetaContent(html, 'property="og:type"', 'website');
  html = setMetaContent(html, 'property="og:url"', canonicalUrl);
  html = setMetaContent(html, 'property="og:image"', ogImageUrl);
  html = setMetaContent(html, 'property="og:image:alt"', defaultOgImageAlt);
  html = setMetaContent(html, 'property="og:image:width"', defaultOgImageWidth);
  html = setMetaContent(html, 'property="og:image:height"', defaultOgImageHeight);
  html = setMetaContent(html, 'name="twitter:title"', route.title);
  html = setMetaContent(html, 'name="twitter:description"', route.description);
  html = setMetaContent(html, 'name="twitter:image"', ogImageUrl);
  html = setMetaContent(html, 'name="twitter:image:alt"', defaultOgImageAlt);
  html = setLinkHref(html, 'canonical', canonicalUrl);
  html = setStructuredData(html, buildJsonLd(route, canonicalUrl, ogImageUrl));

  return html;
};

const writeSnapshot = async (route, html) => {
  if (route.path === '/') {
    await fs.writeFile(distIndexPath, html, 'utf8');
    return;
  }

  const routeDir = path.join(distDir, route.path.replace(/^\/+/, ''));
  await fs.mkdir(routeDir, { recursive: true });
  await fs.writeFile(path.join(routeDir, 'index.html'), html, 'utf8');
};

const baseHtml = await fs.readFile(distIndexPath, 'utf8');

for (const route of ROUTES) {
  const routeHtml = buildRouteHtml(baseHtml, route);
  await writeSnapshot(route, routeHtml);
}

console.log(`[prerender] Generated route HTML snapshots for ${ROUTES.length} core routes`);

