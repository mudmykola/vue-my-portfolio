<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import DecorativeAccent from '@/components/shared/DecorativeAccent.vue';
import { useArticleSeo } from '../composables/useArticleSeo.js';
import { usePortfolioSeo } from '../composables/usePortfolioSeo.js';
import { routeSeo } from '../utils/routeSeo.js';

const route = useRoute();
const blogReturnPage = computed(() => {
  const page = Number(route.query.fromPage);
  return Number.isInteger(page) && page > 1 ? page : 1;
});
const blogReturnLink = computed(() => ({
  path: '/blog',
  query: blogReturnPage.value > 1 ? { page: String(blogReturnPage.value) } : {},
}));
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
const { data: cachedBlog } = useNuxtData('shopify-blog');
const cachedArticle = computed(
  () =>
    cachedBlog.value?.articles?.find(
      ({ handle }) => handle === articleHandle.value
    ) || null
);

const { data, error, status } = await useAsyncData(
  () => `blog-catch-all-${route.path}`,
  () => {
    if (!isArticleRoute.value) return null;
    if (cachedArticle.value) return { article: cachedArticle.value };

    return $fetch(`/api/blog/${encodeURIComponent(articleHandle.value)}`);
  },
  {
    lazy: true,
    default: () =>
      cachedArticle.value ? { article: cachedArticle.value } : null,
  }
);
const article = computed(() => data.value?.article || null);

const decodeHeadingText = (value) =>
  value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, code) => {
      const point = Number(code);
      return point <= 0x10ffff ? String.fromCodePoint(point) : '';
    })
    .replace(/&#x([\da-f]+);/gi, (_, code) => {
      const point = parseInt(code, 16);
      return point <= 0x10ffff ? String.fromCodePoint(point) : '';
    })
    .replace(/\s+/g, ' ')
    .trim();

const escapeAttribute = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const decodeCodeText = (value) =>
  value
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, code) => {
      const point = Number(code);
      return point <= 0x10ffff ? String.fromCodePoint(point) : '';
    })
    .replace(/&#x([\da-f]+);/gi, (_, code) => {
      const point = parseInt(code, 16);
      return point <= 0x10ffff ? String.fromCodePoint(point) : '';
    });

const escapeCodeText = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const highlightCodeSample = (value) => {
  const tokenPattern =
    /\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:async|await|const|let|var|return|new|class|function|throw|try|catch|if|else|for|while|import|from|export|default|extends|typeof|instanceof|Promise|true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*(?=\s*\()|===|!==|=>|==|!=|<=|>=|&&|\|\||[=+*\/%<>!?:&|]/g;
  let cursor = 0;
  let highlighted = '';

  for (const match of value.matchAll(tokenPattern)) {
    const [token] = match;
    const start = match.index || 0;
    const previousText = value.slice(cursor, start);
    highlighted += escapeCodeText(previousText);

    let tokenClass = 'operator';
    if (/^(?:\/\/|\/\*)/.test(token)) tokenClass = 'comment';
    else if (/^["'`]/.test(token)) tokenClass = 'string';
    else if (
      /^(?:async|await|const|let|var|return|new|class|function|throw|try|catch|if|else|for|while|import|from|export|default|extends|typeof|instanceof|Promise|true|false|null|undefined)$/.test(
        token
      )
    ) {
      tokenClass = 'keyword';
    } else if (/^\d/.test(token)) tokenClass = 'number';
    else if (/^[A-Za-z_$]/.test(token)) tokenClass = 'function';

    highlighted += `<span class="blog-code-token--${tokenClass}">${escapeCodeText(token)}</span>`;
    cursor = start + token.length;
  }

  return highlighted + escapeCodeText(value.slice(cursor));
};

const articleReadingContent = computed(() => {
  const html = String(
    article.value?.contentHtml || article.value?.content || ''
  );
  const usedIds = new Set();
  const sections = [];
  let headingIndex = 0;

  const headingsHtml = html.replace(
    /<h2\b([^>]*)>([\s\S]*?)<\/h2\s*>/gi,
    (heading, attributes, innerHtml) => {
      headingIndex += 1;
      const title = decodeHeadingText(innerHtml);
      const existingId = attributes.match(/\bid\s*=\s*(["'])(.*?)\1/i)?.[2];
      const baseId =
        existingId ||
        title
          .normalize('NFKD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') ||
        `section-${headingIndex}`;
      let id = baseId;
      let duplicate = 2;

      while (usedIds.has(id)) {
        id = `${baseId}-${duplicate}`;
        duplicate += 1;
      }
      usedIds.add(id);

      if (title) sections.push({ id, title });

      const cleanAttributes = attributes.replace(
        /\s+id\s*=\s*(["']).*?\1/i,
        ''
      );
      return `<h2${cleanAttributes} id="${escapeAttribute(id)}">${innerHtml}</h2>`;
    }
  );

  const contentHtml = headingsHtml.replace(
    /<pre\b([^>]*)>([\s\S]*?)<\/pre\s*>/gi,
    (pre, attributes, innerHtml) => {
      const codeMatch = innerHtml.match(
        /(<code\b[^>]*>)([\s\S]*?)(<\/code\s*>)/i
      );
      if (!codeMatch) return pre;

      const [, openingTag, codeMarkup, closingTag] = codeMatch;
      const code = decodeCodeText(codeMarkup);
      const lines = code
        .replace(/\r/g, '')
        .trim()
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
      const commandLine =
        /^(?:[$>]\s*)?(?:vp|npm|npx|pnpm|yarn|bun|git|cd|node|curl|shopify|wrangler|vite|vitest|eslint|prettier)\b/i;
      const isTerminal =
        lines.length > 0 && lines.every((line) => commandLine.test(line));
      const codeMarkupOutput = isTerminal
        ? codeMarkup
        : highlightCodeSample(code);
      const contentWithCode = innerHtml.replace(
        codeMatch[0],
        `${openingTag}${codeMarkupOutput}${closingTag}`
      );
      if (!isTerminal) return `<pre${attributes}>${contentWithCode}</pre>`;

      const terminalClasses = /^[$>]\s*/.test(lines[0])
        ? 'blog-terminal blog-terminal--prompted'
        : 'blog-terminal';
      const classAttribute = attributes.match(/\sclass\s*=\s*(["'])(.*?)\1/i);
      const terminalAttributes = classAttribute
        ? attributes.replace(classAttribute[0], (attribute, quote, classes) =>
            classes.split(/\s+/).includes('blog-terminal')
              ? attribute
              : ` class=${quote}${classes} ${terminalClasses}${quote}`
          )
        : `${attributes} class="${terminalClasses}"`;

      return `<pre${terminalAttributes}>${contentWithCode}</pre>`;
    }
  );

  return { contentHtml, sections };
});
const articleSections = computed(() => articleReadingContent.value.sections);
const activeSectionId = ref('');
const mobileContents = ref(null);
let sectionObserver;

const observeArticleSections = () => {
  sectionObserver?.disconnect();
  sectionObserver = undefined;

  if (!import.meta.client || !articleSections.value.length) return;

  const headings = articleSections.value
    .map(({ id }) => document.getElementById(id))
    .filter(Boolean);

  if (!headings.length) return;
  let requestedSection = window.location.hash.slice(1);
  try {
    requestedSection = decodeURIComponent(requestedSection);
  } catch {
    // An invalid fragment should not prevent the article from rendering.
  }
  activeSectionId.value = headings.some(({ id }) => id === requestedSection)
    ? requestedSection
    : headings[0].id;

  if (!('IntersectionObserver' in window)) return;

  sectionObserver = new IntersectionObserver(
    () => {
      const threshold = window.innerHeight * 0.3;
      const current = headings
        .map((heading) => ({
          heading,
          top: heading.getBoundingClientRect().top,
        }))
        .filter(({ top }) => top <= threshold)
        .at(-1);

      activeSectionId.value = (current?.heading || headings[0]).id;
    },
    { rootMargin: '-6% 0px -74% 0px', threshold: 0 }
  );

  headings.forEach((heading) => sectionObserver.observe(heading));
};

onMounted(() => {
  observeArticleSections();
});

watch(
  () => articleReadingContent.value.contentHtml,
  async () => {
    await nextTick();
    observeArticleSections();
  }
);

onBeforeUnmount(() => sectionObserver?.disconnect());

const articleDateLabel = computed(() => {
  const date = new Date(article.value?.date || '');
  if (Number.isNaN(date.getTime())) return article.value?.date || '';

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
});

if (import.meta.server) {
  if (!isArticleRoute.value) {
    setResponseStatus(404);
  } else if (error.value) {
    const statusCode = Number(
      error.value.statusCode || error.value.status || 500
    );
    setResponseStatus(
      statusCode >= 400 && statusCode <= 599 ? statusCode : 500
    );
  }
}

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
  <article
    v-if="article"
    class="blog-page blog-article-page container-centered"
  >
    <DecorativeAccent kind="arc" />
    <nav class="blog-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><router-link to="/" aria-label="Home">~</router-link></li>
        <li>
          <router-link :to="blogReturnLink">{{
            blogReturnPage > 1 ? `blog / page ${blogReturnPage}` : 'blog'
          }}</router-link>
        </li>
        <li>
          <span aria-current="page">{{ article.title }}</span>
        </li>
      </ol>
    </nav>
    <div class="blog-layout">
      <header class="blog-surface blog-article__header">
        <p class="blog-kicker">{{ article.category }}</p>
        <h1>{{ article.title }}</h1>
        <div class="blog-article__meta">
          <span v-if="article.author">By {{ article.author }}</span>
          <time :datetime="article.date">{{ articleDateLabel }}</time>
        </div>
      </header>
      <figure v-if="article.image" class="blog-article__media">
        <img
          :src="article.image"
          :alt="article.imageAlt || article.title"
          width="1200"
          height="630"
        />
      </figure>
      <div v-if="articleSections.length" class="blog-reading-layout">
        <details ref="mobileContents" class="blog-article__contents-mobile">
          <summary>
            On this page <span>{{ articleSections.length }} sections</span>
          </summary>
          <nav aria-label="Article sections">
            <ol>
              <li v-for="section in articleSections" :key="section.id">
                <a
                  :href="`#${section.id}`"
                  :aria-current="
                    activeSectionId === section.id ? 'location' : undefined
                  "
                  @click="mobileContents.open = false"
                  >{{ section.title }}</a
                >
              </li>
            </ol>
          </nav>
        </details>
        <aside class="blog-article__contents" aria-label="On this page">
          <p>On this page</p>
          <nav aria-label="Article sections">
            <ol>
              <li v-for="section in articleSections" :key="section.id">
                <a
                  :href="`#${section.id}`"
                  :aria-current="
                    activeSectionId === section.id ? 'location' : undefined
                  "
                  >{{ section.title }}</a
                >
              </li>
            </ol>
          </nav>
        </aside>
        <div
          class="blog-surface blog-article__content blog-prose"
          v-html="articleReadingContent.contentHtml"
        ></div>
      </div>
      <div
        v-else
        class="blog-surface blog-article__content blog-prose"
        v-html="articleReadingContent.contentHtml"
      ></div>
    </div>
  </article>
  <section
    v-else-if="isArticleRoute && status === 'pending'"
    class="blog-page blog-article-page container-centered"
    aria-busy="true"
    aria-label="Loading article"
  >
    <div class="blog-layout">
      <div class="blog-surface blog-state" role="status">Loading article…</div>
    </div>
  </section>
  <section v-else-if="isArticleRoute" class="blog-page container-centered">
    <div class="blog-surface blog-state">
      {{ error ? 'Unable to load this article.' : 'Article not found.' }}
    </div>
  </section>
  <NotFoundPage v-else />
</template>

<style scoped lang="scss">
.blog-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  width: 100%;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  min-width: 0;
}

.blog-breadcrumbs {
  position: relative;
  z-index: 1;
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
  color: var(--app-text-soft);
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: var(--type-supporting);
  line-height: 1.45;
}

.blog-breadcrumbs ol {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.45rem 0.7rem;
  min-width: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.blog-breadcrumbs li {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  min-width: 0;
}

.blog-breadcrumbs li:last-child {
  flex: 1 1 auto;
  overflow: hidden;
}

.blog-breadcrumbs li:not(:last-child) {
  flex: 0 0 auto;
}

.blog-breadcrumbs li + li::before {
  content: '/';
  color: var(--color-accent);
  font-weight: 700;
}

.blog-breadcrumbs a {
  color: var(--app-text-soft);
  text-decoration: none;
  text-underline-offset: 0.2em;
  transition: color var(--motion-ui) var(--ease-standard);
}

.blog-breadcrumbs a:hover {
  color: var(--color-accent);
  text-decoration: underline;
}

.blog-breadcrumbs a:focus-visible {
  border-radius: 2px;
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

.blog-breadcrumbs [aria-current='page'] {
  display: block;
  max-width: 100%;
  color: var(--app-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.blog-article__header,
.blog-article__content {
  position: relative;
  z-index: 1;
  min-width: 0;
}

.blog-reading-layout {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(14rem, 18rem);
  justify-content: stretch;
  align-items: start;
  gap: clamp(2rem, 5vw, 4rem);
  width: 100%;
  min-width: 0;
}

.blog-reading-layout > .blog-article__content {
  grid-column: 1;
  grid-row: 1;
  width: min(100%, 90ch);
  margin: 0;
}

.blog-article__contents {
  position: sticky;
  top: 6rem;
  grid-column: 2;
  grid-row: 1;
  max-height: calc(100dvh - 7rem);
  overflow-y: auto;
  padding-block: 0.2rem;
  scrollbar-width: thin;
  scrollbar-color: var(--app-border) transparent;
}

.blog-article__contents > p,
.blog-article__contents-mobile summary {
  margin: 0 0 0.9rem;
  color: var(--app-text);
  font-size: var(--type-supporting);
  font-weight: 750;
}

.blog-article__contents ol,
.blog-article__contents-mobile ol {
  display: grid;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.blog-article__contents a,
.blog-article__contents-mobile a {
  display: block;
  padding: 0.45rem 0.55rem;
  border-radius: 7px;
  color: var(--app-text-soft);
  font-size: var(--type-supporting);
  line-height: 1.45;
  text-decoration: none;
  text-underline-offset: 0.2em;
  transition:
    color var(--motion-ui) var(--ease-standard),
    background-color var(--motion-ui) var(--ease-standard);
}

.blog-article__contents a:hover,
.blog-article__contents-mobile a:hover {
  color: var(--app-text);
  background: rgba(24, 214, 160, 0.08);
}

.blog-article__contents a[aria-current='location'],
.blog-article__contents-mobile a[aria-current='location'] {
  color: var(--color-accent);
  background: rgba(24, 214, 160, 0.08);
}

.blog-article__contents a:focus-visible,
.blog-article__contents-mobile a:focus-visible,
.blog-article__contents-mobile summary:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

.blog-article__contents-mobile {
  display: none;
}

.blog-article__header {
  grid-column: 1;
  width: 100%;
  margin: 0;
  padding: 0;
}

.blog-article__header .blog-kicker {
  margin: 0 0 0.6rem;
  color: var(--color-accent);
  font-size: var(--type-eyebrow);
  font-weight: 800;
  letter-spacing: 0.13em;
  line-height: 1.3;
  text-transform: uppercase;
}

.blog-article__header h1 {
  max-width: 48ch;
  margin: 0;
  color: var(--app-text);
  font-size: var(--type-section);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.08;
  text-wrap: balance;
}

.blog-article__meta {
  color: var(--app-text-soft);
}

.blog-article__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  font-size: var(--type-supporting);
  line-height: 1.45;
}

.blog-article__meta > span + time::before {
  content: '·';
  margin-right: 0.75rem;
  color: var(--app-text-soft);
}

.blog-article__media {
  grid-column: 1 / -1;
  margin: 0;
}

.blog-article__media img {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--app-border);
  border-radius: 12px;
}

.blog-article__content {
  width: min(100%, 84ch);
  margin-inline: auto;
  padding-block: 0;
  color: var(--app-text-soft);
  font-size: var(--type-body);
  line-height: 1.75;
}

.blog-prose :deep(.blog-article) {
  min-width: 0;
}

.blog-prose {
  counter-reset: blog-section;
}

.blog-prose :deep(p) {
  max-width: 78ch;
  margin: 1.1em 0;
  text-wrap: pretty;
}

.blog-prose :deep(p:first-child) {
  margin: 0 0 1.8em;
  padding: 0.9em 1.1em 0.9em 1.2em;
  border-left: 2px solid var(--color-accent);
  border-radius: 0 8px 8px 0;
  color: var(--app-text);
  background: linear-gradient(
    100deg,
    color-mix(in srgb, var(--color-accent) 9%, var(--color-surface)),
    color-mix(in srgb, var(--color-accent) 2%, transparent) 76%,
    transparent
  );
  font-size: var(--type-subheading);
  line-height: 1.65;
}

.blog-prose :deep(h2),
.blog-prose :deep(h3) {
  max-width: 78ch;
  margin: 2.6em 0 0.85em;
  color: var(--app-text);
  font-weight: 750;
  letter-spacing: -0.02em;
  line-height: 1.22;
  text-wrap: pretty;
}

.blog-prose :deep(h2) {
  scroll-margin-top: 6rem;
}

.blog-prose :deep(h2) {
  position: relative;
  counter-increment: blog-section;
  padding: 0 0 0.75em 3.4rem;
  font-size: var(--type-subheading);
  border-bottom: 1px solid
    color-mix(in srgb, var(--color-accent) 12%, var(--app-border));
}

.blog-prose :deep(h2)::before {
  position: absolute;
  top: 0.08em;
  left: 0;
  display: grid;
  width: 2.35rem;
  height: 1.8rem;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--color-accent) 32%, transparent);
  border-radius: 4px;
  color: var(--color-accent);
  background: color-mix(in srgb, var(--color-accent) 8%, var(--color-surface));
  content: counter(blog-section, decimal-leading-zero);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.58em;
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1;
}

.blog-prose :deep(h2)::after {
  position: absolute;
  bottom: -1px;
  left: 3.4rem;
  width: 2.75rem;
  height: 2px;
  border-radius: 2px;
  background: var(--color-accent);
  content: '';
}

.blog-prose :deep(h3) {
  padding-left: 0.85em;
  border-left: 2px solid
    color-mix(in srgb, var(--color-accent) 60%, transparent);
  font-size: var(--type-body);
}

.blog-prose :deep(h2:first-child),
.blog-prose :deep(h3:first-child) {
  margin-top: 0;
}

.blog-prose :deep(a) {
  color: var(--color-accent);
  text-decoration-thickness: 1px;
  text-underline-offset: 0.18em;
  transition: color var(--motion-ui) var(--ease-standard);
}

.blog-prose :deep(a:hover) {
  color: var(--color-accent-hover);
}

.blog-prose :deep(a:focus-visible) {
  border-radius: 2px;
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

.blog-prose :deep(code) {
  padding: 0.14em 0.38em;
  border: 1px solid color-mix(in srgb, var(--color-accent) 24%, transparent);
  border-radius: 4px;
  color: var(--color-accent-hover);
  background: color-mix(in srgb, var(--color-accent) 13%, var(--color-surface));
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.86em;
  font-weight: 550;
  overflow-wrap: anywhere;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

.blog-prose :deep(strong) {
  color: var(--app-text);
  font-weight: 750;
  text-decoration: underline;
  text-decoration-color: color-mix(
    in srgb,
    var(--color-accent) 48%,
    transparent
  );
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
}

.blog-prose :deep(em) {
  color: var(--color-accent-hover);
  font-style: italic;
}

.blog-prose :deep(mark) {
  padding: 0.08em 0.28em;
  border-radius: 3px;
  color: var(--app-text);
  background: color-mix(in srgb, var(--color-accent) 22%, var(--color-surface));
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

.blog-prose :deep(kbd) {
  padding: 0.12em 0.42em;
  border: 1px solid var(--app-border);
  border-bottom-width: 2px;
  border-radius: 4px;
  color: var(--app-text);
  background: color-mix(in srgb, var(--color-surface) 78%, var(--color-bg));
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.82em;
  white-space: nowrap;
}

.blog-prose :deep(samp) {
  color: #8dd9e7;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

.blog-prose :deep(abbr[title]) {
  text-decoration-color: color-mix(
    in srgb,
    var(--color-accent) 58%,
    transparent
  );
  text-decoration-style: dotted;
  text-underline-offset: 0.2em;
  cursor: help;
}

.blog-prose :deep(ul),
.blog-prose :deep(ol) {
  max-width: 78ch;
  margin-block: 1.35em 1.6em;
  padding-inline-start: 1.5em;
}

.blog-prose :deep(li::marker) {
  color: var(--color-accent);
  font-size: 1.2em;
  font-weight: 750;
}

.blog-prose :deep(li + li) {
  margin-top: 0.6em;
}

.blog-prose :deep(li) {
  padding-inline-start: 0.2em;
  line-height: 1.65;
}

.blog-prose :deep(blockquote) {
  position: relative;
  margin: 1.5em 0;
  padding: 1em 1.2em 1em 1.35em;
  border: 1px solid
    color-mix(in srgb, var(--color-accent) 18%, var(--app-border));
  border-left: 3px solid var(--color-accent);
  border-radius: 0 8px 8px 0;
  color: var(--app-text);
  background: linear-gradient(
    105deg,
    color-mix(in srgb, var(--color-accent) 8%, var(--color-surface)),
    color-mix(in srgb, var(--color-surface) 30%, transparent)
  );
  line-height: 1.65;
}

.blog-prose :deep(pre) {
  position: relative;
  width: min(100%, 80ch);
  max-width: 100%;
  overflow-x: auto;
  margin-block: 1.4em 1.7em;
  padding: 3.15rem 1.25rem 1.2rem;
  border: 1px solid
    color-mix(in srgb, var(--color-accent) 23%, var(--app-border));
  border-radius: 9px;
  color: var(--app-text);
  background: radial-gradient(
      ellipse at 96% 0%,
      rgba(43, 181, 207, 0.08),
      transparent 45%
    ),
    color-mix(in srgb, var(--color-bg) 78%, var(--color-surface));
  font-size: 0.9em;
  line-height: 1.75;
  tab-size: 2;
  scrollbar-width: thin;
  scrollbar-color: var(--app-border) transparent;
}

.blog-prose :deep(pre:not(.blog-terminal))::before {
  position: absolute;
  inset: 0 0 auto;
  display: flex;
  height: 2.15rem;
  align-items: center;
  padding-inline: 4rem 1rem;
  border-bottom: 1px solid color-mix(in srgb, #8dd9e7 18%, var(--app-border));
  color: #8dd9e7;
  background: color-mix(in srgb, #8dd9e7 5%, var(--color-surface));
  content: 'CODE SAMPLE';
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.blog-prose :deep(pre:not(.blog-terminal))::after {
  position: absolute;
  top: 0.82rem;
  left: 1rem;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: #f07870;
  box-shadow:
    0.75rem 0 #e8bd65,
    1.5rem 0 var(--color-accent);
  content: '';
}

.blog-prose :deep(pre code) {
  padding: 0;
  border: 0;
  border-radius: 0;
  color: #d5e5e1;
  background: transparent;
  font-size: inherit;
  font-weight: 450;
  overflow-wrap: normal;
}

.blog-prose :deep(pre code .blog-code-token--keyword) {
  color: var(--color-accent);
  font-weight: 650;
}

.blog-prose :deep(pre code .blog-code-token--string) {
  color: #e6bd73;
}

.blog-prose :deep(pre code .blog-code-token--number) {
  color: #f29a75;
}

.blog-prose :deep(pre code .blog-code-token--function) {
  color: #8dd9e7;
}

.blog-prose :deep(pre code .blog-code-token--comment) {
  color: #8c9e9a;
  font-style: italic;
}

.blog-prose :deep(pre code .blog-code-token--operator) {
  color: #a9c8c1;
}

.blog-prose :deep(pre.blog-terminal) {
  position: relative;
  padding-top: 3.3rem;
  border-color: color-mix(in srgb, var(--color-accent) 34%, var(--app-border));
  background: color-mix(in srgb, var(--color-bg) 82%, var(--color-surface));
}

.blog-prose :deep(pre.blog-terminal)::before {
  position: absolute;
  inset: 0 0 auto;
  display: flex;
  height: 2.2rem;
  align-items: center;
  padding-inline: 4rem 1rem;
  border-bottom: 1px solid
    color-mix(in srgb, var(--color-accent) 18%, var(--app-border));
  color: var(--color-accent);
  background: color-mix(in srgb, var(--color-accent) 5%, var(--color-surface));
  content: 'TERMINAL';
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.blog-prose :deep(pre.blog-terminal)::after {
  position: absolute;
  top: 0.88rem;
  left: 1rem;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: #f07870;
  box-shadow:
    0.75rem 0 #e8bd65,
    1.5rem 0 var(--color-accent);
  content: '';
}

.blog-prose :deep(pre.blog-terminal code) {
  color: var(--color-accent-hover);
}

.blog-prose
  :deep(pre.blog-terminal:not(.blog-terminal--prompted) code)::before {
  color: var(--color-accent);
  content: '$ ';
}

.blog-prose :deep(img) {
  display: block;
  max-width: 100%;
  height: auto;
  margin-block: 1.5em;
  border: 1px solid var(--app-border);
  border-radius: 12px;
}

.blog-prose :deep(figure) {
  margin: 1.6em 0;
}

.blog-prose :deep(figcaption) {
  margin-top: 0.6em;
  color: var(--app-text-soft);
  font-size: var(--type-supporting);
  line-height: 1.5;
}

.blog-prose :deep(table) {
  display: block;
  max-width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
  color: var(--app-text-soft);
}

.blog-prose :deep(th),
.blog-prose :deep(td) {
  padding: 0.7rem 0.85rem;
  border: 1px solid var(--app-border);
  text-align: left;
  vertical-align: top;
}

.blog-prose :deep(th) {
  color: var(--app-text);
  background: rgba(24, 214, 160, 0.05);
  font-weight: 700;
}

.blog-prose :deep(hr) {
  margin: 2.5em 0;
  border: 0;
  border-top: 1px solid var(--app-border);
}

.blog-prose :deep(small) {
  display: block;
  max-width: 78ch;
  margin-top: 3em;
  padding-top: 1em;
  border-top: 1px solid
    color-mix(in srgb, var(--color-accent) 18%, var(--app-border));
  color: var(--app-text-soft);
  font-size: var(--type-supporting);
  line-height: 1.65;
}

.blog-prose :deep(small a) {
  color: var(--color-accent-hover);
  font-weight: 600;
  text-decoration-thickness: 1px;
}

.blog-prose :deep(p + ul),
.blog-prose :deep(p + ol) {
  margin-top: 0.75em;
}

.blog-article-page {
  position: relative;
  isolation: isolate;
  overflow: clip;
}

@media (max-width: 640px) {
  .blog-breadcrumbs {
    margin-bottom: 1.5rem;
  }

  .blog-article__header h1 {
    font-size: var(--type-section);
  }

  .blog-article__content {
    width: 100%;
  }

  .blog-prose :deep(pre) {
    margin-inline: 0;
    padding: 2.9rem 0.85rem 0.9rem;
  }
}

@media (max-width: 980px) {
  .blog-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .blog-reading-layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.25rem;
  }

  .blog-article__contents {
    display: none;
  }

  .blog-article__contents-mobile {
    display: block;
    grid-column: 1;
    grid-row: 1;
    min-width: 0;
    padding: 0.8rem 0.9rem;
    border: 1px solid var(--app-border);
    border-radius: 10px;
    background: color-mix(in srgb, var(--color-surface) 72%, transparent);
  }

  .blog-article__contents-mobile summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin: 0;
    cursor: pointer;
    list-style: none;
  }

  .blog-article__contents-mobile summary::-webkit-details-marker {
    display: none;
  }

  .blog-article__contents-mobile summary::after {
    content: '+';
    color: var(--color-accent);
    font-size: 1.2em;
  }

  .blog-article__contents-mobile[open] summary {
    margin-bottom: 0.65rem;
  }

  .blog-article__contents-mobile[open] summary::after {
    content: '−';
  }

  .blog-reading-layout > .blog-article__content {
    grid-row: 2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .blog-breadcrumbs a,
  .blog-prose :deep(a),
  .blog-article__contents a,
  .blog-article__contents-mobile a {
    transition: none;
  }
}
</style>
