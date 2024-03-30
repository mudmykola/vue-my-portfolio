<script setup>
import { usePortfolioStore } from '@/stores/portfolio.js';
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

const store = usePortfolioStore();
const swiperOptions = ref({});
const isFullscreen = ref(false);

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
}
</script>

<template>
  <div class="portfolio-inner">
    <div class="portfolio-inner__filter">
      <ul class="flex items-center gap-5 justify-center">
        <li class="cursor-pointer" v-for="filter in store.filters" :key="filter" @click="store.changeFilter(filter)">
          {{ filter }}
        </li>
      </ul>
    </div>
    <div class="portfolio-inner__content flex flex-wrap gap-3 justify-center ">
      <div v-for="project in store.filteredProjects" :key="project.name" class="project-wrapper w-[350px]">
        <div class="project-card rounded backdrop-blur" @click="store.showModal(project)">
          <img class="m-auto" width="300" height="300" :src="`dist/assets/images/${project.image}`" :alt="project.name" loading="lazy">
          <h3 class="text-default mt-5 font-bold">{{ project.name }}</h3>
          <p class="text-default opacity-80">{{ project.description }}</p>
          <p class="text-default rounded font-medium mt-2 bg-[#ca0de1] w-fit px-2 py-1">{{ project.technology }}</p>
        </div>
      </div>
    </div>
  </div>

  <div v-if="store.selectedProject" class="modal show">
    <div class="modal-content h-full rounded fixed top-0 left-0 right-0 bottom-0 overflow-auto z-50">
      <span class="close" @click="store.closeModal">&times;</span>
      <div class="modal-wrapper mt-10">
        <swiper class="w-[50%]" :options="swiperOptions">
          <swiper-slide v-for="(image, index) in store.selectedProject.images" :key="index">
            <img
                :src="`dist/assets/images/${image}`"
                :alt="store.selectedProject.name"
                @click="toggleFullscreen"
                class="cursor-pointer"
                :class="{ 'fullscreen': isFullscreen }"
                loading="lazy"
            />
          </swiper-slide>
        </swiper>
        <div class="project-details">
          <h2 class="mb-5 text-3xl font-bold">{{ store.selectedProject.name }}</h2>
          <div class="details-group">
            <div class="details-group__desc">
              <h2 class="modal-details__desc text-2xl font-bold">Description:</h2>
              <p> {{ store.selectedProject.descriptionFull }}</p>
            </div>
            <div class="details-group__tech mt-5">
              <h2 class="modal-details__tech text-2xl font-bold">Technology:</h2>
              <p >{{  store.selectedProject.technology }}</p>
            </div>
            <div class="details-group__link mt-5">
              <h2 class="modal-details__link text-2xl font-bold">Link:</h2>
              <a :href="store.selectedProject.link" target="_blank">{{ store.selectedProject.link }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "style";
</style>