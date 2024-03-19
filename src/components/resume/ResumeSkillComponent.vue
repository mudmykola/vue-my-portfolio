<script setup>
import {ref} from "vue";
import ResumeSkillFrontendComponent from "@/components/resume/ResumeSkillFrontendComponent.vue";
import ResumeSkillToolsComponent from "@/components/resume/ResumeSkillToolsComponent.vue";
import ResumeSkillBeckendComponent from "@/components/resume/ResumeSkillBeckendComponent.vue";

const skillFrontendTitle = ref('Front-end technologies')
const skillToolsTitle = ref('Tools and technology')
const skillBackendTitle = ref('Backend and others')

const frontendTechnologies = [
  { name: 'HTML', progress: 90},
  { name: 'CSS', progress: 90},
  { name: 'JavaScript', progress: 85},
  { name: 'Vue.js', progress: 75 },
  { name: 'Tailwind CSS', progress: 55 },
  { name: 'jQuery', progress: 95 },
  { name: 'Vuex', progress: 75 },
  { name: 'Pinia', progress: 45 },
  { name: 'Nuxt.js', progress: 35 },
  { name: 'DOM', progress: 85 },
];

const toolsTechnologies = [
  { name: 'Node.js', progress: 60},
  { name: 'Webpack', progress: 90},
  { name: 'Gulp', progress: 85},
  { name: 'Vite', progress: 65 },
  { name: 'NPM', progress: 55 },
  { name: 'Yarn', progress: 95 },
  { name: 'Shopify CLI', progress: 75 },
  { name: 'Liquid (Shopify)', progress: 45 },
  { name: 'Git', progress: 35 },
  { name: 'Figma ', progress: 85 },
];

const backendTechnologies = [
  { name: 'Node.js', progress: 60},
  { name: 'REST', progress: 90},
  { name: 'JSON', progress: 85},
  { name: 'Axios', progress: 65 },
  { name: 'Fetch', progress: 55 },
  { name: 'Shopify CLI', progress: 95 },
  { name: 'Liquid (Shopify)', progress: 75 },
];
</script>

<template>
<div class="skills">
<div class="skills-frontend">
<ResumeSkillFrontendComponent :skillFrontendTitle="skillFrontendTitle" :itemsFrontend="frontendTechnologies"/>
  <ResumeSkillToolsComponent :skillToolsTitle="skillToolsTitle" :itemsTools="toolsTechnologies"/>
  <ResumeSkillBeckendComponent :skillBackendTitle="skillBackendTitle" :itemsBackend="backendTechnologies"/>
</div>
</div>
</template>

<style scoped lang="scss">
@import "style";
@import "src/assets/style/global-style";
</style>