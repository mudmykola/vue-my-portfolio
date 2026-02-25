<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAudioStore } from '@/stores/switchingSound.js';
import { firstName, lastName, menuItems } from './navigationData.js';
import { useSiteContent } from '@/composables/useSiteContent.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ClockWidget from '@/widget/clock/ClockWidget.vue';
import WeatherWidget from '@/widget/weather/WeatherWidget.vue';

const route = useRoute();
const audioStore = useAudioStore();
const { data, load } = useSiteContent();

const avatar = computed(() => data.value?.avatars?.[0] ?? null);
const avatarUrl = computed(() => avatar.value?.image || '');
const avatarAlt = computed(() => avatar.value?.alt || 'avatar');

const isCurrentRoute = (link) => route.path === link;

const playNavSound = () => {
  audioStore.playSound();
};

onMounted(() => {
  load();
  audioStore.fetchSound();
});
</script>

<template>
  <div class="header-nav">
    <router-link class="brand" to="/" @click="playNavSound">
      <img :src="avatarUrl" :alt="avatarAlt" class="brand__avatar" />
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
            @click="playNavSound"
          >
            <font-awesome-icon :icon="item.icon" class="header-link__icon" />
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="header-nav__meta">
      <ClockWidget />
      <WeatherWidget />
    </div>
  </div>
</template>

<style lang="scss">
@import 'style.scss';
</style>
