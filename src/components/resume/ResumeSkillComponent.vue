<script setup>
import ResumeSkillFrontendComponent from '@/components/resume/ResumeSkillFrontendComponent.vue';
import ResumeSkillToolsComponent from '@/components/resume/ResumeSkillToolsComponent.vue';

defineProps({
  frontendTitle: String,
  toolsTitle: String,
  frontendItems: { type: Array, default: () => [] },
  toolsItems: { type: Array, default: () => [] },
});
</script>

<template>
  <section
    class="resume-section resume-skills"
    aria-labelledby="resume-skills-title"
  >
    <header class="resume-skills__head">
      <p class="resume-skills__eyebrow">Core stack</p>
      <h2 id="resume-skills-title">Technologies & <span>tools</span></h2>
      <p>
        The core technologies I use to build, optimize, and ship e-commerce
        products.
      </p>
    </header>

    <div class="resume-skill-grid">
      <ResumeSkillFrontendComponent
        :title="frontendTitle"
        :items="frontendItems"
      />
      <ResumeSkillToolsComponent :title="toolsTitle" :items="toolsItems" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.resume-section {
  min-width: 0;
  padding: clamp(1.25rem, 2.3vw, 1.9rem) 0;
  border-bottom: 1px solid var(--app-border);
}

.resume-skills__head {
  display: grid;
  justify-items: start;
  gap: 0.35rem;
  margin-bottom: 1.15rem;
}

.resume-skills__eyebrow {
  margin: 0;
  color: var(--color-accent);
  font-size: var(--type-eyebrow);
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.resume-skills__head h2 {
  margin: 0;
  color: var(--app-text);
  font-size: clamp(1.75rem, 3vw, 2.35rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.12;
}

.resume-skills__head h2 span {
  color: var(--color-accent);
}

.resume-skills__head > p:last-child {
  margin: 0;
  color: var(--app-text-soft);
  font-size: var(--type-supporting);
  line-height: 1.5;
}

.resume-skill-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
}

.resume-skill-grid > :deep(.resume-skill-group:first-child) {
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--app-border);
}
</style>
