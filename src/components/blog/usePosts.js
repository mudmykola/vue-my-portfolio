import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';

export function usePosts() {
    const filterAllCategories = 'All Categories';
    const sortByDate = 'Date';
    const sortByTitle = 'Title';
    const sortByCategory = 'Category';
    const readMore = 'Read more';
    const btnPrev = 'Previous';
    const btnNext = 'Next';
    const btnClose = 'Close';

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
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
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

    return {
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
    };
}