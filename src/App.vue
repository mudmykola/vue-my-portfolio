<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

watch(() => route.meta.title, (newTitle) => {
  document.title = newTitle || 'Your Default Title';
});
</script>