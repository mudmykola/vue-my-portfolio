<template>
  <v-app>
    <MainLayoutComponent>
      <router-view />
    </MainLayoutComponent>
  </v-app>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import MainLayoutComponent from '@/layout/MainLayoutComponent.vue';
import { applyRouteSeoMeta } from '@/config/seo.js';

const route = useRoute();

const loadAdsenseScript = () => {
  if (typeof document === 'undefined') return;
  if (document.querySelector('script[data-app-adsense="true"]')) return;

  const script = document.createElement('script');
  script.async = true;
  script.src =
    'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8259582705541308';
  script.crossOrigin = 'anonymous';
  script.dataset.appAdsense = 'true';
  document.body.appendChild(script);
};

onMounted(() => {
  if (typeof window === 'undefined') return;

  const idleLoad = () => window.setTimeout(loadAdsenseScript, 0);

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(idleLoad, { timeout: 3000 });
    return;
  }

  window.setTimeout(loadAdsenseScript, 1500);
});

watch(
  () => route.fullPath,
  () => {
    applyRouteSeoMeta(route);
  },
  { immediate: true }
);
</script>
