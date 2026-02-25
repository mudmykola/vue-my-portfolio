<script setup>
defineProps({
  values: { type: Object, required: true },
});
</script>

<template>
  <section class="home-section section-values">
    <div class="section-head">
      <p class="section-eyebrow">{{ values.eyebrow }}</p>
      <h3>{{ values.title }}</h3>
    </div>
    <div class="value-grid">
      <article v-for="item in values.cards" :key="item.title" class="value-card">
        <h4>{{ item.title }}</h4>
        <p>{{ item.text }}</p>
      </article>
    </div>
  </section>
</template>
