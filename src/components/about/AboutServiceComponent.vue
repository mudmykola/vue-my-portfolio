<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faCode,
  faStore,
  faChartLine,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  services: {
    type: Array,
    default: () => [],
  },
});

const serviceIcons = [faCode, faStore, faChartLine, faLayerGroup];
</script>

<template>
  <ul class="about-services-grid">
    <li
      v-for="service in props.services"
      :key="service.id"
      class="about-service"
    >
      <font-awesome-icon
        class="about-service__icon"
        :icon="serviceIcons[(service.id - 1) % serviceIcons.length]"
        aria-hidden="true"
      />
      <div class="about-service__copy">
        <h3>{{ service.title }}</h3>
        <p>{{ service.desc }}</p>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.about-services-grid {
  position: relative;
  z-index: 1;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem) clamp(1.2rem, 3vw, 2.5rem);
  margin: 0;
  padding: 0;
}

.about-service {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  align-items: center;
  gap: 0.9rem;
  min-width: 0;
}

.about-service__icon {
  justify-self: center;
  color: var(--color-accent);
  font-size: 2rem;
}

.about-service__copy {
  min-width: 0;
  padding-left: 1rem;
  border-left: 1px solid var(--app-border);
}

.about-service h3 {
  margin: 0 0 0.25rem;
  font-size: clamp(1.05rem, 1.5vw, 1.35rem);
  line-height: 1.25;
}

.about-service p {
  max-width: 48ch;
  margin: 0;
  color: var(--app-text-soft);
  font-size: var(--type-supporting);
  line-height: 1.45;
}

@media (max-width: 640px) {
  .about-services-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
  }
}
</style>
