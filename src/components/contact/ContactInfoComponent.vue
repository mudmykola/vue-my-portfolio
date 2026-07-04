<script setup>
import {
  faCakeCandles,
  faEnvelope,
  faGlobe,
  faHouse,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  contactInfo: {
    type: Array,
    default: () => [],
  },
});

const icons = {
  Age: faCakeCandles,
  Residence: faHouse,
  Address: faLocationDot,
  Email: faEnvelope,
  Phone: faPhone,
  Skype: faGlobe,
  Freelance: faGlobe,
};

const calcAge = (birthday) => {
  const ageDifMs = Date.now() - new Date(birthday).getTime();
  return Math.abs(new Date(ageDifMs).getUTCFullYear() - 1970);
};

const valueOf = (item) => {
  if (item.label === 'Age' && item.birthday) return calcAge(item.birthday);
  return item.value;
};

const linkOf = (item) => {
  const value = valueOf(item);
  if (!value) return '';
  if (item.label === 'Email') return `mailto:${value}`;
  if (item.label === 'Phone') return `tel:${String(value).replace(/\s+/g, '')}`;
  if (
    item.label === 'Address' ||
    item.label === 'Residence' ||
    item.label === 'Age'
  )
    return '';
  return String(value).startsWith('http') ? value : `https://${value}`;
};
</script>

<template>
  <aside class="contact-info-card">
    <header class="contact-info-card__head">
      <span class="page-badge">Contact Card</span>
      <h3>Contact details</h3>
      <p>Prefer a direct channel? Reach me here.</p>
    </header>

    <ul class="contact-info-list">
      <li
        v-for="item in props.contactInfo"
        :key="item.label"
        class="contact-info-item"
      >
        <span class="contact-info-item__icon">
          <font-awesome-icon :icon="icons[item.label]" />
        </span>
        <span class="contact-info-item__text">
          <span class="contact-info-item__label">{{ item.label }}</span>
          <strong v-if="!linkOf(item)">{{ valueOf(item) }}</strong>
          <a
            v-else
            :href="linkOf(item)"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ valueOf(item) }}
          </a>
        </span>
      </li>
    </ul>
  </aside>
</template>

<style scoped lang="scss">
.contact-info-card {
  border-radius: 18px;
  border: 1px solid var(--app-border);
  background: rgba(255, 255, 255, 0.04);
  padding: 1.1rem;
  display: grid;
  gap: 1rem;
  align-content: start;
}

.contact-info-card__head {
  display: grid;
  gap: 0.5rem;
}

.contact-info-card__head h3 {
  margin: 0;
  font-size: 1.1rem;
}

.contact-info-card__head p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--app-text-soft);
}

.contact-info-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.55rem;
}

.contact-info-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  padding: 0.6rem 0.7rem;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;
}

.contact-info-item:hover {
  border-color: rgba(73, 220, 177, 0.4);
  background: rgba(73, 220, 177, 0.06);
  transform: translateX(2px);
}

.contact-info-item__icon {
  flex: 0 0 auto;
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid rgba(73, 220, 177, 0.35);
  background: rgba(73, 220, 177, 0.12);
  color: var(--app-accent);
  font-size: 0.85rem;
}

.contact-info-item__text {
  display: grid;
  gap: 0.1rem;
  min-width: 0;
}

.contact-info-item__label {
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--app-text-soft);
}

.contact-info-item strong {
  font-size: 0.9rem;
  color: var(--app-text);
  word-break: break-word;
}

.contact-info-item a {
  font-size: 0.9rem;
  color: #cfffee;
  text-decoration: none;
  word-break: break-word;
  transition: color 0.2s ease;
}

.contact-info-item a:hover {
  color: var(--app-accent);
  text-decoration: underline;
}
</style>
