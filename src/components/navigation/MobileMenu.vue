<template>
  <nav class="mobile-navigation" aria-label="Mobile navigation">
    <ul class="mobile-tabs">
      <li v-for="item in menuItems" :key="item.id">
        <button
          type="button"
          class="mobile-tab"
          :class="{ 'mobile-tab--active': isActive(item.link) }"
          @click="handleItemClick(item)"
        >
          <font-awesome-icon :icon="item.icon" class="mobile-tab__icon" />
          <span class="mobile-tab__label">{{ item.name }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { menuItems } from './navigationData.js';

const router = useRouter();
const route = useRoute();

const handleItemClick = (item) => {
  if (route.path !== item.link) {
    router.push(item.link);
  }
};

const isActive = (link) => route.path === link;
</script>

<style lang="scss">
.mobile-navigation {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 60;
  padding: 0.45rem 0.55rem calc(0.45rem + env(safe-area-inset-bottom));
  background: rgba(9, 15, 29, 0.94);
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  display: none;
}

.mobile-tabs {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 0.3rem;
}

.mobile-tab {
  width: 100%;
  border: 1px solid transparent;
  border-radius: 10px;
  background: transparent;
  color: rgba(246, 248, 255, 0.75);
  padding: 0.4rem 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.58rem;
  transition: all 0.2s ease;
}

.mobile-tab__icon {
  font-size: 0.84rem;
}

.mobile-tab--active {
  color: #49dcb1;
  border-color: rgba(73, 220, 177, 0.45);
  background: rgba(73, 220, 177, 0.12);
}

.mobile-tab__label {
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

@media only screen and (max-width: 640px) {
  .mobile-navigation {
    display: block;
  }
}

@media only screen and (max-width: 420px) {
  .mobile-tab {
    padding: 0.35rem 0.15rem;
  }

  .mobile-tab__label {
    font-size: 0.54rem;
  }
}
</style>
