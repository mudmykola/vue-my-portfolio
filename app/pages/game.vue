<script setup>
import GamePage from '@/views/game/GamePage.vue';
import { usePortfolioSeo } from '../composables/usePortfolioSeo.js';
import { routeSeo } from '../utils/routeSeo.js';

definePageMeta({ title: routeSeo.game.title });
usePortfolioSeo(routeSeo.game);
</script>

<template>
  <GamePage />
</template>
