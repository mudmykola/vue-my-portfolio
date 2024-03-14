<template>
  <div class="clock-widget">
    <div class="clock">
      <div class="clock-time">{{ currentTime }}</div>
    </div>
    <div class="clock-widget__icon flex items-center">
      <div class="clock-date">{{ currentDate }}</div>
      <font-awesome-icon :icon="dayNightIcon" />
    </div>
  </div>
</template>

<script setup>
import { currentTime, currentDate, dayNightIcon, updateClock } from './clockData.js';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<style lang="scss" scoped>
@import "style.scss";
</style>