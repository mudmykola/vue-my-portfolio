<script setup>
import {
  faCube,
  faGaugeHigh,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';

defineProps({
  values: { type: Object, required: true },
  about: { type: Object, required: true },
  technologies: { type: Array, default: () => [] },
});

const principleIcons = [faLayerGroup, faGaugeHigh, faCube];
</script>

<template>
  <section
    id="section-about"
    class="home-section section-about"
    data-scroll-scene
  >
    <div class="about-preview">
      <img
        v-if="about.avatar?.image"
        class="about-preview__image"
        :src="about.avatar.image"
        :alt="about.avatar.alt || 'Portrait of Mykola Mud'"
      />
      <div class="about-preview__copy">
        <p class="section-eyebrow">About me</p>
        <h2>{{ about.title }}</h2>
        <p>{{ about.description }}</p>
        <router-link class="text-link" to="/about"
          >More about my work <span aria-hidden="true">↗</span></router-link
        >
        <ul
          v-if="technologies.length"
          class="about-preview__technologies"
          aria-label="Core technologies"
        >
          <li v-for="technology in technologies" :key="technology">
            {{ technology }}
          </li>
        </ul>
      </div>
      <div class="about-preview__values">
        <article
          v-for="(item, index) in values.cards"
          :key="item.title"
          class="principle-item"
        >
          <span class="principle-item__icon" aria-hidden="true">
            <font-awesome-icon :icon="principleIcons[index] || faCube" />
          </span>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
