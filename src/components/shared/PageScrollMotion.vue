<script setup>
import { nextTick, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
let progressTrack;
let progressFrame = 0;
let sceneRefreshFrame = 0;
let sceneObserver;
let contentObserver;
let sceneMutationObserver;
let motionPreference;

const clearSceneStates = () => {
  document
    .querySelectorAll('[data-scroll-scene][data-scroll-motion-state]')
    .forEach((scene) => scene.removeAttribute('data-scroll-motion-state'));
};

const updateProgress = () => {
  progressFrame = 0;
  if (!progressTrack) return;

  const scrollRange =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;
  progressTrack.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
};

const scheduleProgressUpdate = () => {
  if (progressFrame) return;
  progressFrame = window.requestAnimationFrame(updateProgress);
};

const scheduleSceneRefresh = () => {
  if (sceneRefreshFrame) return;

  sceneRefreshFrame = window.requestAnimationFrame(() => {
    sceneRefreshFrame = 0;
    refreshScenes();
  });
};

const refreshScenes = async () => {
  await nextTick();
  sceneObserver?.disconnect();
  clearSceneStates();

  const scenes = [...document.querySelectorAll('[data-scroll-scene]')];
  const canReveal =
    !motionPreference?.matches && 'IntersectionObserver' in window;

  if (!canReveal || scenes.length === 0) {
    delete document.documentElement.dataset.scrollMotionReady;
    return;
  }

  document.documentElement.dataset.scrollMotionReady = 'true';
  try {
    sceneObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            entry.target.dataset.scrollMotionState = 'pending';
            return;
          }

          entry.target.dataset.scrollMotionState = 'visible';
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
  } catch {
    delete document.documentElement.dataset.scrollMotionReady;
    return;
  }

  scenes.forEach((scene) => sceneObserver.observe(scene));
};

const handleMotionPreference = () => {
  if (motionPreference?.matches) {
    sceneObserver?.disconnect();
    clearSceneStates();
    delete document.documentElement.dataset.scrollMotionReady;
    return;
  }

  refreshScenes();
};

watch(() => route.fullPath, scheduleSceneRefresh);

onMounted(() => {
  progressTrack = document.querySelector('.page-scroll-progress__fill');
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

  window.addEventListener('scroll', scheduleProgressUpdate, { passive: true });
  window.addEventListener('resize', scheduleProgressUpdate, { passive: true });
  motionPreference.addEventListener?.('change', handleMotionPreference);

  const content = document.querySelector('.app-content');
  if ('MutationObserver' in window && content) {
    sceneMutationObserver = new window.MutationObserver(scheduleSceneRefresh);
    sceneMutationObserver.observe(content, { childList: true, subtree: true });
  }

  if ('ResizeObserver' in window && content) {
    contentObserver = new window.ResizeObserver(scheduleProgressUpdate);
    contentObserver.observe(content);
  }

  scheduleProgressUpdate();
  scheduleSceneRefresh();
});

onUnmounted(() => {
  window.removeEventListener('scroll', scheduleProgressUpdate);
  window.removeEventListener('resize', scheduleProgressUpdate);
  motionPreference?.removeEventListener?.('change', handleMotionPreference);
  sceneObserver?.disconnect();
  contentObserver?.disconnect();
  sceneMutationObserver?.disconnect();

  if (progressFrame) window.cancelAnimationFrame(progressFrame);
  if (sceneRefreshFrame) window.cancelAnimationFrame(sceneRefreshFrame);
  delete document.documentElement.dataset.scrollMotionReady;
  clearSceneStates();
});
</script>

<template>
  <div class="page-scroll-progress" aria-hidden="true">
    <span class="page-scroll-progress__fill"></span>
  </div>
</template>

<style lang="scss">
.page-scroll-progress {
  position: fixed;
  z-index: 60;
  inset: 0 0 auto;
  height: 2px;
  overflow: visible;
  pointer-events: none;
  background: rgba(24, 214, 160, 0.08);
}

.page-scroll-progress__fill {
  position: absolute;
  inset: 0;
  transform: scaleX(0);
  transform-origin: left center;
  background: var(--color-accent);
}

.page-scroll-progress__fill::after {
  position: absolute;
  top: 50%;
  right: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent-hover);
  box-shadow: 0 0 10px rgba(24, 214, 160, 0.42);
  content: '';
  transform: translate(50%, -50%);
}

html[data-scroll-motion-ready='true']
  [data-scroll-scene][data-scroll-motion-state='pending'] {
  opacity: 0;
  transform: translate3d(0, 14px, 0);
  transition:
    opacity 280ms var(--ease-enter),
    transform 280ms var(--ease-enter);
  will-change: opacity, transform;
}

html[data-scroll-motion-ready='true']
  [data-scroll-scene][data-scroll-motion-state='visible'] {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition:
    opacity 280ms var(--ease-enter),
    transform 280ms var(--ease-enter);
}

@media (prefers-reduced-motion: reduce) {
  .page-scroll-progress {
    display: none;
  }

  [data-scroll-scene],
  html[data-scroll-motion-ready='true']
    [data-scroll-scene][data-scroll-motion-state] {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>
