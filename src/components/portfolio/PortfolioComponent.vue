<script setup>
import {ref} from "vue";
import PortfolioItemComponent from "@/components/portfolio/PortfolioItemComponent.vue";

const portfolioTitle = ref('Portfolio');
const portfolioSubTitleItem = ref('My Best Works')
</script>

<template>
  <div class="portfolio top-[11%] left-[12%]   container-centered  animate__animated animate__backInUp">
    <div class="portfolio-box">
      <div class="portfolio-title  flex flex-col  items-center">
        <div class="portfolio-title__box flex flex-col items-end">
          <h1 class="text-6xl  font-bold">{{ portfolioTitle }}</h1>
          <div class="portfolio-subtitle flex text-center justify-center w-fit">
            <p class="text-[15px]">{{ portfolioSubTitleItem }}</p>
          </div>
        </div>
      </div>
      <PortfolioItemComponent/>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "animate.css";
@import "style";
</style>