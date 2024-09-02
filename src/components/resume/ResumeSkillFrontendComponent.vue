<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  skillFrontendTitle: String,
  itemsFrontend: Array,
});
</script>

<template>
  <div class="frontend mt-5">
    <div class="frontend-title global-title text-2xl font-bold">
      <h2>{{ skillFrontendTitle }}</h2>
    </div>
    <div class="frontend-inner mt-5">
      <ul class="flex flex-wrap gap-4">
        <li v-for="frontend in itemsFrontend" :key="frontend">
          <h3 class="text-default font-bold text-[14px">{{ frontend.name }}</h3>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'style';
@import 'src/assets/style/global-style';
</style>
