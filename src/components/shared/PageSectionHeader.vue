<script setup>
import { computed } from 'vue';
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
  visibleTitle: {
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
  compact: {
    type: Boolean,
    default: false,
  },
  headingTag: {
    type: String,
    default: 'h2',
  },
});

const renderedVisibleTitle = computed(() => props.visibleTitle || props.title);
const hiddenTitleSuffix = computed(() => {
  const fullTitle = (props.title || '').trim();
  const visibleTitle = renderedVisibleTitle.value.trim();

  if (!fullTitle || !visibleTitle || fullTitle === visibleTitle) return '';
  return fullTitle;
});
</script>

<template>
  <header class="page-section-head" :class="{ 'page-section-head--compact': props.compact }">
    <span v-if="props.badge" class="page-badge">
      <font-awesome-icon v-if="props.icon" :icon="props.icon" />
      {{ props.badge }}
    </span>

    <component :is="props.headingTag" class="page-section-head__title">
      <span v-if="hiddenTitleSuffix" aria-hidden="true">{{ renderedVisibleTitle }}</span>
      <template v-else>{{ renderedVisibleTitle }}</template>
      <span v-if="hiddenTitleSuffix" class="page-section-head__title-seo">
        {{ hiddenTitleSuffix }}
      </span>
    </component>

    <p v-if="typeof props.subtitle === 'string' && props.subtitle" class="page-section-head__subtitle">
      {{ props.subtitle }}
    </p>

    <div v-else-if="Array.isArray(props.subtitle) && props.subtitle.length" class="page-section-head__chips">
      <span v-for="item in props.subtitle" :key="item">{{ item }}</span>
    </div>
  </header>
</template>

<style scoped lang="scss">
.page-section-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-align: center;
  margin-bottom: 1rem;
}

.page-section-head__title {
  margin: 0;
  font-size: clamp(1.65rem, 4.1vw, 3rem);
  line-height: 1.05;
}

.page-section-head__title-seo {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.page-section-head__subtitle {
  margin: 0;
  color: var(--app-text-soft);
}

.page-section-head__chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.45rem;
}

.page-section-head__chips span {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.06);
  font-size: 0.75rem;
}

.page-section-head--compact {
  align-items: flex-start;
  text-align: left;
}

.page-section-head--compact .page-section-head__chips {
  justify-content: flex-start;
}
</style>
