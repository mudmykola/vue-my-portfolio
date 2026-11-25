<script setup>
import DecorativeAccent from '@/components/shared/DecorativeAccent.vue';

defineProps({
  cta: { type: Object, required: true },
});
</script>

<template>
  <section class="home-section section-cta">
    <DecorativeAccent kind="waves" />
    <div class="cta-card">
      <p class="section-eyebrow">{{ cta.eyebrow }}</p>
      <h2>{{ cta.title }}</h2>
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
