<script setup>
import { onMounted } from 'vue';
import { useServiceStore } from '@/stores/servicesCardLogic.js';

const props = defineProps({
  title: String
});

const serviceStore = useServiceStore();

onMounted(serviceStore.fetchServices);
</script>

<template>
  <div class="services mt-5">
    <div class="services-title text-2xl font-bold">
      <h2>{{ title }}</h2>
    </div>
    <div class="services-inner mt-5">
      <ul class="flex items-baseline gap-5 justify-center">
        <li class="text-center w-[300px] flex flex-col items-center" v-for="(service, index) in serviceStore.servicesItem" :key="index">
          <img width="150" height="150" :src="service.photo" :alt="service.title" loading="lazy">
          <h3 class="text-[20px] font-bold leading-5 capitalize mt-2">{{ service.title }}</h3>
          <p class="text-[16px] leading-5 font-light mt-2 opacity-80">{{ service.desc }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "style";
</style>