<script setup>
import { ref } from 'vue';
import PortfolioProjectModal from '@/components/portfolio/PortfolioProjectModal.vue';

defineProps({
  projects: { type: Array, default: () => [] },
  imageBase: { type: String, default: '/' },
});

const projectModal = ref(null);

const projectImage = (project) => {
  const image = project?.imageSet?.[0];
  if (typeof image === 'string') return image;
  if (image && typeof image === 'object')
    return image.src || image.image || project?.image || '';
  return typeof project?.image === 'string'
    ? project.image
    : project?.image?.src || '';
};

const projectImageAlt = (project) => {
  const image = project?.imageSet?.[0];
  return (
    (typeof image === 'object' && image?.alt) ||
    project?.imageAlt ||
    project?.name ||
    ''
  );
};

const technologyTags = (project) => {
  const technology = project?.technology;
  const values = Array.isArray(technology)
    ? technology
    : String(technology || '').split(',');
  return values.map((tag) => String(tag).trim()).filter(Boolean);
};

const openProject = (project, event) =>
  projectModal.value?.open(project, event);
</script>

<template>
  <section class="home-section section-selected-work" data-scroll-scene>
    <div class="section-intro section-intro--work">
      <p class="section-eyebrow">Selected work</p>
      <h2>A few things I’ve built.</h2>
      <p>A small selection of recent work from the portfolio.</p>
    </div>
    <div v-if="projects.length" class="selected-work-showcase">
      <div class="selected-work-grid">
        <article
          v-for="project in projects.slice(0, 3)"
          :key="project.id || project.name"
          class="project-preview"
        >
          <button
            type="button"
            class="project-preview__link"
            aria-haspopup="dialog"
            :aria-label="`View case study: ${project.name}`"
            @click="openProject(project, $event)"
          >
            <div class="project-preview__media">
              <img
                v-if="projectImage(project)"
                :src="projectImage(project)"
                :alt="projectImageAlt(project)"
                loading="lazy"
                decoding="async"
              />
              <div v-else class="project-preview__empty" aria-hidden="true">
                Preview unavailable
              </div>
              <span v-if="project.category" class="project-preview__type">{{
                project.category
              }}</span>
            </div>
            <div class="project-preview__content">
              <div class="project-preview__meta">
                <div>
                  <h3>{{ project.name }}</h3>
                  <p>{{ project.category }}</p>
                </div>
                <span class="project-preview__open" aria-hidden="true">+</span>
              </div>
              <p class="project-preview__description">
                {{ project.description }}
              </p>
              <ul
                v-if="technologyTags(project).length"
                class="project-preview__technologies"
                aria-label="Project technologies"
              >
                <li
                  v-for="tag in technologyTags(project).slice(0, 2)"
                  :key="tag"
                >
                  {{ tag }}
                </li>
                <li
                  v-if="technologyTags(project).length > 2"
                  class="project-preview__technology-more"
                >
                  +{{ technologyTags(project).length - 2 }}
                </li>
              </ul>
            </div>
          </button>
        </article>
      </div>
      <router-link class="text-link selected-work__all" to="/portfolio">
        View all projects <span aria-hidden="true">↗</span>
      </router-link>
    </div>
    <p v-else class="section-empty">Portfolio projects are loading.</p>
    <PortfolioProjectModal ref="projectModal" :image-base="imageBase" />
  </section>
</template>
