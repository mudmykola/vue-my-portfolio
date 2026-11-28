export function buildStructuredDataScript(graph) {
  return {
    key: 'app-structured-data',
    id: 'app-structured-data',
    type: 'application/ld+json',
    textContent: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    }),
  };
}
