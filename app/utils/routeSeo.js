export const routeSeo = {
  home: {
    title: 'Vue and Nuxt Front-End Engineer Portfolio | Mykola Mud',
    description:
      'Explore Mykola Mud’s front-end engineering portfolio featuring Vue and Nuxt interfaces, Shopify storefront implementation, performance optimization, reusable component architecture, and production-focused UX delivery for real products.',
    canonicalPath: '/',
    schemaType: 'WebPage',
    breadcrumbLabel: 'Home',
  },
  about: {
    title: 'About Mykola Mud Front-End Engineer | Mykola Mud',
    description:
      'Learn about Mykola Mud’s front-end engineering background, services, client collaborations, testimonials, and workflow strengths across Vue, Nuxt, Shopify, and performance-focused user interface development projects.',
    canonicalPath: '/about',
    schemaType: 'AboutPage',
    breadcrumbLabel: 'About',
  },
  resume: {
    title: 'Front-End Engineer Resume and Experience | Mykola Mud',
    description:
      'Review Mykola Mud’s front-end engineer resume with professional experience, education history, core stack, tooling, and downloadable CV options covering Vue, Nuxt, Shopify, and modern interface delivery work.',
    canonicalPath: '/resume',
    schemaType: 'ProfilePage',
    breadcrumbLabel: 'Resume',
  },
  portfolio: {
    title: 'Front-End Portfolio Projects and Case Studies | Mykola Mud',
    description:
      'Browse selected front-end portfolio projects and case studies built with Vue, Nuxt, Shopify, and performance-first UI architecture, including implementation details, visual solutions, and technical stack decisions.',
    canonicalPath: '/portfolio',
    schemaType: 'CollectionPage',
    breadcrumbLabel: 'Portfolio',
  },
  blog: {
    title: 'Front-End Engineering Blog and Case Notes | Mykola Mud',
    description:
      'Read front-end engineering blog notes, implementation case studies, and practical articles on Vue, Nuxt, eCommerce UI architecture, maintainability, and performance optimization for production-ready interfaces.',
    canonicalPath: '/blog',
    schemaType: 'CollectionPage',
    breadcrumbLabel: 'Blog',
  },
  contact: {
    title: 'Contact Mykola Mud for Front-End Projects | Mykola Mud',
    description:
      'Contact Mykola Mud to discuss Vue, Nuxt, Shopify frontend, and performance-focused front-end engineering work, request project estimates, or start collaboration on product interface improvements.',
    canonicalPath: '/contact',
    schemaType: 'ContactPage',
    breadcrumbLabel: 'Contact',
  },
  game: {
    title: 'Interactive Game Demo and Portfolio Experiment | Mykola Mud',
    description:
      'Interactive game demo and portfolio experiment page included in the project as a non-indexed feature example for UI interactions and front-end implementation practice.',
    canonicalPath: '/game',
    schemaType: 'WebPage',
    breadcrumbLabel: 'Game',
    noindex: true,
  },
  notFound: {
    title: '404 Page Not Found | Mykola Mud',
    description:
      'This URL does not match an existing page on Mykola Mud’s portfolio website. Use navigation to return to valid pages such as Home, Portfolio, Resume, Blog, or Contact.',
    canonicalPath: '/404',
    schemaType: 'WebPage',
    breadcrumbLabel: '404',
    noindex: true,
  },
};

export const buildCanonicalUrl = (siteUrl, canonicalPath) => {
  const origin = String(siteUrl || '').replace(/\/+$/, '');
  const path = String(canonicalPath || '/').startsWith('/')
    ? canonicalPath
    : `/${canonicalPath}`;

  return path === '/' ? `${origin}/` : `${origin}${path}`;
};
