<script setup>
import {ref} from "vue";
import ResumeEducationComponent from "@/components/resume/ResumeEducationComponent.vue";

const resumeTitle = ref('Resume')
const educationTitle = ref('Education')

const resumeSubTitleItem = ref('3 Years of Experience\n')

const educationItems = ref([
  { year: "2022", title: "Front-end developer courses", institution: "Online Academy Ciklum", description: "Thanks to this course, I will be ready to create interactive interfaces as well as build full-fledged websites, from layout to hosting." },
  { year: "2021", title: "Course Front-end development", institution: "Beetroot Academy", description: "I gained a deep understanding of basic technologies such as HTML, CSS, and JavaScript, which are the foundation of any web developer. " },
  { year: "2020", title: "Web developer", institution: "WAYUP Academy", description: "Through the practical assignments and projects in the course, I gained experience with real-world web projects, including working with Git and GitHub to manage code versions and collaborate with other developers.  " },
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
      <div class="resume-list">
        <ResumeEducationComponent :educationTitle="educationTitle" :items="educationItems"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "animate.css";
@import "style";
</style>