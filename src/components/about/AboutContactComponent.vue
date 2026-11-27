<script setup>
import { computed } from 'vue';
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import {
  faLocationDot,
  faEnvelope,
  faPhone,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  contactInfo: {
    type: Array,
    default: () => [],
  },
  socialLinks: {
    type: Object,
    default: () => ({}),
  },
});

const socialIcons = {
  github: faGithub,
  instagram: faInstagram,
  linkedin: faLinkedin,
};

const contactIcons = {
  Location: faLocationDot,
  Email: faEnvelope,
  Phone: faPhone,
  Skype: faGlobe,
};

const displayedContacts = computed(() => {
  const locationParts = props.contactInfo
    .filter((item) => item.label === 'Residence' || item.label === 'Address')
    .map((item) => item.value)
    .filter(Boolean);
  const contacts = props.contactInfo
    .filter((item) => ['Email', 'Phone', 'Skype'].includes(item.label))
    .map((item) => ({ label: item.label, value: item.value }));

  return [
    ...(locationParts.length
      ? [{ label: 'Location', value: locationParts.join(' / ') }]
      : []),
    ...contacts,
  ];
});

const getHref = (label, value) => {
  if (label === 'Phone') return `tel:${value.replace(/[\s()-]/g, '')}`;
  if (label === 'Skype') return `skype:${value}`;
  if (label === 'Email') return `mailto:${value}`;
  return undefined;
};
</script>

<template>
  <aside class="about-contact">
    <ul class="about-contact-list" aria-label="Contact details">
      <li v-for="info in displayedContacts" :key="info.label">
        <font-awesome-icon
          :icon="contactIcons[info.label]"
          aria-hidden="true"
        />
        <a
          v-if="getHref(info.label, info.value)"
          :href="getHref(info.label, info.value)"
        >
          {{ info.value }}
        </a>
        <span v-else>{{ info.value }}</span>
      </li>
    </ul>

    <ul class="about-social-list" aria-label="Social profiles">
      <li v-for="(link, name) in props.socialLinks" :key="name">
        <a
          :href="link"
          :aria-label="`Visit Mykola on ${name}`"
          :title="name"
          target="_blank"
          rel="noopener noreferrer"
        >
          <font-awesome-icon :icon="socialIcons[name]" aria-hidden="true" />
        </a>
      </li>
    </ul>
  </aside>
</template>

<style scoped lang="scss">
.about-contact {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem 1rem;
  min-width: 0;
  margin-top: 0.85rem;
}

.about-contact-list,
.about-social-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem 0.8rem;
  min-width: 0;
  margin: 0;
  padding: 0;
}

.about-contact-list li {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-width: 0;
  padding-right: 0.8rem;
  border-right: 1px solid var(--app-border);
}

.about-contact-list li:last-child {
  padding-right: 0;
  border-right: 0;
}

.about-contact-list :deep(svg) {
  flex: 0 0 auto;
  color: var(--color-accent);
  font-size: 1.1rem;
}

.about-contact-list a,
.about-contact-list span {
  color: var(--app-text);
  font-size: var(--type-supporting);
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.about-contact-list a {
  text-decoration-color: var(--color-accent-border);
  text-underline-offset: 0.2em;
}

.about-social-list {
  gap: 0.4rem;
}

.about-social-list a {
  display: inline-flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: var(--radius-pill);
  color: var(--app-text);
  font-size: 1.15rem;
  transition:
    color var(--motion-fast) var(--ease-standard),
    background-color var(--motion-fast) var(--ease-standard),
    border-color var(--motion-fast) var(--ease-standard);
}

.about-social-list a:hover {
  border-color: var(--color-accent-border);
  background: var(--color-accent-soft);
  color: var(--color-accent);
}

.about-contact a:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}

@media (max-width: 640px) {
  .about-contact {
    align-items: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-social-list a {
    transition: none;
  }
}
</style>
