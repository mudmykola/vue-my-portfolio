<script setup>
const props = defineProps({
  facts: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <ul class="about-fun-grid">
    <li v-for="fact in props.facts" :key="fact.id">
      <p class="about-fun-grid__value">{{ fact.number }}</p>
      <h3 class="about-fun-grid__title">{{ fact.title }}</h3>
      <p class="about-fun-grid__detail">{{ fact.description }}</p>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.about-fun-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  margin: 0;
  padding: 0;
}

.about-fun-grid li {
  display: grid;
  align-content: start;
  gap: 0.35rem;
  min-width: 0;
  padding: 0 1.25rem;
}

.about-fun-grid li:first-child {
  padding-left: 0;
}

.about-fun-grid li + li {
  border-left: 1px solid var(--app-border);
}

.about-fun-grid__value {
  margin: 0 0 0.2rem;
  color: var(--color-accent);
  font-family: 'Sora', 'Manrope', sans-serif;
  font-size: clamp(2rem, 3.3vw, 3.1rem);
  font-weight: 800;
  letter-spacing: -0.055em;
  line-height: 0.98;
  font-variant-numeric: tabular-nums;
}

.about-fun-grid__title {
  margin: 0;
  color: var(--app-text);
  font-size: var(--type-supporting);
  font-weight: 700;
  line-height: 1.35;
}

.about-fun-grid__detail {
  min-width: 0;
  margin: 0;
  color: var(--app-text-soft);
  font-size: var(--type-supporting);
  line-height: 1.45;
}

@media (max-width: 768px) {
  .about-fun-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 1rem;
  }

  .about-fun-grid li {
    padding: 0.65rem 1rem;
  }

  .about-fun-grid li:nth-child(2n + 1) {
    padding-left: 0;
    border-left: 0;
  }

  .about-fun-grid li:nth-child(2n) {
    padding-right: 0;
  }
}

@media (max-width: 420px) {
  .about-fun-grid li:nth-child(2n) {
    padding-right: 0;
  }

  .about-fun-grid__value {
    font-size: clamp(1.8rem, 9vw, 2.25rem);
  }
}
</style>
