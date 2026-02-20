import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';

export function usePosts() {
  const labels = {
    filterAllCategories: 'All Categories',
    sortByDate: 'Date',
    sortByTitle: 'Title',
    sortByCategory: 'Category',
    readMore: 'Read more',
    btnPrev: 'Previous',
    btnNext: 'Next',
    btnClose: 'Close',
  };

  const posts = ref([]);
  const selectedPost = ref(null);
  const currentPage = ref(1);
  const postsPerPage = 6;
  const searchQuery = ref('');
  const sortBy = ref('date');
  const selectedCategory = ref('');
  const loading = ref(false);
  const error = ref('');

  const filteredPosts = computed(() => {
    let sortedPosts = [...posts.value];

    if (selectedCategory.value) {
      sortedPosts = sortedPosts.filter(
        (post) => post.category === selectedCategory.value
      );
    }

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      sortedPosts = sortedPosts.filter((post) =>
        [post.title, post.excerpt, post.content, post.category]
          .join(' ')
          .toLowerCase()
          .includes(query)
      );
    }

    if (sortBy.value === 'title') {
      return sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortBy.value === 'category') {
      return sortedPosts.sort((a, b) => a.category.localeCompare(b.category));
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

  const categories = computed(() => [
    ...new Set(posts.value.map((post) => post.category)),
  ]);

  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
  };

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

  const fetchPosts = async () => {
    loading.value = true;
    error.value = '';

    try {
      const response = await axios.get(
        'https://mudmykola.github.io/test-api/api-my-portfolio-blog-post.json'
      );
      posts.value = response.data.posts;
    } catch (e) {
      console.error('Failed to fetch posts:', e);
      error.value = 'Unable to load blog posts.';
    } finally {
      loading.value = false;
    }
  };

  const getPostImageUrl = (imagePath) =>
    `https://mudmykola.github.io/test-api${imagePath}`;

  onMounted(fetchPosts);

  watch([selectedCategory, sortBy, searchQuery], () => {
    currentPage.value = 1;
  });

  return {
    ...labels,
    posts,
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
    fetchPosts,
    getPostImageUrl,
  };
}
