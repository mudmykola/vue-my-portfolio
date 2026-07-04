<script setup>
import { computed, ref } from 'vue';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import PageSectionHeader from '@/components/shared/PageSectionHeader.vue';

const props = defineProps({
  title: String,
  items: Array,
  icon: Object,
});

const PREVIEW_COUNT = 3;
const isExpanded = ref(false);

const list = computed(() => (Array.isArray(props.items) ? props.items : []));
const visibleItems = computed(() =>
  isExpanded.value ? list.value : list.value.slice(0, PREVIEW_COUNT)
);
const hiddenCount = computed(() =>
  Math.max(0, list.value.length - PREVIEW_COUNT)
);
const canToggle = computed(() => hiddenCount.value > 0);

const toggle = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <article class="resume-card">
    <PageSectionHeader
      badge="Education"
      :icon="props.icon"
      :title="props.title"
      compact
    />

    <ul class="resume-education-list">
      <li
        v-for="item in visibleItems"
        :key="item.id"
        class="resume-education-card"
      >
        <span class="resume-education-card__year">{{ item.year }}</span>
        <h3>{{ item.title }}</h3>
        <p class="resume-education-card__institution">{{ item.institution }}</p>
        <p class="resume-education-card__description">{{ item.description }}</p>
      </li>
    </ul>

    <button
      v-if="canToggle"
      type="button"
      class="app-btn app-btn--ghost app-btn--sm resume-education__toggle"
      :aria-expanded="isExpanded"
      @click="toggle"
    >
      {{ isExpanded ? 'Show less' : `Show ${hiddenCount} more` }}
      <font-awesome-icon
        :icon="faChevronDown"
        class="resume-education__chevron"
        :class="{ 'is-open': isExpanded }"
      />
    </button>
  </article>
</template>

<style scoped lang="scss">
.resume-card {
  border-radius: 18px;
  border: 1px solid var(--app-border);
  background: rgba(255, 255, 255, 0.04);
  padding: 1.1rem;
}

.resume-education-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.7rem;
}

@media (max-width: 900px) {
  .resume-education-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .resume-education-list {
    grid-template-columns: 1fr;
  }
}

.resume-education-card {
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  padding: 0.7rem 0.8rem;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;
}

.resume-education-card:hover {
  border-color: rgba(243, 192, 86, 0.4);
  background: rgba(243, 192, 86, 0.05);
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
  margin: 0.45rem 0 0.22rem;
  font-size: 0.95rem;
  line-height: 1.3;
}

.resume-education-card__institution {
  margin: 0;
  color: #49dcb1;
  font-size: 0.8rem;
}

.resume-education-card__description {
  margin: 0.3rem 0 0;
  color: var(--app-text-soft);
  font-size: 0.83rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.resume-education__toggle {
  margin-top: 0.9rem;
  width: 100%;
}

.resume-education__chevron {
  transition: transform 0.25s ease;
}

.resume-education__chevron.is-open {
  transform: rotate(180deg);
}
</style>
