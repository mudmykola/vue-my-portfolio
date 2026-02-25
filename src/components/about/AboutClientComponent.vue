<script setup>
const props = defineProps({
  clients: {
    type: Array,
    default: () => [],
  },
});
</script>
<template>
  <ul class="about-clients-grid">
    <li v-for="client in props.clients" :key="client.id" class="about-client-card">
      <img width="140" height="68" :src="client.image" :alt="client.alt" loading="lazy" />
    </li>
  </ul>
</template>
<style scoped lang="scss">
.about-clients-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.7rem;
}

.about-client-card {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgb(199, 199, 199);
  min-height: 76px;
}

.about-client-card img {
  max-width: 100%;
  height: auto;
}

@media (max-width: 980px) {
  .about-clients-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .about-clients-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

</style>
