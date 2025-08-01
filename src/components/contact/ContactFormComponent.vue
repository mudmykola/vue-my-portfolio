<script setup>
import { ref } from 'vue';
import { sendTelegramMessage } from '@/services/telegramService';

const fullName = ref('');
const email = ref('');
const message = ref('');
const showPopup = ref(false);
const fullNameError = ref(false);
const emailError = ref(false);
const messageError = ref(false);
const sending = ref(false);
const successTitle = ref('Success!');
const successDesc = ref('Your message has been sent successfully.');
const isError = ref(false);

const submitForm = async () => {
  fullNameError.value = !fullName.value;
  emailError.value = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
  messageError.value = !message.value;

  if (
    !fullNameError.value &&
    !emailError.value &&
    !messageError.value &&
    !sending.value
  ) {
    sending.value = true;
    const { success } = await sendTelegramMessage({
      fullName: fullName.value,
      email: email.value,
      message: message.value,
    });

    if (success) {
      fullName.value = '';
      email.value = '';
      message.value = '';
      successTitle.value = '✅ Success!';
      successDesc.value = 'Your message has been sent successfully.';
      isError.value = false;
      showPopup.value = true;
      setTimeout(() => {
        showPopup.value = false;
      }, 5000);
    } else {
      successTitle.value = '❌ Error';
      successDesc.value = 'Failed to send message. Please try again.';
      isError.value = true;
      showPopup.value = true;
    }
    sending.value = false;
  }
};

const closePopup = () => {
  showPopup.value = false;
};
</script>

<template>
  <div
    class="m-auto w-full max-w-lg bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 relative"
  >
    <form @submit.prevent="submitForm">
      <div class="mb-4 relative">
        <input
          v-model="fullName"
          class="input-field w-full"
          type="text"
          placeholder="Full Name"
        />
        <p v-if="fullNameError" class="error-text">
          Please enter your full name.
        </p>
      </div>
      <div class="mb-4 relative">
        <input
          v-model="email"
          class="input-field w-full"
          type="email"
          placeholder="Email"
        />
        <p v-if="emailError" class="error-text">
          Please enter a valid email address.
        </p>
      </div>
      <div class="mb-6 relative">
        <textarea
          v-model="message"
          class="input-field w-full"
          rows="4"
          placeholder="Message for me"
        ></textarea>
        <p v-if="messageError" class="error-text">Please enter a message.</p>
      </div>
      <div class="flex justify-center">
        <button
          type="submit"
          class="btn-submit w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <span v-if="sending">Sending...</span>
          <span v-else>Send</span>
        </button>
      </div>
    </form>

    <!-- Popup -->
    <transition name="fade">
      <div
        v-if="showPopup"
        class="fixed bg-white inset-0 flex items-center justify-center"
      >
        <div class="absolute inset-0 bg-gray-900 opacity-70"></div>
        <div
          class="popup-box p-6 rounded shadow-lg z-10 text-center max-w-sm w-full"
          :class="
            isError
              ? 'bg-red-100 border-red-400'
              : 'bg-green-100 border-green-400'
          "
        >
          <h2
            class="text-2xl text-black font-bold mb-3"
            :class="isError ? 'text-red-700' : 'text-green-700'"
          >
            {{ successTitle }}
          </h2>
          <p :class="isError ? 'text-red-600' : 'text-green-600'">
            {{ successDesc }}
          </p>
          <button
            @click="closePopup"
            class="mt-5 px-6 py-2 rounded font-bold text-white shadow-md"
            :class="
              isError
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-green-600 hover:bg-green-700'
            "
          >
            Close
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@import 'style.scss';
</style>
