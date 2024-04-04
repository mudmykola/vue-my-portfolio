<script setup>
import {onMounted} from "vue"
import { useFactsStore } from '@/stores/funCardLogic.js';

const props = defineProps({
  title: String
});

const factsStore = useFactsStore();

onMounted(() => {
  factsStore.fetchFacts();
});
</script>

<template>
  <div class="fun services mt-10">
    <div class="services-title fun-title text-2xl font-bold">
      <h2>{{ title }}</h2>
    </div>
    <div class="fun-inner mt-5">
      <ul class="flex items-center justify-between">
        <li class="rounded px-4 py-4 text-center w-[285px]"  v-for="(fact, index) in factsStore.facts" :key="index">
          <img class="mx-auto" width="100" height="100" :src="fact.image" :alt="fact.title">
          <h2 class="text-2xl font-medium">{{ fact.title }}</h2>
          <p class="text-[20px] font-light">{{ fact.value.toLocaleString() }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "style";
</style>