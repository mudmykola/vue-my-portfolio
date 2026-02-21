<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
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
let popupTimer = null;

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
    const { success, error } = await sendTelegramMessage({
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
      clearTimeout(popupTimer);
      popupTimer = setTimeout(() => {
        showPopup.value = false;
      }, 5000);
    } else {
      successTitle.value = '❌ Error';
      successDesc.value = error || 'Failed to send message. Please try again.';
      isError.value = true;
      showPopup.value = true;
    }
    sending.value = false;
  }
};

const closePopup = () => {
  showPopup.value = false;
};

const closeOnEscape = (event) => {
  if (event.key === 'Escape') {
    closePopup();
  }
};

onMounted(() => {
  window.addEventListener('keydown', closeOnEscape);
});

onUnmounted(() => {
  window.removeEventListener('keydown', closeOnEscape);
  clearTimeout(popupTimer);
});
</script>

<template>
  <section class="contact-form-card">
    <header>
      <span class="page-badge">Quick Message</span>
      <h3>Send me a project request</h3>
      <p>Describe your task and I will reply as soon as possible.</p>
    </header>

    <form class="contact-form" @submit.prevent="submitForm">
      <label class="contact-form__field">
        <span>Full Name</span>
        <input
          v-model="fullName"
          class="input-field"
          type="text"
          placeholder="Your full name"
        />
        <p v-if="fullNameError" class="error-text">Please enter your full name.</p>
      </label>

      <label class="contact-form__field">
        <span>Email</span>
        <input
          v-model="email"
          class="input-field"
          type="email"
          placeholder="you@email.com"
        />
        <p v-if="emailError" class="error-text">Please enter a valid email address.</p>
      </label>

      <label class="contact-form__field">
        <span>Message</span>
        <textarea
          v-model="message"
          class="input-field"
          rows="5"
          placeholder="Tell me about your idea..."
        ></textarea>
        <p v-if="messageError" class="error-text">Please enter a message.</p>
      </label>

      <button
        type="submit"
        class="app-btn app-btn--primary contact-form__submit"
        :disabled="sending"
      >
        <span v-if="sending">Sending...</span>
        <span v-else>Send Message</span>
      </button>
    </form>
  </section>

  <teleport to="body">
    <transition name="fade">
      <div v-if="showPopup" class="contact-popup" @click.self="closePopup">
        <div
          class="contact-popup__box"
          :class="{ 'contact-popup__box--error': isError }"
        >
          <h2>{{ successTitle }}</h2>
          <p>{{ successDesc }}</p>
          <button
            type="button"
            class="app-btn"
            :class="isError ? 'app-btn--ghost' : 'app-btn--primary'"
            @click="closePopup"
          >
            Close
          </button>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
@import 'style.scss';
</style>
