<script setup>
const props = defineProps({
  avatar: {
    type: Object,
    default: () => ({}),
  },
  title: {
    type: String,
    default: '',
  },
  descriptions: {
    type: Array,
    default: () => [],
  },
});

const rotateImage = (event) => {
  const image = event.target;
  const { width, height, left, top } = image.getBoundingClientRect();
  const x = (event.clientX - left) / width - 0.5;
  const y = (event.clientY - top) / height - 0.5;
  image.style.transform = `rotateX(${y * 8}deg) rotateY(${x * -8}deg)`;
};
</script>

<template>
  <article class="about-intro-card">
    <div class="about-intro-card__avatar" @mousemove="rotateImage">
      <img
        width="300"
        height="300"
        :src="props.avatar.image"
        :alt="props.avatar.alt"
      />
    </div>

    <div class="about-intro-card__content">
      <h3>{{ props.title }}</h3>
      <p v-for="(item, index) in props.descriptions" :key="index">
        {{ item }}
      </p>
    </div>
  </article>
</template>

<style scoped lang="scss">
.about-intro-card {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1rem;
  align-items: start;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  padding: 1rem;
}

.about-intro-card__avatar {
  perspective: 900px;

  img {
    width: 100%;
    max-width: 280px;
    height: auto;
    border-radius: 14px;
    transition: transform 0.4s ease;
    border: 1px solid rgba(255, 255, 255, 0.14);
  }
}

.about-intro-card__content h3 {
  margin: 0 0 0.65rem;
  font-size: 1.2rem;
}

.about-intro-card__content p {
  margin: 0 0 0.65rem;
  color: var(--app-text-soft);
  line-height: 1.6;
}

@media (max-width: 980px) {
  .about-intro-card {
    grid-template-columns: 1fr;
  }

  .about-intro-card__avatar img {
    max-width: 240px;
    margin: 0 auto;
    display: block;
  }
}

</style>
