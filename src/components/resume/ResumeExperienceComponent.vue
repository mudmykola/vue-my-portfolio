<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import PageSectionHeader from '@/components/shared/PageSectionHeader.vue';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  title: { type: String, default: 'Professional experience' },
  subtitle: { type: String, default: '' },
  items: { type: Array, default: () => [] },
});

const entries = computed(() =>
  props.items.map((item) => ({
    ...item,
    points: String(item.description || '')
      .split(/\n+/)
      .map((point) => point.trim())
      .filter(Boolean),
  }))
);

const experienceSection = ref(null);
const measureTimeline = ref(null);
const expanded = ref(true);
const overflowsSidebar = ref(false);
const hasManualState = ref(false);
const initialEntryCount = 2;
const visibleEntries = computed(() =>
  expanded.value ? entries.value : entries.value.slice(0, initialEntryCount)
);
const showToggle = computed(
  () =>
    entries.value.length > initialEntryCount &&
    (overflowsSidebar.value || hasManualState.value)
);

let resizeObserver;
let measureFrame = 0;

const measureExperience = () => {
  if (measureFrame) {
    cancelAnimationFrame(measureFrame);
  }

  measureFrame = requestAnimationFrame(() => {
    measureFrame = 0;

    const section = experienceSection.value;
    const timeline = measureTimeline.value;
    const sidebar = section
      ?.closest('.resume-content-grid')
      ?.querySelector('.resume-sidebar');
    const heading = section?.querySelector('.page-section-head');

    if (!section || !timeline || !sidebar || !heading) {
      return;
    }

    const sectionStyle = getComputedStyle(section);
    const headingStyle = getComputedStyle(heading);
    const fullHeight =
      Number.parseFloat(sectionStyle.paddingTop) +
      Number.parseFloat(sectionStyle.borderTopWidth) +
      heading.getBoundingClientRect().height +
      Number.parseFloat(headingStyle.marginBottom) +
      timeline.getBoundingClientRect().height +
      Number.parseFloat(sectionStyle.paddingBottom) +
      Number.parseFloat(sectionStyle.borderBottomWidth);
    const fitsBesideSidebar =
      fullHeight <= sidebar.getBoundingClientRect().height + 1;

    overflowsSidebar.value = !fitsBesideSidebar;

    if (!hasManualState.value) {
      expanded.value = fitsBesideSidebar;
    }
  });
};

const toggleExpanded = () => {
  hasManualState.value = true;
  expanded.value = !expanded.value;
};

watch(entries, measureExperience, { flush: 'post' });

onMounted(() => {
  measureExperience();

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(measureExperience);

    const section = experienceSection.value;
    const sidebar = section
      ?.closest('.resume-content-grid')
      ?.querySelector('.resume-sidebar');

    if (section) resizeObserver.observe(section);
    if (sidebar) resizeObserver.observe(sidebar);
    if (measureTimeline.value) resizeObserver.observe(measureTimeline.value);
  }
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();

  if (measureFrame) {
    cancelAnimationFrame(measureFrame);
  }
});
</script>

<template>
  <section ref="experienceSection" class="resume-section resume-experience">
    <PageSectionHeader
      badge="Experience"
      :title="props.title"
      :subtitle="props.subtitle"
      compact
    />

    <ol
      id="resume-experience-timeline"
      class="resume-timeline"
      aria-label="Professional experience"
    >
      <li
        v-for="entry in visibleEntries"
        :key="entry.id"
        class="resume-timeline__item"
      >
        <span class="resume-timeline__date">{{ entry.year }}</span>
        <span class="resume-timeline__marker" aria-hidden="true"></span>
        <div class="resume-timeline__content">
          <h3>{{ entry.title }}</h3>
          <p class="resume-timeline__institution">{{ entry.institution }}</p>
          <ul v-if="entry.points.length" class="resume-timeline__details">
            <li v-for="(point, index) in entry.points" :key="index">
              {{ point }}
            </li>
          </ul>
        </div>
      </li>
    </ol>

    <ol
      ref="measureTimeline"
      class="resume-timeline resume-timeline--measure"
      aria-hidden="true"
      inert
    >
      <li
        v-for="entry in entries"
        :key="entry.id"
        class="resume-timeline__item"
      >
        <span class="resume-timeline__date">{{ entry.year }}</span>
        <span class="resume-timeline__marker" aria-hidden="true"></span>
        <div class="resume-timeline__content">
          <h3>{{ entry.title }}</h3>
          <p class="resume-timeline__institution">{{ entry.institution }}</p>
          <ul v-if="entry.points.length" class="resume-timeline__details">
            <li v-for="(point, index) in entry.points" :key="index">
              {{ point }}
            </li>
          </ul>
        </div>
      </li>
    </ol>

    <button
      v-if="showToggle"
      type="button"
      class="resume-experience__toggle app-btn app-btn--ghost"
      :aria-expanded="expanded"
      aria-controls="resume-experience-timeline"
      @click="toggleExpanded"
    >
      {{
        expanded ? 'Show latest 2 roles' : `Show all ${entries.length} roles`
      }}
      <font-awesome-icon :icon="faChevronDown" aria-hidden="true" />
    </button>
  </section>
</template>

<style scoped lang="scss">
.resume-section {
  min-width: 0;
  padding: clamp(1.25rem, 2.3vw, 1.9rem) 0;
}

.resume-section :deep(.page-section-head) {
  align-items: flex-start;
  gap: 0.35rem;
  margin: 0 0 1rem;
  text-align: left;
}

.resume-section :deep(.page-badge) {
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--color-accent);
  font-size: var(--type-eyebrow);
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.resume-section :deep(.page-badge::before) {
  display: none;
}

.resume-section :deep(.page-section-head__title) {
  color: var(--app-text);
  font-size: clamp(1.75rem, 3vw, 2.35rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.12;
  text-align: left;
}

.resume-section :deep(.page-section-head__subtitle) {
  color: var(--app-text-soft);
  font-size: var(--type-supporting);
  line-height: 1.5;
  text-align: left;
}

.resume-timeline {
  position: relative;
  display: grid;
  gap: 0.9rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.resume-experience {
  position: relative;
}

.resume-timeline--measure {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  visibility: hidden;
  pointer-events: none;
  user-select: none;
}

.resume-timeline::before {
  position: absolute;
  top: 0.65rem;
  bottom: 0.7rem;
  left: 10.25rem;
  width: 1px;
  background: color-mix(in srgb, var(--app-text-soft) 52%, transparent);
  content: '';
}

.resume-timeline__item {
  position: relative;
  display: grid;
  grid-template-columns: 8.5rem 1rem minmax(0, 1fr);
  align-items: start;
  column-gap: 1.25rem;
  min-width: 0;
}

.resume-timeline__date {
  padding-top: 0.16rem;
  color: var(--app-text);
  font-size: var(--type-supporting);
  font-weight: 700;
  line-height: 1.5;
  white-space: nowrap;
}

.resume-timeline__marker {
  position: relative;
  z-index: 1;
  width: 0.78rem;
  height: 0.78rem;
  margin-top: 0.33rem;
  border: 2px solid var(--color-accent);
  border-radius: 50%;
  background: var(--color-bg);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 12%, transparent);
}

.resume-timeline__item:first-child .resume-timeline__marker {
  background: var(--color-accent);
}

.resume-timeline__content {
  min-width: 0;
}

.resume-timeline__content h3 {
  margin: 0;
  color: var(--app-text);
  font-size: clamp(1.08rem, 1.6vw, 1.38rem);
  font-weight: 750;
  line-height: 1.28;
  text-wrap: pretty;
}

.resume-timeline__institution {
  margin: 0.12rem 0 0;
  color: var(--color-accent);
  font-size: var(--type-supporting);
  font-weight: 800;
  letter-spacing: 0.09em;
  line-height: 1.4;
  text-transform: uppercase;
}

.resume-timeline__details {
  display: grid;
  gap: 0.08rem;
  margin: 0.18rem 0 0;
  padding: 0;
  color: var(--app-text);
  font-size: var(--type-supporting);
  line-height: 1.42;
  list-style: none;
}

.resume-timeline__details li {
  position: relative;
  padding-left: 1.15rem;
  overflow-wrap: anywhere;
}

.resume-timeline__details li::before {
  position: absolute;
  top: 0.54em;
  left: 0.2rem;
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background: var(--color-accent);
  content: '';
}

.resume-experience__toggle {
  min-height: 2.75rem;
  margin-top: 1.15rem;
  gap: 0.55rem;
}

.resume-experience__toggle svg {
  font-size: 0.8em;
  transition: transform 180ms var(--ease-standard, ease);
}

.resume-experience__toggle[aria-expanded='true'] svg {
  transform: rotate(180deg);
}

.resume-experience__toggle:focus-visible {
  outline: 2px solid var(--focus-ring, var(--color-accent));
  outline-offset: 3px;
}

@media (max-width: 640px) {
  .resume-timeline {
    gap: 1.1rem;
    padding-right: 1.4rem;
  }

  .resume-timeline::before {
    right: 0.36rem;
    left: auto;
  }

  .resume-timeline__item {
    grid-template-columns: minmax(0, 1fr) 0.8rem;
    column-gap: 0.7rem;
  }

  .resume-timeline__date {
    grid-column: 1;
    grid-row: 1;
    padding: 0 0 0.3rem;
  }

  .resume-timeline__marker {
    grid-column: 2;
    grid-row: 1 / span 2;
    width: 0.68rem;
    height: 0.68rem;
    margin: 0.2rem 0 0;
  }

  .resume-timeline__content {
    grid-column: 1;
    grid-row: 2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .resume-experience__toggle svg {
    transition: none;
  }
}
</style>
