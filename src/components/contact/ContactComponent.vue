<script setup>
import { computed, onMounted } from 'vue';
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import ContactFormComponent from '@/components/contact/ContactFormComponent.vue';
import ContactInfoComponent from '@/components/contact/ContactInfoComponent.vue';
import PageSectionHeader from '@/components/shared/PageSectionHeader.vue';
import { useSiteContent } from '@/composables/useSiteContent.js';

const { data, loading, error, load } = useSiteContent();
const contactInfo = computed(() => data.value?.aboutPage?.contactInfo ?? []);

onMounted(load);
</script>

<template>
  <section class="contact-page container-centered">
    <div class="contact-layout">
      <PageSectionHeader
        badge="Contact"
        :icon="faEnvelopeOpenText"
        heading-tag="h1"
        visible-title="Contact"
        title="Contact Mykola Mud for Front-End Projects"
        subtitle="Tell me about your idea and I will get back to you shortly"
      />

      <p v-if="loading" class="text-default">Loading...</p>
      <p v-else-if="error" class="text-default">{{ error }}</p>

      <section v-else class="contact-layout__grid">
        <ContactInfoComponent :contactInfo="contactInfo" />
        <ContactFormComponent />
      </section>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import 'style';
</style>
