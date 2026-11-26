<script setup>
import BlogItemComponent from '@/components/blog/BlogItemComponent.vue';
import SectionAtmosphere from '@/components/shared/SectionAtmosphere.vue';

defineProps({
  initialPosts: { type: Array, default: null },
});
</script>

<template>
  <section class="blog-page">
    <div class="blog-layout tech-atmosphere-host">
      <SectionAtmosphere variant="right" />
      <BlogItemComponent :initial-posts="initialPosts" />
    </div>

    <section class="blog-contact tech-atmosphere-host" data-scroll-scene>
      <SectionAtmosphere variant="left" />
      <div class="blog-contact__content">
        <p class="section-eyebrow">Get in touch</p>
        <h2>Enjoyed the read?</h2>
        <p>
          Have a topic you’d like me to write about or a question to discuss?
        </p>
        <router-link to="/contact" class="app-btn app-btn--primary">
          Contact Me <span aria-hidden="true">→</span>
        </router-link>
      </div>
    </section>
  </section>
</template>

<style lang="scss">
@import 'style';
</style>
