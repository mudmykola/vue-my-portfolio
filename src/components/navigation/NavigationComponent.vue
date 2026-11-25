<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAudioStore } from '@/stores/switchingSound.js';
import { firstName, lastName, menuItems } from './navigationData.js';

const route = useRoute();
const audioStore = useAudioStore();
const isCurrentRoute = (link) => route.path === link;

const playNavSound = () => {
  audioStore.playSound();
};

onMounted(() => {
  audioStore.fetchSound();
});
</script>

<template>
  <div class="header-nav">
    <router-link class="brand" to="/" @click="playNavSound">
      <span class="brand__mark" aria-hidden="true">M</span>
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
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss">
@import 'style.scss';
</style>
