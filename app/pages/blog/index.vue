<script setup>
import { computed } from 'vue';
import BlogPage from '@/views/blog/BlogPage.vue';
import { usePortfolioSeo } from '../../composables/usePortfolioSeo.js';
import { routeSeo } from '../../utils/routeSeo.js';

definePageMeta({ title: routeSeo.blog.title });
usePortfolioSeo(routeSeo.blog);

const { data } = await useAsyncData('shopify-blog', () => $fetch('/api/blog'));
const initialPosts = computed(() => data.value?.articles || []);
</script>

<template>
  <BlogPage :initial-posts="initialPosts" />
</template>
