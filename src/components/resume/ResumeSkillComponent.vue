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
    <PageSectionHeader
      badge="Skills"
      :icon="props.icon"
      title="Core Stack"
      compact
    />

    <div class="resume-skill-grid">
      <ResumeSkillFrontendComponent
        :title="props.frontendTitle"
        :items="props.frontendItems"
      />
      <ResumeSkillToolsComponent
        :title="props.toolsTitle"
        :items="props.toolsItems"
      />
    </div>
  </article>
</template>

<style scoped lang="scss">
.resume-card {
  border-radius: 18px;
  border: 1px solid var(--app-border);
  background: rgba(255, 255, 255, 0.04);
  padding: 1.1rem;
}

.resume-skill-grid {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
</style>
