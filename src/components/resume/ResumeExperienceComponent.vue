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
    <PageSectionHeader badge="Experience" :icon="props.icon" :title="props.title" compact />

    <ul class="resume-timeline">
      <li v-for="item in props.items" :key="item.id" class="resume-timeline__item">
        <span class="resume-timeline__dot"></span>
        <div>
          <span class="resume-timeline__year">{{ item.year }}</span>
          <h3>{{ item.title }}</h3>
          <p class="resume-timeline__institution">{{ item.institution }}</p>
          <p class="resume-timeline__description">{{ item.description }}</p>
        </div>
      </li>
    </ul>
  </article>
</template>

<style scoped lang="scss">
.resume-card {
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  padding: 0.95rem;
}

.resume-timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
}

.resume-timeline__item {
  display: grid;
  grid-template-columns: 14px 1fr;
  gap: 0.6rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.03);
  padding: 0.65rem;
}

.resume-timeline__dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  margin-top: 0.32rem;
  background: linear-gradient(#49dcb1, #f3c056);
}

.resume-timeline__year {
  display: inline-flex;
  border-radius: 999px;
  border: 1px solid rgba(73, 220, 177, 0.45);
  background: rgba(73, 220, 177, 0.14);
  color: #d5fff0;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
}

.resume-timeline__item h3 {
  margin: 0.5rem 0 0.3rem;
  font-size: 1rem;
}

.resume-timeline__institution {
  margin: 0;
  font-size: 0.83rem;
  color: #f3c056;
}

.resume-timeline__description {
  margin: 0.38rem 0 0;
  color: var(--app-text-soft);
  line-height: 1.45;
  font-size: 0.88rem;
}
</style>
