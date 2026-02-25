<template>
  <v-app>
    <MainLayoutComponent>
      <router-view />
    </MainLayoutComponent>
  </v-app>
</template>

<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import MainLayoutComponent from '@/layout/MainLayoutComponent.vue';
import { applyRouteSeoMeta } from '@/config/seo.js';

const route = useRoute();

watch(
  () => route.fullPath,
  () => {
    applyRouteSeoMeta(route);
  },
  { immediate: true }
);
</script>
