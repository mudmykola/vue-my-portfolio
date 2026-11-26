<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  imageBase: {
    type: String,
    default: '',
  },
});

const selectedProject = ref(null);
const currentImageIndex = ref(0);
const modalContent = ref(null);
const modalCloseButton = ref(null);
let triggerElement = null;
let previousBodyOverflow = '';
let previousBodyPaddingRight = '';

const imageUrl = (path) => {
  if (!path) return '';
  if (typeof path === 'string' && /^https?:\/\//.test(path))
    return encodeURI(path);

  const normalizedPath = String(path).trim();
  if (normalizedPath.startsWith('/')) return encodeURI(normalizedPath);
  return encodeURI(`${props.imageBase}${normalizedPath}`);
};

const imageFromSet = (imageEntry) => {
  if (typeof imageEntry === 'string') return imageUrl(imageEntry);
  if (imageEntry && typeof imageEntry === 'object') {
    return imageUrl(imageEntry.src || imageEntry.image || '');
  }
  return '';
};

const selectedProjectImages = computed(() => {
  const project = selectedProject.value;
  if (!project) return [];

  const fromSet = Array.isArray(project.imageSet)
    ? project.imageSet.map((entry) => imageFromSet(entry)).filter(Boolean)
    : [];
  if (fromSet.length) return fromSet;

  const fallback = imageUrl(project.image);
  return fallback ? [fallback] : [];
});

const currentImage = computed(
  () => selectedProjectImages.value[currentImageIndex.value] || ''
);
const currentImageAlt = computed(() => {
  const project = selectedProject.value;
  const image = project?.imageSet?.[currentImageIndex.value];
  return (
    (typeof image === 'object' && image?.alt) ||
    project?.imageAlt ||
    `${project?.name || 'Project'} website screenshot ${currentImageIndex.value + 1}`
  );
});
const selectedProjectDomain = computed(() => {
  try {
    return new URL(selectedProject.value?.link).host;
  } catch {
    return selectedProject.value?.link || '';
  }
});
const technologyTags = computed(() => {
  const technology = selectedProject.value?.technology;
  const values = Array.isArray(technology)
    ? technology
    : String(technology || '').split(',');
  return values.map((tag) => String(tag).trim()).filter(Boolean);
});

const open = (project, eventOrElement) => {
  if (!project || selectedProject.value) return;
  const target = eventOrElement?.currentTarget || eventOrElement;
  triggerElement =
    target instanceof HTMLElement ? target : document.activeElement;
  previousBodyOverflow = document.body.style.overflow;
  previousBodyPaddingRight = document.body.style.paddingRight;
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
  document.body.style.overflow = 'hidden';
  selectedProject.value = project;
  currentImageIndex.value = 0;
  nextTick(() => modalCloseButton.value?.focus());
};

const close = () => {
  if (!selectedProject.value) return;
  selectedProject.value = null;
  currentImageIndex.value = 0;
  document.body.style.overflow = previousBodyOverflow;
  document.body.style.paddingRight = previousBodyPaddingRight;
  nextTick(() => {
    if (triggerElement?.isConnected) triggerElement.focus();
    triggerElement = null;
  });
};

const trapModalFocus = (event) => {
  if (!selectedProject.value) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    close();
    return;
  }
  if (event.key !== 'Tab') return;

  const focusableElements = Array.from(
    modalContent.value?.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ) || []
  ).filter((element) => element.getClientRects().length);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements.at(-1);

  if (!firstElement || !lastElement) {
    event.preventDefault();
    modalContent.value?.focus();
  } else if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
};

const nextImage = () => {
  const total = selectedProjectImages.value.length;
  if (total) currentImageIndex.value = (currentImageIndex.value + 1) % total;
};

const prevImage = () => {
  const total = selectedProjectImages.value.length;
  if (total)
    currentImageIndex.value = (currentImageIndex.value - 1 + total) % total;
};

const selectImage = (index) => {
  currentImageIndex.value = index;
};

onMounted(() => window.addEventListener('keydown', trapModalFocus));
onUnmounted(() => {
  window.removeEventListener('keydown', trapModalFocus);
  document.body.style.overflow = previousBodyOverflow;
  document.body.style.paddingRight = previousBodyPaddingRight;
});

defineExpose({ open, close });
</script>

<template>
  <Teleport to="body">
    <div v-if="selectedProject" class="portfolio-modal" @click.self="close">
      <div
        ref="modalContent"
        class="portfolio-modal__content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-modal-title"
        aria-describedby="portfolio-modal-description"
        tabindex="-1"
      >
        <button
          ref="modalCloseButton"
          type="button"
          class="portfolio-modal__close"
          aria-label="Close project details"
          @click="close"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>

        <div class="portfolio-modal__grid">
          <div class="portfolio-modal__gallery">
            <div class="portfolio-modal__viewport">
              <img
                v-if="currentImage"
                :src="currentImage"
                :alt="currentImageAlt"
                class="portfolio-modal__image"
                decoding="async"
              />
              <div v-else class="portfolio-modal__empty">
                Image not available
              </div>

              <button
                v-if="selectedProjectImages.length > 1"
                type="button"
                class="portfolio-modal__nav portfolio-modal__nav--prev app-btn app-btn--icon app-btn--ghost"
                aria-label="Previous image"
                @click.stop="prevImage"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                v-if="selectedProjectImages.length > 1"
                type="button"
                class="portfolio-modal__nav portfolio-modal__nav--next app-btn app-btn--icon app-btn--ghost"
                aria-label="Next image"
                @click.stop="nextImage"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>

            <div
              v-if="selectedProjectImages.length > 1"
              class="portfolio-modal__thumbs"
              role="group"
              aria-label="Project screenshots"
            >
              <button
                v-for="(image, index) in selectedProjectImages"
                :key="index"
                type="button"
                class="portfolio-modal__thumb"
                :class="{ 'is-active': currentImageIndex === index }"
                :aria-label="`Open image ${index + 1}`"
                :aria-pressed="currentImageIndex === index"
                @click="selectImage(index)"
              >
                <img
                  :src="image"
                  alt=""
                  width="74"
                  height="50"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            </div>
          </div>

          <div class="portfolio-modal__details">
            <div class="portfolio-modal__intro">
              <p class="portfolio-modal__category">
                {{ selectedProject.category }}
              </p>
              <h2 id="portfolio-modal-title">{{ selectedProject.name }}</h2>
              <p
                id="portfolio-modal-description"
                class="portfolio-modal__description"
              >
                {{
                  selectedProject.descriptionFull || selectedProject.description
                }}
              </p>
            </div>

            <div
              v-if="technologyTags.length"
              class="portfolio-modal__technology"
            >
              <h3>Technology</h3>
              <ul class="portfolio-modal__technology-list">
                <li
                  v-for="tag in technologyTags"
                  :key="tag"
                  class="portfolio-modal__technology-chip"
                >
                  {{ tag }}
                </li>
              </ul>
            </div>

            <div class="portfolio-modal__links">
              <a
                v-if="selectedProject.link"
                :href="selectedProject.link"
                target="_blank"
                rel="noopener noreferrer"
                class="portfolio-modal__open-link app-btn app-btn--primary"
              >
                Open Project
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </a>
              <a
                v-if="selectedProject.link"
                :href="selectedProject.link"
                target="_blank"
                rel="noopener noreferrer"
                class="portfolio-modal__domain"
              >
                {{ selectedProjectDomain }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
@import './project-modal';
</style>
