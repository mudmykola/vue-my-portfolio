<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

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

const selectedProject = ref(null);
const activeFilter = ref('All');
const currentImageIndex = ref(0);
const lastModalCloseAt = ref(0);

const filters = computed(() => [
  'All',
  ...new Set(props.projects.map((project) => project.category)),
]);

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return props.projects;
  return props.projects.filter((project) => project.category === activeFilter.value);
});

const imageUrl = (path) => {
  if (!path) return '';
  if (typeof path === 'string' && /^https?:\/\//.test(path)) return encodeURI(path);

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

const selectedProjectImages = computed(() => {
  const project = selectedProject.value;
  if (!project) return [];

  const fromSet = Array.isArray(project.imageSet)
    ? project.imageSet.map((entry) => imageFromSet(entry)).filter(Boolean)
    : [];

  if (fromSet.length > 0) return fromSet;

  const fallback = imageUrl(project.image);
  return fallback ? [fallback] : [];
});

const currentImage = computed(() => selectedProjectImages.value[currentImageIndex.value] || '');

const showModal = (project) => {
  if (Date.now() - lastModalCloseAt.value < 300) return;
  selectedProject.value = project;
  currentImageIndex.value = 0;
};

const closeModal = () => {
  lastModalCloseAt.value = Date.now();
  selectedProject.value = null;
  currentImageIndex.value = 0;
};

const closeOnEscape = (event) => {
  if (event.key === 'Escape') closeModal();
};

const nextImage = () => {
  const total = selectedProjectImages.value.length;
  if (!total) return;
  currentImageIndex.value = (currentImageIndex.value + 1) % total;
};

const prevImage = () => {
  const total = selectedProjectImages.value.length;
  if (!total) return;
  currentImageIndex.value = (currentImageIndex.value - 1 + total) % total;
};

const selectImage = (index) => {
  currentImageIndex.value = index;
};

watch(selectedProject, (project) => {
  document.body.style.overflow = project ? 'hidden' : '';
});

onMounted(() => {
  window.addEventListener('keydown', closeOnEscape);
});

onUnmounted(() => {
  window.removeEventListener('keydown', closeOnEscape);
  document.body.style.overflow = '';
});
</script>

<template>
  <section class="portfolio-list">
    <p v-if="loading" class="text-default">Loading projects...</p>
    <p v-else-if="error" class="text-default">{{ error }}</p>

    <template v-else>
      <div class="portfolio-filter">
        <button
          v-for="filter in filters"
          :key="filter"
          type="button"
          class="app-btn app-btn--sm"
          :class="activeFilter === filter ? 'app-btn--primary' : 'app-btn--ghost'"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>

      <div class="portfolio-grid">
        <article
          v-for="project in filteredProjects"
          :key="project.id"
          class="portfolio-project-card"
          @click="showModal(project)"
        >
          <img :src="imageUrl(project.image)" :alt="project.name" loading="lazy" />
          <h3>{{ project.name }}</h3>
          <p>{{ project.description }}</p>
          <span>{{ project.technology }}</span>
        </article>
      </div>
    </template>

    <teleport to="body">
      <div v-if="selectedProject" class="portfolio-modal" @click.self="closeModal">
        <button
          type="button"
          class="portfolio-modal__close-floating app-btn app-btn--icon app-btn--ghost"
          @click.stop="closeModal"
          @touchstart.stop.prevent="closeModal"
          aria-label="Close project details"
        >
          &times;
        </button>

        <div
          class="portfolio-modal__content"
          role="dialog"
          aria-modal="true"
          :aria-label="selectedProject.name"
          @click.stop
        >
          <button
            type="button"
            class="portfolio-modal__close app-btn app-btn--icon app-btn--ghost"
            @click.stop="closeModal"
            @touchstart.stop.prevent="closeModal"
            aria-label="Close project details"
          >
            &times;
          </button>

          <div class="portfolio-modal__grid">
            <div class="portfolio-modal__gallery">
              <div class="portfolio-modal__viewport">
                <img
                  v-if="currentImage"
                  :src="currentImage"
                  :alt="selectedProject.name"
                  class="portfolio-modal__image"
                />
                <div v-else class="portfolio-modal__empty">
                  Image not available
                </div>

                <button
                  v-if="selectedProjectImages.length > 1"
                  type="button"
                  class="portfolio-modal__nav portfolio-modal__nav--prev app-btn app-btn--icon app-btn--ghost"
                  @click.stop="prevImage"
                  aria-label="Previous image"
                >
                  ‹
                </button>

                <button
                  v-if="selectedProjectImages.length > 1"
                  type="button"
                  class="portfolio-modal__nav portfolio-modal__nav--next app-btn app-btn--icon app-btn--ghost"
                  @click.stop="nextImage"
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>

              <div v-if="selectedProjectImages.length > 1" class="portfolio-modal__thumbs">
                <button
                  v-for="(image, index) in selectedProjectImages"
                  :key="index"
                  type="button"
                  class="portfolio-modal__thumb"
                  :class="{ 'is-active': currentImageIndex === index }"
                  @click="selectImage(index)"
                  :aria-label="`Open image ${index + 1}`"
                >
                  <img :src="image" :alt="`${selectedProject.name} preview ${index + 1}`" />
                </button>
              </div>
            </div>

            <div class="portfolio-modal__details">
              <h2>{{ selectedProject.name }}</h2>

              <div>
                <h3>Description</h3>
                <p>{{ selectedProject.descriptionFull }}</p>
              </div>

              <div>
                <h3>Technology</h3>
                <p class="portfolio-modal__tech">{{ selectedProject.technology }}</p>
              </div>

              <div>
                <h3>Link</h3>
                <a :href="selectedProject.link" target="_blank" rel="noopener noreferrer" class="app-btn app-btn--primary app-btn--sm">
                  Open Project
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </section>
</template>

<style lang="scss" scoped>
@import 'style';
</style>
