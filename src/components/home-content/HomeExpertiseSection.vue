<script setup>
defineProps({
  toolkit: { type: Array, default: () => [] },
});
</script>

<template>
  <section class="home-section section-expertise">
    <div class="section-intro">
      <p class="section-eyebrow">Expertise</p>
      <h2>Front-end engineering for modern commerce and web products.</h2>
    </div>
    <div class="expertise-content">
      <div class="expertise-content__tools" aria-label="Technology stack">
        <span v-for="item in toolkit.slice(0, 6)" :key="item" class="tech-item">
          {{ item }}
        </span>
      </div>
      <p>
        I build and improve Shopify storefronts, develop custom features, solve
        performance issues, and create maintainable interfaces with Vue and
        Nuxt.
      </p>
    </div>
  </section>
</template>
