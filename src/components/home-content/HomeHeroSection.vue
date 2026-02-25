<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  hero: { type: Object, required: true },
  fullName: { type: String, required: true },
  title: { type: String, required: true },
  transitioning: { type: Boolean, default: false },
  toolkit: { type: Array, default: () => [] },
  primaryToolkit: { type: Array, default: () => [] },
});

const showAllToolkit = ref(false);

const secondaryToolkit = computed(() =>
  props.toolkit.filter((pill) => !props.primaryToolkit.includes(pill))
);

const hasSecondaryToolkit = computed(() => secondaryToolkit.value.length > 0);

const toggleToolkit = () => {
  showAllToolkit.value = !showAllToolkit.value;
};
</script>

<template>
  <section class="home-hero">
    <div class="hero-noise"></div>
    <div class="hero-glow hero-glow--one"></div>
    <div class="hero-glow hero-glow--two"></div>

    <div class="hero-shell">
      <div class="hero-grid">
        <div class="hero-copy">
          <p class="hero-kicker">{{ hero.kicker }}</p>
          <h1 class="hero-name">{{ fullName }}</h1>
          <h2
            :class="{ 'fade-out': transitioning, 'fade-in': !transitioning }"
            class="hero-title"
          >
            {{ title }}
          </h2>
          <p class="hero-description">{{ hero.description }}</p>

          <div class="hero-cta">
            <router-link class="app-btn app-btn--primary" to="/portfolio">
              {{ hero.portfolioCtaLabel }}
            </router-link>
            <router-link class="app-btn app-btn--ghost" to="/contact">
              {{ hero.contactCtaLabel }}
            </router-link>
          </div>
        </div>

        <div class="hero-panel">
          <div class="hero-panel__head">
            <p class="hero-panel__title">{{ hero.toolkitTitle }}</p>
            <span class="hero-panel__count">
              {{ toolkit.length }} {{ hero.toolkitCountSuffix }}
            </span>
          </div>

          <ul class="hero-pills hero-pills--primary">
            <li v-for="pill in primaryToolkit" :key="pill">
              {{ pill }}
            </li>
          </ul>

          <button
            v-if="hasSecondaryToolkit"
            type="button"
            class="hero-panel__toggle"
            :aria-expanded="showAllToolkit"
            @click="toggleToolkit"
          >
            {{ showAllToolkit ? 'Hide technologies' : 'Show all technologies' }}
          </button>

          <ul v-if="showAllToolkit" class="hero-pills hero-pills--all">
            <li v-for="pill in secondaryToolkit" :key="`all-${pill}`">
              {{ pill }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
