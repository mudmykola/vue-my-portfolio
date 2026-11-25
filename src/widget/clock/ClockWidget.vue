<template>
  <div class="clock-widget" aria-label="Current time and date">
    <div class="clock-time">{{ currentTime }}</div>
    <div class="clock-meta">
      <div class="clock-date">{{ currentDate }}</div>
      <font-awesome-icon :icon="dayNightIcon" class="clock-icon" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import {
  currentTime,
  currentDate,
  dayNightIcon,
  updateClock,
} from './clockData.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

let intervalId;

onMounted(() => {
  intervalId = window.setInterval(updateClock, 1000);
});

onUnmounted(() => {
  window.clearInterval(intervalId);
});
</script>

<style lang="scss" scoped>
@import 'style.scss';
</style>
