<script setup>
import {ref} from 'vue'
import AboutInfoComponent from "@/components/about/AboutInfoComponent.vue";
import AboutContactComponent from "@/components/about/AboutContactComponent.vue";
import AboutServiceComponent from "@/components/about/AboutServiceComponent.vue";

const aboutTitle = ref('About Me')
const aboutSubTitleItem = ref([
  {id: 1, text: 'Developer,'},
  {id: 2, text: 'Manager,'},
  {id: 3, text: 'Creative Person'},
])
</script>

<template>
  <div class="about-box top-[11%] left-[12%] container-centered  animate__animated animate__backInDown">
    <div class="about text-default ">
      <div class="about-title  flex flex-col  items-center">
        <div class="about-title__box flex flex-col items-end">
          <h1 class="text-6xl  font-bold">{{ aboutTitle }}</h1>
          <div class=" about-subtitle flex text-center justify-center w-fit">
            <p class="text-[15px]" v-for="item in aboutSubTitleItem" :key="item.id">{{ item.text }}</p>
          </div>
        </div>
      </div>
      <div class="about-info flex justify-between mt-7">
        <AboutInfoComponent/>
        <AboutContactComponent/>
      </div>
      <div class="about-service">
        <AboutServiceComponent/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "animate.css";

.about {
  &-title {
    h1 {
      color: #bcbcbc;
    }
  }
  &-subtitle {
    padding: 2px 4px;
    border-radius: 1px;
    background: rgba(202, 13, 225, 0.75);

    p{
      color: #efeeee;
      font-weight: 400;

    }
  }
}
</style>