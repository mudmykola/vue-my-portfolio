import { buildIdentityNodes } from '@/config/structuredData.js';
import { buildCanonicalUrl } from '../utils/routeSeo.js';
import { buildStructuredDataScript } from '../utils/structuredDataScript.js';

export function useArticleSeo(article) {
  const config = useRuntimeConfig();
  const siteUrl = String(
    config.public.siteUrl || 'https://mykolamud.pp.ua'
  ).replace(/\/+$/, '');
  const canonicalUrl = buildCanonicalUrl(siteUrl, `/blog/${article.handle}`);
  const image =
    article.image ||
    config.public.defaultOgImagePath ||
    '/images/avatar-logo.webp';
  const imageUrl = /^https?:\/\//i.test(image)
    ? image
    : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`;
  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const graph = [
    ...buildIdentityNodes(siteUrl, imageUrl),
    {
      '@type': 'Article',
      '@id': `${canonicalUrl}#article`,
      url: canonicalUrl,
      headline: article.title,
      description,
      datePublished: article.date,
      ...(article.image ? { image: imageUrl } : {}),
      author: { '@id': `${siteUrl}#person` },
      publisher: { '@id': `${siteUrl}#person` },
      isPartOf: { '@id': `${siteUrl}#website` },
      mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
      inLanguage: 'en',
    },
    {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: title,
      description,
      isPartOf: { '@id': `${siteUrl}#website` },
      about: { '@id': `${siteUrl}#person` },
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${siteUrl}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${siteUrl}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: article.title,
          item: canonicalUrl,
        },
      ],
    },
  ];

  useSeoMeta({
    title,
    description,
    robots: 'index, follow',
    ogTitle: title,
    ogDescription: description,
    ogType: 'article',
    ogUrl: canonicalUrl,
    ogImage: imageUrl,
    ogImageAlt: article.image
      ? article.imageAlt || article.title
      : config.public.defaultOgImageAlt || article.title,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imageUrl,
  });
  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }],
    script: [buildStructuredDataScript(graph)],
  });
  return { canonicalUrl, graph };
}
