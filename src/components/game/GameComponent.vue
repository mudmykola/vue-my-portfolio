<script setup>
import { ref } from 'vue';
import GameCrosswordComponent from '@/components/game/GameCrosswordComponent.vue';

const gameTitle = ref('Game');
const gameSubTitleItem = ref('Stop and have a rest');
</script>

<template>
  <div
    class="game container-centered"
  >
    <div class="game-box">
      <div class="game-title flex flex-col items-center mb-6">
        <span class="page-badge mb-3">Interactive</span>
        <div class="game-title__box flex flex-col items-center">
          <h1 class="text-4xl md:text-6xl font-bold tracking-tight">{{ gameTitle }}</h1>
          <div class="game-subtitle flex text-center justify-center w-fit">
            <p class="text-[15px]">{{ gameSubTitleItem }}</p>
          </div>
        </div>
      </div>
      <div class="game-item">
        <GameCrosswordComponent />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import 'style';
</style>
