const env = import.meta?.env ?? {};

const trimTrailingSlash = (value) => String(value || '').replace(/\/+$/, '');

const SEO_DEFAULTS = {
  siteName: 'Mykola Mud',
  titleTemplateSuffix: ' | Mykola Mud',
  defaultTitle: 'Front-End Engineer Portfolio | Mykola Mud',
  defaultDescription:
    'Portfolio of Mykola Mud, Front-End Engineer specializing in Vue, Nuxt, Shopify storefronts, and performance-focused interfaces.',
  defaultOgImage: env.VITE_DEFAULT_OG_IMAGE_PATH || '/images/avatar-logo.webp',
  twitterCard: 'summary_large_image',
  siteUrl: trimTrailingSlash(env.VITE_SITE_URL || ''),
};

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

const ensureAbsoluteUrl = (value) => {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;

  const origin =
    SEO_DEFAULTS.siteUrl ||
    (typeof window !== 'undefined' ? trimTrailingSlash(window.location.origin) : '');

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
};
