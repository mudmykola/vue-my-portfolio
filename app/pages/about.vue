<script setup>
import AboutPage from '@/views/about/AboutPage.vue';
import { usePortfolioSeo } from '../composables/usePortfolioSeo.js';
import { routeSeo } from '../utils/routeSeo.js';

definePageMeta({ title: routeSeo.about.title });
usePortfolioSeo(routeSeo.about);
</script>

<template>
  <AboutPage />
</template>
