<script setup>
import { ref } from 'vue'

const props = defineProps( ({
  title: String
}))
const servicesItem = ref([
  {
    image: 'service-1.png',
    title: 'Web site development',
    desc: 'Developing the client side of a web application, which is responsible for the visual interface and user experience. '
  },
  {
    image: 'service-2.png',
    title: 'SPA development',
    desc: 'SPA development is usually used to create modern interactive web applications that provide a fast and smooth user experience. '
  },
  {
    image: 'service-3.png',
    title: 'Testing and optimization',
    desc: 'This includes various types of testing such as unit testing, integration testing, end-to-end testing, and usability testing. '
  },
  {
    image: 'service-4.png',
    title: 'Integration with Backend',
    desc: 'During integration, developers establish connections between the SPA and backend APIs or services, allowing data exchange. '
  }
])
</script>

<template>
<div class="services mt-5">
<div class="services-title text-2xl font-bold">
  <h2>{{ title }}</h2>
</div>
  <div class="services-inner mt-5">
    <ul class="flex items-baseline gap-5 justify-center">
      <li class="text-center w-[300px] flex flex-col items-center" v-for="(service, index) in servicesItem" :key="index">
        <img width="150" height="150" :src="`public/images/${service.image}`" :alt="service.title" loading="lazy">
        <h3 class="text-[20px] font-bold leading-5 capitalize mt-2" >{{ service.title}}</h3>
        <p class="text-[16px]  leading-5 font-light mt-2 opacity-80">{{ service.desc }}</p>
      </li>
    </ul>
  </div>
</div>
</template>

<style scoped lang="scss">
@import "style";
</style>