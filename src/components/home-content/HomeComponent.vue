<script setup>
import { computed, onMounted } from 'vue';
import { fallbackHomeContent } from './homeFallbackContent.js';
import HomeHeroSection from './HomeHeroSection.vue';
import HomeValuesSection from './HomeValuesSection.vue';
import HomeWorkflowSection from './HomeWorkflowSection.vue';
import HomeCtaSection from './HomeCtaSection.vue';
import HomeExpertiseSection from './HomeExpertiseSection.vue';
import HomeSelectedWorkSection from './HomeSelectedWorkSection.vue';
import HomeArtifactField from './HomeArtifactField.vue';
import { useSiteContent } from '@/composables/useSiteContent.js';
import { usePortfolioPage } from '@/components/portfolio/usePortfolioPage.js';

const { data, load } = useSiteContent();
const { projects, imageBase, load: loadProjects } = usePortfolioPage();

const homeContent = computed(() => data.value?.homePage ?? {});

const heroContent = computed(() => ({
  ...fallbackHomeContent.hero,
  ...(homeContent.value?.hero ?? {}),
}));

const heroDisplayName = computed(
  () => heroContent.value.displayName || fallbackHomeContent.hero.displayName
);

const valuesContent = computed(() => ({
  ...fallbackHomeContent.values,
  ...(homeContent.value?.values ?? {}),
  cards: homeContent.value?.values?.cards ?? fallbackHomeContent.values.cards,
}));

const workflowContent = computed(() => ({
  ...fallbackHomeContent.workflow,
  ...(homeContent.value?.workflow ?? {}),
  items:
    homeContent.value?.workflow?.items ?? fallbackHomeContent.workflow.items,
}));

const ctaContent = computed(() => ({
  ...fallbackHomeContent.cta,
  ...(homeContent.value?.cta ?? {}),
}));

const aboutContent = computed(() => ({
  avatar: data.value?.aboutAvatar?.[0] ?? data.value?.avatars?.[0],
  title:
    data.value?.aboutPage?.infoTitle ||
    'Frontend Developer | Vue, Nuxt & Shopify',
  description: data.value?.aboutPage?.infoDesc?.[0] || '',
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

  return (
    homeContent.value?.fallbackToolkit ?? fallbackHomeContent.fallbackToolkit
  );
});

const aboutTechnologies = computed(() => {
  const labels = [
    ['JavaScript', /javascript/i],
    ['TypeScript', /typescript/i],
    ['Vue', /vue/i],
    ['Nuxt', /nuxt/i],
    ['Shopify', /shopify/i],
  ];

  return labels
    .filter(([, matcher]) =>
      toolkit.value.some((technology) => matcher.test(technology))
    )
    .map(([label]) => label);
});

onMounted(() => {
  load();
  loadProjects();
});
</script>

<template>
  <section class="home-page">
    <HomeArtifactField />
    <HomeHeroSection :hero="heroContent" :full-name="heroDisplayName" />

    <HomeValuesSection
      :values="valuesContent"
      :about="aboutContent"
      :technologies="aboutTechnologies"
    />
    <HomeExpertiseSection :toolkit="toolkit" />
    <HomeWorkflowSection :workflow="workflowContent" />
    <HomeSelectedWorkSection :projects="projects" :image-base="imageBase" />
    <HomeCtaSection :cta="ctaContent" />
  </section>
</template>

<style lang="scss">
@import 'style.scss';
</style>
