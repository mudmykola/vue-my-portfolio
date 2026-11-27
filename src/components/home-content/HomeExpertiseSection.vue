<script setup>
import { computed } from 'vue';
import { getTechnologyIcon } from '@/utils/technologyIcons.js';

const props = defineProps({
  toolkit: { type: Array, default: () => [] },
});

const groups = computed(() => {
  const categories = [
    {
      title: 'Core Front-end',
      match:
        /^(JavaScript|TypeScript|Vue\s|Nuxt\s|Composition API|Pinia|Vue Router)/i,
    },
    {
      title: 'Shopify',
      match:
        /^(Shopify Liquid|Online Store 2\.0|Storefront API|Admin API(?: \([^)]*\))?|Checkout Extensibility|Metafields|Theme App Extensions)$/i,
    },
    {
      title: 'Quality & Integrations',
      match:
        /^(HTML5 \/ CSS3|SCSS|Tailwind CSS|SSR|REST \/ GraphQL|WebSockets|Unit & E2E Testing)$/i,
    },
  ];

  return categories
    .map(({ title, match }) => ({
      title,
      technologies: props.toolkit
        .filter((technology) => match.test(technology))
        .map((label) => ({ label, ...getTechnologyIcon(label) })),
    }))
    .filter(({ technologies }) => technologies.length);
});
</script>

<template>
  <section class="home-section section-expertise">
    <div class="section-intro">
      <p class="section-eyebrow">Expertise</p>
      <h2>Front-end engineering for Shopify and modern web products.</h2>
      <p class="expertise-intro__description">
        From custom Shopify themes to Vue/Nuxt applications, I build performant
        interfaces with reliable integrations and maintainable code.
      </p>
    </div>
    <div class="expertise-groups" aria-label="Technical expertise">
      <section
        v-for="group in groups"
        :key="group.title"
        class="expertise-group"
        :aria-label="group.title"
      >
        <h3 class="expertise-group__title">{{ group.title }}</h3>
        <ul class="expertise-group__list">
          <li
            v-for="technology in group.technologies"
            :key="technology.label"
            :aria-label="technology.label"
            :title="technology.label"
          >
            <span
              v-if="technology.mark"
              class="expertise-group__mark"
              :style="{ '--mark-color': technology.color }"
              aria-hidden="true"
            >
              {{ technology.mark }}
            </span>
            <img
              v-else-if="technology.asset"
              :src="technology.asset"
              alt=""
              aria-hidden="true"
            />
            <font-awesome-icon
              v-else
              :icon="technology.icon"
              :style="{ color: technology.color }"
              aria-hidden="true"
            />
            <span class="expertise-group__name">{{ technology.label }}</span>
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>
