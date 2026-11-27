<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { useAudioStore } from '@/stores/switchingSound.js';
import { firstName, lastName, menuItems } from './navigationData.js';
import { useSiteContent } from '@/composables/useSiteContent.js';

const route = useRoute();
const audioStore = useAudioStore();
const { data, load } = useSiteContent();
const isCurrentRoute = (link) => route.path === link;

const avatar = computed(() => data.value?.avatars?.[0] ?? null);
const socialLinks = computed(() => {
  const links = data.value?.aboutPage?.socialLinks ?? {};

  return [
    { label: 'GitHub', href: links.github, icon: faGithub },
    { label: 'LinkedIn', href: links.linkedin, icon: faLinkedin },
    { label: 'Instagram', href: links.instagram, icon: faInstagram },
  ].filter((item) => item.href);
});

const playNavSound = () => {
  audioStore.playSound();
};

onMounted(() => {
  audioStore.fetchSound();
  load();
});
</script>

<template>
  <div class="header-nav">
    <router-link class="brand" to="/" @click="playNavSound">
      <img
        v-if="avatar?.image"
        class="brand__avatar"
        :src="avatar.image"
        :alt="avatar.alt || `${firstName} ${lastName}`"
      />
      <span v-else class="brand__mark" aria-hidden="true">M</span>
      <div class="brand__text">
        <p>{{ firstName }} {{ lastName }}</p>
        <span>Front-End Engineer</span>
      </div>
    </router-link>

    <nav class="header-nav__menu" aria-label="Main navigation">
      <ul>
        <li v-for="item in menuItems" :key="item.id">
          <router-link
            :to="item.link"
            class="header-link"
            :class="{ 'header-link--active': isCurrentRoute(item.link) }"
            :aria-current="isCurrentRoute(item.link) ? 'page' : undefined"
            @click="playNavSound"
          >
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <div
      class="header-nav__socials"
      :aria-label="socialLinks.length ? 'Social links' : undefined"
      :aria-hidden="socialLinks.length ? undefined : 'true'"
    >
      <a
        v-for="social in socialLinks"
        :key="social.label"
        :href="social.href"
        class="social-link"
        :aria-label="social.label"
        target="_blank"
        rel="noreferrer"
      >
        <font-awesome-icon :icon="social.icon" aria-hidden="true" />
      </a>
    </div>
  </div>
</template>

<style lang="scss">
@import 'style.scss';
</style>
