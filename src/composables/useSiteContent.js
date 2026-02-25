import { onMounted, onUnmounted, ref } from 'vue';

const data = ref(null);
const loading = ref(false);
const error = ref('');
let isLoaded = false;
let lastPayload = '';

const DEV_REFRESH_MS = 1500;
let devConsumers = 0;
let devPollTimer = null;
const isDev = import.meta.env.DEV;

const getSiteContentUrl = () =>
  isDev ? `/data/site-content.json?t=${Date.now()}` : '/data/site-content.json';

const startDevPolling = (refreshFn) => {
  if (!isDev || typeof window === 'undefined' || devPollTimer) return;

  devPollTimer = window.setInterval(() => {
    refreshFn({ force: true, silent: true });
  }, DEV_REFRESH_MS);
};

const stopDevPolling = () => {
  if (!devPollTimer || devConsumers > 0) return;

  window.clearInterval(devPollTimer);
  devPollTimer = null;
};

export function useSiteContent() {
  const load = async ({ force = false, silent = false } = {}) => {
    if (loading.value) return;
    if (!isDev && isLoaded && !force) return;
    if (isDev && isLoaded && !force && data.value) return;

    if (!silent) {
      loading.value = true;
      error.value = '';
    }

    try {
      const response = await fetch(getSiteContentUrl(), {
        cache: isDev ? 'no-store' : 'default',
      });
      if (!response.ok) {
        throw new Error(`Failed to load site content: ${response.status}`);
      }

      const payload = await response.text();
      if (isDev && payload === lastPayload && data.value) {
        return;
      }

      data.value = JSON.parse(payload);
      lastPayload = payload;
      isLoaded = true;
    } catch (e) {
      console.error('Failed to load site content:', e);
      error.value = 'Unable to load page content.';
    } finally {
      if (!silent) {
        loading.value = false;
      }
    }
  };

  onMounted(() => {
    if (!isDev) return;
    devConsumers += 1;
    startDevPolling(load);
  });

  onUnmounted(() => {
    if (!isDev) return;
    devConsumers = Math.max(0, devConsumers - 1);
    stopDevPolling();
  });

  return {
    data,
    loading,
    error,
    load,
  };
}
