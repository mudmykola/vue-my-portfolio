const env = import.meta?.env ?? {};

const trimTrailingSlash = (value) => String(value || '').replace(/\/+$/, '');

const SEO_DEFAULTS = {
  siteName: 'Mykola Mud',
  titleTemplateSuffix: ' | Mykola Mud',
  defaultTitle: 'Front-End Engineer Portfolio | Mykola Mud',
  defaultDescription:
    'Portfolio of Mykola Mud, front-end engineer specializing in Vue, Nuxt, Shopify storefronts, performance-focused interfaces, reusable component systems, and production-ready implementation for modern digital products.',
  defaultOgImage: env.VITE_DEFAULT_OG_IMAGE_PATH || '/images/avatar-logo.webp',
  twitterCard: 'summary_large_image',
  siteUrl: trimTrailingSlash(env.VITE_SITE_URL || ''),
};

const STRUCTURED_DATA_SCRIPT_ID = 'app-structured-data';
const WEBSITE_NODE_ID = '#website';
const PERSON_NODE_ID = '#person';

const HEAD_SELECTORS = {
  description: 'meta[name="description"]',
  robots: 'meta[name="robots"]',
  ogTitle: 'meta[property="og:title"]',
  ogDescription: 'meta[property="og:description"]',
  ogType: 'meta[property="og:type"]',
  ogUrl: 'meta[property="og:url"]',
  ogImage: 'meta[property="og:image"]',
  twitterCard: 'meta[name="twitter:card"]',
  twitterTitle: 'meta[name="twitter:title"]',
  twitterDescription: 'meta[name="twitter:description"]',
  twitterImage: 'meta[name="twitter:image"]',
  canonical: 'link[rel="canonical"]',
};

const getSiteOrigin = () =>
  SEO_DEFAULTS.siteUrl ||
  (typeof window !== 'undefined' ? trimTrailingSlash(window.location.origin) : '');

const ensureAbsoluteUrl = (value) => {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;

  const origin = getSiteOrigin();
  if (!origin) return value;

  return `${origin}${String(value).startsWith('/') ? value : `/${value}`}`;
};

const ensureHeadTag = ({ selector, tag, attrName, attrValue }) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement(tag);
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  return element;
};

const ensureJsonLdScript = () => {
  let element = document.head.querySelector(`#${STRUCTURED_DATA_SCRIPT_ID}`);
  if (!element) {
    element = document.createElement('script');
    element.id = STRUCTURED_DATA_SCRIPT_ID;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }
  return element;
};

const setMetaTag = ({ selector, attrName, attrValue, content }) => {
  const element = ensureHeadTag({
    selector,
    tag: 'meta',
    attrName,
    attrValue,
  });
  element.setAttribute('content', content ?? '');
};

const setLinkTag = ({ selector, rel, href }) => {
  const element = ensureHeadTag({
    selector,
    tag: 'link',
    attrName: 'rel',
    attrValue: rel,
  });
  element.setAttribute('href', href ?? '');
};

const normalizeTitle = (rawTitle) => {
  const title = String(rawTitle || '').trim();
  if (!title) return SEO_DEFAULTS.defaultTitle;
  if (title.includes(SEO_DEFAULTS.titleTemplateSuffix.trim())) return title;
  return `${title}${SEO_DEFAULTS.titleTemplateSuffix}`;
};

const getRoutePath = (route) =>
  route?.meta?.seo?.canonicalPath ||
  route?.path ||
  (typeof window !== 'undefined' ? window.location.pathname : '/');

const getRouteDisplayTitle = (route, seo) =>
  String(route?.meta?.seo?.breadcrumbLabel || route?.meta?.title || seo.title || 'Page');

const buildWebsiteNode = () => {
  const origin = getSiteOrigin();
  if (!origin) return null;

  return {
    '@type': 'WebSite',
    '@id': `${origin}${WEBSITE_NODE_ID}`,
    url: `${origin}/`,
    name: SEO_DEFAULTS.siteName,
    inLanguage: 'en',
  };
};

const buildPersonNode = () => {
  const origin = getSiteOrigin();
  if (!origin) return null;

  return {
    '@type': 'Person',
    '@id': `${origin}${PERSON_NODE_ID}`,
    name: 'Mykola Mud',
    url: `${origin}/about`,
    image: ensureAbsoluteUrl(SEO_DEFAULTS.defaultOgImage),
    jobTitle: 'Front-End Engineer',
    description:
      'Front-end engineer focused on Vue, Nuxt, Shopify storefronts, scalable UI systems, and performance-oriented implementation.',
    knowsAbout: [
      'Vue.js',
      'Nuxt',
      'Shopify Frontend Development',
      'Frontend Architecture',
      'Web Performance',
      'UI Development',
    ],
  };
};

const buildBreadcrumbNode = (route, seo) => {
  const origin = getSiteOrigin();
  if (!origin) return null;

  const pathname = getRoutePath(route);
  const segments = pathname.split('/').filter(Boolean);
  const routeLabel = getRouteDisplayTitle(route, seo);
  const itemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${origin}/`,
    },
  ];

  if (segments.length === 0) {
    return {
      '@type': 'BreadcrumbList',
      '@id': `${seo.canonicalUrl || `${origin}/`}#breadcrumb`,
      itemListElement,
    };
  }

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    itemListElement.push({
      '@type': 'ListItem',
      position: itemListElement.length + 1,
      name: isLast ? routeLabel : segment.replace(/[-_]+/g, ' '),
      item: isLast ? seo.canonicalUrl : `${origin}${currentPath}`,
    });
  });

  return {
    '@type': 'BreadcrumbList',
    '@id': `${seo.canonicalUrl || `${origin}${pathname}`}#breadcrumb`,
    itemListElement,
  };
};

const buildRouteNode = (route, seo) => {
  const origin = getSiteOrigin();
  if (!origin || !seo.canonicalUrl) return null;

  const schemaType = route?.meta?.seo?.schemaType || 'WebPage';

  return {
    '@type': schemaType,
    '@id': `${seo.canonicalUrl}#webpage`,
    url: seo.canonicalUrl,
    name: getRouteDisplayTitle(route, seo),
    description: seo.description,
    isPartOf: { '@id': `${origin}${WEBSITE_NODE_ID}` },
    about: { '@id': `${origin}${PERSON_NODE_ID}` },
    inLanguage: 'en',
  };
};

const applyRouteStructuredData = (route, seo) => {
  if (typeof document === 'undefined') return;

  const websiteNode = buildWebsiteNode();
  const personNode = buildPersonNode();
  const routeNode = buildRouteNode(route, seo);
  const breadcrumbNode = buildBreadcrumbNode(route, seo);

  const graph = [websiteNode, personNode, routeNode, breadcrumbNode].filter(Boolean);
  if (!graph.length) return;

  const script = ensureJsonLdScript();
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  });
};

export const resolveSeoMeta = (route) => {
  const routeSeo = route?.meta?.seo ?? {};

  const title = normalizeTitle(routeSeo.title || route?.meta?.title);
  const description = routeSeo.description || SEO_DEFAULTS.defaultDescription;

  const canonicalPath =
    routeSeo.canonicalPath || route?.path || (typeof window !== 'undefined' ? window.location.pathname : '/');
  const canonicalUrl = ensureAbsoluteUrl(canonicalPath);

  const ogImage = ensureAbsoluteUrl(routeSeo.ogImage || SEO_DEFAULTS.defaultOgImage);
  const robotsContent = routeSeo.noindex ? 'noindex, nofollow' : 'index, follow';

  return {
    title,
    description,
    canonicalUrl,
    robotsContent,
    ogType: routeSeo.ogType || 'website',
    ogImage,
    twitterCard: routeSeo.twitterCard || SEO_DEFAULTS.twitterCard,
    noindex: Boolean(routeSeo.noindex),
  };
};

export const applyRouteSeoMeta = (route) => {
  if (typeof document === 'undefined') return;

  const seo = resolveSeoMeta(route);
  document.title = seo.title;

  setMetaTag({
    selector: HEAD_SELECTORS.description,
    attrName: 'name',
    attrValue: 'description',
    content: seo.description,
  });

  setMetaTag({
    selector: HEAD_SELECTORS.robots,
    attrName: 'name',
    attrValue: 'robots',
    content: seo.robotsContent,
  });

  setMetaTag({
    selector: HEAD_SELECTORS.ogTitle,
    attrName: 'property',
    attrValue: 'og:title',
    content: seo.title,
  });
  setMetaTag({
    selector: HEAD_SELECTORS.ogDescription,
    attrName: 'property',
    attrValue: 'og:description',
    content: seo.description,
  });
  setMetaTag({
    selector: HEAD_SELECTORS.ogType,
    attrName: 'property',
    attrValue: 'og:type',
    content: seo.ogType,
  });
  setMetaTag({
    selector: HEAD_SELECTORS.ogUrl,
    attrName: 'property',
    attrValue: 'og:url',
    content: seo.canonicalUrl,
  });
  setMetaTag({
    selector: HEAD_SELECTORS.ogImage,
    attrName: 'property',
    attrValue: 'og:image',
    content: seo.ogImage,
  });

  setMetaTag({
    selector: HEAD_SELECTORS.twitterCard,
    attrName: 'name',
    attrValue: 'twitter:card',
    content: seo.twitterCard,
  });
  setMetaTag({
    selector: HEAD_SELECTORS.twitterTitle,
    attrName: 'name',
    attrValue: 'twitter:title',
    content: seo.title,
  });
  setMetaTag({
    selector: HEAD_SELECTORS.twitterDescription,
    attrName: 'name',
    attrValue: 'twitter:description',
    content: seo.description,
  });
  setMetaTag({
    selector: HEAD_SELECTORS.twitterImage,
    attrName: 'name',
    attrValue: 'twitter:image',
    content: seo.ogImage,
  });

  setLinkTag({
    selector: HEAD_SELECTORS.canonical,
    rel: 'canonical',
    href: seo.canonicalUrl,
  });

  applyRouteStructuredData(route, seo);
};

