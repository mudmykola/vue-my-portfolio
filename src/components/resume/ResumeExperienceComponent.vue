<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  experienceTitle: String,
  items: Array,
});
</script>

<template>
  <div class="experience mt-5">
    <div class="experience-title global-title text-2xl font-bold">
      <h2>{{ experienceTitle }}</h2>
    </div>
    <div class="experience-inner w-[400px] mt-5">
      <ul class="gap-5 flex flex-col">
        <li v-for="(item, index) in items" :key="index">
          <div class="experience-item">
            <div class="experience-year text-default text-[13px] font-bold">
              {{ item.year }}
            </div>
            <div class="title font-bold text-[20px] text-[#E1BD04] pl-2 mt-1">
              {{ item.title }}
            </div>
            <div class="institution text-default opacity-40 text-[15px] pl-2">
              {{ item.institution }}
            </div>
            <div class="description text-[13px] text-default opacity-80 pl-2">
              {{ item.description }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'style';
@import 'src/assets/style/global-style';
</style>
