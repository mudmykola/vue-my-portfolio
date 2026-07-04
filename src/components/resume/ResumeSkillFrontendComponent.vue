<script setup>
const props = defineProps({
  title: String,
  items: Array,
})
</script>

<template>
  <section class="resume-skill-group">
    <h3>{{ props.title }}</h3>

    <ul class="resume-skill-list">
      <li
        v-for="item in props.items"
        :key="item.name"
        class="resume-skill-list__item"
      >
        {{ item.name }}
      </li>
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
  margin: 0 0 0.7rem;
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--app-text-soft);
}

.resume-skill-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.resume-skill-list__item {
  padding: 0.42rem 0.65rem;
  border-radius: 999px;
  color: var(--app-text);
  font-size: 0.82rem;
  font-weight: 600;
  line-height: 1;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
