<script setup>
import NavigationComponent from '@/components/navigation/NavigationComponent.vue';
import ClockWidget from '@/widget/clock/ClockWidget.vue';
import WeatherWidget from '@/widget/weather/WeatherWidget.vue';
import MobileMenu from '@/components/navigation/MobileMenu.vue';
</script>

<template>
  <div class="wrapper h-screen flex flex-col">
    <div class="flex h-screen">
      <MobileMenu />
      <div class="navigation w-[150px] h-full bg-c103 text-default">
        <NavigationComponent />
      </div>
      <main class="main flex-grow overflow-hidden">
        <div
          class="main-widget flex flex-col items-center absolute right-0 px-4 py-4"
        >
          <ClockWidget />
          <WeatherWidget />
        </div>
        <slot />
      </main>
    </div>
  </div>
</template>

<style lang="scss">
@import 'style.scss';
</style>
