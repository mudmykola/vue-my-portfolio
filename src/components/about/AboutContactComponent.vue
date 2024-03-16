<script setup>
import { ref } from 'vue';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const contactInfo = [
  { label: 'Age', value: calculateAge(new Date('1988-04-18')), class: 'about-contact__age--info' },
  { label: 'Residence', value: 'Ukraine', class: 'about-contact__residence--info' },
  { label: 'Address', value: '102/2 Myru Avenue, Khmelnytskyi', class: 'about-contact__address--info' },
  { label: 'Email', value: 'mykola.mud@gmail.com', class: 'about-contact__email--info' },
  { label: 'Phone', value: '+380 97 802 7062', class: 'about-contact__phone--info' },
  { label: 'Skype', value: 'koliakass', class: 'about-contact__skype--info' },
  { label: 'Freelance', value: 'Available', class: 'about-contact__freelance--info' }
];

const currentYear = new Date().getFullYear();

function calculateAge(birthday) {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const getHref = (label, value) => {
  if (label === 'Phone') {
    return `tel:${value}`;
  } else if (label === 'Skype') {
    return `skype:${value}`;
  }
  return '#';
};

const socialLinks = ref({
  github: 'https://github.com/mudmykola',
  instagram: 'https://www.instagram.com/mud.software.engineer/',
  linkedin: 'https://www.linkedin.com/in/mud-developer/'
});

const socialIcons = {
  github: faGithub,
  instagram: faInstagram,
  linkedin: faLinkedin,
};
</script>

<template>
  <div class="about-contact text-left">
    <div class="about-contact__box w-[80%]">
      <div class="about-contact__features">
        <ul class="list-none p-0">
          <li v-for="info in contactInfo" :key="info.label" :class="info.class">
            <strong class="text-1xl">{{ info.label }}:</strong>
            <span v-if="info.label === 'Email'">
              <a :href="`mailto:${info.value}`" class="cursor-pointer">{{ info.value }}</a>
            </span>
            <span v-else>
              <a :href="getHref(info.label, info.value)" target="_blank" class="cursor-pointer">{{ info.value }}</a>
            </span>
          </li>
        </ul>
      </div>
      <div class="about-contact__social mt-4">
        <ul class="flex items-center gap-3">
          <li v-for="(link, icon) in socialLinks" :key="icon">
            <a :href="link" target="_blank">
              <font-awesome-icon class="text-2xl hover:text-[#ca0de1]  transition-[.5s] hover:transition-all" :icon="socialIcons[icon]" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "style";
</style>