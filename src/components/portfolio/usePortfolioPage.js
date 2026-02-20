import { ref } from 'vue';

const projects = ref([]);
const loading = ref(false);
const error = ref('');
const imageBase = '/';
let loaded = false;

export function usePortfolioPage() {
  const load = async () => {
    if (loaded || loading.value) return;

    loading.value = true;
    error.value = '';

    try {
      const response = await fetch(
        'https://mudmykola.github.io/test-api/api-my-portfolio-project.json'
      );

      if (!response.ok) {
        throw new Error(`Failed to load portfolio: ${response.status}`);
      }

      const data = await response.json();
      projects.value = Array.isArray(data?.portfolioCard) ? data.portfolioCard : [];
      loaded = true;
    } catch (e) {
      console.error('Failed to load portfolio content:', e);
      error.value = 'Unable to load portfolio projects.';
    } finally {
      loading.value = false;
    }
  };

  return {
    projects,
    loading,
    error,
    imageBase,
    load,
  };
}
