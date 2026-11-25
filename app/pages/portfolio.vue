<script setup>
import PortfolioPage from '@/views/portfolio/PortfolioPage.vue';
import { usePortfolioSeo } from '../composables/usePortfolioSeo.js';
import { routeSeo } from '../utils/routeSeo.js';

definePageMeta({ title: routeSeo.portfolio.title });
usePortfolioSeo(routeSeo.portfolio);
</script>

<template>
  <PortfolioPage />
</template>
