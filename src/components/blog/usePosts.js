import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';
import { remoteEndpoints } from '../../config/remoteEndpoints.js';

export function usePosts(options = {}) {
  const labels = {
    filterAllCategories: 'All Categories',
    sortByDate: 'Date',
    sortByTitle: 'Title',
    sortByCategory: 'Category',
    readMore: 'Read more',
    btnPrev: 'Previous',
    btnNext: 'Next',
  };

  const posts = ref(options.initialPosts || []);
  const currentPage = ref(1);
  const postsPerPage = 6;
  const searchQuery = ref('');
  const sortBy = ref('date');
  const selectedCategory = ref('');
  const loading = ref(Boolean(options.initialLoading));
  const error = ref('');

  const postTopics = (post) => {
    const tags = Array.isArray(post?.tags)
      ? post.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : [];

    return tags.length
      ? tags
      : [String(post?.category || '').trim()].filter(Boolean);
  };
  const topicKey = (topic) =>
    String(topic || '')
      .trim()
      .toLocaleLowerCase();

  const filteredPosts = computed(() => {
    let sortedPosts = [...posts.value];

    if (selectedCategory.value) {
      sortedPosts = sortedPosts.filter((post) =>
        postTopics(post).some(
          (topic) => topicKey(topic) === topicKey(selectedCategory.value)
        )
      );
    }

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      sortedPosts = sortedPosts.filter((post) =>
        [
          post.title,
          post.excerpt,
          post.content,
          post.author,
          post.category,
          ...postTopics(post),
        ]
          .join(' ')
          .toLowerCase()
          .includes(query)
      );
    }

    if (sortBy.value === 'title') {
      return sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortBy.value === 'category') {
      return sortedPosts.sort((a, b) =>
        (postTopics(a)[0] || '').localeCompare(postTopics(b)[0] || '')
      );
    }

    return sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(filteredPosts.value.length / postsPerPage))
  );
  const filteredCount = computed(() => filteredPosts.value.length);

  const paginatedPosts = computed(() => {
    const startIndex = (currentPage.value - 1) * postsPerPage;
    return filteredPosts.value.slice(startIndex, startIndex + postsPerPage);
  });

  const categories = computed(() => {
    const topics = new Map();

    posts.value.flatMap(postTopics).forEach((topic) => {
      const key = topicKey(topic);
      if (key && !topics.has(key)) topics.set(key, topic);
    });

    return [...topics.values()];
  });

  const topicCounts = computed(() => {
    const counts = new Map();

    posts.value.forEach((post) => {
      new Set(postTopics(post).map(topicKey)).forEach((key) => {
        counts.set(key, (counts.get(key) || 0) + 1);
      });
    });

    return counts;
  });

  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };

  const fetchPosts = async () => {
    if (options.initialPosts) return;
    loading.value = true;
    error.value = '';

    try {
      const response = await axios.get(remoteEndpoints.blogPostsUrl);
      posts.value = response.data.posts;
    } catch (e) {
      console.error('Failed to fetch posts:', e);
      error.value = 'Unable to load blog posts.';
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchPosts);

  watch([selectedCategory, sortBy, searchQuery], () => {
    currentPage.value = 1;
  });

  return {
    ...labels,
    posts,
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
    fetchPosts,
  };
}
