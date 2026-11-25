<script setup>
import ContactPage from '@/views/contact/ContactPage.vue';
import { usePortfolioSeo } from '../composables/usePortfolioSeo.js';
import { routeSeo } from '../utils/routeSeo.js';

definePageMeta({ title: routeSeo.contact.title });
usePortfolioSeo(routeSeo.contact);
</script>

<template>
  <ContactPage />
</template>
