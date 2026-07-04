<script setup>
import { computed, ref } from 'vue';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import PageSectionHeader from '@/components/shared/PageSectionHeader.vue';
import ClampText from '@/components/shared/ClampText.vue';

const props = defineProps({
  title: String,
  items: Array,
  icon: Object,
});

const PREVIEW_COUNT = 3;
const isExpanded = ref(false);

const list = computed(() => (Array.isArray(props.items) ? props.items : []));

/**
 * Group positions by company (institution), LinkedIn style. A company with
 * several positions is shown once with a nested role timeline — the career
 * growth. First-appearance order is preserved.
 */
const groups = computed(() => {
  const byCompany = new Map();
  const order = [];

  for (const item of list.value) {
    const key = (item.institution || item.title || `__${item.id}`).trim();
    if (!byCompany.has(key)) {
      byCompany.set(key, { key, institution: item.institution, roles: [] });
      order.push(key);
    }
    byCompany.get(key).roles.push(item);
  }

  return order.map((key) => byCompany.get(key));
});

const visibleGroups = computed(() =>
  isExpanded.value ? groups.value : groups.value.slice(0, PREVIEW_COUNT)
);
const hiddenCount = computed(() =>
  Math.max(0, groups.value.length - PREVIEW_COUNT)
);
const canToggle = computed(() => hiddenCount.value > 0);

const toggle = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <article class="resume-card">
    <PageSectionHeader
      badge="Experience"
      :icon="props.icon"
      :title="props.title"
      compact
    />

    <ul class="resume-timeline">
      <li
        v-for="group in visibleGroups"
        :key="group.key"
        class="resume-timeline__item"
      >
        <span class="resume-timeline__marker"></span>

        <!-- Company with several positions: growth timeline -->
        <div
          v-if="group.roles.length > 1"
          class="resume-timeline__content resume-company"
        >
          <div class="resume-company__head">
            <span class="resume-company__name">{{ group.institution }}</span>
            <span class="resume-company__badge">
              {{ group.roles.length }} positions
            </span>
          </div>

          <ul class="resume-roles">
            <li
              v-for="role in group.roles"
              :key="role.id"
              class="resume-roles__item"
            >
              <span class="resume-roles__marker"></span>
              <div>
                <span class="resume-timeline__year">{{ role.year }}</span>
                <h4>{{ role.title }}</h4>
                <ClampText
                  class="resume-timeline__description"
                  :text="role.description"
                  :lines="2"
                />
              </div>
            </li>
          </ul>
        </div>

        <!-- Single position -->
        <div v-else class="resume-timeline__content">
          <span class="resume-timeline__year">{{ group.roles[0].year }}</span>
          <h3>{{ group.roles[0].title }}</h3>
          <p class="resume-timeline__institution">
            {{ group.roles[0].institution }}
          </p>
          <ClampText
            class="resume-timeline__description"
            :text="group.roles[0].description"
            :lines="2"
          />
        </div>
      </li>
    </ul>

    <button
      v-if="canToggle"
      type="button"
      class="app-btn app-btn--ghost app-btn--sm resume-timeline__toggle"
      :aria-expanded="isExpanded"
      @click="toggle"
    >
      {{ isExpanded ? 'Show less' : `Show ${hiddenCount} more` }}
      <font-awesome-icon
        :icon="faChevronDown"
        class="resume-timeline__chevron"
        :class="{ 'is-open': isExpanded }"
      />
    </button>
  </article>
</template>

<style scoped lang="scss">
.resume-card {
  border-radius: 18px;
  border: 1px solid var(--app-border);
  background: rgba(255, 255, 255, 0.04);
  padding: 1.1rem;
}

.resume-timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
}

.resume-timeline__item {
  position: relative;
  padding: 0 0 1.1rem 1.7rem;
}

.resume-timeline__item:last-child {
  padding-bottom: 0;
}

/* Connecting line between company markers */
.resume-timeline__item::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 0.5rem;
  bottom: -0.1rem;
  width: 2px;
  background: rgba(255, 255, 255, 0.12);
}

.resume-timeline__item:last-child::before {
  display: none;
}

.resume-timeline__marker {
  position: absolute;
  left: 0;
  top: 0.35rem;
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: linear-gradient(#49dcb1, #f3c056);
  box-shadow: 0 0 0 4px rgba(73, 220, 177, 0.12);
}

.resume-timeline__content {
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  padding: 0.75rem 0.85rem;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;
}

.resume-timeline__content:hover {
  border-color: rgba(73, 220, 177, 0.4);
  background: rgba(73, 220, 177, 0.05);
}

.resume-timeline__year {
  display: inline-flex;
  border-radius: 999px;
  border: 1px solid rgba(73, 220, 177, 0.45);
  background: rgba(73, 220, 177, 0.14);
  color: #d5fff0;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
}

.resume-timeline__content h3 {
  margin: 0.5rem 0 0.3rem;
  font-size: 1rem;
  line-height: 1.3;
}

.resume-timeline__institution {
  margin: 0;
  font-size: 0.83rem;
  color: #f3c056;
}

.resume-timeline__description {
  margin: 0.38rem 0 0;
  color: var(--app-text-soft);
  line-height: 1.5;
  font-size: 0.88rem;
  white-space: pre-line;
}

/* Company (grouped) --------------------------------------------------- */
.resume-company__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}

.resume-company__name {
  font-family: 'Sora', 'Manrope', sans-serif;
  font-size: 1.02rem;
  font-weight: 700;
  color: #f3c056;
}

.resume-company__badge {
  flex: 0 0 auto;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.06);
  color: var(--app-text-soft);
  font-size: 0.68rem;
  padding: 0.18rem 0.5rem;
  white-space: nowrap;
}

.resume-roles {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
}

.resume-roles__item {
  position: relative;
  padding: 0 0 0.85rem 1.25rem;
}

.resume-roles__item:last-child {
  padding-bottom: 0;
}

/* Nested growth line */
.resume-roles__item::before {
  content: '';
  position: absolute;
  left: 3px;
  top: 0.45rem;
  bottom: -0.05rem;
  width: 2px;
  background: rgba(255, 255, 255, 0.1);
}

.resume-roles__item:last-child::before {
  display: none;
}

.resume-roles__marker {
  position: absolute;
  left: 0;
  top: 0.3rem;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--app-accent);
  box-shadow: 0 0 0 3px rgba(73, 220, 177, 0.14);
}

.resume-roles__item h4 {
  margin: 0.35rem 0 0.25rem;
  font-size: 0.92rem;
  line-height: 1.3;
}

/* Toggle -------------------------------------------------------------- */
.resume-timeline__toggle {
  margin-top: 0.9rem;
  width: 100%;
}

.resume-timeline__chevron {
  transition: transform 0.25s ease;
}

.resume-timeline__chevron.is-open {
  transform: rotate(180deg);
}
</style>
