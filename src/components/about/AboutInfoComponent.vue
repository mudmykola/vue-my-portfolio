<script setup>
import { computed, ref } from 'vue';

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

const isExpanded = ref(false);
const collapseParagraphLimit = 1;

const displayedDescriptions = computed(() =>
  isExpanded.value
    ? props.descriptions
    : props.descriptions.slice(0, collapseParagraphLimit)
);

const canToggle = computed(
  () =>
    props.descriptions.length > collapseParagraphLimit ||
    String(props.descriptions?.[0] || '').length > 220
);

const toggleContent = () => {
  isExpanded.value = !isExpanded.value;
};

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

    <div
      class="about-intro-card__content"
      :class="{ 'about-intro-card__content--expanded': isExpanded }"
    >
      <h3>{{ props.title }}</h3>
      <p
        v-for="(item, index) in displayedDescriptions"
        :key="`${index}-${item.slice(0, 16)}`"
        :class="{
          'about-intro-card__text--clamped':
            !isExpanded && index === 0 && canToggle,
        }"
      >
        {{ item }}
      </p>

      <button
        v-if="canToggle"
        type="button"
        class="about-intro-card__toggle"
        :aria-expanded="String(isExpanded)"
        @click="toggleContent"
      >
        {{ isExpanded ? 'Show less' : 'Read more' }}
      </button>
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

.about-intro-card__text--clamped {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.about-intro-card__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.15rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  color: var(--app-text);
  border-radius: 999px;
  padding: 0.45rem 0.8rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.about-intro-card__toggle:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
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
