<script setup>
import {ref} from "vue";
import BlogItemComponent from "@/components/blog/BlogItemComponent.vue";

const blogTitle = ref('Blog');
const blogSubTitleItem = ref('Latest News')
</script>

<template>
  <div class="blog top-[11%] left-[12%] container-centered  animate__animated animate__backInUp">
    <div class="blog-box">
      <div class="blog-title  flex flex-col  items-center">
        <div class="blog-title__box flex flex-col items-end">
          <h1 class="text-6xl  font-bold">{{ blogTitle }}</h1>
          <div class="blog-subtitle flex text-center justify-center w-fit">
            <p class="text-[15px]">{{ blogSubTitleItem }}</p>
          </div>
        </div>
      </div>
     <BlogItemComponent/>
    </div>
  </div>
</template>

<style lang="scss">
@import "animate.css";
@import "style";
</style>