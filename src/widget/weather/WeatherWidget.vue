<template>
  <div class="weather flex items-center p-[10px] rounded-[10px]" v-if="!loading && weatherIconUrl">

    <div class="weather-info flex items-center text-[16px]">
      <div class="weather-icon mr-[10px]">
        <img :src="weatherIconUrl" :alt="weatherDescription">
      </div>
      <p class="city  text-4xl font-bold text-default">{{ city }}</p>
      <p class="temperature text-[24px] font-bold text-default ml-5">{{ temperature.toFixed(0) }}°C</p>
      <button @click="chooseLocation">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#feffff" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
      </button>
    </div>
    <div>

    </div>
  </div>
  <div class="text-default" v-else>
    Loading...
  </div>
</template>

<script setup>
import { temperature, weatherDescription, weatherIconUrl, city, fetchWeatherData, chooseLocation } from './weatherData.js';
import { ref, onMounted } from 'vue';

const loading = ref(true);

onMounted(() => {
  fetchWeatherData().then(() => {
    loading.value = false;
  });
});
</script>

<style scoped>
button {
  background-color: transparent;
  border: none;
}

button svg {
  display: flex;
  align-items: center;
  width: 20px;
  height: 20px;
  margin-left: 20px;
}
</style>