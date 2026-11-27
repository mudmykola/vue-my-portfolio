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
  accentText: {
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
const titleBeforeAccent = computed(() => {
  const accent = props.accentText.trim();
  if (!accent || !props.title.endsWith(accent)) return null;
  return props.title.slice(0, -accent.length).trimEnd();
});
</script>

<template>
  <header class="about-section-head">
    <span v-if="props.badge" class="page-badge">
      <font-awesome-icon v-if="props.icon" :icon="props.icon" />
      {{ props.badge }}
    </span>

    <component :is="props.headingTag" class="about-section-head__title">
      <span v-if="hiddenTitleSuffix" aria-hidden="true">{{
        renderedVisibleTitle
      }}</span>
      <template v-else-if="titleBeforeAccent !== null">
        {{ titleBeforeAccent
        }}<span class="about-section-head__accent"
          >&nbsp;{{ props.accentText }}</span
        >
      </template>
      <template v-else>{{ renderedVisibleTitle }}</template>
      <span v-if="hiddenTitleSuffix" class="about-section-head__title-seo">
        {{ hiddenTitleSuffix }}
      </span>
    </component>

    <p
      v-if="typeof props.subtitle === 'string' && props.subtitle"
      class="about-section-head__subtitle"
    >
      {{ props.subtitle }}
    </p>

    <div
      v-else-if="Array.isArray(props.subtitle) && props.subtitle.length"
      class="about-section-head__chips"
    >
      <span v-for="item in props.subtitle" :key="item">{{ item }}</span>
    </div>
  </header>
</template>

<style scoped lang="scss">
.about-section-head {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  margin-bottom: clamp(0.75rem, 1.4vw, 1rem);
}

.about-section-head__title {
  margin: 0;
  font-size: var(--type-section);
  line-height: 1.12;
  text-align: left;
}

.about-section-head__title:is(h1) {
  font-size: clamp(2.375rem, 4.6vw, 3.5rem);
  line-height: 1.04;
}

.about-section-head__accent {
  color: var(--color-accent);
}

.about-section-head__title-seo {
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

.about-section-head__subtitle {
  margin: 0;
  color: var(--app-text-soft);
}

.about-section-head__chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
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
