<script setup>
import PageSectionHeader from '@/components/shared/PageSectionHeader.vue';
import ResumeSkillFrontendComponent from '@/components/resume/ResumeSkillFrontendComponent.vue';
import ResumeSkillToolsComponent from '@/components/resume/ResumeSkillToolsComponent.vue';

const props = defineProps({
  frontendTitle: String,
  toolsTitle: String,
  frontendItems: Array,
  toolsItems: Array,
  icon: Object,
});
</script>

<template>
  <article class="resume-card">
    <PageSectionHeader badge="Skills" :icon="props.icon" title="Core Stack" compact />

    <div class="resume-skill-grid">
      <ResumeSkillFrontendComponent :title="props.frontendTitle" :items="props.frontendItems" />
      <ResumeSkillToolsComponent :title="props.toolsTitle" :items="props.toolsItems" />
    </div>
  </article>
</template>

<style scoped lang="scss">
.resume-card {
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  padding: 0.75rem;
}

.resume-skill-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.55rem;
}

@media (max-width: 980px) {
  .resume-skill-grid {
    grid-template-columns: 1fr;
  }
}
</style>
