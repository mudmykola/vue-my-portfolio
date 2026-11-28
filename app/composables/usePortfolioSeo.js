import { buildIdentityNodes } from '@/config/structuredData.js';
import { buildCanonicalUrl } from '../utils/routeSeo.js';
import { buildStructuredDataScript } from '../utils/structuredDataScript.js';

const DEFAULT_OG_IMAGE = '/images/avatar-logo.webp';

const buildBreadcrumbNode = ({ origin, canonicalUrl, breadcrumbLabel }) => ({
  '@type': 'BreadcrumbList',
  '@id': `${canonicalUrl}#breadcrumb`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${origin}/`,
    },
    ...(canonicalUrl === `${origin}/`
      ? []
      : [
          {
            '@type': 'ListItem',
            position: 2,
            name: breadcrumbLabel,
            item: canonicalUrl,
          },
        ]),
  ],
});

const buildPageNode = ({ canonicalUrl, seo, origin }) => ({
  '@type': seo.schemaType || 'WebPage',
  '@id': `${canonicalUrl}#webpage`,
  url: canonicalUrl,
  name: seo.breadcrumbLabel,
  description: seo.description,
  isPartOf: { '@id': `${origin}#website` },
  about: { '@id': `${origin}#person` },
  inLanguage: 'en',
});

export function usePortfolioSeo(seo) {
  const config = useRuntimeConfig();
  const siteUrl = String(
    config.public.siteUrl || 'https://mykolamud.pp.ua'
  ).replace(/\/+$/, '');
  const ogImage = config.public.defaultOgImagePath || DEFAULT_OG_IMAGE;
  const ogImageUrl = /^https?:\/\//i.test(ogImage)
    ? ogImage
    : `${siteUrl}${String(ogImage).startsWith('/') ? ogImage : `/${ogImage}`}`;
  const canonicalUrl = buildCanonicalUrl(siteUrl, seo.canonicalPath);
  const robots = seo.noindex ? 'noindex, nofollow' : 'index, follow';
  const graph = [
    ...buildIdentityNodes(siteUrl, ogImageUrl),
    buildPageNode({ canonicalUrl, seo, origin: siteUrl }),
    buildBreadcrumbNode({
      origin: siteUrl,
      canonicalUrl,
      breadcrumbLabel: seo.breadcrumbLabel,
    }),
  ];

  useSeoMeta({
    title: seo.title,
    description: seo.description,
    robots,
    ogTitle: seo.title,
    ogDescription: seo.description,
    ogType: 'website',
    ogUrl: canonicalUrl,
    ogImage: ogImageUrl,
    ogImageAlt:
      config.public.defaultOgImageAlt ||
      'Mykola Mud front-end engineer portfolio social preview image',
    ogImageWidth: String(config.public.defaultOgImageWidth || 1200),
    ogImageHeight: String(config.public.defaultOgImageHeight || 630),
    twitterCard: 'summary_large_image',
    twitterTitle: seo.title,
    twitterDescription: seo.description,
    twitterImage: ogImageUrl,
  });

  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }],
    script: [buildStructuredDataScript(graph)],
  });

  return { canonicalUrl, graph };
}
