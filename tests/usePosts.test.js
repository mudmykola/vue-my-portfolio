import test from 'node:test';
import assert from 'node:assert/strict';
import { nextTick } from 'vue';
import { usePosts } from '../src/components/blog/usePosts.js';

const originalWarn = console.warn;
console.warn = () => {};

const createPosts = () => [
  {
    id: 1,
    title: 'Vue Patterns',
    excerpt: 'Composable patterns',
    content: 'Vue and composables',
    category: 'Vue',
    date: '2026-01-05',
  },
  {
    id: 2,
    title: 'CSS Layout',
    excerpt: 'Grid tricks',
    content: 'Grid and flex',
    category: 'CSS',
    date: '2026-02-01',
  },
  {
    id: 3,
    title: 'API Design',
    excerpt: 'REST basics',
    content: 'REST APIs and contracts',
    category: 'Backend',
    date: '2025-12-11',
  },
];

test('usePosts sorts by date desc by default', () => {
  const state = usePosts();
  state.posts.value = createPosts();

  assert.equal(state.paginatedPosts.value[0].title, 'CSS Layout');
  assert.equal(state.paginatedPosts.value[1].title, 'Vue Patterns');
  assert.equal(state.paginatedPosts.value[2].title, 'API Design');
});

test('usePosts supports title and category sorting', () => {
  const state = usePosts();
  state.posts.value = createPosts();

  state.sortBy.value = 'title';
  assert.deepEqual(
    state.paginatedPosts.value.map((item) => item.title),
    ['API Design', 'CSS Layout', 'Vue Patterns']
  );

  state.sortBy.value = 'category';
  assert.deepEqual(
    state.paginatedPosts.value.map((item) => item.category),
    ['Backend', 'CSS', 'Vue']
  );
});

test('usePosts filters by search and category and tracks count', () => {
  const state = usePosts();
  state.posts.value = createPosts();

  state.searchQuery.value = 'grid';
  assert.equal(state.filteredCount.value, 1);
  assert.equal(state.paginatedPosts.value[0].title, 'CSS Layout');

  state.searchQuery.value = '';
  state.selectedCategory.value = 'Vue';
  assert.equal(state.filteredCount.value, 1);
  assert.equal(state.paginatedPosts.value[0].category, 'Vue');
});

test('usePosts resets page when filters change', async () => {
  const state = usePosts();
  state.posts.value = createPosts();
  state.currentPage.value = 2;

  state.selectedCategory.value = 'CSS';
  await nextTick();
  assert.equal(state.currentPage.value, 1);
});

test('usePosts modal controls open and close selected post', () => {
  const state = usePosts();
  const post = createPosts()[0];

  state.openModal(post);
  assert.equal(state.selectedPost.value.id, 1);

  state.closeModal();
  assert.equal(state.selectedPost.value, null);
});

process.on('exit', () => {
  console.warn = originalWarn;
});
