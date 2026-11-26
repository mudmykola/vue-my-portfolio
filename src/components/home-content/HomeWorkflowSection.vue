<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

defineProps({
  workflow: { type: Object, required: true },
});

const sectionRef = ref(null);
const signalActive = ref(false);
let signalObserver;
let motionPreference;

const updateSignalObserver = () => {
  signalObserver?.disconnect();
  signalActive.value = false;

  if (!motionPreference?.matches && sectionRef.value) {
    signalObserver?.observe(sectionRef.value);
  }
};

onMounted(() => {
  if (!sectionRef.value || !('IntersectionObserver' in window)) return;

  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

  signalObserver = new IntersectionObserver(
    ([entry]) => {
      signalActive.value = entry.isIntersecting;
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  motionPreference.addEventListener?.('change', updateSignalObserver);
  updateSignalObserver();
});

onUnmounted(() => {
  signalObserver?.disconnect();
  motionPreference?.removeEventListener?.('change', updateSignalObserver);
});
</script>

<template>
  <section
    ref="sectionRef"
    class="home-section section-workflow"
    data-scroll-scene
    :data-workflow-signal-state="signalActive ? 'active' : null"
  >
    <span class="workflow-terminal" aria-hidden="true">
      <span class="workflow-terminal__line"></span>
      <span class="workflow-terminal__mark">
        <span class="workflow-terminal__idle">&gt;_</span>
        <span class="workflow-terminal__ack">ACK</span>
      </span>
    </span>
    <span class="workflow-terminal-branch" aria-hidden="true"></span>
    <span class="workflow-terminal-beacon" aria-hidden="true"></span>
    <div class="section-intro">
      <p class="section-eyebrow">{{ workflow.eyebrow }}</p>
      <h2>{{ workflow.title }}</h2>
    </div>
    <div class="workflow-grid">
      <article
        v-for="item in workflow.items"
        :key="item.step"
        class="workflow-card"
      >
        <span class="workflow-step">{{ item.step }}</span>
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
      </article>
    </div>
  </section>
</template>
