<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { supabase } from '@/lib/supabase';

const props = defineProps(['skillToolsTitle', 'itemsTools']);

const cvPath = ref('');

const fetchCVPath = async () => {
  const { data, error } = await supabase.storage
    .from('cv')
    .getPublicUrl('FRONT-END VUE:NUXT - MYKOLA MUDD.pdf');

  if (error) {
    console.error('Помилка при завантаженні CV:', error);
  } else {
    cvPath.value = data.publicUrl;
  }
};

const downloadCV = () => {
  if (cvPath.value) {
    window.open(cvPath.value, '_blank');
  } else {
    console.error('Шлях до резюме не знайдено');
  }
};

onMounted(() => {
  fetchCVPath();
});
</script>

<template>
  <div class="tools mt-5">
    <div class="tools-title global-title text-2xl font-bold">
      <h2>{{ props.skillToolsTitle }}</h2>
    </div>

    <div class="tools-inner mt-5">
      <ul class="flex flex-wrap gap-4">
        <li v-for="tech in props.itemsTools" :key="tech.name">
          <h3 class="text-default font-bold text-[14px]">{{ tech.name }}</h3>
        </li>
      </ul>
    </div>

    <div class="tools-download__cv mt-5 btn-flip">
      <button
        class="btn-flip"
        @click="downloadCV"
        data-front="Download CV"
        data-back="Click to Download"
      ></button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'style';
@import 'src/assets/style/global-style';
</style>
