<script setup>
import { defineProps } from "vue"
const props = defineProps( ({
  skillToolsTitle: String,
  itemsTools: Array
}))
</script>

<template>
  <div class="tools  mt-5">
    <div class="tools-title global-title text-2xl font-bold">
      <h2>{{ skillToolsTitle }}</h2>
    </div>
    <div class="tools-inner mt-5">
      <ul class="flex flex-wrap gap-4">
        <li v-for="tech in itemsTools" :key="tech">
          <h3 class="text-default font-bold text-[14px">{{ tech.name }}</h3>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "style";
@import "src/assets/style/global-style";
</style>