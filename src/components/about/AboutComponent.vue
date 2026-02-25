<script setup>
import { computed, onMounted } from 'vue';
import {
  faUser,
  faCode,
  faHandshake,
  faCommentDots,
  faBolt,
} from '@fortawesome/free-solid-svg-icons';
import AboutInfoComponent from '@/components/about/AboutInfoComponent.vue';
import AboutContactComponent from '@/components/about/AboutContactComponent.vue';
import AboutServiceComponent from '@/components/about/AboutServiceComponent.vue';
import AboutClientComponent from '@/components/about/AboutClientComponent.vue';
import AboutTestimonialsComponent from '@/components/about/AboutTestimonialsComponent.vue';
import AboutFunComponent from '@/components/about/AboutFunComponent.vue';
import AboutSectionHeader from '@/components/about/AboutSectionHeader.vue';
import { useSiteContent } from '@/composables/useSiteContent.js';

const { data, loading, error, load } = useSiteContent();

const page = computed(() => data.value?.aboutPage ?? null);

onMounted(load);
</script>

<template>
  <section class="about-page container-centered">
    <p v-if="loading" class="text-default">Loading...</p>
    <p v-else-if="error" class="text-default">{{ error }}</p>

    <div v-else-if="page" class="about-layout">
      <AboutSectionHeader
        badge="Profile"
        :icon="faUser"
        :title="page.title"
        :subtitle="page.subtitle"
      />

      <section class="about-layout__intro">
        <AboutInfoComponent
          :avatar="data.aboutAvatar[0]"
          :title="page.infoTitle"
          :descriptions="page.infoDesc"
        />
        <AboutContactComponent
          :contactInfo="page.contactInfo"
          :socialLinks="page.socialLinks"
        />
      </section>

      <section class="about-layout__block">
        <AboutSectionHeader
          badge="Services"
          :icon="faCode"
          :title="page.servicesTitle"
          subtitle="What I can deliver for your product"
        />
        <AboutServiceComponent :services="data.servicesCard" />
      </section>

      <section class="about-layout__block">
        <AboutSectionHeader
          badge="Clients"
          :icon="faHandshake"
          :title="page.clientsTitle"
          subtitle="Teams and brands I worked with"
        />
        <AboutClientComponent :clients="data.clientImage" />
      </section>

      <section id="about-testimonials" class="about-layout__block">
        <AboutSectionHeader
          badge="Reviews"
          :icon="faCommentDots"
          :title="page.testimonialsTitle"
          subtitle="What people say about collaboration"
        />
        <AboutTestimonialsComponent :testimonials="data.testimonialCard" />
      </section>

      <section class="about-layout__block">
        <AboutSectionHeader
          badge="Highlights"
          :icon="faBolt"
          :title="page.funTitle"
          subtitle="A quick snapshot of work impact"
        />
        <AboutFunComponent :facts="data.funCard" />
      </section>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import 'style';
</style>
