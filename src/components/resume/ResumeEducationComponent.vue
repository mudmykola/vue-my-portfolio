<script setup>
import PageSectionHeader from '@/components/shared/PageSectionHeader.vue';

const props = defineProps({
  title: { type: String, default: 'Education & learning' },
  subtitle: { type: String, default: '' },
  items: { type: Array, default: () => [] },
  compact: { type: Boolean, default: false },
});
</script>

<template>
  <section
    class="resume-section resume-education"
    :class="{ 'resume-education--compact': props.compact }"
  >
    <PageSectionHeader
      badge="Education"
      :title="props.title"
      :subtitle="props.subtitle"
      compact
    />

    <ol class="resume-education-list" aria-label="Education and training">
      <li v-for="item in props.items" :key="item.id">
        <span class="resume-education-list__date">{{ item.year }}</span>
        <div class="resume-education-list__content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.institution }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped lang="scss">
.resume-section {
  min-width: 0;
  padding: clamp(1.25rem, 2.3vw, 1.9rem) 0;
}

.resume-section :deep(.page-section-head) {
  align-items: flex-start;
  gap: 0.35rem;
  margin: 0 0 0.9rem;
  text-align: left;
}

.resume-section :deep(.page-badge) {
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--color-accent);
  font-size: var(--type-eyebrow);
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.resume-section :deep(.page-badge::before) {
  display: none;
}

.resume-section :deep(.page-section-head__title) {
  color: var(--app-text);
  font-size: clamp(1.75rem, 3vw, 2.35rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.12;
  text-align: left;
}

.resume-section :deep(.page-section-head__subtitle) {
  color: var(--app-text-soft);
  font-size: var(--type-supporting);
  line-height: 1.5;
  text-align: left;
}

.resume-education-list {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.resume-education-list li {
  display: grid;
  gap: 0.12rem;
  min-width: 0;
}

.resume-education-list__date {
  color: var(--color-accent);
  font-size: var(--type-caption, var(--type-supporting));
  font-weight: 750;
  letter-spacing: 0.025em;
  line-height: 1.4;
}

.resume-education-list__content {
  min-width: 0;
}

.resume-education-list__content h3 {
  margin: 0;
  color: var(--app-text);
  font-size: var(--type-supporting);
  font-weight: 750;
  line-height: 1.35;
  text-wrap: pretty;
}

.resume-education-list__content p {
  margin: 0.08rem 0 0;
  color: var(--app-text-soft);
  font-size: var(--type-caption, var(--type-supporting));
  line-height: 1.4;
}

.resume-education--compact {
  padding: 1.15rem 0;
}

.resume-education--compact :deep(.page-section-head__title) {
  font-size: clamp(1.35rem, 2vw, 1.7rem);
  letter-spacing: -0.035em;
  line-height: 1.16;
}

.resume-education--compact :deep(.page-section-head__subtitle) {
  display: none;
}

@media (max-width: 900px) {
  .resume-education--compact {
    padding-top: 1.15rem;
  }
}
</style>
