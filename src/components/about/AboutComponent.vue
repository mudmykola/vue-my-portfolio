<script setup>
import { computed, onMounted, ref } from 'vue';
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
import { getTechnologyIcon } from '@/utils/technologyIcons.js';

const { data, loading, error, load } = useSiteContent();
const activeStackBranch = ref(null);

const activateStackBranch = (id) => {
  activeStackBranch.value = id;
};

const clearStackBranch = (id, event) => {
  if (event.currentTarget.contains(event.relatedTarget)) return;
  if (activeStackBranch.value === id) activeStackBranch.value = null;
};

const page = computed(() => data.value?.aboutPage ?? null);
const avatar = computed(() => data.value?.aboutAvatar?.[0] ?? null);
const profileSubtitle = computed(() =>
  Array.isArray(page.value?.subtitle)
    ? page.value.subtitle.slice(1).join(' · ')
    : page.value?.subtitle || ''
);
const contactCta = computed(() => data.value?.homePage?.cta ?? null);
const stackGroups = computed(() => {
  const resume = data.value?.resumePage ?? {};
  const frontend = resume.frontendTechnologies ?? [];
  const tools = resume.toolsTechnologies ?? [];
  const getName = (item) => (typeof item === 'string' ? item : item.name);
  const selectTools = (pattern) =>
    tools.filter((item) => pattern.test(getName(item)));

  return [
    { id: 'frontend', label: 'Frontend', items: frontend },
    {
      id: 'shopify',
      label: 'Shopify',
      items: selectTools(
        /shopify|storefront api|admin api|checkout|metafields|theme app|recharge/i
      ),
    },
    {
      id: 'data',
      label: 'Edge & data',
      items: selectTools(
        /cloudflare|amplitude|meta pixel|firebase|python|google apps script/i
      ),
    },
    {
      id: 'workflow',
      label: 'Workflow',
      items: selectTools(/git \/ github|vite \/ webpack|figma/i),
    },
  ].map((group) => ({
    ...group,
    items: group.items.map((item) => {
      const name = getName(item);
      return { name, ...getTechnologyIcon(name) };
    }),
  }));
});
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
        <div v-if="avatar" class="about-profile__visual">
          <svg
            class="about-profile__tree"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              class="about-profile__tree-root"
              d="M42 50H43.5V12.5M43.5 50V87.5"
            />
            <path
              v-for="(group, index) in stackGroups"
              :key="group.id"
              class="about-profile__tree-branch"
              :class="{ 'is-active': activeStackBranch === group.id }"
              :d="`M43.5 ${12.5 + index * 25}H45`"
            />
          </svg>
          <span class="about-profile__tree-dot about-profile__tree-dot--root" />
          <span
            v-for="(group, index) in stackGroups"
            :key="`${group.id}-dot`"
            class="about-profile__tree-dot about-profile__tree-dot--branch"
            :class="{ 'is-active': activeStackBranch === group.id }"
            :style="{ left: '45%', top: `${12.5 + index * 25}%` }"
          />
          <span
            v-for="(group, index) in stackGroups"
            :key="`${group.id}-signal`"
            class="about-profile__tree-signal"
            :class="{ 'is-active': activeStackBranch === group.id }"
            :style="{
              left: '43.5%',
              top: `${12.5 + index * 25}%`,
              '--branch-order': index,
            }"
          />
          <div class="about-profile__portrait">
            <img
              width="420"
              height="420"
              :src="avatar.image"
              :alt="avatar.alt"
              fetchpriority="high"
              decoding="async"
            />
          </div>
          <div
            class="about-profile__branches"
            role="group"
            aria-label="Technology stack"
          >
            <section
              v-for="group in stackGroups"
              :key="group.id"
              class="about-profile__branch"
              :class="[
                `about-profile__branch--${group.id}`,
                { 'is-active': activeStackBranch === group.id },
              ]"
              tabindex="0"
              role="group"
              :aria-label="`${group.label}: ${group.items.length} technologies`"
              @pointerenter="activateStackBranch(group.id)"
              @pointerleave="clearStackBranch(group.id, $event)"
              @focusin="activateStackBranch(group.id)"
              @focusout="clearStackBranch(group.id, $event)"
            >
              <span class="about-profile__branch-heading">
                <span>{{ group.label }}</span>
                <b>{{ group.items.length.toString().padStart(2, '0') }}</b>
              </span>
              <span class="about-profile__branch-technologies">
                <span
                  v-for="(technology, index) in group.items"
                  :key="technology.name"
                  class="about-profile__technology-node"
                  :style="{ '--ping-index': index }"
                  :title="technology.name"
                  :aria-label="technology.name"
                >
                  <span
                    v-if="technology.mark"
                    class="about-profile__technology-mark"
                    aria-hidden="true"
                    >{{ technology.mark }}</span
                  >
                  <img
                    v-else-if="technology.asset"
                    :src="technology.asset"
                    alt=""
                    aria-hidden="true"
                  />
                  <font-awesome-icon
                    v-else
                    :icon="technology.icon"
                    :style="{
                      color: technology.color || 'var(--color-accent)',
                    }"
                    aria-hidden="true"
                  />
                  <span class="about-profile__technology-name">{{
                    technology.name
                  }}</span>
                </span>
              </span>
            </section>
          </div>
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
