<script setup>
defineProps({
  projects: { type: Array, default: () => [] },
});
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
          <router-link class="project-preview__link" to="/portfolio">
            <div class="project-preview__media">
              <img
                :src="project.imageSet?.[0] || project.image"
                :alt="project.name"
                loading="lazy"
              />
            </div>
            <div class="project-preview__content">
              <div class="project-preview__meta">
                <div>
                  <h3>{{ project.name }}</h3>
                  <p>{{ project.category }}</p>
                </div>
                <span aria-hidden="true">↗</span>
              </div>
              <p class="project-preview__description">
                {{ project.description }}
              </p>
            </div>
          </router-link>
        </article>
      </div>
      <router-link class="text-link selected-work__all" to="/portfolio">
        View all projects <span aria-hidden="true">↗</span>
      </router-link>
    </div>
    <p v-else class="section-empty">Portfolio projects are loading.</p>
  </section>
</template>
