<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps( ({
  title: String
}))

const facts = ref([
  { title: 'Happy Clients', value: 1024, image: 'src/assets/images/heppy-customer.png' },
  { title: 'Working Hours', value: 7400, image: 'src/assets/images/hours.png' },
  { title: 'Awards Won', value: 10, image: 'src/assets/images/award.png' },
  { title: 'Coffee Consumed', value: 52400, image: 'src/assets/images/cofee.png' }
]);

const updateFacts = () => {
  facts.value.forEach(fact => {
    fact.value += 1;
  });
};

const scaleUp = (fact) => {
  fact.scale = 1.1;
};

const scaleDown = (fact) => {
  fact.scale = 1;
};

watchEffect(() => {
  const intervalId = setInterval(updateFacts, 5000);
  return () => clearInterval(intervalId);
});
</script>

<template>
  <div class="fun services mt-10">
    <div class="services-title fun-title text-2xl font-bold">
      <h2>{{ title }}</h2>
    </div>
    <div class="fun-inner mt-5">
      <ul class="flex items-center justify-between">
        <li class="rounded px-4 py-4 text-center w-[285px]"  v-for="(fact, index) in facts" :key="index">
          <img class="mx-auto" width="100" height="100" :src="fact.image" :alt="fact.title">
          <h2 class="text-2xl font-medium">{{ fact.title }}</h2>
          <p class="text-[20px] font-light">{{ fact.value.toLocaleString() }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "style";
</style>