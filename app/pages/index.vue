<script setup>
import HomePage from '@/views/HomePage.vue';
import { routeSeo } from '../utils/routeSeo.js';
import { usePortfolioSeo } from '../composables/usePortfolioSeo.js';

definePageMeta({ title: routeSeo.home.title });
usePortfolioSeo(routeSeo.home);
</script>

<template>
  <HomePage />
</template>
