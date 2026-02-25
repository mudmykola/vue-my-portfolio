<script setup>
import { computed, ref } from 'vue';
import GameCrosswordComponent from '@/components/game/GameCrosswordComponent.vue';

const gameSeoTitle = ref('Game | Interactive UI Demo and Portfolio Experiment');
const gameVisibleTitle = ref('Game');
const gameSubTitleItem = ref('Stop and have a rest');
const gameHiddenTitleSuffix = computed(() => {
  const fullTitle = gameSeoTitle.value.trim();
  const visibleTitle = gameVisibleTitle.value.trim();

  if (!fullTitle || !visibleTitle || fullTitle === visibleTitle) return '';

  if (fullTitle.toLowerCase().startsWith(visibleTitle.toLowerCase())) {
    return fullTitle.slice(visibleTitle.length).trim();
  }

  return '';
});
</script>

<template>
  <div
    class="game container-centered"
  >
    <div class="game-box">
      <div class="game-title flex flex-col items-center mb-6">
        <span class="page-badge mb-3">Interactive</span>
        <div class="game-title__box flex flex-col items-center">
          <h1 class="text-4xl md:text-6xl font-bold tracking-tight">
            {{ gameVisibleTitle }}
            <span v-if="gameHiddenTitleSuffix" class="game-title__seo-hidden">
              {{ ` ${gameHiddenTitleSuffix}` }}
            </span>
          </h1>
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

.game-title__seo-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
