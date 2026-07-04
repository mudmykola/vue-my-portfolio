<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import {
  faUser,
  faEnvelope,
  faPaperPlane,
  faCircleCheck,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
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
      successTitle.value = 'Message sent';
      successDesc.value =
        'Thanks for reaching out — I will get back to you shortly.';
      isError.value = false;
      showPopup.value = true;
      clearTimeout(popupTimer);
      popupTimer = setTimeout(() => {
        showPopup.value = false;
      }, 5000);
    } else {
      successTitle.value = 'Something went wrong';
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
    <header class="contact-form-card__head">
      <span class="page-badge">Quick Message</span>
      <h3>Send me a project request</h3>
      <p>Describe your task and I will reply as soon as possible.</p>
    </header>

    <form class="contact-form" @submit.prevent="submitForm" novalidate>
      <div class="contact-form__row">
        <label
          class="contact-form__field"
          :class="{ 'is-error': fullNameError }"
        >
          <span class="contact-form__label">Full name</span>
          <span class="contact-form__control">
            <font-awesome-icon :icon="faUser" class="contact-form__icon" />
            <input
              v-model.trim="fullName"
              class="input-field"
              type="text"
              name="name"
              autocomplete="name"
              placeholder="Your full name"
              :aria-invalid="fullNameError"
            />
          </span>
          <p v-if="fullNameError" class="error-text">
            Please enter your full name.
          </p>
        </label>

        <label class="contact-form__field" :class="{ 'is-error': emailError }">
          <span class="contact-form__label">Email</span>
          <span class="contact-form__control">
            <font-awesome-icon :icon="faEnvelope" class="contact-form__icon" />
            <input
              v-model.trim="email"
              class="input-field"
              type="email"
              name="email"
              autocomplete="email"
              inputmode="email"
              placeholder="you@email.com"
              :aria-invalid="emailError"
            />
          </span>
          <p v-if="emailError" class="error-text">
            Please enter a valid email address.
          </p>
        </label>
      </div>

      <label class="contact-form__field" :class="{ 'is-error': messageError }">
        <span class="contact-form__label">Message</span>
        <textarea
          v-model.trim="message"
          class="input-field contact-form__textarea"
          rows="6"
          name="message"
          autocomplete="off"
          placeholder="Tell me about your idea..."
          :aria-invalid="messageError"
        ></textarea>
        <p v-if="messageError" class="error-text">Please enter a message.</p>
      </label>

      <button
        type="submit"
        class="app-btn app-btn--primary contact-form__submit"
        :disabled="sending"
      >
        <span
          v-if="sending"
          class="contact-form__spinner"
          aria-hidden="true"
        ></span>
        <font-awesome-icon v-else :icon="faPaperPlane" />
        {{ sending ? 'Sending…' : 'Send message' }}
      </button>
    </form>
  </section>

  <teleport to="body">
    <transition name="fade">
      <div v-if="showPopup" class="contact-popup" @click.self="closePopup">
        <div
          class="contact-popup__box"
          :class="{ 'contact-popup__box--error': isError }"
          role="alertdialog"
          aria-live="assertive"
        >
          <span class="contact-popup__icon">
            <font-awesome-icon
              :icon="isError ? faTriangleExclamation : faCircleCheck"
            />
          </span>
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
