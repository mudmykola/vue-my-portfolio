import { ref, watch } from 'vue';
import { useIntervalFn } from '@vueuse/core';

export const useHomeTitleRotation = (titlesSource) => {
  const title = ref('');
  const transitioning = ref(false);

  const getTitles = () =>
    (Array.isArray(titlesSource?.value) ? titlesSource.value : []).filter(Boolean);

  const syncCurrentTitle = () => {
    const currentTitles = getTitles();

    if (!currentTitles.length) {
      title.value = '';
      return;
    }

    if (!currentTitles.includes(title.value)) {
      title.value = currentTitles[0];
    }
  };

  watch(
    titlesSource,
    () => {
      syncCurrentTitle();
    },
    { immediate: true }
  );

  useIntervalFn(() => {
    const currentTitles = getTitles();

    if (currentTitles.length <= 1 || !title.value) {
      return;
    }

    transitioning.value = true;

    setTimeout(() => {
      const currentIndex = currentTitles.indexOf(title.value);
      const nextIndex = currentIndex >= 0 ? currentIndex + 1 : 0;

      title.value = currentTitles[nextIndex % currentTitles.length];
      transitioning.value = false;
    }, 500);
  }, 3000);

  return {
    title,
    transitioning,
  };
};
