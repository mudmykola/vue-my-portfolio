<script setup>
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import BlogItemComponent from '@/components/blog/BlogItemComponent.vue';
import PageSectionHeader from '@/components/shared/PageSectionHeader.vue';
</script>

<template>
  <section class="blog-page container-centered">
    <div class="blog-layout">
      <PageSectionHeader
        badge="Insights"
        :icon="faNewspaper"
        heading-tag="h1"
        visible-title="Blog"
        title=" | Front-End Engineering Notes and Articles"
        subtitle="Structured notes, case studies, and practical front-end updates"
      />

      <section class="blog-layout__list">
        <BlogItemComponent />
      </section>
    </div>
  </section>
</template>

<style lang="scss">
@import 'style';
</style>
