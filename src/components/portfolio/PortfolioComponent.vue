<script setup>
import { onMounted } from 'vue';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import PageSectionHeader from '@/components/shared/PageSectionHeader.vue';
import PortfolioItemComponent from '@/components/portfolio/PortfolioItemComponent.vue';
import { usePortfolioPage } from '@/components/portfolio/usePortfolioPage.js';

const { projects, loading, error, imageBase, load } = usePortfolioPage();

onMounted(load);
</script>

<template>
  <section class="portfolio-page container-centered">
    <div class="portfolio-layout">
      <PageSectionHeader
        badge="Case Studies"
        :icon="faBriefcase"
        title="Portfolio"
        subtitle="Selected projects with architecture and implementation details"
      />

      <PortfolioItemComponent
        :projects="projects"
        :loading="loading"
        :error="error"
        :imageBase="imageBase"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
@import 'style';
</style>
