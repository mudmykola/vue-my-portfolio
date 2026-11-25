<script setup>
import MainContentComponent from '@/main-content/MainContentComponent.vue';
</script>

<template>
  <div class="home">
    <MainContentComponent />
  </div>
</template>

<style scoped>
.home {
  width: 100vw;
  margin-left: calc((100% - 100vw) / 2);
}
</style>
