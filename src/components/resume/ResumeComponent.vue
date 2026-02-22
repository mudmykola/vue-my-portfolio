<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import {
  faBriefcase,
  faDownload,
  faEnvelopeOpenText,
  faGraduationCap,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import PageSectionHeader from '@/components/shared/PageSectionHeader.vue';
import ResumeExperienceComponent from '@/components/resume/ResumeExperienceComponent.vue';
import ResumeEducationComponent from '@/components/resume/ResumeEducationComponent.vue';
import ResumeSkillComponent from '@/components/resume/ResumeSkillComponent.vue';
import { useSiteContent } from '@/composables/useSiteContent.js';

const { data, loading, error, load } = useSiteContent();

const resume = computed(() => data.value?.resumePage ?? null);
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

      const labelFromFile = url.split('/').pop()?.replace(/\.[^.]+$/, '') || '';
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
const hasMultipleResumes = computed(() => resumeDownloadOptions.value.length > 1);
const canDownloadCv = computed(() => Boolean(selectedCvUrl.value));

watch(
  resumeDownloadOptions,
  (options) => {
    if (!options.length) {
      selectedCvUrl.value = '';
      return;
    }

    const hasCurrent = options.some((option) => option.url === selectedCvUrl.value);
    if (!hasCurrent) {
      selectedCvUrl.value = options[0].url;
    }
  },
  { immediate: true }
);

const totalExperienceItems = computed(
  () => resume.value?.experienceItems?.length ?? 0
);

const totalEducationItems = computed(
  () => resume.value?.educationItems?.length ?? 0
);

const openCV = () => {
  if (selectedCvUrl.value) {
    window.open(selectedCvUrl.value, '_blank');
  }
};

onMounted(load);
</script>

<template>
  <section class="resume-page container-centered">
    <p v-if="loading" class="text-default">Loading...</p>
    <p v-else-if="error" class="text-default">{{ error }}</p>

    <div v-else-if="resume" class="resume-layout">
      <PageSectionHeader
        badge="Career"
        :icon="faBriefcase"
        :title="resume.title"
        :subtitle="resume.subtitle"
      />

      <section class="resume-top-grid">
        <article class="resume-overview-card">
          <h3>Profile Snapshot</h3>
          <p>
            Front-end engineer focused on modern Vue/Nuxt product interfaces,
            scalable component architecture, and performance-first delivery.
          </p>

          <ul class="resume-overview-metrics">
            <li>
              <strong>{{ totalExperienceItems }}</strong>
              <span>Experience Entries</span>
            </li>
            <li>
              <strong>{{ totalEducationItems }}</strong>
              <span>Education Entries</span>
            </li>
          </ul>

          <div class="resume-overview-actions">
            <label
              v-if="hasMultipleResumes"
              class="resume-overview-actions__select-wrap"
            >
              <select
                v-model="selectedCvUrl"
                class="resume-overview-actions__select"
                aria-label="Choose resume file"
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
              <font-awesome-icon :icon="faDownload" />
              {{ hasMultipleResumes ? 'Download Resume' : 'Download CV' }}
            </button>
            <router-link class="app-btn app-btn--ghost" to="/contact">
              <font-awesome-icon :icon="faEnvelopeOpenText" />
              Contact Me
            </router-link>
          </div>
        </article>

        <ResumeExperienceComponent
          :title="resume.experienceTitle"
          :items="resume.experienceItems"
          :icon="faBriefcase"
        />
      </section>

      <section class="resume-bottom-grid">
        <ResumeSkillComponent
          :frontendTitle="resume.skillFrontendTitle"
          :toolsTitle="resume.skillToolsTitle"
          :frontendItems="resume.frontendTechnologies"
          :toolsItems="resume.toolsTechnologies"
          :icon="faLayerGroup"
        />

        <ResumeEducationComponent
          :title="resume.educationTitle"
          :items="resume.educationItems"
          :icon="faGraduationCap"
        />
      </section>
    </div>
  </section>
</template>

<style scoped lang="scss">
.resume-page {
  padding: 1rem;
}

.resume-layout {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.resume-top-grid {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 0.8rem;
  min-width: 0;
}

.resume-bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
  min-width: 0;
}

.resume-overview-card {
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  padding: 0.95rem;
}

.resume-overview-card h3 {
  margin: 0 0 0.55rem;
  font-size: 1.1rem;
}

.resume-overview-card p {
  margin: 0;
  color: var(--app-text-soft);
  line-height: 1.55;
  overflow-wrap: anywhere;
}

.resume-overview-metrics {
  list-style: none;
  margin: 0.8rem 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.55rem;
}

.resume-overview-metrics li {
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.03);
  padding: 0.55rem;
}

.resume-overview-metrics strong {
  display: block;
  font-size: 1.18rem;
  color: #ddfff3;
}

.resume-overview-metrics span {
  font-size: 0.76rem;
  color: var(--app-text-soft);
}

.resume-overview-actions {
  margin-top: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.resume-overview-actions__select-wrap {
  min-width: 180px;
  flex: 1 1 220px;
}

.resume-overview-actions__select {
  width: 100%;
  min-height: 44px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.05);
  color: var(--app-text);
  padding: 0 0.75rem;
}

.resume-overview-actions__select:focus-visible {
  outline: 2px solid rgba(221, 255, 243, 0.55);
  outline-offset: 2px;
}

@media (max-width: 1100px) {
  .resume-top-grid,
  .resume-bottom-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .resume-page {
    padding: 0.6rem;
  }

  .resume-overview-actions__select-wrap,
  .resume-overview-actions .app-btn {
    width: 100%;
    flex-basis: 100%;
  }
}

@media (max-width: 420px) {
  .resume-overview-card {
    padding: 0.75rem;
  }
}
</style>
