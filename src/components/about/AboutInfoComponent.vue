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
const aboutInfoTitle = ref('I am Software Engineer @ Ecom-X');

const aboutInfoDesc = ref([
  {
    id: 1,
    text: 'I specialize in creating high-quality and intuitive interfaces. I have experience working with clients in various industries, as well as experience in Agile/Scrum methodology.',
  },
  {
    id: 2,
    text: "I believe that my potential as a front-end developer lies in the fact that I can create web applications that are not only beautiful and functional, but also user-friendly. I'm always looking for new ways to improve the user experience, and I'm always up to date with the latest trends in web application development.",
  },
  {
    id: 3,
    text: "I am proficient in a wide range of technologies that allow me to create innovative web applications. I'm fluent in CSS, HTML, SCSS, Vue, Nuxt, Vuex, Pinia, TailwindCSS, Shopify CLI, Theme Kit, Shopify e-commerce, Axios, Node.js, JavaScript, API, Liquid. I'm also familiar with GraphQL, Git, Docker.",
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
