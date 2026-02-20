<script setup>
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import {
  faCakeCandles,
  faHouse,
  faLocationDot,
  faEnvelope,
  faPhone,
  faGlobe,
  faBriefcase,
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

function calculateAge(birthday) {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const getHref = (label, value) => {
  if (label === 'Phone') return `tel:${value}`;
  if (label === 'Skype') return `skype:${value}`;
  if (label === 'Email') return `mailto:${value}`;
  return '#';
};

const normalizeContactValue = (item) => {
  if (item.label === 'Age' && item.birthday) {
    return calculateAge(new Date(item.birthday));
  }
  return item.value;
};

const socialIcons = {
  github: faGithub,
  instagram: faInstagram,
  linkedin: faLinkedin,
};

const contactIcons = {
  Age: faCakeCandles,
  Residence: faHouse,
  Address: faLocationDot,
  Email: faEnvelope,
  Phone: faPhone,
  Skype: faGlobe,
  Freelance: faBriefcase,
};
</script>

<template>
  <aside class="about-contact-card">
    <ul class="about-contact-list">
      <li v-for="info in props.contactInfo" :key="info.label">
        <span class="about-contact-list__label">
          <font-awesome-icon :icon="contactIcons[info.label]" />
          {{ info.label }}
        </span>

        <a
          v-if="info.label === 'Email' || info.label === 'Phone' || info.label === 'Skype'"
          :href="getHref(info.label, normalizeContactValue(info))"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ normalizeContactValue(info) }}
        </a>

        <span v-else>{{ normalizeContactValue(info) }}</span>
      </li>
    </ul>

    <ul class="about-social-list">
      <li v-for="(link, icon) in props.socialLinks" :key="icon">
        <a :href="link" target="_blank" rel="noopener noreferrer" class="app-btn app-btn--sm app-btn--ghost">
          <font-awesome-icon :icon="socialIcons[icon]" />
          <span>{{ icon }}</span>
        </a>
      </li>
    </ul>
  </aside>
</template>

<style scoped lang="scss">
.about-contact-card {
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  padding: 1rem;
}

.about-contact-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.6rem;
}

.about-contact-list li {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.65rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  padding: 0.5rem 0.65rem;
}

.about-contact-list a,
.about-contact-list span {
  color: var(--app-text-soft);
  font-size: 0.88rem;
  text-align: right;
  word-break: break-word;
}

.about-contact-list__label {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 600;
  color: var(--app-text);
  font-size: 0.82rem;
}

.about-social-list {
  list-style: none;
  margin: 0.85rem 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.45rem;
}

.about-social-list .app-btn {
  text-transform: capitalize;
}

@media (max-width: 980px) {
  .about-social-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .about-contact-list li {
    flex-direction: column;
    align-items: flex-start;
  }

  .about-contact-list a,
  .about-contact-list span {
    text-align: left;
  }
}

</style>
