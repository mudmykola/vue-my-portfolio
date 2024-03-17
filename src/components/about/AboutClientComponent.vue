<script setup>
import { ref } from 'vue'
const props = defineProps( ({
  title: String
}))

const clientItem = ref([
  {image: 'Frame 147.png'},
  {image: 'Frame 148.png'},
  {image: 'Frame 149.png'},
  {image: 'Frame 150.png'},
  {image: 'Frame 153.png'},
  {image: 'Frame 152.png'}
])
</script>

<template>
<div class="services clients mt-10">
  <div class="services-title clients-title text-2xl font-bold">
    <h2>{{ title }}</h2>
  </div>
  <div class="clients-logo mt-5">
    <ul class="flex items-center justify-between">
      <li v-for="client in clientItem" :key="client">
        <img width="150" height="150" :src="`src/assets/images/${client.image}`" alt="clients-logo" loading="lazy">
      </li>
    </ul>
  </div>
</div>
</template>

<style scoped lang="scss">
@import "style";
</style>