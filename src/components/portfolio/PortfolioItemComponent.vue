<script setup>
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

const filters = ref([]);
const filteredProjects = ref([]);
const selectedProject = ref(null);
const swiperOptions = ref({});
const isFullscreen = ref(false);
const activeFilter = ref('All');

const changeFilter = (filter) => {
  filteredProjects.value = filter === 'All' ?
      data.portfolioCard :
      data.portfolioCard.filter(project => project.category === filter);
  activeFilter.value = filter;
};

const showModal = (project) => {
  selectedProject.value = project;
};

const closeModal = () => {
  selectedProject.value = null;
};

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
};

const imageDomain = 'https://test-api-mudmykola.vercel.app';

let data = {};

onMounted(async () => {
  try {
    const response = await fetch('https://test-9aagcy5d5-mudmykolas-projects.vercel.app/api-my-portfolio-project.json');
    data = await response.json();
    filters.value = ['All', ...new Set(data.portfolioCard.map(project => project.category))];
    filteredProjects.value = data.portfolioCard;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<template>
  <div class="portfolio-inner">
    <div class="portfolio-inner__filter">
      <ul class="flex items-center gap-5 justify-center">
        <li v-for="filter in filters" :key="filter" @click="changeFilter(filter)" class="cursor-pointer" :class="{ 'active': activeFilter === filter }">
          {{ filter }}
        </li>
      </ul>
    </div>
    <div class="portfolio-inner__content flex flex-wrap gap-3 justify-center ">
      <div v-for="project in filteredProjects" :key="project.id" class="project-wrapper w-[350px]">
        <div class="project-card rounded backdrop-blur" @click="showModal(project)">
          <img class="m-auto" width="300" height="300" :src="`${imageDomain}${project.image}`" :alt="project.name" loading="lazy">
          <h3 class="text-default mt-5 font-bold">{{ project.name }}</h3>
          <p class="text-default opacity-80">{{ project.description }}</p>
          <p class="text-default rounded font-medium mt-2 bg-[#ca0de1] w-fit px-2 py-1">{{ project.technology }}</p>
        </div>
      </div>
    </div>
  </div>

  <div v-if="selectedProject" class="modal show">
    <div class="modal-content h-full rounded fixed top-0 left-0 right-0 bottom-0 overflow-auto z-50">
      <span class="close" @click="closeModal">&times;</span>
      <div class="modal-wrapper mt-10">
        <swiper class="w-[50%]" :options="swiperOptions">
          <swiper-slide v-for="(image, index) in selectedProject.imageSet" :key="index">
            <img
                :src="`${imageDomain}${image}`"
                :alt="selectedProject.name"
                @click="toggleFullscreen"
                class="cursor-pointer"
                :class="{ 'fullscreen': isFullscreen }"
                loading="lazy"
            />
          </swiper-slide>
        </swiper>
        <div class="project-details">
          <h2 class="mb-5 text-3xl font-bold">{{ selectedProject.name }}</h2>
          <div class="details-group">
            <div class="details-group__desc">
              <h2 class="modal-details__desc text-2xl font-bold">Description:</h2>
              <p> {{ selectedProject.descriptionFull }}</p>
            </div>
            <div class="details-group__tech mt-5">
              <h2 class="modal-details__tech text-2xl font-bold">Technology:</h2>
              <p >{{  selectedProject.technology }}</p>
            </div>
            <div class="details-group__link mt-5">
              <h2 class="modal-details__link text-2xl font-bold">Link:</h2>
              <a :href="selectedProject.link" target="_blank">{{ selectedProject.link }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "style";
.portfolio-inner__filter .active {
  color: white;
  background: #6e0279;
  border: 1px solid #ffffff;
}
</style>