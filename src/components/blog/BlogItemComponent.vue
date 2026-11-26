<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';
import {
  faArrowLeft,
  faArrowRight,
  faCalendarDays,
  faChevronDown,
  faClock,
  faMagnifyingGlass,
  faRotateLeft,
  faTags,
} from '@fortawesome/free-solid-svg-icons';
import { usePosts } from './usePosts.js';

const props = defineProps({
  initialPosts: { type: Array, default: null },
});

const {
  posts: allPosts,
  sortByDate,
  sortByTitle,
  sortByCategory,
  btnPrev,
  btnNext,
  loading,
  error,
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
  topicCounts,
} = usePosts({
  initialPosts: props.initialPosts,
  initialLoading: !Array.isArray(props.initialPosts),
});

const posts = computed(() => paginatedPosts.value ?? []);
const featuredPost = computed(() => posts.value[0] ?? null);
const remainingPosts = computed(() => posts.value.slice(1));
const pageOffset = computed(() => (currentPage.value - 1) * 6);
const totalPostCount = computed(() => allPosts.value.length);
const topicCount = computed(() => categories.value.length);
const visibleTopicCount = ref(0);
const topicFilterRow = ref(null);
const topicMeasureRow = ref(null);
const topicOverflowMeasure = ref(null);
const topicOverflowButton = ref(null);
const topicResetButton = ref(null);
const topicSearchInput = ref(null);
const isTopicMenuOpen = ref(false);
const topicSearchQuery = ref('');
let topicResizeObserver;

const orderedCategories = computed(() => {
  if (!selectedCategory.value) return categories.value;

  return [
    selectedCategory.value,
    ...categories.value.filter(
      (category) => category !== selectedCategory.value
    ),
  ];
});
const visibleCategories = computed(() =>
  orderedCategories.value.slice(0, visibleTopicCount.value)
);
const hiddenTopicCount = computed(() =>
  Math.max(0, categories.value.length - visibleCategories.value.length)
);
const filteredTopicOptions = computed(() => {
  const query = topicSearchQuery.value.trim().toLocaleLowerCase();

  return categories.value.filter((category) =>
    category.toLocaleLowerCase().includes(query)
  );
});

const normalizedTopic = (topic) =>
  String(topic || '')
    .trim()
    .toLocaleLowerCase();
const topicPostCount = (topic) =>
  topicCounts.value.get(normalizedTopic(topic)) || 0;

const updateVisibleTopicCount = async () => {
  await nextTick();

  const row = topicFilterRow.value;
  const measureRow = topicMeasureRow.value;
  const overflowMeasure = topicOverflowMeasure.value;
  if (!row || !measureRow || !overflowMeasure) return;

  const measuredAll = measureRow.querySelector('[data-topic-all]');
  const measuredTopics = new Map(
    [...measureRow.querySelectorAll('[data-topic-key]')].map((button) => [
      button.dataset.topicKey,
      button.getBoundingClientRect().width,
    ])
  );
  if (!measuredAll) return;

  const availableWidth = row.clientWidth;
  const gap = Number.parseFloat(getComputedStyle(row).columnGap) || 0;
  const allWidth = measuredAll.getBoundingClientRect().width;
  const resetWidth = topicResetButton.value?.getBoundingClientRect().width || 0;
  const total = orderedCategories.value.length;
  let fittedCount = 0;
  let usedWidth = allWidth;

  for (let index = 0; index <= total; index += 1) {
    const hiddenCount = total - index;
    const overflowCount = overflowMeasure.querySelector(
      '[data-topic-overflow-count]'
    );
    if (overflowCount) overflowCount.textContent = `+${hiddenCount}`;
    const overflowWidth = overflowMeasure.getBoundingClientRect().width;
    const requiredWidth =
      usedWidth +
      (hiddenCount > 0 ? gap + overflowWidth : 0) +
      (resetWidth > 0 ? gap + resetWidth : 0);

    if (requiredWidth <= availableWidth) {
      fittedCount = index;
      if (index < total) {
        usedWidth +=
          gap +
          (measuredTopics.get(
            normalizedTopic(orderedCategories.value[index])
          ) || 0);
      }
      continue;
    }

    break;
  }

  visibleTopicCount.value = fittedCount;
};

const openTopicMenu = async () => {
  isTopicMenuOpen.value = true;
  await nextTick();
  topicSearchInput.value?.focus();
};

const closeTopicMenu = (restoreFocus = false) => {
  isTopicMenuOpen.value = false;
  topicSearchQuery.value = '';

  if (restoreFocus) {
    nextTick(() => topicOverflowButton.value?.focus());
  }
};

const handleTopicOutsidePointer = (event) => {
  if (!topicFilterRow.value?.contains(event.target)) closeTopicMenu();
};

const handleTopicMenuKeydown = (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeTopicMenu(true);
  }
};

watch([categories, selectedCategory, searchQuery], updateVisibleTopicCount, {
  flush: 'post',
});

onMounted(() => {
  document.addEventListener('pointerdown', handleTopicOutsidePointer);

  if ('ResizeObserver' in window && topicFilterRow.value) {
    topicResizeObserver = new ResizeObserver(updateVisibleTopicCount);
    topicResizeObserver.observe(topicFilterRow.value);
  } else {
    window.addEventListener('resize', updateVisibleTopicCount);
  }

  updateVisibleTopicCount();
});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleTopicOutsidePointer);
  topicResizeObserver?.disconnect();
  window.removeEventListener('resize', updateVisibleTopicCount);
});

const primaryTopic = (post) =>
  (Array.isArray(post?.tags) && post.tags.find((tag) => String(tag).trim())) ||
  post?.category ||
  'Article';

const setCategory = (category, restoreFocus = false) => {
  selectedCategory.value = category;
  closeTopicMenu(restoreFocus);
};

const resetFilters = () => {
  selectedCategory.value = '';
  searchQuery.value = '';
  sortBy.value = 'date';
  closeTopicMenu();
};

const readTime = (post) => {
  const words = String(post?.content || post?.excerpt || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 180));
};

const getExcerpt = (post, limit = 220) => {
  const text = String(post?.excerpt || post?.content || '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= limit) return text;

  const shortened = text
    .slice(0, limit)
    .replace(/\s+\S*$/, '')
    .trimEnd();
  return `${shortened}…`;
};

const formatEditorialDate = (date) => {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return '';

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
    .format(parsedDate)
    .replaceAll('/', '.');
};

const getArticleHref = (post) => {
  const handle =
    post?.handle ||
    String(post?.title || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  return `/blog/${handle}`;
};

const postNumber = (index) =>
  String(pageOffset.value + index + 1).padStart(2, '0');
</script>

<template>
  <section class="blog-shell" aria-labelledby="blog-title">
    <header class="blog-intro">
      <div class="blog-intro__copy">
        <p class="blog-eyebrow">Insights</p>
        <h1 id="blog-title">Front-End Engineering Notes and Articles</h1>
        <p class="blog-intro__subtitle">
          Structured notes, case studies, and practical front-end updates.
        </p>
      </div>

      <div class="blog-stats" role="group" aria-label="Blog statistics">
        <div class="blog-stats__item">
          <strong>{{ totalPostCount ? totalPostCount : '—' }}</strong>
          <span>posts</span>
        </div>
        <span class="blog-stats__divider" aria-hidden="true">/</span>
        <div class="blog-stats__item">
          <strong>{{
            topicCount ? String(topicCount).padStart(2, '0') : '—'
          }}</strong>
          <span>topics</span>
        </div>
      </div>
    </header>

    <article v-if="featuredPost && !loading && !error" class="blog-featured">
      <div class="blog-featured__index" aria-hidden="true">
        <span class="blog-featured__number">{{ postNumber(0) }}</span>
        <span class="blog-featured__slash" aria-hidden="true"></span>
        <span class="blog-featured__total">{{ totalPostCount }}</span>
      </div>

      <div class="blog-featured__content">
        <div class="blog-story-meta">
          <span class="blog-story-meta__category">{{
            primaryTopic(featuredPost)
          }}</span>
          <span class="blog-story-meta__separator" aria-hidden="true"></span>
          <template v-if="featuredPost.author">
            <span class="blog-story-meta__author">{{
              featuredPost.author
            }}</span>
            <span class="blog-story-meta__separator" aria-hidden="true"></span>
          </template>
          <time :datetime="featuredPost.date">
            {{ formatEditorialDate(featuredPost.date) }}
          </time>
          <span class="blog-story-meta__separator" aria-hidden="true"></span>
          <span>{{ readTime(featuredPost) }} min read</span>
        </div>

        <h2 class="blog-featured__title">
          <router-link :to="getArticleHref(featuredPost)">
            {{ featuredPost.title }}
          </router-link>
        </h2>
        <p class="blog-featured__excerpt">{{ getExcerpt(featuredPost) }}</p>
        <router-link :to="getArticleHref(featuredPost)" class="blog-read-link">
          Read article
          <font-awesome-icon :icon="faArrowRight" aria-hidden="true" />
        </router-link>
      </div>
    </article>

    <section
      v-else-if="loading"
      class="blog-loading__featured"
      aria-label="Loading featured article"
      aria-busy="true"
    >
      <span
        class="blog-skeleton blog-skeleton--number"
        aria-hidden="true"
      ></span>
      <div class="blog-loading__copy" aria-hidden="true">
        <span class="blog-skeleton blog-skeleton--meta"></span>
        <span class="blog-skeleton blog-skeleton--title"></span>
        <span class="blog-skeleton blog-skeleton--excerpt"></span>
      </div>
    </section>

    <p v-else-if="error" class="blog-state blog-state--error" role="alert">
      {{ error }}
    </p>

    <div class="blog-toolbar" role="group" aria-label="Filter articles">
      <label class="blog-search">
        <font-awesome-icon :icon="faMagnifyingGlass" aria-hidden="true" />
        <span class="sr-only">Search articles</span>
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search title, content, author, tags"
          autocomplete="off"
        />
      </label>

      <label class="blog-sort">
        <span class="sr-only">Sort articles</span>
        <select v-model="sortBy" aria-label="Sort articles">
          <option value="date">{{ sortByDate }}</option>
          <option value="title">{{ sortByTitle }}</option>
          <option value="category">{{ sortByCategory }}</option>
        </select>
      </label>

      <span class="blog-toolbar__divider" aria-hidden="true"></span>

      <nav
        ref="topicFilterRow"
        class="blog-categories"
        aria-label="Article topics"
        @keydown.esc="handleTopicMenuKeydown"
      >
        <button
          type="button"
          class="blog-category"
          :class="{ 'blog-category--active': !selectedCategory }"
          :aria-pressed="!selectedCategory"
          @click="setCategory('')"
        >
          <span class="blog-category__label">All</span>
        </button>
        <button
          v-for="category in visibleCategories"
          :key="category"
          type="button"
          class="blog-category"
          :class="{ 'blog-category--active': selectedCategory === category }"
          :aria-pressed="selectedCategory === category"
          :title="category"
          @click="setCategory(category)"
        >
          <span class="blog-category__label">{{ category }}</span>
        </button>
        <button
          v-if="hiddenTopicCount"
          ref="topicOverflowButton"
          type="button"
          class="blog-category blog-category--overflow"
          :aria-expanded="isTopicMenuOpen"
          :aria-label="`Show ${hiddenTopicCount} more topics`"
          aria-controls="blog-topic-menu"
          @click="isTopicMenuOpen ? closeTopicMenu() : openTopicMenu()"
        >
          <font-awesome-icon :icon="faTags" aria-hidden="true" />
          <span>+{{ hiddenTopicCount }}</span>
          <font-awesome-icon
            class="blog-category__chevron"
            :class="{ 'blog-category__chevron--open': isTopicMenuOpen }"
            :icon="faChevronDown"
            aria-hidden="true"
          />
        </button>

        <section
          v-if="isTopicMenuOpen"
          id="blog-topic-menu"
          class="blog-topic-menu"
          aria-label="All article topics"
          @keydown.esc.stop.prevent="handleTopicMenuKeydown"
        >
          <header class="blog-topic-menu__header">
            <span>All topics</span>
            <span class="blog-topic-menu__count">
              {{ String(topicCount).padStart(2, '0') }}
            </span>
          </header>

          <label class="blog-topic-search">
            <font-awesome-icon :icon="faMagnifyingGlass" aria-hidden="true" />
            <span class="sr-only">Search topics</span>
            <input
              ref="topicSearchInput"
              v-model="topicSearchQuery"
              type="search"
              placeholder="Search topics"
              autocomplete="off"
            />
          </label>

          <div class="blog-topic-options" role="group" aria-label="Topics">
            <button
              v-for="category in filteredTopicOptions"
              :key="category"
              type="button"
              class="blog-topic-option"
              :class="{
                'blog-topic-option--active': selectedCategory === category,
              }"
              :aria-pressed="selectedCategory === category"
              @click="setCategory(category, true)"
            >
              <span>{{ category }}</span>
              <span class="blog-topic-option__count">
                {{ topicPostCount(category) }}
              </span>
            </button>
            <p
              v-if="!filteredTopicOptions.length"
              class="blog-topic-menu__empty"
              role="status"
            >
              No topics match this search.
            </p>
          </div>
        </section>

        <div
          ref="topicMeasureRow"
          class="blog-categories__measure"
          aria-hidden="true"
          inert
        >
          <button
            type="button"
            class="blog-category"
            data-topic-all
            tabindex="-1"
          >
            <span class="blog-category__label">All</span>
          </button>
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="blog-category"
            :data-topic-key="normalizedTopic(category)"
            tabindex="-1"
          >
            <span class="blog-category__label">{{ category }}</span>
          </button>
          <button
            ref="topicOverflowMeasure"
            type="button"
            class="blog-category blog-category--overflow"
            tabindex="-1"
          >
            <font-awesome-icon :icon="faTags" aria-hidden="true" />
            <span data-topic-overflow-count>+{{ categories.length }}</span>
            <font-awesome-icon
              class="blog-category__chevron"
              :icon="faChevronDown"
              aria-hidden="true"
            />
          </button>
        </div>

        <button
          v-if="selectedCategory || searchQuery"
          ref="topicResetButton"
          type="button"
          class="blog-category blog-category--reset"
          @click="resetFilters"
        >
          <font-awesome-icon :icon="faRotateLeft" aria-hidden="true" />
          Reset
        </button>
      </nav>
    </div>

    <p class="blog-results" role="status" aria-live="polite">
      <template v-if="loading">Loading articles…</template>
      <template v-else>
        {{ filteredCount }} {{ filteredCount === 1 ? 'post' : 'posts' }} found
      </template>
    </p>

    <section
      v-if="loading"
      class="blog-loading__list"
      aria-label="Loading article list"
      aria-busy="true"
    >
      <div
        v-for="item in 5"
        :key="item"
        class="blog-loading__row"
        aria-hidden="true"
      >
        <span class="blog-skeleton blog-skeleton--row-number"></span>
        <span class="blog-skeleton blog-skeleton--row-copy"></span>
        <span class="blog-skeleton blog-skeleton--arrow"></span>
      </div>
    </section>

    <template v-else-if="!error">
      <p v-if="!featuredPost" class="blog-state">
        No posts found for selected filters.
      </p>

      <div v-if="remainingPosts.length" class="blog-list">
        <router-link
          v-for="(post, index) in remainingPosts"
          :key="post.id || post.handle || post.title"
          :to="getArticleHref(post)"
          class="blog-row"
          :aria-label="`Read article: ${post.title}`"
        >
          <span class="blog-row__number" aria-hidden="true">{{
            postNumber(index + 1)
          }}</span>

          <div class="blog-row__content">
            <div class="blog-row__meta">
              <span class="blog-story-meta__category">{{
                primaryTopic(post)
              }}</span>
              <span v-if="post.author">{{ post.author }}</span>
              <time :datetime="post.date">{{
                formatEditorialDate(post.date)
              }}</time>
              <span>{{ readTime(post) }} min read</span>
            </div>
            <h3>{{ post.title }}</h3>
            <p>{{ getExcerpt(post, 190) }}</p>
          </div>

          <span class="blog-row__arrow" aria-hidden="true">
            <font-awesome-icon :icon="faArrowRight" aria-hidden="true" />
          </span>
        </router-link>
      </div>

      <footer
        v-if="totalPages > 1"
        class="blog-pagination"
        aria-label="Blog pagination"
      >
        <button
          type="button"
          class="blog-pagination__button"
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          <font-awesome-icon :icon="faArrowLeft" aria-hidden="true" />
          {{ btnPrev }}
        </button>

        <span>Page {{ currentPage }} / {{ totalPages }}</span>

        <button
          type="button"
          class="blog-pagination__button blog-pagination__button--next"
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          {{ btnNext }}
          <font-awesome-icon :icon="faArrowRight" aria-hidden="true" />
        </button>
      </footer>
    </template>
  </section>
</template>

<style scoped lang="scss">
@use 'style';
</style>
