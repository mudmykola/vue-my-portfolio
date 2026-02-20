<script setup>
import {
  temperature,
  weatherDescription,
  weatherIconUrl,
  weatherError,
  city,
  fetchWeatherData,
  chooseLocation,
} from './weatherData.js';
import { ref, onMounted } from 'vue';

const loading = ref(true);

onMounted(() => {
  fetchWeatherData().then(() => {
    loading.value = false;
  });
});
</script>

<template>
  <div class="weather-pill" v-if="!loading && weatherIconUrl">
    <img class="weather-pill__icon" :src="weatherIconUrl" :alt="weatherDescription" />
    <span class="weather-pill__city">{{ city }}</span>
    <strong class="weather-pill__temp">{{ temperature.toFixed(0) }}&deg;C</strong>
    <button class="weather-pill__action" type="button" @click="chooseLocation" aria-label="Choose city">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path
          fill="currentColor"
          d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
        />
      </svg>
    </button>
  </div>
  <div class="weather-pill weather-pill--status" v-else-if="loading">Weather...</div>
  <div class="weather-pill weather-pill--status" v-else-if="weatherError">{{ weatherError }}</div>
</template>

<style scoped>
.weather-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-width: 138px;
  padding: 0.34rem 0.58rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.06);
  color: #f5f8ff;
  font-family: 'Manrope', 'Inter', sans-serif;
  font-size: 0.76rem;
}

.weather-pill__icon {
  width: 18px;
  height: 18px;
}

.weather-pill__city {
  color: rgba(245, 248, 255, 0.82);
}

.weather-pill__temp {
  font-size: 0.82rem;
  color: #f9fdff;
  font-variant-numeric: tabular-nums;
  min-width: 46px;
  text-align: right;
}

.weather-pill__action {
  background: transparent;
  border: none;
  color: rgba(245, 248, 255, 0.75);
  width: 18px;
  height: 18px;
  padding: 0;
  cursor: pointer;
}

.weather-pill__action svg {
  width: 18px;
  height: 18px;
}

.weather-pill--status {
  font-size: 0.72rem;
  color: rgba(245, 248, 255, 0.82);
}

@media (max-width: 640px) {
  .weather-pill__city {
    display: none;
  }
}
</style>
