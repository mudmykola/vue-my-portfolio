<script setup>
import { ref } from 'vue';
import ContactFormComponent from '@/components/contact/ContactFormComponent.vue';

const contactTitle = ref('Contact Me');

const contactSubTitleItem = ref([{ id: 1, text: ' Get in Touch' }]);
</script>

<template>
  <div
    class="contact-box top-[11%] left-[12%] container-centered animate__animated animate__backInDown"
  >
    <div class="contact text-default">
      <div class="contact-title flex flex-col items-center">
        <div class="contact-title__box flex flex-col items-end">
          <h1 class="text-6xl font-bold">{{ contactTitle }}</h1>
          <div class="contact-subtitle flex text-center justify-center w-fit">
            <p
              class="text-[15px]"
              v-for="item in contactSubTitleItem"
              :key="item.id"
            >
              {{ item.text }}
            </p>
          </div>
        </div>
      </div>
      <div class="contact-form flex justify-between mt-7">
        <ContactFormComponent />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'animate.css';
@import 'style';
</style>
