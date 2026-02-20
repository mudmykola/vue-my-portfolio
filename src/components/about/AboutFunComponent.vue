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
    <li v-for="fact in props.facts" :key="fact.id" class="about-fun-card">
      <img width="56" height="56" :src="fact.photo" :alt="fact.title" />
      <h3>{{ fact.title }}</h3>
      <p>{{ Number(fact.number).toLocaleString() }}</p>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.about-fun-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.7rem;
}

.about-fun-card {
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.05);
  padding: 0.85rem;
  text-align: center;
}

.about-fun-card img {
  margin: 0 auto;
}

.about-fun-card h3 {
  margin: 0.45rem 0 0.3rem;
  font-size: 1rem;
}

.about-fun-card p {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #dcfff3;
}

@media (max-width: 980px) {
  .about-fun-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .about-fun-grid {
    grid-template-columns: 1fr;
  }
}

</style>
