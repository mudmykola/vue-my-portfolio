// Shared by runtime SEO and build-time HTML snapshots.
export const structuredDataProfile = {
  name: 'Mykola Mud',
  language: 'en',
  aboutPath: '/about',
  jobTitle: 'Frontend Developer | Vue, Nuxt & Shopify',
  description:
    'Frontend developer building Vue and Nuxt applications, custom Shopify themes, headless storefronts, and e-commerce analytics.',
  knowsAbout: [
    'Vue.js',
    'Nuxt',
    'Shopify Frontend Development',
    'Frontend Architecture',
    'Web Performance',
    'E-commerce Analytics',
  ],
  sameAs: [
    'https://github.com/mudmykola',
    'https://www.linkedin.com/in/mud-developer/',
  ],
};

export function buildIdentityNodes(origin, imageUrl) {
  const profile = structuredDataProfile;
  return [
    {
      '@type': 'WebSite',
      '@id': `${origin}#website`,
      url: `${origin}/`,
      name: profile.name,
      inLanguage: profile.language,
      publisher: { '@id': `${origin}#person` },
    },
    {
      '@type': 'Person',
      '@id': `${origin}#person`,
      name: profile.name,
      url: `${origin}${profile.aboutPath}`,
      image: imageUrl,
      jobTitle: profile.jobTitle,
      description: profile.description,
      knowsAbout: profile.knowsAbout,
      sameAs: profile.sameAs,
    },
  ];
}
