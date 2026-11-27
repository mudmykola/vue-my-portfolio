<script setup>
const props = defineProps({
  clients: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <ul class="about-clients-grid" aria-label="Teams and brands">
    <li v-for="client in props.clients" :key="client.id">
      <img
        width="140"
        height="68"
        :src="client.image"
        :alt="client.alt"
        loading="lazy"
        decoding="async"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.about-clients-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  align-items: center;
  gap: clamp(0.5rem, 1.4vw, 1.25rem);
  margin: 0;
  padding: 0;
}

.about-clients-grid li {
  display: flex;
  min-width: 0;
  min-height: 64px;
  align-items: center;
  justify-content: center;
}

.about-clients-grid img {
  display: block;
  width: min(100%, 140px);
  max-height: 42px;
  object-fit: contain;
  filter: grayscale(1) brightness(0) invert(1);
  opacity: 0.62;
  transition:
    filter var(--motion-ui) var(--ease-standard),
    opacity var(--motion-ui) var(--ease-standard),
    transform var(--motion-ui) var(--ease-standard);
}

.about-clients-grid li:hover img,
.about-clients-grid li:focus-within img {
  filter: brightness(0) saturate(100%) invert(64%) sepia(86%) saturate(743%)
    hue-rotate(108deg) brightness(101%) contrast(101%);
  opacity: 1;
  transform: scale(1.02);
}

@media (max-width: 980px) {
  .about-clients-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    row-gap: 0.5rem;
  }
}

@media (max-width: 420px) {
  .about-clients-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-clients-grid img {
    transition: none;
  }
}
</style>
