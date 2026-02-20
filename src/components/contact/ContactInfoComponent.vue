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
  if (item.label === 'Address' || item.label === 'Residence' || item.label === 'Age') return '';
  return String(value).startsWith('http') ? value : `https://${value}`;
};
</script>

<template>
  <aside class="contact-info-card">
    <header>
      <span class="page-badge">Contact Card</span>
      <h3>Contact details</h3>
    </header>

    <ul>
      <li v-for="item in props.contactInfo" :key="item.label">
        <span>
          <font-awesome-icon :icon="icons[item.label]" />
          {{ item.label }}
        </span>
        <strong v-if="!linkOf(item)">{{ valueOf(item) }}</strong>
        <a v-else :href="linkOf(item)" target="_blank" rel="noopener noreferrer">{{ valueOf(item) }}</a>
      </li>
    </ul>
  </aside>
</template>

<style scoped lang="scss">
.contact-info-card {
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  padding: 0.9rem;
  display: grid;
  gap: 0.75rem;
}

.contact-info-card header {
  display: grid;
  gap: 0.45rem;
}

.contact-info-card h3 {
  margin: 0;
  font-size: 1.05rem;
}

.contact-info-card ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.55rem;
}

.contact-info-card li {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.6rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  background: rgba(255, 255, 255, 0.03);
  padding: 0.5rem 0.65rem;
}

.contact-info-card span {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  color: var(--app-text-soft);
}

.contact-info-card strong {
  font-size: 0.85rem;
  color: var(--app-text);
  text-align: right;
  word-break: break-word;
}

.contact-info-card a {
  font-size: 0.85rem;
  color: #cfffee;
  text-decoration: none;
  text-align: right;
  word-break: break-word;
}
</style>
