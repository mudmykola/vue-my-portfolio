<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  faArrowRight,
  faCalendarDays,
  faChevronDown,
  faClock,
  faMagnifyingGlass,
  faNewspaper,
  faRotateLeft,
  faTags,
} from '@fortawesome/free-solid-svg-icons';
import { usePosts } from './usePosts.js';
import AppPagination from '../shared/AppPagination.vue';

const props = defineProps({
  initialPosts: { type: Array, default: null },
  initialPage: { type: Number, default: null },
});

const route = useRoute();
const router = useRouter();

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
  categories,
  topicCounts,
} = usePosts({
  initialPosts: props.initialPosts,
  initialLoading: !Array.isArray(props.initialPosts),
});

const pageFromQuery = (value) => {
  const parsed = Number(Array.isArray(value) ? value[0] : value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
};

currentPage.value = Math.min(
  pageFromQuery(props.initialPage ?? route.query.page),
  totalPages.value
);

watch(currentPage, (page) => {
  const nextPage = Math.min(Math.max(page, 1), totalPages.value);
  if (nextPage !== page) {
    currentPage.value = nextPage;
    return;
  }

  const queryPage = page > 1 ? String(page) : undefined;
  if (route.query.page === queryPage) return;

  router.push({
    query: { ...route.query, page: queryPage },
  });
});

watch(
  () => route.query.page,
  (queryPage) => {
    const nextPage = Math.min(pageFromQuery(queryPage), totalPages.value);
    if (currentPage.value !== nextPage) currentPage.value = nextPage;
  }
);

onMounted(() => {
  const normalizedPage =
    currentPage.value > 1 ? String(currentPage.value) : undefined;
  if (route.query.page === normalizedPage) return;

  router.replace({
    query: { ...route.query, page: normalizedPage },
  });
});

const posts = computed(() => paginatedPosts.value ?? []);
const featuredPost = computed(() =>
  currentPage.value === 1 && !selectedCategory.value && !searchQuery.value
    ? (posts.value[0] ?? null)
    : null
);
const remainingPosts = computed(() =>
  featuredPost.value ? posts.value.slice(1) : posts.value
);
const pageOffset = computed(() => (currentPage.value - 1) * 6);
const totalPostCount = computed(() => allPosts.value.length);
const topicCount = computed(() => categories.value.length);
const topicFilterRow = ref(null);
const topicOverflowButton = ref(null);
const topicMeasureRow = ref(null);
const topicSearchInput = ref(null);
const searchControl = ref(null);
const searchInput = ref(null);
const isTopicMenuOpen = ref(false);
const topicSearchQuery = ref('');
const isSearchSuggestionsOpen = ref(false);
const activeSearchSuggestionIndex = ref(-1);

const normalizedTopic = (topic) =>
  String(topic || '')
    .trim()
    .toLocaleLowerCase();
const topicPostCount = (topic) =>
  topicCounts.value.get(normalizedTopic(topic)) || 0;
const popularCategories = computed(() =>
  [...categories.value].sort(
    (a, b) => topicPostCount(b) - topicPostCount(a) || a.localeCompare(b)
  )
);

const orderedCategories = computed(() => {
  if (!selectedCategory.value) return popularCategories.value;

  return [
    selectedCategory.value,
    ...popularCategories.value.filter(
      (category) => category !== selectedCategory.value
    ),
  ];
});
// Start with a stable SSR count, then fit popular topics to the desktop row.
const visibleTopicCount = ref(3);
const visibleCategories = computed(() =>
  orderedCategories.value.slice(0, visibleTopicCount.value)
);
const filteredTopicOptions = computed(() => {
  const query = topicSearchQuery.value.trim().toLocaleLowerCase();

  return popularCategories.value.filter((category) =>
    category.toLocaleLowerCase().includes(query)
  );
});

const measureVisibleTopicCount = async () => {
  await nextTick();

  const row = topicFilterRow.value;
  const measurementItems = topicMeasureRow.value?.children;
  if (!row || !measurementItems?.length) return;

  const fixedControls = [
    row.querySelector('.blog-category--all'),
    topicOverflowButton.value,
    row.querySelector('.blog-category--reset'),
  ].filter(Boolean);
  const rowStyle = getComputedStyle(row);
  const gap = Number.parseFloat(rowStyle.columnGap) || 0;
  let availableWidth =
    row.clientWidth -
    fixedControls.reduce(
      (total, control) => total + control.getBoundingClientRect().width,
      0
    ) -
    gap * Math.max(0, fixedControls.length - 1);
  let fittedCount = 0;

  for (const item of measurementItems) {
    const nextWidth = item.getBoundingClientRect().width + gap;
    if (nextWidth > availableWidth) break;
    availableWidth -= nextWidth;
    fittedCount += 1;
  }

  // A few high-value topics stay visible on narrow screens; the full list is searchable.
  visibleTopicCount.value = window.matchMedia('(max-width: 640px)').matches
    ? Math.min(3, orderedCategories.value.length)
    : fittedCount;
};

const getPlainText = (value) =>
  String(value || '')
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

const searchablePosts = computed(() =>
  allPosts.value.map((post) => {
    const topics = Array.isArray(post?.tags)
      ? post.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : [];
    const title = String(post?.title || '');
    const excerpt = getPlainText(post?.excerpt);
    const content = getPlainText(post?.content);
    const author = String(post?.author || '');
    const category = String(post?.category || '');
    const searchText = [title, excerpt, content, author, category, ...topics]
      .join(' ')
      .toLocaleLowerCase();

    return {
      post,
      title,
      excerpt,
      author,
      topics: topics.length ? topics : [category].filter(Boolean),
      titleKey: title.toLocaleLowerCase(),
      searchText,
    };
  })
);

const searchSuggestionGroups = computed(() => {
  if (loading.value || error.value) return [];

  const query = searchQuery.value.trim().toLocaleLowerCase();
  const groups = [];

  if (!query) {
    const popularTopics = [...categories.value]
      .sort(
        (a, b) => topicPostCount(b) - topicPostCount(a) || a.localeCompare(b)
      )
      .slice(0, 4)
      .map((topic) => ({
        id: `topic:${normalizedTopic(topic)}`,
        type: 'topic',
        value: topic,
        label: topic,
        detail: `${topicPostCount(topic)} ${topicPostCount(topic) === 1 ? 'article' : 'articles'}`,
      }));

    if (popularTopics.length) {
      groups.push({ label: 'Popular topics', options: popularTopics });
    }
  } else {
    const matchingTopics = categories.value
      .filter((topic) => normalizedTopic(topic).includes(query))
      .sort((a, b) => {
        const aStartsWith = normalizedTopic(a).startsWith(query);
        const bStartsWith = normalizedTopic(b).startsWith(query);
        return (
          Number(bStartsWith) - Number(aStartsWith) ||
          topicPostCount(b) - topicPostCount(a) ||
          a.localeCompare(b)
        );
      })
      .slice(0, 4)
      .map((topic) => ({
        id: `topic:${normalizedTopic(topic)}`,
        type: 'topic',
        value: topic,
        label: topic,
        detail: `${topicPostCount(topic)} ${topicPostCount(topic) === 1 ? 'article' : 'articles'}`,
      }));

    if (matchingTopics.length) {
      groups.push({ label: 'Topics', options: matchingTopics });
    }

    const matchingArticles = searchablePosts.value
      .filter(({ searchText }) => searchText.includes(query))
      .sort((a, b) => {
        const relevance = (entry) => {
          if (entry.titleKey.startsWith(query)) return 0;
          if (entry.titleKey.includes(query)) return 1;
          if (
            entry.topics.some((topic) =>
              normalizedTopic(topic).startsWith(query)
            )
          ) {
            return 2;
          }
          return 3;
        };

        return (
          relevance(a) - relevance(b) ||
          new Date(b.post.date) - new Date(a.post.date)
        );
      })
      .slice(0, 3)
      .map(({ post, title }) => ({
        id: `article:${post.handle || title}`,
        type: 'article',
        post,
        label: title,
        detail: getExcerpt(post, 96),
        topic: primaryTopic(post),
      }));

    if (matchingArticles.length) {
      groups.push({ label: 'Articles', options: matchingArticles });
    }

    const matchingArticleCount = searchablePosts.value.filter(
      ({ searchText }) => searchText.includes(query)
    ).length;
    groups.push({
      label: 'Full-text search',
      options: [
        {
          id: `search:${query}`,
          type: 'search',
          label: `Search all articles for “${searchQuery.value.trim()}”`,
          detail: `${matchingArticleCount} ${matchingArticleCount === 1 ? 'matching article' : 'matching articles'}`,
        },
      ],
    });
  }

  let index = 0;
  return groups.map((group) => ({
    ...group,
    options: group.options.map((option) => ({
      ...option,
      index: index++,
      optionId: `blog-search-option-${index - 1}`,
    })),
  }));
});

const flattenedSearchSuggestions = computed(() =>
  searchSuggestionGroups.value.flatMap((group) => group.options)
);
const activeSearchSuggestionId = computed(
  () =>
    flattenedSearchSuggestions.value[activeSearchSuggestionIndex.value]
      ?.optionId
);

watch(searchQuery, () => {
  activeSearchSuggestionIndex.value = -1;
  if (
    typeof document !== 'undefined' &&
    document.activeElement === searchInput.value
  ) {
    isSearchSuggestionsOpen.value = true;
  }
});

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

const openSearchSuggestions = () => {
  closeTopicMenu();
  isSearchSuggestionsOpen.value = true;
};

const closeSearchSuggestions = () => {
  isSearchSuggestionsOpen.value = false;
  activeSearchSuggestionIndex.value = -1;
};

const selectSearchSuggestion = (option) => {
  if (option.type === 'topic') {
    setCategory(option.value);
    searchQuery.value = '';
    closeSearchSuggestions();
    searchInput.value?.blur();
    return;
  }

  if (option.type === 'article') {
    closeSearchSuggestions();
    router.push(getArticleHref(option.post));
    return;
  }

  selectedCategory.value = '';
  closeSearchSuggestions();
  searchInput.value?.blur();
};

const handleSearchKeydown = (event) => {
  const suggestions = flattenedSearchSuggestions.value;

  if (event.key === 'ArrowDown' && suggestions.length) {
    event.preventDefault();
    if (!isSearchSuggestionsOpen.value) openSearchSuggestions();
    activeSearchSuggestionIndex.value =
      (activeSearchSuggestionIndex.value + 1) % suggestions.length;
    return;
  }

  if (event.key === 'ArrowUp' && suggestions.length) {
    event.preventDefault();
    if (!isSearchSuggestionsOpen.value) openSearchSuggestions();
    activeSearchSuggestionIndex.value =
      activeSearchSuggestionIndex.value <= 0
        ? suggestions.length - 1
        : activeSearchSuggestionIndex.value - 1;
    return;
  }

  if (event.key === 'Enter') {
    const option =
      suggestions[activeSearchSuggestionIndex.value] ||
      suggestions.find(({ type }) => type === 'search');
    if (!option) return;
    event.preventDefault();
    selectSearchSuggestion(option);
    return;
  }

  if (event.key === 'Escape' && isSearchSuggestionsOpen.value) {
    event.preventDefault();
    closeSearchSuggestions();
  }
};

const handleSearchOutsidePointer = (event) => {
  if (!searchControl.value?.contains(event.target)) closeSearchSuggestions();
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

let topicResizeObserver;

watch(
  [orderedCategories, selectedCategory, searchQuery],
  measureVisibleTopicCount,
  { flush: 'post' }
);

onMounted(() => {
  if (typeof ResizeObserver !== 'undefined' && topicFilterRow.value) {
    topicResizeObserver = new ResizeObserver(measureVisibleTopicCount);
    topicResizeObserver.observe(topicFilterRow.value);
  }
  measureVisibleTopicCount();
  document.addEventListener('pointerdown', handleTopicOutsidePointer);
  document.addEventListener('pointerdown', handleSearchOutsidePointer);
});

onBeforeUnmount(() => {
  topicResizeObserver?.disconnect();
  document.removeEventListener('pointerdown', handleTopicOutsidePointer);
  document.removeEventListener('pointerdown', handleSearchOutsidePointer);
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
  return {
    path: `/blog/${handle}`,
    query: currentPage.value > 1 ? { fromPage: String(currentPage.value) } : {},
  };
};

const postNumber = (index) =>
  String(pageOffset.value + index + 1).padStart(2, '0');
</script>

<template>
  <section class="blog-shell" aria-labelledby="blog-title">
    <header class="blog-intro">
      <div class="blog-intro__copy">
        <p class="blog-eyebrow">Insights</p>
        <h1 id="blog-title">What’s New in Technology</h1>
        <p class="blog-intro__subtitle">
          A roundup of news, updates, and practical insights.
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
      <div ref="searchControl" class="blog-search-control">
        <label class="blog-search">
          <font-awesome-icon :icon="faMagnifyingGlass" aria-hidden="true" />
          <span class="sr-only">Search articles and topics</span>
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="search"
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-controls="blog-search-suggestions"
            :aria-expanded="
              isSearchSuggestionsOpen && searchSuggestionGroups.length > 0
            "
            :aria-activedescendant="activeSearchSuggestionId"
            placeholder="Search articles, topics, authors…"
            autocomplete="off"
            @focus="openSearchSuggestions"
            @keydown="handleSearchKeydown"
          />
        </label>

        <Transition name="blog-search-popover">
          <div
            v-if="isSearchSuggestionsOpen && searchSuggestionGroups.length"
            id="blog-search-suggestions"
            class="blog-search-suggestions"
            role="listbox"
            aria-label="Search suggestions"
          >
            <div class="blog-search-suggestions__header">
              <span>Suggestions</span>
              <span class="blog-search-suggestions__hint" aria-hidden="true">
                ↑ ↓ <span>navigate</span><kbd>ENTER</kbd>
              </span>
            </div>

            <section
              v-for="group in searchSuggestionGroups"
              :key="group.label"
              class="blog-search-suggestions__group"
              role="group"
              :aria-label="group.label"
            >
              <p class="blog-search-suggestions__label">{{ group.label }}</p>
              <button
                v-for="option in group.options"
                :id="option.optionId"
                :key="option.id"
                type="button"
                class="blog-search-suggestion"
                :class="{
                  'blog-search-suggestion--active':
                    activeSearchSuggestionIndex === option.index,
                  'blog-search-suggestion--selected':
                    option.type === 'topic' &&
                    selectedCategory === option.value,
                  'blog-search-suggestion--action': option.type === 'search',
                }"
                role="option"
                :aria-selected="activeSearchSuggestionIndex === option.index"
                tabindex="-1"
                @mouseenter="activeSearchSuggestionIndex = option.index"
                @mousedown.prevent
                @click="selectSearchSuggestion(option)"
              >
                <span class="blog-search-suggestion__icon" aria-hidden="true">
                  <font-awesome-icon
                    :icon="
                      option.type === 'topic'
                        ? faTags
                        : option.type === 'article'
                          ? faNewspaper
                          : faMagnifyingGlass
                    "
                  />
                </span>
                <span class="blog-search-suggestion__copy">
                  <span class="blog-search-suggestion__title">{{
                    option.label
                  }}</span>
                  <span
                    v-if="option.type === 'article'"
                    class="blog-search-suggestion__detail"
                  >
                    {{ option.topic
                    }}<template v-if="option.detail">
                      · {{ option.detail }}</template
                    >
                  </span>
                </span>
                <span class="blog-search-suggestion__meta">
                  {{
                    option.type === 'topic'
                      ? option.detail
                      : option.type === 'article'
                        ? 'Open'
                        : option.detail
                  }}
                  <font-awesome-icon
                    v-if="option.type !== 'topic'"
                    :icon="faArrowRight"
                    aria-hidden="true"
                  />
                </span>
              </button>
            </section>
          </div>
        </Transition>
      </div>

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
          class="blog-category blog-category--all"
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
        <div
          ref="topicMeasureRow"
          class="blog-topic-measure"
          aria-hidden="true"
        >
          <span
            v-for="category in orderedCategories"
            :key="category"
            class="blog-category blog-topic-measure__item"
          >
            <span class="blog-category__label">{{ category }}</span>
          </span>
        </div>
        <button
          ref="topicOverflowButton"
          type="button"
          class="blog-category blog-category--overflow"
          :aria-expanded="isTopicMenuOpen"
          :aria-label="`Show all ${topicCount} topics`"
          aria-controls="blog-topic-menu"
          @click="isTopicMenuOpen ? closeTopicMenu() : openTopicMenu()"
        >
          <font-awesome-icon :icon="faTags" aria-hidden="true" />
          <span>All topics · {{ topicCount }}</span>
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

        <button
          v-if="selectedCategory || searchQuery"
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
      </div>
    </section>

    <template v-else-if="!error">
      <p v-if="!posts.length" class="blog-state">
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
            postNumber(index + (currentPage === 1 ? 1 : 0))
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
        </router-link>
      </div>

      <AppPagination
        v-if="totalPages > 1"
        v-model:current-page="currentPage"
        :total-pages="totalPages"
        mode="compact"
        label="Blog pagination"
        :previous-label="btnPrev"
        :next-label="btnNext"
      />
    </template>
  </section>
</template>

<style scoped lang="scss">
@use 'style';
</style>
