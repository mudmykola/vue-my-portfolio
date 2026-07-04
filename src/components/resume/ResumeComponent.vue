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

const overviewCardText = computed(() => {
  const overview = resume.value?.overviewCard ?? {};

  return {
    title: overview.title || 'Profile Snapshot',
    description:
      overview.description ||
      'Front-end engineer focused on modern Vue/Nuxt product interfaces, scalable component architecture, and performance-first delivery.',
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
  <section class="resume-page container-centered">
    <p v-if="loading" class="text-default">Loading...</p>
    <p v-else-if="error" class="text-default">{{ error }}</p>

    <div v-else-if="resume" class="resume-layout">
      <PageSectionHeader
        badge="Career"
        :icon="faBriefcase"
        heading-tag="h1"
        visible-title="Resume"
        :title="resume.title"
        :subtitle="resume.subtitle"
      />

      <article class="resume-overview">
        <div class="resume-overview__intro">
          <span class="page-badge">Overview</span>
          <h2 class="resume-overview__heading">{{ overviewCardText.title }}</h2>
          <p class="resume-overview__description">
            {{ overviewCardText.description }}
          </p>
        </div>

        <div class="resume-overview__side">
          <ul class="resume-overview__stats">
            <li>
              <strong>{{ totalExperienceItems }}</strong>
              <span>{{ overviewCardText.experienceLabel }}</span>
            </li>
            <li>
              <strong>{{ totalEducationItems }}</strong>
              <span>{{ overviewCardText.educationLabel }}</span>
            </li>
          </ul>

          <div class="resume-overview__actions">
            <label
              v-if="hasMultipleResumes"
              class="resume-overview__select-wrap"
            >
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
              <font-awesome-icon :icon="faDownload" />
              {{
                hasMultipleResumes
                  ? overviewCardText.downloadLabelMultiple
                  : overviewCardText.downloadLabelSingle
              }}
            </button>
            <router-link class="app-btn app-btn--ghost" to="/contact">
              <font-awesome-icon :icon="faEnvelopeOpenText" />
              {{ overviewCardText.contactLabel }}
            </router-link>
          </div>
        </div>
      </article>

      <div class="resume-columns">
        <ResumeExperienceComponent
          :title="resume.experienceTitle"
          :items="experienceItems"
          :icon="faBriefcase"
        />

        <ResumeSkillComponent
          :frontendTitle="resume.skillFrontendTitle"
          :toolsTitle="resume.skillToolsTitle"
          :frontendItems="resume.frontendTechnologies"
          :toolsItems="resume.toolsTechnologies"
          :icon="faLayerGroup"
        />
      </div>

      <ResumeEducationComponent
        :title="resume.educationTitle"
        :items="educationItems"
        :icon="faGraduationCap"
      />
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
  gap: 1.1rem;
}

/* Overview banner ---------------------------------------------------- */
.resume-overview {
  display: grid;
  grid-template-columns: 1.5fr minmax(260px, 340px);
  gap: 1.25rem;
  align-items: baseline;
  border-radius: 18px;
  border: 1px solid var(--app-border);
  background: radial-gradient(
      circle at 12% 18%,
      rgba(73, 220, 177, 0.1),
      transparent 45%
    ),
    radial-gradient(
      circle at 92% 82%,
      rgba(243, 192, 86, 0.08),
      transparent 45%
    ),
    rgba(255, 255, 255, 0.04);
  padding: 1.3rem;
}

.resume-overview__intro {
  display: grid;
  gap: 0.6rem;
  align-content: start;
}

.resume-overview__heading {
  margin: 0;
  font-size: clamp(1.2rem, 2.4vw, 1.65rem);
  line-height: 1.2;
}

.resume-overview__description {
  margin: 0;
  color: var(--app-text-soft);
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.resume-overview__side {
  display: grid;
  gap: 0.8rem;
}

.resume-overview__stats {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
}

.resume-overview__stats li {
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.03);
  padding: 0.75rem;
  text-align: center;
}

.resume-overview__stats strong {
  display: block;
  font-size: 1.7rem;
  line-height: 1;
  color: #ddfff3;
}

.resume-overview__stats span {
  font-size: 0.72rem;
  color: var(--app-text-soft);
}

.resume-overview__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.resume-overview__select-wrap {
  flex: 1 1 100%;
}

.resume-overview__select {
  width: 100%;
  min-height: 42px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.05);
  color: var(--app-text);
  padding: 0 0.75rem;
}

.resume-overview__select:focus-visible {
  outline: 2px solid rgba(73, 220, 177, 0.5);
  outline-offset: 2px;
}

.resume-overview__actions .app-btn {
  flex: 1 1 auto;
}

/* Main columns: experience | skills ---------------------------------- */
.resume-columns {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1rem;
  align-items: start;
  min-width: 0;
}

@media (max-width: 1100px) {
  .resume-overview,
  .resume-columns {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .resume-page {
    padding: 0.6rem;
  }

  .resume-overview {
    padding: 0.9rem;
  }

  .resume-overview__actions .app-btn {
    flex-basis: 100%;
  }
}
</style>
