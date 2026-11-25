<template>
  <nav class="mobile-navigation" aria-label="Mobile navigation">
    <button
      type="button"
      class="mobile-menu-trigger"
      aria-controls="mobile-menu-panel"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <font-awesome-icon :icon="isOpen ? faXmark : faBars" aria-hidden="true" />
      <span>{{ isOpen ? 'Close menu' : 'Open menu' }}</span>
    </button>

    <div v-if="isOpen" id="mobile-menu-panel" class="mobile-menu-panel">
      <router-link
        v-for="item in menuItems"
        :key="item.id"
        :to="item.link"
        class="mobile-menu-link"
        :class="{ 'mobile-menu-link--active': isActive(item.link) }"
        @click="isOpen = false"
      >
        <font-awesome-icon :icon="item.icon" aria-hidden="true" />
        <span>{{ item.name }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { menuItems } from './navigationData.js';

const route = useRoute();
const isOpen = ref(false);

const isActive = (link) => route.path === link;
</script>

<style lang="scss">
.mobile-navigation {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 60;
  padding: 0.65rem 1rem calc(0.65rem + env(safe-area-inset-bottom));
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
  display: none;
}

.mobile-menu-trigger {
  min-height: 44px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 9px;
  background: var(--color-surface);
  color: var(--color-text);
  font: inherit;
  font-weight: 700;
}

.mobile-menu-trigger:hover,
.mobile-menu-trigger[aria-expanded='true'] {
  border-color: var(--color-accent-border);
  color: var(--color-accent);
}

.mobile-menu-panel {
  display: grid;
  gap: 0.35rem;
  margin-bottom: 0.6rem;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface-raised);
}

.mobile-menu-link {
  min-height: 44px;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.65rem 0.75rem;
  border-radius: 8px;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 600;
}

.mobile-menu-link:hover,
.mobile-menu-link--active {
  background: var(--color-accent-soft);
  color: var(--color-accent);
}

@media only screen and (max-width: 640px) {
  .mobile-navigation {
    display: block;
  }
}

@media only screen and (max-width: 420px) {
  .mobile-navigation {
    padding-inline: 0.75rem;
  }
}
</style>
