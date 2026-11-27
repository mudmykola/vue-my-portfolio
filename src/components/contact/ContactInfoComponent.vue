<script setup>
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

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

const contactIcons = {
  Email: faEnvelope,
  Phone: faPhone,
};

const socialProfiles = [
  { key: 'github', label: 'GitHub', icon: faGithub },
  { key: 'linkedin', label: 'LinkedIn', icon: faLinkedin },
  { key: 'instagram', label: 'Instagram', icon: faInstagram },
];

const directContacts = computed(() =>
  props.contactInfo.filter(
    ({ label, value }) => ['Email', 'Phone'].includes(label) && value
  )
);
const socials = computed(() =>
  socialProfiles.filter(({ key }) => props.socialLinks?.[key])
);
const location = computed(() => {
  const address = props.contactInfo.find(
    (item) => item.label === 'Address'
  )?.value;
  const country = props.contactInfo.find(
    (item) => item.label === 'Residence'
  )?.value;
  return [address, country].filter(Boolean).join(', ');
});

const hrefFor = (item) =>
  item.label === 'Email'
    ? `mailto:${item.value}`
    : `tel:${String(item.value).replace(/\s+/g, '')}`;
</script>

<template>
  <aside class="contact-info-card" aria-labelledby="contact-details-title">
    <h2 id="contact-details-title">
      Let’s discuss<br />your <span>project.</span>
    </h2>
    <p class="contact-info-card__intro">
      Freelance front-end engineer working remotely<span v-if="location">
        from {{ location }}</span
      >.
    </p>

    <ul class="contact-info-list" aria-label="Direct contact details">
      <li v-for="item in directContacts" :key="item.label">
        <a
          class="contact-info-item"
          :href="hrefFor(item)"
          :aria-label="`${item.label}: ${item.value}`"
        >
          <font-awesome-icon
            :icon="contactIcons[item.label]"
            aria-hidden="true"
          />
          <span>{{ item.value }}</span>
        </a>
      </li>
    </ul>

    <ul class="contact-social-list" aria-label="Social profiles">
      <li v-for="profile in socials" :key="profile.key">
        <a
          :href="props.socialLinks[profile.key]"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`Open ${profile.label} profile`"
        >
          <font-awesome-icon :icon="profile.icon" aria-hidden="true" />
          <span>{{ profile.label }}</span>
        </a>
      </li>
    </ul>
  </aside>
</template>

<style scoped lang="scss">
.contact-info-card {
  display: grid;
  align-content: start;
  min-width: 0;
  padding: 0 clamp(2rem, 4vw, 4.5rem) 0 0;
  border-right: 1px solid var(--app-border);
}

.contact-info-card__eyebrow {
  margin: 0 0 0.65rem;
  color: var(--color-accent);
  font-size: var(--type-supporting);
  font-weight: 750;
  letter-spacing: 0.08em;
  line-height: 1.35;
  text-transform: uppercase;
}

.contact-info-card h2 {
  margin: 0;
  color: var(--app-text);
  font-size: clamp(2.1rem, 3.3vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.08;
  text-wrap: balance;
}

.contact-info-card h2 span {
  color: var(--color-accent);
}

.contact-info-card__intro {
  max-width: 38ch;
  margin: 1.15rem 0 1.7rem;
  color: var(--app-text-soft);
  font-size: var(--type-body);
  line-height: 1.55;
  text-wrap: pretty;
}

.contact-info-list,
.contact-social-list {
  display: grid;
  justify-items: start;
  gap: 0.9rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.contact-info-item,
.contact-social-list a {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  gap: 0.9rem;
  color: var(--app-text);
  font-size: var(--type-body);
  font-weight: 550;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.22em;
  transition:
    color var(--motion-ui) var(--ease-standard),
    text-decoration-color var(--motion-ui) var(--ease-standard);
}

.contact-info-item > svg,
.contact-social-list a > svg {
  width: 1.35rem;
  flex: 0 0 1.35rem;
  color: var(--color-accent);
  font-size: 1.45rem;
  text-align: center;
}

.contact-info-item:hover,
.contact-social-list a:hover {
  color: var(--color-accent);
}

.contact-info-item:focus-visible,
.contact-social-list a:focus-visible {
  border-radius: 2px;
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

.contact-social-list {
  gap: 0.35rem;
  margin-top: clamp(1.75rem, 3vw, 2.5rem);
}

@media (max-width: 980px) {
  .contact-info-card {
    padding: 0 0 clamp(2rem, 5vw, 3rem);
    border-right: 0;
    border-bottom: 1px solid var(--app-border);
  }

  .contact-info-card__intro {
    margin-bottom: 1.25rem;
  }

  .contact-info-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
  }

  .contact-social-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.25rem;
    margin-top: 1.25rem;
  }
}

@media (max-width: 640px) {
  .contact-info-card h2 {
    font-size: var(--type-subheading);
  }

  .contact-info-item,
  .contact-social-list a {
    font-size: var(--type-supporting);
  }
}
</style>
