<script setup>
import { defineProps } from "vue"
const props = defineProps( ({
  skillBackendTitle: String,
  itemsBackend: Array
}))
</script>

<template>
  <div class="backend  mt-5">
    <div class="backend-title global-title text-2xl font-bold">
      <h2>{{ skillBackendTitle }}</h2>
    </div>
    <div class="backend-inner mt-5">
      <ul class="flex flex-wrap gap-4">
        <li v-for="backend in itemsBackend" :key="backend">
          <h3 class="text-default font-bold text-[14px">{{ backend.name }}</h3>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "style";
@import "src/assets/style/global-style";
</style>