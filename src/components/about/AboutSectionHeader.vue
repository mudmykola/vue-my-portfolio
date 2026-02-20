<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
  badge: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: [String, Array],
    default: '',
  },
  icon: {
    type: Object,
    default: null,
  },
});
</script>

<template>
  <header class="about-section-head">
    <span v-if="props.badge" class="page-badge">
      <font-awesome-icon v-if="props.icon" :icon="props.icon" />
      {{ props.badge }}
    </span>

    <h2 class="about-section-head__title">{{ props.title }}</h2>

    <p v-if="typeof props.subtitle === 'string' && props.subtitle" class="about-section-head__subtitle">
      {{ props.subtitle }}
    </p>

    <div v-else-if="Array.isArray(props.subtitle) && props.subtitle.length" class="about-section-head__chips">
      <span v-for="item in props.subtitle" :key="item">{{ item }}</span>
    </div>
  </header>
</template>

<style scoped lang="scss">
.about-section-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-align: center;
  margin-bottom: 1rem;
}

.about-section-head__title {
  margin: 0;
  font-size: clamp(1.8rem, 4.3vw, 3.2rem);
  line-height: 1.05;
}

.about-section-head__subtitle {
  margin: 0;
  color: var(--app-text-soft);
}

.about-section-head__chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.45rem;
}

.about-section-head__chips span {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.06);
  font-size: 0.75rem;
}
</style>
