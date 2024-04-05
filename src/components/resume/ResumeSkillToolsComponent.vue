<script setup>
import { defineProps, ref } from "vue";

const { skillToolsTitle, itemsTools } = defineProps(["skillToolsTitle", "itemsTools"]);

const cvPath = ref('');

const fetchCVPath = async () => {
  try {
    const cvUrl = 'https://raw.githubusercontent.com/mudmykola/test-api/185f4c9d6cb171945d316bbe36f00c703d8929c5/download/Mykola Mud` - Front-End (Vue.js)  Engineer - CV.pdf';

    if (cvUrl) {
      cvPath.value = cvUrl;
    } else {
      console.error('Invalid or missing CV path');
    }
  } catch (error) {
    console.error('Error fetching CV path:', error);
  }
};

const downloadCV = () => {
  const path = cvPath.value;
  if (path) {
    window.open(path, '_blank');
  } else {
    console.error("Шлях до резюме не знайдено");
  }
};
fetchCVPath();
</script>
<template>
  <div class="tools mt-5">
    <div class="tools-title global-title text-2xl font-bold">
      <h2>{{ skillToolsTitle }}</h2>
    </div>
    <div class="tools-inner mt-5">
      <ul class="flex flex-wrap gap-4">
        <li v-for="tech in itemsTools" :key="tech">
          <h3 class="text-default font-bold text-[14px]">{{ tech.name }}</h3>
        </li>
      </ul>
    </div>
    <div class="tools-download__cv mt-5">
      <button class="text-default font-bold" @click="downloadCV">Download CV</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "style";
@import "src/assets/style/global-style";
</style>