<script setup>
import NavigationComponent from '@/components/navigation/NavigationComponent.vue';
import MobileMenu from '@/components/navigation/MobileMenu.vue';
</script>

<template>
  <div class="app-shell wrapper flex flex-col">
    <MobileMenu />

    <header class="app-header">
      <NavigationComponent />
    </header>

    <main class="main app-main">
      <div class="app-content">
        <slot />
      </div>
    </main>
  </div>
</template>

<style lang="scss">
@import 'style.scss';
</style>
