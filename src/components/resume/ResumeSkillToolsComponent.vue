<script setup>
import { computed } from 'vue';
import { getTechnologyIcon } from '@/utils/technologyIcons.js';

const props = defineProps({
  title: String,
  items: { type: Array, default: () => [] },
});

const skills = computed(() =>
  props.items.map((item) => ({
    ...item,
    technologyIcon: getTechnologyIcon(item.name),
  }))
);
</script>

<template>
  <section class="resume-skill-group">
    <header class="resume-skill-group__head">
      <font-awesome-icon :icon="faCube" aria-hidden="true" />
      <h3>{{ title }}</h3>
    </header>
    <ul class="resume-skill-list">
      <li v-for="item in skills" :key="item.name">
        <span
          v-if="item.technologyIcon.mark"
          class="resume-skill-list__mark"
          :style="{ '--mark-color': item.technologyIcon.color }"
          aria-hidden="true"
        >
          {{ item.technologyIcon.mark }}
        </span>
        <img
          v-else-if="item.technologyIcon.asset"
          class="resume-skill-list__icon"
          :src="item.technologyIcon.asset"
          alt=""
          aria-hidden="true"
        />
        <font-awesome-icon
          v-else
          class="resume-skill-list__icon"
          :icon="item.technologyIcon.icon"
          :style="{ color: item.technologyIcon.color }"
          aria-hidden="true"
        />
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.resume-skill-group {
  min-width: 0;
}

.resume-skill-group__head {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.55rem;
  color: var(--color-accent);
}

.resume-skill-group__head svg {
  flex: 0 0 auto;
  font-size: 1.35rem;
}

.resume-skill-group__head h3 {
  margin: 0;
  color: var(--app-text);
  font-size: var(--type-supporting);
  font-weight: 800;
  letter-spacing: 0.035em;
  line-height: 1.35;
  text-transform: uppercase;
}

.resume-skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.resume-skill-list li {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.22rem 0.48rem;
  border: 1px solid
    color-mix(in srgb, var(--color-accent) 22%, var(--app-border));
  border-radius: 0.3rem;
  background: color-mix(in srgb, var(--color-accent) 5%, transparent);
  color: var(--app-text-soft);
  font-size: var(--type-caption, var(--type-supporting));
  line-height: 1.3;
  overflow-wrap: anywhere;
}

.resume-skill-list__icon {
  width: 1em;
  height: 1em;
  flex: 0 0 1em;
  color: var(--color-accent);
}

.resume-skill-list__mark {
  display: inline-grid;
  width: 1em;
  height: 1em;
  flex: 0 0 1em;
  place-items: center;
  color: var(--mark-color, var(--color-accent));
  font-size: 0.72em;
  font-weight: 900;
  line-height: 1;
}
</style>
