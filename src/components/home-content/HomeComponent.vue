<script setup>
import { fullName, title, transitioning } from './homeData.js';
</script>

<template>
  <div class="home flex justify-center items-center h-screen bg-gray-100">
    <div class="home-box relative rounded-lg p-8 shadow-md w-96 animate__animated animate__backInRight">
      <div class="absolute inset-0 bg-black opacity-25"></div>
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-4 text-c100">{{ fullName }}</h1>
        <h2 :class="{ 'fade-out': transitioning, 'fade-in': !transitioning }" class="text-xl font-medium">{{ title }}</h2>
      </div>
    </div>
  </div>
</template>

<style>
@import "style.css";
@import "animate.css";
</style>