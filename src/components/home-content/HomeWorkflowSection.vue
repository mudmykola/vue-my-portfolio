<script setup>
defineProps({
  workflow: { type: Object, required: true },
});
</script>

<template>
  <section class="home-section section-workflow">
    <div class="section-head">
      <p class="section-eyebrow">{{ workflow.eyebrow }}</p>
      <h3>{{ workflow.title }}</h3>
    </div>
    <div class="workflow-grid">
      <article
        v-for="item in workflow.items"
        :key="item.step"
        class="workflow-card"
      >
        <span class="workflow-step">{{ item.step }}</span>
        <h4>{{ item.title }}</h4>
        <p>{{ item.text }}</p>
      </article>
    </div>
  </section>
</template>
