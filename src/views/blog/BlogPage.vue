<script setup>
import BlogComponent from '@/components/blog/BlogComponent.vue';

defineProps({
  initialPosts: { type: Array, default: null },
});
</script>

<template>
  <BlogComponent :initial-posts="initialPosts" />
</template>
