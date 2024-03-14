<script setup>
import { avatarUrl, firstName, lastName, menuItems, isCurrentRoute } from './navigationData.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
  <div class="navigation-panel flex flex-col items-center py-8 px-2 bg-gray-900 text-white">
    <div class="mb-8">
      <img :src="avatarUrl" alt="Avatar" class="w-16 h-16 rounded-full mb-2">
      <div class="text-center">
        <p class="text-lg font-bold">{{ firstName }}</p>
        <p class="text-lg font-bold">{{ lastName }}</p>
      </div>
    </div>
    <nav>
      <ul class="space-y-1">
        <li v-for="item in menuItems" :key="item.id">
          <router-link :to="item.link" class="block w-full py-2 px-4 rounded-lg transition-all duration-300 ease-in-out"
                       :class="{ 'bg-gray-700': isCurrentRoute(item.link) }">
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

<style scoped>
@import "style.css";
</style>