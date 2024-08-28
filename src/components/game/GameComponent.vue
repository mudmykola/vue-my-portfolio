<script setup>
import {ref} from "vue";
import BlogItemComponent from "@/components/blog/BlogItemComponent.vue";
import GameCrosswordComponent from "@/components/game/GameCrosswordComponent.vue";

const gameTitle = ref('Game');
const gameSubTitleItem = ref('Stop and have a rest')
</script>

<template>
  <div class="game top-[11%] left-[12%] container-centered  animate__animated animate__backInUp">
    <div class="game-box">
      <div class="game-title  flex flex-col  items-center">
        <div class="game-title__box flex flex-col items-end">
          <h1 class="text-6xl  font-bold">{{ gameTitle }}</h1>
          <div class="game-subtitle flex text-center justify-center w-fit">
            <p class="text-[15px]">{{ gameSubTitleItem }}</p>
          </div>
        </div>
      </div>
      <div class="game-item">
<GameCrosswordComponent/>
      </div>
    </div>
  </div>
</template>

<style  lang="scss">
@import "animate.css";
@import "style";
</style>