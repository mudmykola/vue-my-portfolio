<script setup>
import { ref, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';


const filters = ['All', 'Web', 'Mobile', 'Desktop'];
const selectedFilter = ref('All');
const selectedProject = ref(null);
const swiperOptions = ref({

});

const projects = [
  { name: 'Airmazing e-commerce bubble house', category: 'Web', image: '1.png',images: ['1.png', '2.png'], description: 'Description of project 1', descriptionFull: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).', technology: 'HTML, CSS, JS', link: 'https://example.com/project1' },
  { name: 'Project 2', category: 'Mobile', image: 'service-3.png', description: 'Description of project 2', technology: 'Vue.js, Tailwind CSS', link: 'https://example.com/project2' },
  { name: 'Project 3', category: 'Desktop', image: 'service-2.png', description: 'Description of project 3', technology: 'React, SCSS', link: 'https://example.com/project3' },
  { name: 'Project 4', category: 'Web', image: 'service-1.png', description: 'Description of project 4', technology: 'Vue.js, Vuetify', link: 'https://example.com/project4' },
  { name: 'Project 4', category: 'Web', image: 'service-1.png', description: 'Description of project 4', technology: 'Vue.js, Vuetify', link: 'https://example.com/project4' },
  { name: 'Project 4', category: 'Web', image: 'service-1.png', description: 'Description of project 4', technology: 'Vue.js, Vuetify', link: 'https://example.com/project4' },
];

const filteredProjects = computed(() => {
  if (selectedFilter.value === 'All') {
    return projects;
  } else {
    return projects.filter(project => project.category === selectedFilter.value);
  }
});

const changeFilter = (filter) => {
  selectedFilter.value = filter;
};

const showModal = (project) => {
  selectedProject.value = project;
};

const closeModal = () => {
  selectedProject.value = null;
};
</script>

<template>
  <div class="portfolio-inner">
    <div class="portfolio-inner__filter">
      <ul class="flex items-center gap-5 justify-center">
        <li class="cursor-pointer"  v-for="filter in filters" :key="filter" @click="changeFilter(filter)">
          {{ filter }}
        </li>
      </ul>
    </div>
    <div class="portfolio-inner__content flex flex-wrap gap-3 justify-center ">
      <div v-for="project in filteredProjects" :key="project.name" class="project-card rounded backdrop-blur" @click="showModal(project)">
        <img class="m-auto" width="300" height="300" :src="`src/assets/images/${project.image}`" :alt="project.name">
        <h3 class="text-default mt-5">{{ project.name }}</h3>
        <p class="text-default">{{ project.description }}</p>
        <p class="text-[#CA0DE1BF] font-bold">{{ project.technology }}</p>
      </div>
    </div>
  </div>

  <div v-if="selectedProject" class="modal show">
    <div class="modal-content  h-full">
      <span class="close" @click="closeModal">&times;</span>
      <div class="modal-wrapper">
        <swiper class="w-[50%]" :options="swiperOptions">
          <swiper-slide v-for="(image, index) in selectedProject.images" :key="index">
            <img :src="`src/assets/images/${image}`" :alt="selectedProject.name" />
          </swiper-slide>
        </swiper>
        <div class="project-details mt-10">
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
</style>