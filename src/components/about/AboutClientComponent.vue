<script setup>
import { ref } from 'vue'
const clientTitle = ref('Clients')

const clientItem = ref([
  {image: 'Frame 141.png'},
  {image: 'Frame 142.png'},
  {image: 'Frame 143.png'},
  {image: 'Frame 144.png'},
  {image: 'Frame 145.png'},
  {image: 'Frame 146.png'}
])
</script>

<template>
<div class="services clients mt-5">
  <div class="services-title clients-title text-2xl font-bold">
    <h2>{{ clientTitle }}</h2>
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