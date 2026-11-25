<script setup>
defineProps({
  workflow: { type: Object, required: true },
});
</script>

<template>
  <section class="home-section section-workflow">
    <div class="section-intro">
      <p class="section-eyebrow">{{ workflow.eyebrow }}</p>
      <h2>{{ workflow.title }}</h2>
    </div>
    <div class="workflow-grid">
      <article
        v-for="item in workflow.items"
        :key="item.step"
        class="workflow-card"
      >
        <span class="workflow-step">{{ item.step }}</span>
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
      </article>
    </div>
  </section>
</template>
