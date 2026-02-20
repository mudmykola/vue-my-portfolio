<script setup>
import PageSectionHeader from '@/components/shared/PageSectionHeader.vue';

const props = defineProps({
  title: String,
  items: Array,
  icon: Object,
});
</script>

<template>
  <article class="resume-card">
    <PageSectionHeader badge="Education" :icon="props.icon" :title="props.title" compact />

    <ul class="resume-education-grid">
      <li v-for="item in props.items" :key="item.id" class="resume-education-card">
        <span class="resume-education-card__year">{{ item.year }}</span>
        <h3>{{ item.title }}</h3>
        <p class="resume-education-card__institution">{{ item.institution }}</p>
        <p class="resume-education-card__description">{{ item.description }}</p>
      </li>
    </ul>
  </article>
</template>

<style scoped lang="scss">
.resume-card {
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  padding: 0.78rem;
}

.resume-education-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
}

.resume-education-card {
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.03);
  padding: 0.5rem;
}

.resume-education-card__year {
  display: inline-flex;
  border-radius: 999px;
  border: 1px solid rgba(243, 192, 86, 0.45);
  background: rgba(243, 192, 86, 0.13);
  color: #ffe6b5;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
}

.resume-education-card h3 {
  margin: 0.38rem 0 0.2rem;
  font-size: 0.86rem;
  line-height: 1.3;
}

.resume-education-card__institution {
  margin: 0;
  color: #49dcb1;
  font-size: 0.74rem;
}

.resume-education-card__description {
  margin: 0.24rem 0 0;
  color: var(--app-text-soft);
  font-size: 0.76rem;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 980px) {
  .resume-education-grid {
    grid-template-columns: 1fr;
  }
}
</style>
