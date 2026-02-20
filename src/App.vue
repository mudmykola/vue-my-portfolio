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

const route = useRoute();

watch(
  () => route.meta.title,
  (newTitle) => {
    document.title = newTitle || 'Your Default Title';
  }
);
</script>
