<script setup>
import { computed, onMounted, ref } from 'vue';
import PageSectionHeader from '@/components/shared/PageSectionHeader.vue';
import HomeArtifactField from '@/components/home-content/HomeArtifactField.vue';
import PortfolioItemComponent from '@/components/portfolio/PortfolioItemComponent.vue';
import { usePortfolioPage } from '@/components/portfolio/usePortfolioPage.js';

const { projects, loading, error, imageBase, load } = usePortfolioPage();
const pageLoading = ref(true);
const isLoading = computed(() => pageLoading.value || loading.value);

onMounted(async () => {
  await load();
  pageLoading.value = false;
});
</script>

<template>
  <section class="portfolio-page container-centered">
    <HomeArtifactField />
    <div class="portfolio-layout">
      <PageSectionHeader
        badge="Case Studies"
        heading-tag="h1"
        visible-title="Selected work"
        title="Selected work"
        subtitle="Front-end projects with architecture and implementation details."
      />

      <PortfolioItemComponent
        :projects="projects"
        :loading="isLoading"
        :error="error"
        :imageBase="imageBase"
      />

      <section
        class="portfolio-cta home-section section-cta"
        aria-labelledby="portfolio-cta-title"
      >
        <p class="section-eyebrow">Get in touch</p>
        <h2 id="portfolio-cta-title">Have a project in mind?</h2>
        <router-link
          class="portfolio-cta__link app-btn app-btn--primary"
          to="/contact"
        >
          Contact Me
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14m-7-7 7 7-7 7" />
          </svg>
        </router-link>
      </section>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import 'style';
</style>
