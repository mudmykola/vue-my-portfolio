<script setup>
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import PageSectionHeader from '@/components/shared/PageSectionHeader.vue';
</script>

<template>
  <section class="not-found-page container-centered">
    <div class="not-found-page__layout">
      <PageSectionHeader
        badge="Not Found"
        :icon="faTriangleExclamation"
        heading-tag="h1"
        visible-title="404"
        title="404 | Page Not Found and Invalid Route"
        subtitle="The page you tried to open does not exist or the URL is incorrect."
      />

      <div class="not-found-page__actions">
        <router-link class="app-btn app-btn--primary" to="/">
          Go to Home
        </router-link>
        <router-link class="app-btn app-btn--ghost" to="/portfolio">
          Open Portfolio
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.not-found-page {
  display: flex;
  justify-content: center;
}

.not-found-page__layout {
  width: min(760px, 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.03);
}

.not-found-page__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}
</style>

