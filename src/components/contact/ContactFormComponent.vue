<script setup>
import { nextTick, onUnmounted, ref, watch } from 'vue';
import {
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
const popupDialog = ref(null);
const popupCloseButton = ref(null);
let previousActiveElement = null;
let previousBodyOverflow = '';
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

const keepFocusInPopup = (event) => {
  if (event.key === 'Escape') {
    closePopup();
    return;
  }

  if (event.key !== 'Tab' || !popupDialog.value) return;
  const focusable = Array.from(
    popupDialog.value.querySelectorAll(
      'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable.at(-1);
  if (!popupDialog.value.contains(document.activeElement)) {
    event.preventDefault();
    first.focus();
  } else if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

watch(showPopup, async (isOpen) => {
  if (typeof document === 'undefined') return;

  if (isOpen) {
    previousActiveElement = document.activeElement;
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    await nextTick();
    popupCloseButton.value?.focus();
    return;
  }

  document.body.style.overflow = previousBodyOverflow;
  if (
    previousActiveElement instanceof HTMLElement &&
    previousActiveElement.isConnected
  ) {
    previousActiveElement.focus();
  }
  previousActiveElement = null;
});

onUnmounted(() => {
  clearTimeout(popupTimer);
  if (showPopup.value && typeof document !== 'undefined') {
    document.body.style.overflow = previousBodyOverflow;
    if (
      previousActiveElement instanceof HTMLElement &&
      previousActiveElement.isConnected
    ) {
      previousActiveElement.focus();
    }
  }
});
</script>

<template>
  <section class="contact-form-card" aria-labelledby="contact-form-title">
    <header class="contact-form-card__head">
      <h2 id="contact-form-title">Send me a project request</h2>
      <p>Describe your task and I will reply as soon as possible.</p>
    </header>

    <form class="contact-form" @submit.prevent="submitForm" novalidate>
      <label class="contact-form__field" :class="{ 'is-error': fullNameError }">
        <span class="contact-form__label">Full name</span>
        <input
          v-model.trim="fullName"
          class="input-field"
          type="text"
          name="name"
          autocomplete="name"
          placeholder="Your full name"
          :aria-invalid="fullNameError"
          :aria-describedby="fullNameError ? 'contact-name-error' : undefined"
        />
        <p v-if="fullNameError" class="error-text">
          <span id="contact-name-error"> Please enter your full name. </span>
        </p>
      </label>

      <label class="contact-form__field" :class="{ 'is-error': emailError }">
        <span class="contact-form__label">Email</span>
        <input
          v-model.trim="email"
          class="input-field"
          type="email"
          name="email"
          autocomplete="email"
          inputmode="email"
          placeholder="you@email.com"
          :aria-invalid="emailError"
          :aria-describedby="emailError ? 'contact-email-error' : undefined"
        />
        <p v-if="emailError" class="error-text">
          <span id="contact-email-error">
            Please enter a valid email address.
          </span>
        </p>
      </label>

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
          :aria-describedby="messageError ? 'contact-message-error' : undefined"
        ></textarea>
        <p v-if="messageError" id="contact-message-error" class="error-text">
          Please enter a message.
        </p>
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
      <div
        v-if="showPopup"
        class="contact-popup"
        @click.self="closePopup"
        @keydown="keepFocusInPopup"
      >
        <div
          ref="popupDialog"
          class="contact-popup__box"
          :class="{ 'contact-popup__box--error': isError }"
          :role="isError ? 'alertdialog' : 'dialog'"
          aria-modal="true"
          aria-labelledby="contact-popup-title"
          aria-describedby="contact-popup-description"
        >
          <span class="contact-popup__icon">
            <font-awesome-icon
              :icon="isError ? faTriangleExclamation : faCircleCheck"
            />
          </span>
          <h2 id="contact-popup-title">{{ successTitle }}</h2>
          <p id="contact-popup-description">{{ successDesc }}</p>
          <button
            ref="popupCloseButton"
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
