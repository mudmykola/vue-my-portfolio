<template>
  <div class="m-auto w-full max-w-lg bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 relative">
    <form @submit.prevent="submitForm">
      <div class="mb-4 relative">
        <input v-model="fullName" class="input-field w-full" type="text" id="fullName" placeholder="Full Name">
        <p v-if="fullNameError" class="error-text">Please enter your full name.</p>
      </div>
      <div class="mb-4 relative">
        <input v-model="email" class="input-field w-full" type="email" id="email" placeholder="Email">
        <p v-if="emailError" class="error-text">Please enter a valid email address.</p>
      </div>
      <div class="mb-6 relative">
        <textarea v-model="message" class="input-field w-full" id="message" rows="4" placeholder="Message for me"></textarea>
        <p v-if="messageError" class="error-text">Please enter a message.</p>
      </div>
      <div class="flex justify-center">
        <button type="submit" class="btn-submit w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          <span v-if="sending">Sending...</span>
          <span v-else>Send</span>
        </button>
      </div>
    </form>

    <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center ">
      <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div class="bg-[#fff] p-6 rounded shadow-md z-10">
        <h2 class="text-xl font-bold mb-4 text-[#000]">{{ succesTitle }}</h2>
        <p class="text-[#000]">{{ succesDesc }}</p>
        <button @click="closePopup" class="text-[#fff] bg-[#000]  mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const fullName = ref('');
const email = ref('');
const message = ref('');
const showPopup = ref(false);
const fullNameError = ref(false);
const emailError = ref(false);
const messageError = ref(false);
const sending = ref(false);
const succesTitle = ref('Success!')
const succesDesc = ref('Your form has been submitted successfully.');

const submitForm = () => {
  fullNameError.value = !fullName.value;
  emailError.value = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  messageError.value = !message.value;

  if (!fullNameError.value && !emailError.value && !messageError.value && !sending.value) {
    sending.value = true;

    console.log('Full Name:', fullName.value);
    console.log('Email:', email.value);
    console.log('Message:', message.value);

    fullName.value = '';
    email.value = '';
    message.value = '';
    showPopup.value = true;
  }
};

const closePopup = () => {
  showPopup.value = false;
};
</script>

<style scoped>
@import "style.scss";
</style>