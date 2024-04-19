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
        <div v-for="post in paginatedPosts" :key="post.id" class="bg-white rounded-lg shadow-md overflow-hidden">
          <img  :src="post.image" :alt="post.title" class="h-48 w-full object-cover ">
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
          <div class="bg-[#fff]  h-max max-w-3xl rounded-lg overflow-hidden z-10 shadow-lg absolute top-[2%]">
            <div class="relative">
              <img :src="selectedPost.image" :alt="selectedPost.title" class="h-64 w-full object-cover">
              <button @click="closeModal" class="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
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
import {computed, ref, watch} from 'vue';

const filterAllCategories = ref('All Categories');
const sortByDate = ref('Date');
const sortByTitle = ref('Title');
const sortByCategory = ref('Category');
const readMore = ref('Read more');
const btnPrev = ref('Previous');
const btnNext = ref('Next');

const posts = ref([
  {
    id: 1,
    title: 'Some little ways I’m using CSS :has() in the real world',
    image: 'https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/03/has-pseudo-example.png?fit=1200%2C600&ssl=1',
    excerpt: 'There’s a lot of chatter around the new(ish) :has() pseudo-class. ',
    content: 'There’s a lot of chatter around the new(ish) :has() pseudo-class. It’s something we’ve been crying out for, for years: being able to select parent elements!A useful mental model for :has() is that you are querying the parent’s children’s state and/or presence rather than selecting the parent from the children themselves. I like that. It makes a lot of sense.I’m not 100% convinced :has() is the silver bullet others might claim it is though. I personally still utilise CUBE exceptions more regularly, but I am also in the privileged position where projects I work on in the studio don’t restrict access to the markup. I see :has() as being more useful for little tweaks more than anything, but if you don’t have access to markup, it really is a silver bullet.With all that in mind, I thought I’d produce some low fidelity examples of how I’ve been using :has() lately on proper client projects to give you some real world stuff to look at. Let’s dig in.',
    date: '2024-04-17',
    category: 'Css'
  },
  {
    id: 2,
    title: 'Sample Post 1',
    image: 'https://via.placeholder.com/300',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    content: 'Full content of the sample post 1...',
    date: '2024-04-18',
    category: 'Technology'
  },
  {
    id: 3,
    title: 'Sample Post 1',
    image: 'https://via.placeholder.com/300',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    content: 'Full content of the sample post 1...',
    date: '2022-04-01',
    category: 'Technology'
  },
  {
    id: 4,
    title: 'Post 1',
    image: 'https://via.placeholder.com/300',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    content: 'Full content of the sample post 1...',
    date: '2022-04-01',
    category: 'Technology'
  },
  {
    id: 5,
    title: 'Sample Post 2 vue',
    image: 'https://via.placeholder.com/300',
    excerpt: 'Lorem ipsum dolor sit amet, vue consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    content: 'Full content of the sample post 1...',
    date: '2022-04-01',
    category: 'Technology'
  },
  {
    id: 6,
    title: 'Sample Post 1',
    image: 'https://via.placeholder.com/300',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    content: 'Full content of the sample post 1...',
    date: '2022-04-01',
    category: 'Technology'
  },
  {
    id: 7,
    title: 'Sample Post 1',
    image: 'https://via.placeholder.com/300',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    content: 'Full content of the sample post 1...',
    date: '2022-04-01',
    category: 'Vue'
  },
]);

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
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

watch(filteredPosts, () => {
  currentPage.value = 1;
});
</script>