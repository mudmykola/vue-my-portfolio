<script setup>
import { onMounted } from 'vue';
import { useAudioStore } from '@/stores/switchingSound.js';
import { useRouter } from 'vue-router';
import {
  firstName,
  lastName,
  menuItems,
  isCurrentRoute,
} from './navigationData.js';
import { avatarUrl, avatarAlt, fetchAvatar } from './navigationAvatarLogic.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const router = useRouter();
const audioStore = useAudioStore();

const handleItemClick = (item) => {
  audioStore.playSound();
  router.push(item.link);
};

onMounted(() => {
  fetchAvatar();
  audioStore.fetchSound();
});
</script>

<template>
  <div
    class="navigation-panel flex flex-col items-center py-8 px-2 bg-gray-900 text-white"
  >
    <div class="navigation-panel__avatar mb-8">
      <img :src="avatarUrl" :alt="avatarAlt" class="rounded w-20 h-20 mb-2" />
      <div class="text-center">
        <p class="text-lg font-bold">{{ firstName }}</p>
        <p class="text-lg font-bold">{{ lastName }}</p>
      </div>
    </div>
    <nav>
      <ul class="space-y-1">
        <li
          v-for="item in menuItems"
          :key="item.id"
          @click="handleItemClick(item)"
        >
          <router-link
            :to="item.link"
            class="block w-full py-2 px-4 rounded-lg transition-all duration-300 ease-in-out"
            :class="{ 'bg-gray-700': isCurrentRoute(item.link) }"
          >
            <div class="flex items-center space-x-2">
              <font-awesome-icon :icon="item.icon" class="text-white" />
              <span>{{ item.name }}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss">
@import 'style.scss';
</style>
