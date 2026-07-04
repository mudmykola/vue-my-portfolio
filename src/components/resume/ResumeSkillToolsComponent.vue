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
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  padding: 0.8rem;
}

.resume-skill-group h3 {
  margin: 0 0 0.6rem;
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--app-text-soft);
}

.resume-tools-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.resume-tools-list li {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.06);
  color: var(--app-text);
  padding: 0.28rem 0.6rem;
  font-size: 0.76rem;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;
}

.resume-tools-list li:hover {
  border-color: rgba(73, 220, 177, 0.4);
  background: rgba(73, 220, 177, 0.08);
}
</style>
