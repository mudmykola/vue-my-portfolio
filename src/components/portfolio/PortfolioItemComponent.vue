<script setup>
import { computed, ref, watch } from 'vue';
import PortfolioProjectModal from './PortfolioProjectModal.vue';

const props = defineProps({
  projects: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  imageBase: {
    type: String,
    default: '',
  },
});

const activeFilter = ref('All');
const currentPage = ref(1);
const pageSize = 6;
const projectModal = ref(null);

const filters = computed(() => [
  'All',
  ...new Set(props.projects.map((project) => project.category)),
]);

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return props.projects;
  return props.projects.filter(
    (project) => project.category === activeFilter.value
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredProjects.value.length / pageSize)
);
const pageItems = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  if (total <= 5) {
    return Array.from({ length: total }, (_, index) => ({
      page: index + 1,
      label: String(index + 1),
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
    label: typeof page === 'number' ? String(page) : `ellipsis-${index}`,
  }));
});
const pageProjects = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredProjects.value.slice(start, start + pageSize);
});

const selectFilter = (filter) => {
  activeFilter.value = filter;
  currentPage.value = 1;
};

const setPage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

watch(totalPages, (pages) => {
  if (currentPage.value > pages) currentPage.value = Math.max(1, pages);
});

const imageUrl = (path) => {
  if (!path) return '';
  if (typeof path === 'string' && /^https?:\/\//.test(path))
    return encodeURI(path);

  const normalizedPath = String(path).trim();
  if (normalizedPath.startsWith('/')) {
    return encodeURI(normalizedPath);
  }

  return encodeURI(`${props.imageBase}${normalizedPath}`);
};

const imageFromSet = (imageEntry) => {
  if (typeof imageEntry === 'string') return imageUrl(imageEntry);
  if (imageEntry && typeof imageEntry === 'object') {
    return imageUrl(imageEntry.image || imageEntry.src || '');
  }

  return '';
};

const projectDomain = (link) => {
  if (!link) return '';

  const value = String(link).trim();
  try {
    const normalized = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    return new URL(normalized).hostname.replace(/^www\./i, '');
  } catch {
    return '';
  }
};

const technologyTags = (project) => {
  const technology = project?.technology;
  const values = Array.isArray(technology)
    ? technology
    : String(technology || '').split(',');

  return values.map((tag) => String(tag).trim()).filter(Boolean);
};

const visibleTechnologyTags = (project) => technologyTags(project).slice(0, 3);
const remainingTechnologyCount = (project) =>
  Math.max(technologyTags(project).length - 3, 0);

const showModal = (project, event) => {
  projectModal.value?.open(project, event);
};
</script>

<template>
  <section
    class="portfolio-list home-section section-selected-work"
    data-scroll-scene
  >
    <div
      v-if="loading"
      class="portfolio-loading"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span class="portfolio-loading__spinner" aria-hidden="true" />
      <span class="portfolio-loading__copy">
        <strong>Loading selected work</strong>
        <span>Fetching project details</span>
      </span>
      <span class="portfolio-loading__meta" aria-hidden="true"
        >PORTFOLIO / SYNC</span
      >
    </div>
    <p v-else-if="error" class="portfolio-state" role="alert">{{ error }}</p>

    <template v-else>
      <div class="portfolio-toolbar">
        <div class="portfolio-filter" role="group" aria-label="Filter projects">
          <button
            v-for="filter in filters"
            :key="filter"
            type="button"
            class="app-btn app-btn--sm"
            :class="
              activeFilter === filter ? 'app-btn--primary' : 'app-btn--ghost'
            "
            :aria-pressed="activeFilter === filter"
            @click="selectFilter(filter)"
          >
            {{ filter }}
          </button>
        </div>
        <span class="portfolio-toolbar__count" aria-live="polite">
          {{ filteredProjects.length }}
          {{ filteredProjects.length === 1 ? 'project' : 'projects' }}
        </span>
      </div>

      <p v-if="!filteredProjects.length" class="portfolio-state" role="status">
        No projects are available right now.
      </p>

      <div v-if="pageProjects.length" class="portfolio-grid">
        <article
          v-for="project in pageProjects"
          :key="project.id"
          class="portfolio-card"
          role="button"
          tabindex="0"
          aria-haspopup="dialog"
          :aria-label="`View case study: ${project.name}`"
          @click="showModal(project, $event)"
          @keydown.enter.prevent="showModal(project, $event)"
          @keydown.space.prevent="showModal(project, $event)"
        >
          <div class="portfolio-card__media">
            <span
              v-if="project.category"
              class="portfolio-card__category"
              aria-label="Project type"
            >
              {{ project.category }}
            </span>
            <div class="portfolio-preview-window">
              <div class="portfolio-preview-window__chrome" aria-hidden="true">
                <span />
                <span />
                <span />
                <span
                  v-if="projectDomain(project.link)"
                  class="portfolio-preview-window__domain"
                >
                  {{ projectDomain(project.link) }}
                </span>
              </div>
              <img
                v-if="imageFromSet(project.image)"
                class="portfolio-preview-window__image"
                :src="imageFromSet(project.image)"
                :alt="project.imageAlt || project.name"
                loading="lazy"
                decoding="async"
              />
              <div
                v-else
                class="portfolio-preview-window__empty"
                aria-hidden="true"
              >
                Preview unavailable
              </div>
            </div>
          </div>

          <div class="portfolio-card__body">
            <h2 class="portfolio-card__title">{{ project.name }}</h2>
            <span class="portfolio-card__cta" aria-hidden="true"> + </span>
            <p class="portfolio-card__desc">{{ project.description }}</p>
            <div
              v-if="technologyTags(project).length"
              class="portfolio-card__technologies"
            >
              <span
                v-for="tag in visibleTechnologyTags(project)"
                :key="tag"
                class="portfolio-card__technology"
              >
                {{ tag }}
              </span>
              <span
                v-if="remainingTechnologyCount(project)"
                class="portfolio-card__technology portfolio-card__technology--more"
              >
                +{{ remainingTechnologyCount(project) }}
              </span>
            </div>
          </div>
        </article>
      </div>

      <nav
        v-if="totalPages > 1"
        class="portfolio-pagination"
        aria-label="Portfolio pages"
      >
        <button
          type="button"
          class="portfolio-pagination__step app-btn app-btn--sm app-btn--ghost"
          :disabled="currentPage === 1"
          @click="setPage(currentPage - 1)"
        >
          Previous
        </button>
        <div class="portfolio-pagination__pages">
          <template v-for="item in pageItems" :key="item.label">
            <span
              v-if="item.page === null"
              class="portfolio-pagination__ellipsis"
              aria-hidden="true"
              >…</span
            >
            <button
              v-else
              type="button"
              class="portfolio-pagination__page app-btn app-btn--sm"
              :class="
                currentPage === item.page
                  ? 'app-btn--primary'
                  : 'app-btn--ghost'
              "
              :aria-label="`Page ${item.page}`"
              :aria-current="currentPage === item.page ? 'page' : undefined"
              @click="setPage(item.page)"
            >
              {{ item.page }}
            </button>
          </template>
        </div>
        <button
          type="button"
          class="portfolio-pagination__step app-btn app-btn--sm app-btn--ghost"
          :disabled="currentPage === totalPages"
          @click="setPage(currentPage + 1)"
        >
          Next
        </button>
      </nav>
    </template>

    <PortfolioProjectModal ref="projectModal" :image-base="imageBase" />
  </section>
</template>

<style lang="scss" scoped>
@import 'style';
</style>
