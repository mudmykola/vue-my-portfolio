<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import {
  faCalendarDays,
  faClock,
  faTag,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import cssLang from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import 'highlight.js/styles/atom-one-dark.css';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('vue', xml);
hljs.registerLanguage('css', cssLang);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', bash);

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  closeLabel: {
    type: String,
    default: 'Close',
  },
  readTime: {
    type: Function,
    required: true,
  },
  formatDate: {
    type: Function,
    required: true,
  },
  getPostImageUrl: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(['close']);

const contentEl = ref(null);

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

// Prefer authored rich HTML (post.contentHtml). Fall back to legacy plain-text
// `content`, split into readable paragraphs.
const renderedHtml = computed(() => {
  if (props.post?.contentHtml) return props.post.contentHtml;

  return String(props.post?.content || '')
    .replace(/\\n/g, '\n')
    .replace(/\.(?=[A-ZА-ЯЇІЄ])/g, '.\n\n')
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => `<p>${escapeHtml(chunk).replace(/\n/g, '<br>')}</p>`)
    .join('');
});

const enhanceContent = async () => {
  await nextTick();
  const root = contentEl.value;
  if (!root) return;

  root.querySelectorAll('pre code').forEach((block) => {
    if (!block.dataset.highlighted) hljs.highlightElement(block);
  });

  root.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (/^https?:\/\//i.test(href)) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });
};

const closeModal = () => {
  emit('close');
};

const closeOnEscape = (event) => {
  if (event.key === 'Escape') closeModal();
};

onMounted(() => {
  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', closeOnEscape);
  enhanceContent();
});

onUnmounted(() => {
  document.body.style.overflow = '';
  window.removeEventListener('keydown', closeOnEscape);
});

watch(() => props.post, enhanceContent);
</script>

<template>
  <teleport to="body">
    <section class="blog-modal" @click.self="closeModal">
      <article
        class="blog-modal__dialog"
        role="dialog"
        aria-modal="true"
        :aria-label="props.post.title"
      >
        <header class="blog-modal__topbar">
          <div class="blog-modal__topbar-meta">
            <span class="blog-modal-chip blog-modal-chip--accent">
              <font-awesome-icon :icon="faTag" />
              {{ props.post.category }}
            </span>

            <span class="blog-modal-chip">
              <font-awesome-icon :icon="faCalendarDays" />
              {{ props.formatDate(props.post.date) }}
            </span>

            <span class="blog-modal-chip">
              <font-awesome-icon :icon="faClock" />
              {{ props.readTime(props.post) }} min read
            </span>
          </div>

          <button
            type="button"
            class="blog-modal__close"
            :aria-label="props.closeLabel"
            @click="closeModal"
          >
            <font-awesome-icon :icon="faXmark" />
          </button>
        </header>

        <section class="blog-modal__summary">
          <figure class="blog-modal__thumb">
            <img
              :src="props.getPostImageUrl(props.post.image)"
              :alt="props.post.title"
              class="blog-modal__image"
              width="1200"
              height="630"
              decoding="async"
            />
          </figure>

          <div class="blog-modal__intro">
            <p class="blog-modal__label">Article</p>

            <h2>{{ props.post.title }}</h2>

            <p v-if="props.post.excerpt" class="blog-modal__excerpt">
              {{ props.post.excerpt }}
            </p>
          </div>
        </section>

        <section class="blog-modal__content-shell">
          <div class="blog-modal__divider"></div>

          <div class="blog-modal__content-scroll">
            <div
              ref="contentEl"
              class="blog-modal__content blog-prose"
              v-html="renderedHtml"
            ></div>
          </div>
        </section>
      </article>
    </section>
  </teleport>
</template>

<style scoped lang="scss">
.blog-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  padding: clamp(0.75rem, 2vw, 1.25rem);
  background: radial-gradient(
      circle at 18% 0%,
      rgba(73, 220, 177, 0.16),
      transparent 34%
    ),
    radial-gradient(circle at 88% 12%, rgba(243, 192, 86, 0.1), transparent 28%),
    rgba(5, 5, 8, 0.9);
  backdrop-filter: blur(20px);
}

.blog-modal__dialog {
  width: min(1040px, 100%);
  height: min(88dvh, 780px);
  min-height: 0;
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr);
  overflow: hidden;
  border-radius: 26px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  background: radial-gradient(
      circle at 10% 0%,
      rgba(73, 220, 177, 0.08),
      transparent 30%
    ),
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent 30%), #101016;
  box-shadow: 0 32px 100px rgba(0, 0, 0, 0.58);
}

.blog-modal__topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(16, 16, 22, 0.96);
}

.blog-modal__topbar-meta {
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.blog-modal__close {
  width: 2.35rem;
  height: 2.35rem;
  flex: 0 0 auto;
  display: inline-grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  color: var(--app-text);
  background: rgba(255, 255, 255, 0.055);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.blog-modal__close:hover {
  transform: rotate(90deg);
  border-color: rgba(73, 220, 177, 0.46);
  background: rgba(73, 220, 177, 0.12);
}

.blog-modal__summary {
  display: grid;
  grid-template-columns: minmax(220px, 320px) minmax(0, 1fr);
  gap: 1rem;
  align-items: center;
  padding: 1rem 1rem 0.85rem;
}

.blog-modal__thumb {
  margin: 0;
  min-width: 0;
  aspect-ratio: 16 / 9;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: radial-gradient(
      circle at 50% 0%,
      rgba(73, 220, 177, 0.12),
      transparent 36%
    ),
    rgba(255, 255, 255, 0.035);
}

.blog-modal__image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}

.blog-modal__intro {
  min-width: 0;
}

.blog-modal__label {
  margin: 0 0 0.45rem;
  color: var(--app-accent);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.blog-modal__intro h2 {
  margin: 0;
  color: var(--app-text);
  font-size: clamp(1.35rem, 2.8vw, 2.15rem);
  line-height: 1.08;
  letter-spacing: -0.05em;
}

.blog-modal__excerpt {
  margin: 0.85rem 0 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: clamp(0.98rem, 1.25vw, 1.08rem);
  line-height: 1.58;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.blog-modal__content-shell {
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 0 1rem 1rem;
}

.blog-modal__divider {
  flex: 0 0 auto;
  height: 1px;
  margin-bottom: 0.9rem;
  background: linear-gradient(
    90deg,
    rgba(73, 220, 177, 0.56),
    rgba(255, 255, 255, 0.08),
    transparent
  );
}

.blog-modal__content-scroll {
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  padding: 0 0.9rem 0.2rem 0;
  scrollbar-width: thin;
  scrollbar-color: rgba(73, 220, 177, 0.78) rgba(255, 255, 255, 0.06);
}

.blog-modal__content-scroll::-webkit-scrollbar {
  width: 10px;
}

.blog-modal__content-scroll::-webkit-scrollbar-track {
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.045);
}

.blog-modal__content-scroll::-webkit-scrollbar-thumb {
  border: 2px solid #101016;
  border-radius: 999px;
  background: linear-gradient(180deg, #49dcb1, #f3c056);
}

.blog-modal__content {
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(0.96rem, 1.2vw, 1.04rem);
  line-height: 1.8;
  letter-spacing: -0.012em;
  text-wrap: pretty;
}

/* Rich content (v-html) typography ----------------------------------- */
.blog-prose :deep(> *:first-child) {
  margin-top: 0;
}

.blog-prose :deep(p) {
  margin: 0 0 1.05rem;
}

.blog-prose :deep(h2) {
  margin: 1.9rem 0 0.75rem;
  color: var(--app-text);
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.blog-prose :deep(h3) {
  margin: 1.5rem 0 0.6rem;
  color: var(--app-text);
  font-size: clamp(1.05rem, 1.6vw, 1.2rem);
  line-height: 1.25;
}

.blog-prose :deep(a) {
  color: var(--app-accent);
  text-decoration: none;
  border-bottom: 1px solid rgba(73, 220, 177, 0.4);
  transition:
    color 0.2s ease,
    border-color 0.2s ease;
}

.blog-prose :deep(a:hover) {
  color: #7ff0d3;
  border-bottom-color: rgba(73, 220, 177, 0.9);
}

.blog-prose :deep(ul),
.blog-prose :deep(ol) {
  margin: 0 0 1.05rem;
  padding-left: 1.35rem;
}

.blog-prose :deep(li) {
  margin: 0.35rem 0;
}

.blog-prose :deep(li::marker) {
  color: var(--app-accent);
}

.blog-prose :deep(strong) {
  color: var(--app-text);
  font-weight: 700;
}

.blog-prose :deep(blockquote) {
  margin: 1.2rem 0;
  padding: 0.4rem 0 0.4rem 1rem;
  border-left: 3px solid rgba(73, 220, 177, 0.6);
  color: rgba(255, 255, 255, 0.78);
  font-style: italic;
}

.blog-prose :deep(hr) {
  margin: 1.6rem 0;
  border: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.blog-prose :deep(img) {
  display: block;
  width: 100%;
  height: auto;
  margin: 1.2rem 0;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Inline code */
.blog-prose :deep(:not(pre) > code) {
  padding: 0.12em 0.42em;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.07);
  color: #ffe6b1;
  font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
  font-size: 0.86em;
}

/* Code blocks */
.blog-prose :deep(pre) {
  margin: 0 0 1.2rem;
  padding: 0;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #0b0d13;
  overflow: hidden;
}

.blog-prose :deep(pre code) {
  display: block;
  padding: 1rem 1.1rem;
  overflow-x: auto;
  background: transparent;
  color: #e6e6e6;
  font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
  font-size: 0.86rem;
  line-height: 1.65;
  letter-spacing: 0;
  text-wrap: nowrap;
}

.blog-prose :deep(pre code.hljs) {
  background: transparent;
  padding: 1rem 1.1rem;
}

.blog-modal-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  width: max-content;
  max-width: 100%;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.075);
  color: var(--app-text-soft);
  padding: 0.26rem 0.62rem;
  font-size: 0.72rem;
  line-height: 1;
  white-space: nowrap;
  backdrop-filter: blur(10px);
}

.blog-modal-chip--accent {
  border-color: rgba(243, 192, 86, 0.42);
  background: rgba(243, 192, 86, 0.14);
  color: #ffe6b1;
}

@media (max-width: 760px) {
  .blog-modal {
    padding: 0;
    align-items: end;
  }

  .blog-modal__dialog {
    width: 100%;
    height: 96dvh;
    border-radius: 24px 24px 0 0;
  }

  .blog-modal__topbar {
    align-items: flex-start;
    padding: 0.8rem;
  }

  .blog-modal__topbar-meta {
    max-width: calc(100% - 3rem);
  }

  .blog-modal__summary {
    grid-template-columns: 120px minmax(0, 1fr);
    gap: 0.75rem;
    padding: 0.85rem 0.85rem 0.75rem;
  }

  .blog-modal__thumb {
    border-radius: 16px;
  }

  .blog-modal__intro h2 {
    font-size: clamp(1.1rem, 5.8vw, 1.55rem);
  }

  .blog-modal__excerpt {
    margin-top: 0.55rem;
    font-size: 0.9rem;
    line-height: 1.45;
    -webkit-line-clamp: 2;
  }

  .blog-modal__content-shell {
    padding: 0 0.85rem 0.85rem;
  }

  .blog-modal__content-scroll {
    padding-right: 0.55rem;
  }

  .blog-modal__content {
    line-height: 1.75;
  }
}

@media (max-width: 480px) {
  .blog-modal__summary {
    grid-template-columns: 1fr;
  }

  .blog-modal__thumb {
    max-height: 170px;
  }
}
</style>
