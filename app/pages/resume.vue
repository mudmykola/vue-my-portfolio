<script setup>
import ResumePage from '@/views/resume/ResumePage.vue';
import { usePortfolioSeo } from '../composables/usePortfolioSeo.js';
import { routeSeo } from '../utils/routeSeo.js';

definePageMeta({ title: routeSeo.resume.title });
usePortfolioSeo(routeSeo.resume);
</script>

<template>
  <ResumePage />
</template>
