<script setup>
import { computed, onMounted } from 'vue';
import { fullName, title, transitioning } from './homeData.js';
import { useSiteContent } from '@/composables/useSiteContent.js';

const { data, load } = useSiteContent();

const fallbackToolkit = [
  'HTML',
  'CSS',
  'JavaScript',
  'Vue.js',
  'Nuxt.js',
  'Pinia',
  'Vuex',
  'Tailwind CSS',
  'REST',
  'JSON',
  'Axios',
  'Fetch',
  'Node.js',
  'Vite',
  'Webpack',
  'Gulp',
  'NPM',
  'Yarn',
  'Shopify CLI',
  'Liquid (Shopify)',
  'Git',
  'Figma',
];

const frontendToolkit = computed(() =>
  (data.value?.resumePage?.frontendTechnologies ?? [])
    .map((item) => item?.name)
    .filter(Boolean)
);

const toolsToolkit = computed(() =>
  (data.value?.resumePage?.toolsTechnologies ?? [])
    .map((item) => item?.name)
    .filter(Boolean)
);

const toolkit = computed(() => {
  const merged = [...frontendToolkit.value, ...toolsToolkit.value];
  const unique = [...new Set(merged)];
  return unique.length ? unique : fallbackToolkit;
});

const primaryToolkit = computed(() => toolkit.value.slice(0, 8));

onMounted(load);

const valueCards = [
  {
    title: 'Product UX',
    text: 'Clear user flows, visual hierarchy, and interactions designed for retention.',
  },
  {
    title: 'Clean Architecture',
    text: 'Components and data layers structured for scale, not short-term hacks.',
  },
  {
    title: 'Fast Delivery',
    text: 'Reliable implementation with transparent progress and predictable timelines.',
  },
];

const workflow = [
  {
    step: '01',
    title: 'Discovery',
    text: 'I map business goals, user needs, and technical constraints before coding.',
  },
  {
    step: '02',
    title: 'Design & Build',
    text: 'UI systems, component architecture, and integrations are built in parallel.',
  },
  {
    step: '03',
    title: 'Refine & Ship',
    text: 'Final optimization, QA, and rollout with measurable performance improvements.',
  },
];
</script>

<template>
  <section class="home-page">
    <section class="home-hero">
      <div class="hero-noise"></div>
      <div class="hero-glow hero-glow--one"></div>
      <div class="hero-glow hero-glow--two"></div>

      <div class="hero-shell">
        <div class="hero-grid">
          <div class="hero-copy">
            <p class="hero-kicker">AVAILABLE FOR NEW PROJECTS</p>
            <h1 class="hero-name">{{ fullName }}</h1>
            <h2
              :class="{ 'fade-out': transitioning, 'fade-in': !transitioning }"
              class="hero-title"
            >
              {{ title }}
            </h2>
            <p class="hero-description">
              I build polished interfaces for real products with a strong focus on
              speed, maintainability, and user experience.
            </p>

            <div class="hero-cta">
              <router-link class="app-btn app-btn--primary" to="/portfolio">
                See Portfolio
              </router-link>
              <router-link class="app-btn app-btn--ghost" to="/contact">
                Contact Me
              </router-link>
            </div>
          </div>

          <div class="hero-panel">
            <div class="hero-panel__head">
              <p class="hero-panel__title">Core Toolkit</p>
              <span class="hero-panel__count">{{ toolkit.length }} technologies</span>
            </div>

            <ul class="hero-pills hero-pills--primary">
              <li v-for="pill in primaryToolkit" :key="pill">
                {{ pill }}
              </li>
            </ul>

            <ul class="hero-pills hero-pills--all">
              <li v-for="pill in toolkit" :key="`all-${pill}`">
                {{ pill }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="home-section section-values">
      <div class="section-head">
        <p class="section-eyebrow">What I Focus On</p>
        <h3>Practical Front-End that serves real business goals</h3>
      </div>
      <div class="value-grid">
        <article v-for="item in valueCards" :key="item.title" class="value-card">
          <h4>{{ item.title }}</h4>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="home-section section-workflow">
      <div class="section-head">
        <p class="section-eyebrow">How I Work</p>
        <h3>Simple process, clear milestones, no chaos</h3>
      </div>
      <div class="workflow-grid">
        <article v-for="item in workflow" :key="item.step" class="workflow-card">
          <span class="workflow-step">{{ item.step }}</span>
          <h4>{{ item.title }}</h4>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="home-section section-cta">
      <div class="cta-card">
        <p class="section-eyebrow">Ready To Start</p>
        <h3>Need a modern Vue/Nuxt interface for your product?</h3>
        <p>
          I can help you redesign, optimize, or build your next front-end feature set.
        </p>
        <div class="hero-cta">
          <router-link class="app-btn app-btn--primary" to="/contact">
            Start a Project
          </router-link>
          <router-link class="app-btn app-btn--ghost" to="/resume">
            View Resume
          </router-link>
        </div>
      </div>
    </section>
  </section>
</template>

<style lang="scss">
@import 'style.scss';
</style>
