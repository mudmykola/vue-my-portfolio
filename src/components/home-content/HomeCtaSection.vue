<script setup>
defineProps({
  cta: { type: Object, required: true },
});
</script>

<template>
  <section class="home-section section-cta">
    <div class="cta-card">
      <p class="section-eyebrow">{{ cta.eyebrow }}</p>
      <h3>{{ cta.title }}</h3>
      <p>{{ cta.description }}</p>
      <div class="hero-cta">
        <router-link class="app-btn app-btn--primary" to="/contact">
          {{ cta.primaryLabel }}
        </router-link>
        <router-link class="app-btn app-btn--ghost" to="/resume">
          {{ cta.secondaryLabel }}
        </router-link>
      </div>
    </div>
  </section>
</template>
