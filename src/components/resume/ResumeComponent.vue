<script setup>
import {ref} from "vue";

const resumeTitle = ref('Resume')
const resumeSubTitleItem = ref('3 Years of Experience\n')
</script>

<template>
<div class="resume top-[11%] left-[12%]  container-centered  animate__animated animate__backInDown">
  <div class="resume-box">
    <div class="resume-title  flex flex-col  items-center">
      <div class="resume-title__box flex flex-col items-end">
        <h1 class="text-6xl  font-bold">{{ resumeTitle }}</h1>
        <div class="resume-subtitle flex text-center justify-center w-fit">
          <p class="text-[15px]">{{ resumeSubTitleItem }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
@import "animate.css";
@import "style";
</style>