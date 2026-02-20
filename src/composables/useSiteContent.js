import { ref } from 'vue';

const data = ref(null);
const loading = ref(false);
const error = ref('');
let isLoaded = false;

export function useSiteContent() {
  const load = async () => {
    if (isLoaded || loading.value) return;

    loading.value = true;
    error.value = '';

    try {
      const response = await fetch('/data/site-content.json');
      if (!response.ok) {
        throw new Error(`Failed to load site content: ${response.status}`);
      }

      data.value = await response.json();
      isLoaded = true;
    } catch (e) {
      console.error('Failed to load site content:', e);
      error.value = 'Unable to load page content.';
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    load,
  };
}
