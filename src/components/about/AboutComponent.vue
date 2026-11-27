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
import HomeCtaSection from '@/components/home-content/HomeCtaSection.vue';
import HomeArtifactField from '@/components/home-content/HomeArtifactField.vue';
import SectionAtmosphere from '@/components/shared/SectionAtmosphere.vue';
import { useSiteContent } from '@/composables/useSiteContent.js';

const { data, loading, error, load } = useSiteContent();

const page = computed(() => data.value?.aboutPage ?? null);
const avatar = computed(() => data.value?.aboutAvatar?.[0] ?? null);
const profileSubtitle = computed(() =>
  Array.isArray(page.value?.subtitle)
    ? page.value.subtitle.slice(1).join(' · ')
    : page.value?.subtitle || ''
);
const contactCta = computed(() => data.value?.homePage?.cta ?? null);

onMounted(load);
</script>

<template>
  <section class="about-page container-centered" :aria-busy="loading">
    <HomeArtifactField variant="about" />
    <div v-if="loading" class="about-loading" role="status">
      <span class="sr-only">Loading profile content</span>
      <div aria-hidden="true">
        <div class="about-loading__hero">
          <div>
            <span></span><i></i><i></i><i></i>
            <b></b>
          </div>
          <span></span>
        </div>
        <div v-for="section in 4" :key="section" class="about-loading__section">
          <b></b>
          <div><i></i><i></i><i></i></div>
        </div>
      </div>
    </div>
    <p v-else-if="error" class="text-default" role="alert">{{ error }}</p>

    <div v-else-if="page" class="about-layout">
      <section
        class="about-layout__intro tech-atmosphere-host"
        data-scroll-scene
      >
        <SectionAtmosphere variant="right" />
        <div class="about-profile__content">
          <AboutSectionHeader
            badge="Profile"
            :icon="faUser"
            heading-tag="h1"
            title="About Mykola"
            :subtitle="profileSubtitle"
          />
          <AboutInfoComponent :descriptions="page.infoDesc" />
          <AboutContactComponent
            :contact-info="page.contactInfo"
            :social-links="page.socialLinks"
          />
        </div>
        <div v-if="avatar" class="about-profile__portrait">
          <div class="about-profile__schematic" aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M12 22h12v-8h12m52 8H76v-8H64M7 55h11v8h11m64-8H82v8H71M17 83h14v-8h9m43 8H70v-8h-9"
              />
              <circle cx="12" cy="22" r="1.1" />
              <circle cx="88" cy="22" r="1.1" />
              <circle cx="7" cy="55" r="1.1" />
              <circle cx="93" cy="55" r="1.1" />
              <circle cx="17" cy="83" r="1.1" />
              <circle cx="83" cy="83" r="1.1" />
            </svg>
          </div>
          <span
            class="about-profile__tech about-profile__tech--vue"
            aria-hidden="true"
            >Vue</span
          >
          <span
            class="about-profile__tech about-profile__tech--nuxt"
            aria-hidden="true"
            >Nuxt</span
          >
          <span
            class="about-profile__tech about-profile__tech--shopify"
            aria-hidden="true"
            >Shopify</span
          >
          <img
            width="420"
            height="420"
            :src="avatar.image"
            :alt="avatar.alt"
            fetchpriority="high"
            decoding="async"
          />
        </div>
      </section>

      <section
        class="about-layout__block about-layout__services tech-atmosphere-host"
      >
        <SectionAtmosphere variant="right" />
        <AboutSectionHeader
          badge="Services"
          :icon="faCode"
          title="What I can deliver for your product"
          accent-text="your product"
        />
        <AboutServiceComponent :services="data.servicesCard" />
      </section>

      <section class="about-layout__block about-layout__clients">
        <AboutSectionHeader
          badge="Clients"
          :icon="faHandshake"
          title="Teams and brands I worked with"
        />
        <AboutClientComponent :clients="data.clientImage" />
      </section>

      <section id="about-testimonials" class="about-layout__block">
        <AboutSectionHeader
          badge="Testimonials"
          :icon="faCommentDots"
          title="What people say about collaboration"
          accent-text="collaboration"
        />
        <AboutTestimonialsComponent :testimonials="data.testimonialCard" />
      </section>

      <section
        class="about-layout__block about-layout__highlights home-section section-ambient"
      >
        <AboutSectionHeader
          badge="Highlights"
          :icon="faBolt"
          title="A few numbers from my work"
        />
        <AboutFunComponent :facts="data.funCard" />
      </section>

      <div v-if="contactCta" class="about-layout__cta tech-atmosphere-host">
        <SectionAtmosphere variant="edge" />
        <HomeCtaSection :cta="contactCta" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import 'style';
</style>
