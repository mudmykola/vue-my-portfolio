<script setup>
import { computed } from 'vue';
import {
  faArrowLeft,
  faArrowRight,
  faCalendarDays,
  faClock,
  faMagnifyingGlass,
  faRotateLeft,
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import { usePosts } from './usePosts.js';
import BlogPostModal from '../blog/BlogPostModal.vue';

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

const posts = computed(() => paginatedPosts.value ?? []);

const setCategory = (category) => {
  selectedCategory.value = category;
};

const resetFilters = () => {
  selectedCategory.value = '';
  searchQuery.value = '';
  sortBy.value = 'date';
};

const readTime = (post) => {
  const words = String(post?.content || post?.excerpt || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 180));
};

const getCardClass = (index, total) => {
  if (index === 0) {
    return 'blog-card--featured';
  }

  // Non-featured cards pair up as standard (7 cols) + small (5 cols) = 12.
  // An even rest-index starts a new pair, so if it is also the last card it
  // has no partner — stretch it full width to avoid an empty grid cell.
  const restIndex = index - 1;
  const isLast = index === total - 1;

  if (isLast && restIndex % 2 === 0) {
    return 'blog-card--wide';
  }

  return restIndex % 2 === 0 ? 'blog-card--standard' : 'blog-card--small';
};

const isFeaturedCard = (index) => index === 0;
</script>

<template>
  <section class="blog-shell">
    <p v-if="loading" class="blog-state">Loading posts...</p>
    <p v-else-if="error" class="blog-state">{{ error }}</p>

    <template v-else>
      <header class="blog-controls blog-surface">
        <div class="blog-controls__meta">
          <span class="blog-kicker">Insights</span>
          <h3>Articles</h3>
          <p>{{ filteredCount }} posts found</p>
        </div>

        <label class="blog-field blog-field--search">
          <font-awesome-icon :icon="faMagnifyingGlass" />
          <input
            v-model="searchQuery"
            type="text"
            class="blog-control"
            placeholder="Search title, content, category"
          />
        </label>

        <label class="blog-sort">
          <span class="blog-kicker">Sort</span>
          <select v-model="sortBy" class="blog-field blog-control">
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
          :class="
            selectedCategory === category
              ? 'app-btn--primary'
              : 'app-btn--ghost'
          "
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

      <div v-if="posts.length" class="blog-grid">
        <article
          v-for="(post, index) in posts"
          :key="post.id"
          class="blog-card blog-surface"
          :class="getCardClass(index, posts.length)"
          role="button"
          tabindex="0"
          :aria-label="`Open ${post.title}`"
          @click="openModal(post)"
          @keydown.enter="openModal(post)"
        >
          <div class="blog-card__media">
            <img
              :src="getPostImageUrl(post.image)"
              :alt="post.title"
              width="1200"
              height="630"
              :loading="isFeaturedCard(index) ? 'eager' : 'lazy'"
              :fetchpriority="isFeaturedCard(index) ? 'high' : 'auto'"
              decoding="async"
            />

            <span class="blog-chip blog-chip--accent blog-card__category">
              <font-awesome-icon :icon="faTag" />
              {{ post.category }}
            </span>
          </div>

          <div class="blog-card__body">
            <div class="blog-card__meta">
              <span class="blog-chip">
                <font-awesome-icon :icon="faCalendarDays" />
                {{ formatDate(post.date) }}
              </span>

              <span class="blog-chip">
                <font-awesome-icon :icon="faClock" />
                {{ readTime(post) }} min read
              </span>
            </div>

            <h3>{{ post.title }}</h3>
            <p>{{ post.excerpt }}</p>

            <button
              type="button"
              class="blog-card__link"
              @click.stop="openModal(post)"
            >
              {{ readMore }}
              <font-awesome-icon :icon="faArrowRight" />
            </button>
          </div>
        </article>
      </div>

      <p v-else class="blog-state">No posts found for selected filters.</p>

      <footer class="blog-pagination">
        <button
          type="button"
          class="app-btn app-btn--primary"
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          <font-awesome-icon :icon="faArrowLeft" />
          {{ btnPrev }}
        </button>

        <span>Page {{ currentPage }} / {{ totalPages }}</span>

        <button
          type="button"
          class="app-btn app-btn--primary"
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          {{ btnNext }}
          <font-awesome-icon :icon="faArrowRight" />
        </button>
      </footer>

      <BlogPostModal
        v-if="selectedPost"
        :post="selectedPost"
        :close-label="btnClose"
        :read-time="readTime"
        :format-date="formatDate"
        :get-post-image-url="getPostImageUrl"
        @close="closeModal"
      />
    </template>
  </section>
</template>

<style scoped lang="scss">
@use 'style';
</style>
