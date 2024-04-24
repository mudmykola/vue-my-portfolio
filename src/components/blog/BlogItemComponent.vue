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
        <div v-for="post in paginatedPosts" :key="post.id" class="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <img height="185" width="180" :src="getPostImageUrl(post.image)" :alt="post.title" class=" h-[185px] w-full object-cover">
          <div class="p-4 bg-default h-full">
            <h2 class="text-xl font-semibold mb-2 overflow-hidden line-clamp-2">{{ post.title }}</h2>
            <p class="text-gray-600 overflow-hidden line-clamp-2">{{ post.excerpt }}</p>
            <div class="flex justify-between mt-4">
              <span class="text-gray-500">{{ formatDate(post.date) }}</span>
              <button @click="openModal(post)" class="text-blue-500 post-btn__readme">{{ readMore }}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-8 gap-5">
        <button @click="prevPage" :disabled="currentPage === 1"
                class="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg bg-c107">
          {{ btnPrev }}
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg bg-c107">
          {{ btnNext }}
        </button>
      </div>
      <div v-if="selectedPost" class="fixed inset-0 z-50 flex items-center justify-center ">
        <div class="fixed inset-0 bg-black opacity-50"></div>
        <div class="fixed inset-0 flex items-center justify-center">
          <div class="modal bg-[#fff]  h-max max-w-3xl rounded-lg overflow-y-auto z-10 shadow-lg absolute top-[2%]">
            <div class="relative">
              <img :src="getPostImageUrl(selectedPost.image)" :alt="selectedPost.title"
                   class="h-auto w-full object-contain">
              <button @click="closeModal"
                      class="absolute top-4 right-4 text-c107 hover:text-red-800 focus:outline-none text-lg">
                {{ btnClose }}
              </button>
            </div>
            <div class="p-6">
              <h2 class="text-2xl font-semibold mb-4">{{ selectedPost.title }}</h2>
              <p class="text-gray-600 mb-4">{{ selectedPost.content }}</p>
              <div class="flex justify-between">
                <span class="text-gray-500">{{ formatDate(selectedPost.date) }}</span>
                <span class="text-gray-500 bg-c108 text-default px-2 rounded ">{{ selectedPost.category }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {usePosts} from './usePosts.js';

const {
  filterAllCategories,
  sortByDate,
  sortByTitle,
  sortByCategory,
  readMore,
  btnPrev,
  btnNext,
  posts,
  selectedPost,
  currentPage,
  searchQuery,
  sortBy,
  selectedCategory,
  totalPages,
  filteredPosts,
  reversedPaginatedPosts,
  paginatedPosts,
  prevPage,
  nextPage,
  btnClose,
  categories,
  openModal,
  closeModal,
  formatDate,
  fetchPosts,
  getPostImageUrl,
} = usePosts();
</script>

<style lang="scss">
@import "style.scss";
</style>