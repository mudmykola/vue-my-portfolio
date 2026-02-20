<template>
  <section class="blog-shell">
    <p v-if="loading" class="text-default">Loading posts...</p>
    <p v-else-if="error" class="text-default">{{ error }}</p>

    <template v-else>
      <header class="blog-controls">
        <div class="blog-controls__meta">
          <h3>Articles</h3>
          <p>{{ filteredCount }} posts found</p>
        </div>

        <label class="blog-search">
          <font-awesome-icon :icon="faMagnifyingGlass" />
          <input
            v-model="searchQuery"
            type="text"
            class="blog-control"
            placeholder="Search title, content, category"
          />
        </label>

        <label class="blog-sort">
          <span>Sort</span>
          <select v-model="sortBy" class="blog-control">
            <option value="date">{{ sortByDate }}</option>
            <option value="title">{{ sortByTitle }}</option>
            <option value="category">{{ sortByCategory }}</option>
          </select>
        </label>
      </header>

      <div class="blog-categories">
        <button
          type="button"
          class="app-btn app-btn--sm"
          :class="!selectedCategory ? 'app-btn--primary' : 'app-btn--ghost'"
          @click="setCategory('')"
        >
          {{ filterAllCategories }}
        </button>
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          class="app-btn app-btn--sm"
          :class="selectedCategory === category ? 'app-btn--primary' : 'app-btn--ghost'"
          @click="setCategory(category)"
        >
          {{ category }}
        </button>
        <button
          v-if="selectedCategory || searchQuery"
          type="button"
          class="app-btn app-btn--sm app-btn--ghost"
          @click="resetFilters"
        >
          <font-awesome-icon :icon="faRotateLeft" />
          Reset
        </button>
      </div>

      <div v-if="featuredPost" class="blog-content">
        <article class="blog-featured">
          <img :src="getPostImageUrl(featuredPost.image)" :alt="featuredPost.title" loading="lazy" />
          <div class="blog-featured__body">
            <div class="blog-featured__top">
              <span class="blog-chip blog-chip--accent">
                <font-awesome-icon :icon="faTag" />
                {{ featuredPost.category }}
              </span>
              <span class="blog-chip">
                <font-awesome-icon :icon="faCalendarDays" />
                {{ formatDate(featuredPost.date) }}
              </span>
              <span class="blog-chip">
                <font-awesome-icon :icon="faClock" />
                {{ readTime(featuredPost) }} min read
              </span>
            </div>

            <h3>{{ featuredPost.title }}</h3>
            <p>{{ featuredPost.excerpt }}</p>

            <button type="button" class="app-btn app-btn--primary app-btn--sm" @click="openModal(featuredPost)">
              {{ readMore }}
            </button>
          </div>
        </article>

        <div class="blog-grid">
          <article v-for="post in gridPosts" :key="post.id" class="blog-card">
            <img :src="getPostImageUrl(post.image)" :alt="post.title" loading="lazy" />
            <div class="blog-card__body">
              <span class="blog-chip blog-chip--accent">
                <font-awesome-icon :icon="faTag" />
                {{ post.category }}
              </span>

              <h4>{{ post.title }}</h4>
              <p>{{ post.excerpt }}</p>

              <footer>
                <span class="blog-chip">
                  <font-awesome-icon :icon="faCalendarDays" />
                  {{ formatDate(post.date) }}
                </span>
                <button type="button" class="app-btn app-btn--sm app-btn--ghost" @click="openModal(post)">
                  {{ readMore }}
                </button>
              </footer>
            </div>
          </article>
        </div>
      </div>

      <p v-else class="text-default">No posts found for selected filters.</p>

      <footer class="blog-pagination">
        <button type="button" class="app-btn app-btn--primary" :disabled="currentPage === 1" @click="prevPage">
          <font-awesome-icon :icon="faArrowLeft" />
          {{ btnPrev }}
        </button>
        <span>Page {{ currentPage }} / {{ totalPages }}</span>
        <button type="button" class="app-btn app-btn--primary" :disabled="currentPage === totalPages" @click="nextPage">
          {{ btnNext }}
          <font-awesome-icon :icon="faArrowRight" />
        </button>
      </footer>

      <teleport to="body">
        <section v-if="selectedPost" class="blog-modal" @click.self="closeModal">
          <article class="blog-modal__dialog" role="dialog" aria-modal="true" :aria-label="selectedPost.title">
            <button type="button" class="blog-modal__close app-btn app-btn--icon app-btn--ghost" :aria-label="btnClose" @click="closeModal">
              <font-awesome-icon :icon="faXmark" />
            </button>

            <img :src="getPostImageUrl(selectedPost.image)" :alt="selectedPost.title" class="blog-modal__image" />

            <div class="blog-modal__body">
              <div class="blog-modal__head">
                <span class="blog-chip blog-chip--accent">
                  <font-awesome-icon :icon="faTag" />
                  {{ selectedPost.category }}
                </span>
                <span class="blog-chip">
                  <font-awesome-icon :icon="faCalendarDays" />
                  {{ formatDate(selectedPost.date) }}
                </span>
                <span class="blog-chip">
                  <font-awesome-icon :icon="faClock" />
                  {{ readTime(selectedPost) }} min read
                </span>
              </div>

              <h2>{{ selectedPost.title }}</h2>
              <p class="blog-modal__content">{{ selectedPost.content }}</p>
            </div>
          </article>
        </section>
      </teleport>
    </template>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue';
import {
  faArrowLeft,
  faArrowRight,
  faCalendarDays,
  faClock,
  faMagnifyingGlass,
  faRotateLeft,
  faTag,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { usePosts } from './usePosts.js';

const {
  filterAllCategories,
  sortByDate,
  sortByTitle,
  sortByCategory,
  readMore,
  btnPrev,
  btnNext,
  btnClose,
  loading,
  error,
  selectedPost,
  currentPage,
  searchQuery,
  sortBy,
  selectedCategory,
  totalPages,
  filteredCount,
  paginatedPosts,
  prevPage,
  nextPage,
  categories,
  openModal,
  closeModal,
  formatDate,
  getPostImageUrl,
} = usePosts();

const featuredPost = computed(() => paginatedPosts.value[0] ?? null);
const gridPosts = computed(() => paginatedPosts.value.slice(1));

const setCategory = (category) => {
  selectedCategory.value = category;
};

const resetFilters = () => {
  selectedCategory.value = '';
  searchQuery.value = '';
  sortBy.value = 'date';
};

const readTime = (post) => {
  const words = String(post?.content || post?.excerpt || '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
};

const closeOnEscape = (event) => {
  if (event.key === 'Escape') closeModal();
};

onMounted(() => {
  window.addEventListener('keydown', closeOnEscape);
});

onUnmounted(() => {
  window.removeEventListener('keydown', closeOnEscape);
  document.body.style.overflow = '';
});

watch(selectedPost, (post) => {
  document.body.style.overflow = post ? 'hidden' : '';
});
</script>

<style lang="scss">
@import 'style.scss';
</style>
