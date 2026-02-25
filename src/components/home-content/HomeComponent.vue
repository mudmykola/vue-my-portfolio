<script setup>
import { computed, onMounted } from 'vue';
import { useHomeTitleRotation } from './homeData.js';
import { fallbackHomeContent } from './homeFallbackContent.js';
import HomeHeroSection from './HomeHeroSection.vue';
import HomeValuesSection from './HomeValuesSection.vue';
import HomeWorkflowSection from './HomeWorkflowSection.vue';
import HomeCtaSection from './HomeCtaSection.vue';
import { useSiteContent } from '@/composables/useSiteContent.js';

const { data, load } = useSiteContent();

const homeContent = computed(() => data.value?.homePage ?? {});

const heroContent = computed(() => ({
  ...fallbackHomeContent.hero,
  ...(homeContent.value?.hero ?? {}),
}));

const heroDisplayName = computed(
  () => heroContent.value.displayName || fallbackHomeContent.hero.displayName
);

const heroRotatingTitles = computed(() => {
  const titles = heroContent.value.rotatingTitles;
  return Array.isArray(titles) && titles.length
    ? titles
    : fallbackHomeContent.hero.rotatingTitles;
});

const valuesContent = computed(() => ({
  ...fallbackHomeContent.values,
  ...(homeContent.value?.values ?? {}),
  cards: homeContent.value?.values?.cards ?? fallbackHomeContent.values.cards,
}));

const workflowContent = computed(() => ({
  ...fallbackHomeContent.workflow,
  ...(homeContent.value?.workflow ?? {}),
  items: homeContent.value?.workflow?.items ?? fallbackHomeContent.workflow.items,
}));

const ctaContent = computed(() => ({
  ...fallbackHomeContent.cta,
  ...(homeContent.value?.cta ?? {}),
}));

const frontendToolkit = computed(() =>
  (data.value?.resumePage?.frontendTechnologies ?? [])
    .map((item) => item?.name)
    .filter(Boolean)
);

const toolsToolkit = computed(() =>
  (data.value?.resumePage?.toolsTechnologies ?? [])
    .map((item) => item?.name)
    .filter(Boolean)
);

const toolkit = computed(() => {
  const merged = [...frontendToolkit.value, ...toolsToolkit.value];
  const unique = [...new Set(merged)];

  if (unique.length) {
    return unique;
  }

  return homeContent.value?.fallbackToolkit ?? fallbackHomeContent.fallbackToolkit;
});

const primaryToolkit = computed(() => toolkit.value.slice(0, 8));

const {
  title: rotatingTitle,
  transitioning,
} = useHomeTitleRotation(heroRotatingTitles);

onMounted(load);
</script>

<template>
  <section class="home-page">
    <HomeHeroSection
      :hero="heroContent"
      :full-name="heroDisplayName"
      :title="rotatingTitle"
      :transitioning="transitioning"
      :toolkit="toolkit"
      :primary-toolkit="primaryToolkit"
    />

    <HomeValuesSection :values="valuesContent" />
    <HomeWorkflowSection :workflow="workflowContent" />
    <HomeCtaSection :cta="ctaContent" />
  </section>
</template>

<style lang="scss">
@import 'style.scss';
</style>
