<script setup>
const props = defineProps({
  title: String,
  items: Array,
});
</script>

<template>
  <section class="resume-skill-group">
    <h3>{{ props.title }}</h3>

    <ul class="resume-tools-list">
      <li v-for="item in props.items" :key="item.name">{{ item.name }}</li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.resume-skill-group {
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.03);
  padding: 0.58rem;
}

.resume-skill-group h3 {
  margin: 0 0 0.45rem;
  font-size: 0.9rem;
}

.resume-tools-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.resume-tools-list li {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.05);
  color: var(--app-text-soft);
  padding: 0.2rem 0.48rem;
  font-size: 0.7rem;
}
</style>
