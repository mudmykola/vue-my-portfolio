<script setup>
import NavigationComponent from '@/components/navigation/NavigationComponent.vue';
import MobileMenu from '@/components/navigation/MobileMenu.vue';
import PageScrollMotion from '@/components/shared/PageScrollMotion.vue';
import SiteFooter from '@/components/shared/SiteFooter.vue';
</script>

<template>
  <div id="page-top" class="app-shell wrapper flex flex-col">
    <PageScrollMotion />
    <MobileMenu />

    <header class="app-header">
      <NavigationComponent />
    </header>

    <main class="main app-main">
      <div class="app-content">
        <slot />
      </div>
    </main>

    <SiteFooter />
  </div>
</template>

<style lang="scss">
@import 'style.scss';
</style>
