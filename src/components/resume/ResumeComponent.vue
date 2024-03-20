<script setup>
import {ref} from "vue";
import ResumeEducationComponent from "@/components/resume/ResumeEducationComponent.vue";
import ResumeExperienceComponent from "@/components/resume/ResumeExperienceComponent.vue";
import ResumeSkillComponent from "@/components/resume/ResumeSkillComponent.vue";

const resumeTitle = ref('Resume')
const educationTitle = ref('Education')
const experienceTitle = ref('Experience')

const resumeSubTitleItem = ref('3 Years of Experience\n')

const educationItems = ref([
  { year: "2022", title: "Front-end developer courses", institution: "Online Academy Ciklum", description: "Thanks to this course, I will be ready to create interactive interfaces as well as build full-fledged websites, from layout to hosting." },
  { year: "2021", title: "Course Front-end development", institution: "Beetroot Academy", description: "I gained a deep understanding of basic technologies such as HTML, CSS, and JavaScript, which are the foundation of any web developer. " },
  { year: "2020", title: "Web developer", institution: "WAYUP Academy", description: "Through the practical assignments and projects in the course, I gained experience with real-world web projects, including working with Git and GitHub to manage code versions and collaborate with other developers.  " },
]);

const experienceItems = ref([
  { year: "2023 - Up to now", title: "Front End Engineer Shopify E-Commerce | Vue | Nuxt", institution: "Ecom-X Company", description: "Development and implementation of user interfaces for e-commerce on the Shopify platform, using Vue.js and Nuxt.js." },
  { year: "2023", title: "Front End Engineer Vue Composition API", institution: "Dozor Product Company", description: "Code optimization, changing the logic to the Composition API, working with GraphQL. " },
  { year: "2022 - 2023", title: "Development of a company website", institution: "Freelance project AWW Company", description: "Development and implementation of interface components such as menus, carousels, order forms, product filters, etc. " },
]);
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
      <div class="resume-list flex items-baseline gap-5">
        <ResumeEducationComponent :educationTitle="educationTitle" :items="educationItems"/>
        <ResumeExperienceComponent :experienceTitle="experienceTitle" :items="experienceItems"/>
        <ResumeSkillComponent/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "animate.css";
@import "style";
</style>