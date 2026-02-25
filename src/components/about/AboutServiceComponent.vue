<script setup>
const props = defineProps({
  services: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <ul class="about-services-grid">
    <li v-for="service in props.services" :key="service.id" class="about-service-card">
      <img width="76" height="76" :src="service.photo" :alt="service.title" loading="lazy" decoding="async" />
      <h3>{{ service.title }}</h3>
      <p>{{ service.desc }}</p>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.about-services-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.8rem;
}

.about-service-card {
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  padding: 0.9rem;
  text-align: center;
}

.about-service-card img {
  margin: 0 auto;
}

.about-service-card h3 {
  margin: 0.55rem 0 0.45rem;
  font-size: 1rem;
}

.about-service-card p {
  margin: 0;
  color: var(--app-text-soft);
  font-size: 0.9rem;
  line-height: 1.45;
}

@media (max-width: 980px) {
  .about-services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .about-services-grid {
    grid-template-columns: 1fr;
  }
}

</style>
