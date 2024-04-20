<template>
  <div class="bg-gray-100 min-h-screen py-8">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-end space-x-4 mb-4">
        <select v-model="selectedCategory" class="px-4 py-2 border rounded-lg">
          <option value="">{{ filterAllCategories }}</option>
          <option v-for="category in categories" :key="category">{{ category }}</option>
        </select>
        <select v-model="sortBy" class="px-4 py-2 border rounded-lg">
          <option value="date">{{ sortByDate }}</option>
          <option value="title">{{ sortByTitle }}</option>
          <option value="category">{{ sortByCategory }}</option>
        </select>
        <input v-model="searchQuery" type="text" placeholder="Search" class="px-4 py-2 border rounded-lg">
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div v-for="post in paginatedPosts" :key="post.id" class="bg-white rounded-lg shadow-md overflow-hidden h-fit">
          <img :src="getPostImageUrl(post.image)" :alt="post.title" class="h-auto w-full object-contain">
          <div class="p-4 bg-default">
            <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
            <p class="text-gray-600">{{ post.excerpt }}</p>
            <div class="flex justify-between mt-4">
              <span class="text-gray-500">{{ formatDate(post.date) }}</span>
              <button @click="openModal(post)" class="text-blue-500">{{ readMore }}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-8 gap-5">
        <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg bg-c107">
          {{ btnPrev }}</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-blue-500 text-white rounded-lg bg-c107">
          {{ btnNext }}</button>
      </div>
      <div v-if="selectedPost" class="fixed inset-0 z-50 flex items-center justify-center ">
        <div class="fixed inset-0 bg-black opacity-50"></div>
        <div class="fixed inset-0 flex items-center justify-center">
          <div class="modal bg-[#fff]  h-max max-w-3xl rounded-lg overflow-y-auto z-10 shadow-lg absolute top-[2%]">
            <div class="relative">
              <img :src="getPostImageUrl(selectedPost.image)" :alt="selectedPost.title" class="h-auto w-full object-containe">
              <button @click="closeModal" class="absolute top-4 right-4 text-c107 hover:text-red-800 focus:outline-none text-lg">
                Close
              </button>
            </div>
            <div class="p-6">
              <h2 class="text-2xl font-semibold mb-4">{{ selectedPost.title }}</h2>
              <p class="text-gray-600 mb-4">{{ selectedPost.content }}</p>
              <div class="flex justify-between">
                <span class="text-gray-500">{{ formatDate(selectedPost.date) }}</span>
                <span class="text-gray-500">{{ selectedPost.category }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, watch, onMounted} from 'vue';
import axios from 'axios';

const filterAllCategories = 'All Categories';
const sortByDate = 'Date';
const sortByTitle = 'Title';
const sortByCategory = 'Category';
const readMore = 'Read more';
const btnPrev = 'Previous';
const btnNext = 'Next';

const posts = ref([]);
const selectedPost = ref(null);
const currentPage = ref(1);
const postsPerPage = 4;
const searchQuery = ref('');
const sortBy = ref('date');
const selectedCategory = ref('');
const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage));

const sortByProperty = (a, b) => {
  if (sortBy.value === 'title') {
    return a.title.localeCompare(b.title);
  } else if (sortBy.value === 'category') {
    return a.category.localeCompare(b.category);
  } else {
    return computeRelevance(a) - computeRelevance(b);
  }
};

const computeRelevance = (post) => {
  const currentDate = new Date();
  const postDate = new Date(post.date);
  const diffTime = Math.abs(currentDate - postDate);
  return -Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const filteredPosts = computed(() => {
  let sortedPosts = [...posts.value];
  if (selectedCategory.value) {
    sortedPosts = sortedPosts.filter(post => post.category === selectedCategory.value);
  }
  if (searchQuery.value) {
    sortedPosts = sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }
  sortedPosts = sortedPosts.sort(sortByProperty);
  return sortedPosts;
});

const reversedPaginatedPosts = computed(() => filteredPosts.value.slice().reverse());

const paginatedPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * postsPerPage;
  const endIndex = currentPage.value * postsPerPage;
  return reversedPaginatedPosts.value.slice(startIndex, endIndex);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const categories = computed(() => [...new Set(posts.value.map(post => post.category))]);

const openModal = (post) => {
  selectedPost.value = post;
};

const closeModal = () => {
  selectedPost.value = null;
};

const formatDate = (dateString) => {
  const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const fetchPosts = async () => {
  try {
    const response = await axios.get('https://mudmykola.github.io/test-api/api-my-portfolio-blog-post.json');
    posts.value = response.data.posts;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
};

const getPostImageUrl = (imagePath) => {
  return `https://mudmykola.github.io/test-api${imagePath}`;
};

onMounted(fetchPosts);
watch(filteredPosts, () => {
  currentPage.value = 1;
});
</script>

<style>
.modal {
  max-height: 80vh;
}

</style>