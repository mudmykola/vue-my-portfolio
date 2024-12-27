<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const aboutAvatar = ref('');
const aboutAvatarAlt = ref('');
const rotateImage = (event) => {
  const image = event.target;
  const { width, height, left, top } = image.getBoundingClientRect();
  const x = (event.clientX - left) / width - 0.5;
  const y = (event.clientY - top) / height - 0.5;
  const rotationX = `${y * 10}deg`;
  const rotationY = `${x * -10}deg`;
  image.style.transform = `rotateX(${rotationX}) rotateY(${rotationY})`;
};
const aboutInfoTitle = ref('I am Front-End Development @ RANKBERRY');

const aboutInfoDesc = ref([
  {
    id: 1,
    text: 'I am a Software Engineer specializing in Front-End Development and E-Commerce solutions, dedicated to creating innovative, user-friendly, and performance-driven web applications. With experience across diverse industries, I deliver scalable and intuitive solutions tailored to meet complex project demands.',
  },
  {
    id: 2,
    text: 'I excel in crafting visually stunning and highly optimized user interfaces, combining technical expertise with modern frameworks such as Vue.js, Nuxt, and Shopify Plus. My workflow leverages Agile/Scrum methodologies, ensuring efficiency, collaboration, and timely delivery of projects.',
  },
  {
    id: 3,
    text: 'My skill set spans Liquid development, GraphQL, Node.js, and JWT, enabling seamless API integrations, customization of e-commerce platforms, and advanced business process automation. This comprehensive knowledge equips me to handle complex challenges and deliver robust, innovative solutions for global clients.',
  },
]);

const fetchAvatar = async () => {
  try {
    const response = await axios.get(
      'https://mudmykola.github.io/test-api/api-my-portfolio-avatar.json'
    );
    const data = response.data;
    if (
      data.aboutAvatar &&
      Array.isArray(data.aboutAvatar) &&
      data.aboutAvatar.length > 0
    ) {
      const baseURL = 'https://test-api-mudmykola.vercel.app';
      aboutAvatar.value = `${baseURL}${data.aboutAvatar[0].image}`;
      aboutAvatarAlt.value = data.aboutAvatar[0].alt;
    } else {
      console.error('Invalid or missing about avatar data');
    }
  } catch (error) {
    console.error('Error fetching about avatar:', error);
  }
};

onMounted(fetchAvatar);
</script>

<template>
  <div class="about-info__box flex">
    <div class="about-info__avatar" @mousemove="rotateImage">
      <img
        width="300"
        height="300"
        class="rounded"
        :src="aboutAvatar"
        :alt="aboutAvatarAlt"
      />
    </div>
    <div class="about-info__text ml-10 w-[500px]">
      <h1 class="text-2xl font-medium mb-2">{{ aboutInfoTitle }}</h1>
      <p
        class="font-light leading-[18px] mb-3 opacity-80"
        v-for="item in aboutInfoDesc"
        :key="item.id"
      >
        {{ item.text }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.about-info {
  &__avatar {
    perspective: 1000px;
    transition: transform 0.5s ease;

    &:hover {
      transform: rotateX(10deg) rotateY(-10deg);
    }

    img {
      width: 300px;
      height: 300px;
    }
  }
}
</style>
