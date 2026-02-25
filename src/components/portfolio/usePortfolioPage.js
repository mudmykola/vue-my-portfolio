import { ref } from 'vue';
import { remoteEndpoints } from '../../config/remoteEndpoints.js';

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
      const response = await fetch(remoteEndpoints.portfolioProjectsUrl);

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
