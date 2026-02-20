<script setup>
const props = defineProps({
  title: String,
  items: Array,
});
</script>

<template>
  <section class="resume-skill-group">
    <h3>{{ props.title }}</h3>

    <ul class="resume-skill-list">
      <li v-for="item in props.items" :key="item.name" class="resume-skill-list__item">
        <div class="resume-skill-list__head">
          <span>{{ item.name }}</span>
          <strong v-if="typeof item.progress === 'number'">{{ item.progress }}%</strong>
        </div>

        <div v-if="typeof item.progress === 'number'" class="resume-skill-list__bar">
          <span :style="{ width: `${item.progress}%` }"></span>
        </div>
      </li>
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

.resume-skill-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.4rem;
}

.resume-skill-list__item {
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  padding: 0.34rem 0.45rem;
}

.resume-skill-list__head {
  display: flex;
  justify-content: space-between;
  gap: 0.35rem;
  font-size: 0.76rem;
}

.resume-skill-list__head span {
  color: var(--app-text-soft);
}

.resume-skill-list__head strong {
  color: #d6ffef;
  font-size: 0.68rem;
}

.resume-skill-list__bar {
  margin-top: 0.26rem;
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.09);
  overflow: hidden;
}

.resume-skill-list__bar span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #49dcb1, #f3c056);
}

@media (max-width: 640px) {
  .resume-skill-list {
    grid-template-columns: 1fr;
  }
}
</style>
