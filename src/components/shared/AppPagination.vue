<script setup>
import { computed } from 'vue';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  mode: {
    type: String,
    default: 'numbered',
    validator: (value) => ['compact', 'numbered'].includes(value),
  },
  label: { type: String, default: 'Pagination' },
  previousLabel: { type: String, default: 'Previous' },
  nextLabel: { type: String, default: 'Next' },
});

const emit = defineEmits(['update:currentPage']);

const pageItems = computed(() => {
  const total = props.totalPages;
  const current = props.currentPage;

  if (total <= 5) {
    return Array.from({ length: total }, (_, index) => ({
      page: index + 1,
      key: `page-${index + 1}`,
    }));
  }

  const pages =
    current <= 3
      ? [1, 2, 3, 4, 'ellipsis', total]
      : current >= total - 2
        ? [1, 'ellipsis', total - 3, total - 2, total - 1, total]
        : [1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', total];

  return pages.map((page, index) => ({
    page: typeof page === 'number' ? page : null,
    key: typeof page === 'number' ? `page-${page}` : `ellipsis-${index}`,
  }));
});

const goToPage = (page) => {
  if (page < 1 || page > props.totalPages || page === props.currentPage) return;
  emit('update:currentPage', page);
};
</script>

<template>
  <nav
    v-if="totalPages > 1"
    class="app-pagination"
    :class="`app-pagination--${mode}`"
    :aria-label="label"
  >
    <button
      type="button"
      class="app-btn app-btn--sm app-btn--ghost app-pagination__step"
      :aria-label="previousLabel"
      :disabled="currentPage <= 1"
      @click="goToPage(currentPage - 1)"
    >
      <font-awesome-icon :icon="faArrowLeft" aria-hidden="true" />
      <span class="app-pagination__step-label">{{ previousLabel }}</span>
    </button>

    <span class="app-pagination__status" aria-live="polite" aria-atomic="true">
      Page {{ currentPage }} / {{ totalPages }}
    </span>

    <div v-if="mode === 'numbered'" class="app-pagination__pages">
      <template v-for="item in pageItems" :key="item.key">
        <span
          v-if="item.page === null"
          class="app-pagination__ellipsis"
          aria-hidden="true"
          >…</span
        >
        <button
          v-else
          type="button"
          class="app-btn app-btn--sm app-pagination__page"
          :class="
            currentPage === item.page ? 'app-btn--primary' : 'app-btn--ghost'
          "
          :aria-label="`Page ${item.page}`"
          :aria-current="currentPage === item.page ? 'page' : undefined"
          @click="goToPage(item.page)"
        >
          {{ item.page }}
        </button>
      </template>
    </div>

    <button
      type="button"
      class="app-btn app-btn--sm app-btn--ghost app-pagination__step"
      :aria-label="nextLabel"
      :disabled="currentPage >= totalPages"
      @click="goToPage(currentPage + 1)"
    >
      <span class="app-pagination__step-label">{{ nextLabel }}</span>
      <font-awesome-icon :icon="faArrowRight" aria-hidden="true" />
    </button>
  </nav>
</template>

<style lang="scss" scoped>
.app-pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  width: 100%;
  margin-block-start: clamp(1.5rem, 3vw, 2.25rem);
}

.app-pagination__step,
.app-pagination__page {
  min-width: 44px;
  min-height: 44px;
}

.app-pagination__status {
  min-width: 5rem;
  color: var(--color-text-secondary);
  font-size: var(--type-supporting, 0.875rem);
  font-variant-numeric: tabular-nums;
  text-align: center;
  white-space: nowrap;
}

.app-pagination__pages {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.app-pagination__ellipsis {
  display: grid;
  min-width: 18px;
  min-height: 44px;
  place-items: center;
  color: var(--color-text-muted);
}

.app-pagination--numbered .app-pagination__status {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
}

@media (max-width: 480px) {
  .app-pagination--numbered .app-pagination__status {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    overflow: visible;
    clip: auto;
    clip-path: none;
  }

  .app-pagination--numbered .app-pagination__pages,
  .app-pagination--numbered .app-pagination__step-label {
    display: none;
  }

  .app-pagination--numbered .app-pagination__step {
    min-width: 44px;
    padding-inline: 0.6rem;
  }
}
</style>
