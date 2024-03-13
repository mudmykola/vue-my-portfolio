<template>
  <div class="wrapper h-screen flex flex-col">
    <div class="flex h-screen">
      <div class="navigation w-[150px]  h-full bg-c103 text-default">
        <NavigationComponent/>
      </div>
      <main class="main flex-grow overflow-hidden">
        <slot/>
      </main>
    </div>
  </div>
</template>

<script setup>
import NavigationComponent from "@/components/navigation/NavigationComponent.vue";
</script>

<style>
.wrapper {
  min-height: 100vh;
}

.navigation {
  flex-shrink: 0;
}
.main {
  overflow-y: auto;
  background-image: url("src/assets/images/bg.webp");
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
}
</style>