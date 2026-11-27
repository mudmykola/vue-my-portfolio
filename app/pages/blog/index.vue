<script setup>
import { computed } from 'vue';
import BlogPage from '@/views/blog/BlogPage.vue';
import { usePortfolioSeo } from '../../composables/usePortfolioSeo.js';
import { routeSeo } from '../../utils/routeSeo.js';

definePageMeta({ title: routeSeo.blog.title });
usePortfolioSeo(routeSeo.blog);

const { data } = await useAsyncData('shopify-blog', () => $fetch('/api/blog'));
const initialPosts = computed(() => data.value?.articles || []);
const route = useRoute();
const initialPage = computed(() => {
  const value = Array.isArray(route.query.page)
    ? route.query.page[0]
    : route.query.page;
  const page = Number(value);

  return Number.isInteger(page) && page > 0 ? page : 1;
});
</script>

<template>
  <BlogPage :initial-posts="initialPosts" :initial-page="initialPage" />
</template>
