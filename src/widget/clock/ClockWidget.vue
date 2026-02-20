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
import { currentTime, currentDate, dayNightIcon } from './clockData.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<style lang="scss" scoped>
@import 'style.scss';
</style>
