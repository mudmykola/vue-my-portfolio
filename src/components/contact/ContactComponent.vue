<script setup>
import { computed, onMounted } from 'vue';
import ContactFormComponent from '@/components/contact/ContactFormComponent.vue';
import ContactInfoComponent from '@/components/contact/ContactInfoComponent.vue';
import PageSectionHeader from '@/components/shared/PageSectionHeader.vue';
import { useSiteContent } from '@/composables/useSiteContent.js';

const { data, loading, error, load } = useSiteContent();
const contactInfo = computed(() => data.value?.aboutPage?.contactInfo ?? []);
const socialLinks = computed(() => data.value?.aboutPage?.socialLinks ?? {});
const email = computed(
  () => contactInfo.value.find((item) => item.label === 'Email')?.value || ''
);
const phone = computed(
  () => contactInfo.value.find((item) => item.label === 'Phone')?.value || ''
);

onMounted(load);
</script>

<template>
  <section class="contact-page">
    <div class="contact-layout">
      <PageSectionHeader
        badge="Contact"
        heading-tag="h1"
        visible-title="Tell me about your project"
        title="Tell me about your project"
        subtitle="Tell me about your idea and I will get back to you shortly"
        compact
      />

      <p v-if="loading" class="text-default">Loading...</p>
      <p v-else-if="error" class="text-default">{{ error }}</p>

      <section v-else class="contact-layout__grid" data-scroll-scene>
        <ContactInfoComponent
          :contactInfo="contactInfo"
          :social-links="socialLinks"
        />
        <ContactFormComponent />
      </section>

      <p v-if="!loading && !error" class="contact-layout__direct">
        Prefer to reach out directly?
        <template v-if="email">
          Email me at
          <a :href="`mailto:${email}`">{{ email }}</a>
        </template>
        <template v-if="email && phone">or </template>
        <template v-if="phone">
          call
          <a :href="`tel:${phone.replace(/\s+/g, '')}`">{{ phone }}</a
          >.
        </template>
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import 'style';
</style>
