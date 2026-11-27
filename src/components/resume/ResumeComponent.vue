<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useNow } from '@vueuse/core';
import { getExperienceYears } from './experienceYears.js';
import {
  faArrowRight,
  faDownload,
  faEnvelopeOpenText,
} from '@fortawesome/free-solid-svg-icons';
import PageSectionHeader from '@/components/shared/PageSectionHeader.vue';
import HomeArtifactField from '@/components/home-content/HomeArtifactField.vue';
import ResumeExperienceComponent from '@/components/resume/ResumeExperienceComponent.vue';
import ResumeEducationComponent from '@/components/resume/ResumeEducationComponent.vue';
import ResumeSkillComponent from '@/components/resume/ResumeSkillComponent.vue';
import { useSiteContent } from '@/composables/useSiteContent.js';

const { data, loading, error, load } = useSiteContent();

const now = useNow({ interval: 60000 });
const resume = computed(() => {
  const page = data.value?.resumePage;
  if (!page) return null;

  const years = getExperienceYears(
    page.experienceStartYear,
    now.value.getFullYear()
  );
  return {
    ...page,
    experienceYears: years,
  };
});

// Experience & Education content lives in its own file (public/data/resume.json)
// so the frequently-updated timeline is easy to maintain independently.
const resumeData = ref(null);

const loadResumeData = async () => {
  try {
    const url = import.meta.env.DEV
      ? `/data/resume.json?t=${Date.now()}`
      : '/data/resume.json';
    const response = await fetch(url, {
      cache: import.meta.env.DEV ? 'no-store' : 'default',
    });
    if (response.ok) {
      resumeData.value = await response.json();
    }
  } catch (e) {
    console.error('Failed to load resume timeline data:', e);
  }
};

const experienceItems = computed(() => resumeData.value?.experienceItems ?? []);
const educationItems = computed(() => resumeData.value?.educationItems ?? []);

const resumeDownloadOptions = computed(() => {
  const entries = Array.isArray(data.value?.resumeDownload)
    ? data.value.resumeDownload
    : [];

  return entries
    .map((entry, index) => {
      const url = entry?.cv || entry?.url || entry?.file || '';

      if (!url) {
        return null;
      }

      const labelFromFile =
        url
          .split('/')
          .pop()
          ?.replace(/\.[^.]+$/, '') || '';
      const label =
        entry?.label ||
        entry?.title ||
        entry?.name ||
        labelFromFile ||
        `Resume ${index + 1}`;

      return {
        id: entry?.id ?? index + 1,
        label,
        url,
      };
    })
    .filter(Boolean);
});

const selectedCvUrl = ref('');
const hasMultipleResumes = computed(
  () => resumeDownloadOptions.value.length > 1
);
const canDownloadCv = computed(() => Boolean(selectedCvUrl.value));

watch(
  resumeDownloadOptions,
  (options) => {
    if (!options.length) {
      selectedCvUrl.value = '';
      return;
    }

    const hasCurrent = options.some(
      (option) => option.url === selectedCvUrl.value
    );
    if (!hasCurrent) {
      selectedCvUrl.value = options[0].url;
    }
  },
  { immediate: true }
);

const totalExperienceItems = computed(() => experienceItems.value.length);

const totalEducationItems = computed(() => educationItems.value.length);

const experienceSubtitle = computed(
  () => 'Building and improving e-commerce products.'
);

const overviewCardText = computed(() => {
  const overview = resume.value?.overviewCard ?? {};

  return {
    experienceLabel: overview.experienceLabel || 'Experience Entries',
    educationLabel: overview.educationLabel || 'Education Entries',
    downloadLabelSingle: overview.downloadLabelSingle || 'Download CV',
    downloadLabelMultiple: overview.downloadLabelMultiple || 'Download Resume',
    contactLabel: overview.contactLabel || 'Contact Me',
    selectAriaLabel: overview.selectAriaLabel || 'Choose resume file',
  };
});

const openCV = () => {
  if (selectedCvUrl.value) {
    window.open(selectedCvUrl.value, '_blank');
  }
};

onMounted(() => {
  load();
  loadResumeData();
});
</script>

<template>
  <section class="resume-page">
    <HomeArtifactField variant="resume" />
    <p v-if="loading" class="text-default resume-state">Loading...</p>
    <p v-else-if="error" class="text-default resume-state">{{ error }}</p>

    <div v-else-if="resume" class="resume-layout">
      <header class="resume-hero" data-scroll-scene>
        <div class="resume-hero__main">
          <PageSectionHeader
            badge="Career"
            heading-tag="h1"
            visible-title="Experience & Resume"
            :title="resume.title"
            subtitle="Front-End Engineer · Vue, Nuxt & Shopify"
            compact
          />

          <div class="resume-overview__actions">
            <label
              v-if="hasMultipleResumes"
              class="resume-overview__select-wrap"
            >
              <span>Choose resume file</span>
              <select
                v-model="selectedCvUrl"
                class="resume-overview__select"
                :aria-label="overviewCardText.selectAriaLabel"
              >
                <option
                  v-for="option in resumeDownloadOptions"
                  :key="option.id"
                  :value="option.url"
                >
                  {{ option.label }}
                </option>
              </select>
            </label>

            <button
              type="button"
              class="app-btn app-btn--primary"
              :disabled="!canDownloadCv"
              @click="openCV"
            >
              <font-awesome-icon :icon="faDownload" aria-hidden="true" />
              {{
                hasMultipleResumes
                  ? overviewCardText.downloadLabelMultiple
                  : overviewCardText.downloadLabelSingle
              }}
            </button>
            <router-link class="app-btn app-btn--ghost" to="/contact">
              <font-awesome-icon
                :icon="faEnvelopeOpenText"
                aria-hidden="true"
              />
              {{ overviewCardText.contactLabel }}
            </router-link>
          </div>
        </div>

        <aside class="resume-hero__stat" aria-label="Career summary">
          <p class="resume-hero__years">
            <strong>{{ resume.experienceYears ?? 0 }}+</strong> years
          </p>
          <p class="resume-hero__stat-label">of experience</p>
          <ul>
            <li>{{ totalExperienceItems }} experience entries</li>
            <li>{{ totalEducationItems }} education entries</li>
          </ul>
        </aside>
      </header>

      <div class="resume-content-grid">
        <div class="resume-main">
          <ResumeExperienceComponent
            title="Professional experience"
            :subtitle="experienceSubtitle"
            :items="experienceItems"
          />
        </div>

        <aside class="resume-sidebar" aria-label="Technology and education">
          <ResumeSkillComponent
            :frontendTitle="resume.skillFrontendTitle"
            :toolsTitle="resume.skillToolsTitle"
            :frontendItems="resume.frontendTechnologies"
            :toolsItems="resume.toolsTechnologies"
          />

          <ResumeEducationComponent
            title="Education & learning"
            :items="educationItems"
            compact
          />
        </aside>
      </div>

      <section
        class="resume-contact-cta home-section section-cta"
        aria-labelledby="resume-cta-title"
      >
        <div class="cta-card resume-contact-cta__card">
          <p class="section-eyebrow">Ready to start</p>
          <h2 id="resume-cta-title">Have a project in mind?</h2>
          <router-link class="app-btn app-btn--primary" to="/contact">
            Contact Me
            <font-awesome-icon :icon="faArrowRight" aria-hidden="true" />
          </router-link>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/components/resume/style.scss';
</style>
