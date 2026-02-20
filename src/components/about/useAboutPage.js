import { ref } from 'vue';

const data = ref(null);
const loading = ref(false);
const error = ref('');
let loaded = false;

export function useAboutPage() {
  const load = async () => {
    if (loaded || loading.value) return;

    loading.value = true;
    error.value = '';

    try {
      const response = await fetch('/data/site-content.json');
      if (!response.ok) {
        throw new Error(`Failed to load content: ${response.status}`);
      }

      data.value = await response.json();
      loaded = true;
    } catch (e) {
      console.error('Failed to load about content:', e);
      error.value = 'Unable to load About page content.';
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
