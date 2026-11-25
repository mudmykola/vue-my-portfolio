<script setup>
import { computed } from 'vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import { useArticleSeo } from '../composables/useArticleSeo.js';
import { usePortfolioSeo } from '../composables/usePortfolioSeo.js';
import { routeSeo } from '../utils/routeSeo.js';

const route = useRoute();
const segments = computed(() => {
  const value = route.params.slug;
  return Array.isArray(value)
    ? value
    : String(value || '')
        .split('/')
        .filter(Boolean);
});
const articleHandle = computed(() =>
  segments.value[0] === 'blog' ? String(segments.value[1] || '') : ''
);
const isArticleRoute = computed(() => Boolean(articleHandle.value));

const { data, error } = await useAsyncData(
  `blog-catch-all-${route.path}`,
  () =>
    isArticleRoute.value
      ? $fetch(`/api/blog/${encodeURIComponent(articleHandle.value)}`)
      : Promise.resolve(null)
);
const article = computed(() => data.value?.article || null);

definePageMeta({ title: routeSeo.notFound.title });
if (article.value) {
  useArticleSeo(article.value);
} else {
  usePortfolioSeo(
    isArticleRoute.value
      ? {
          ...routeSeo.notFound,
          title: 'Article Not Found | Mykola Mud',
          description: 'The requested blog article could not be found.',
          canonicalPath: `/blog/${articleHandle.value}`,
          breadcrumbLabel: 'Article not found',
        }
      : routeSeo.notFound
  );
}
</script>

<template>
  <article v-if="article" class="blog-page container-centered">
    <div class="blog-layout">
      <header class="blog-surface blog-article__header">
        <p class="blog-kicker">{{ article.category }}</p>
        <h1>{{ article.title }}</h1>
        <p v-if="article.excerpt">{{ article.excerpt }}</p>
        <time :datetime="article.date">{{ article.date }}</time>
      </header>
      <figure v-if="article.image" class="blog-article__media">
        <img
          :src="article.image"
          :alt="article.imageAlt || article.title"
          width="1200"
          height="630"
        />
      </figure>
      <div
        class="blog-surface blog-article__content blog-prose"
        v-html="article.contentHtml || article.content"
      ></div>
    </div>
  </article>
  <section v-else-if="isArticleRoute" class="blog-page container-centered">
    <div class="blog-surface blog-state">
      {{ error ? 'Unable to load this article.' : 'Article not found.' }}
    </div>
  </section>
  <NotFoundPage v-else />
</template>

<style scoped lang="scss">
.blog-article__header,
.blog-article__content {
  padding: clamp(1.25rem, 3vw, 2.5rem);
  border-radius: 24px;
}

.blog-article__header h1 {
  margin: 0.5rem 0;
}

.blog-article__header p,
.blog-article__header time {
  color: var(--app-text-soft);
}

.blog-article__media {
  margin: 0;
}

.blog-article__media img {
  display: block;
  width: 100%;
  border-radius: 24px;
}
</style>
