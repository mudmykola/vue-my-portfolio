<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { useSiteContent } from '@/composables/useSiteContent.js';
import {
  firstName,
  lastName,
  menuItems,
} from '@/components/navigation/navigationData.js';

const route = useRoute();
const currentYear = new Date().getFullYear();
const { data, load } = useSiteContent();
const showBackToTop = ref(false);

const socialLinks = computed(() => {
  const links = data.value?.aboutPage?.socialLinks ?? {};

  return [
    { label: 'GitHub', href: links.github, icon: faGithub },
    { label: 'LinkedIn', href: links.linkedin, icon: faLinkedin },
    { label: 'Instagram', href: links.instagram, icon: faInstagram },
  ].filter(({ href }) => href);
});

const isCurrentRoute = (path) => route.path === path;
const updateBackToTopVisibility = () => {
  showBackToTop.value = window.scrollY > 400;
};

onMounted(() => {
  if (!data.value) load();
  updateBackToTopVisibility();
  window.addEventListener('scroll', updateBackToTopVisibility, {
    passive: true,
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateBackToTopVisibility);
});
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__main">
        <nav class="site-footer__navigation" aria-label="Footer navigation">
          <ul>
            <li v-for="item in menuItems" :key="item.id">
              <router-link
                :to="item.link"
                :aria-current="isCurrentRoute(item.link) ? 'page' : undefined"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </nav>

        <div
          v-if="socialLinks.length"
          class="site-footer__socials"
          role="group"
          aria-label="Social profiles"
        >
          <a
            v-for="social in socialLinks"
            :key="social.label"
            :href="social.href"
            :aria-label="social.label"
            target="_blank"
            rel="noreferrer"
          >
            <font-awesome-icon :icon="social.icon" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div class="site-footer__bottom">
        <p>© {{ currentYear }} {{ firstName }} {{ lastName }}</p>
      </div>
    </div>
  </footer>

  <a
    class="site-footer__top"
    :class="{ 'site-footer__top--visible': showBackToTop }"
    href="#page-top"
    aria-label="Back to top"
    :aria-hidden="!showBackToTop"
    :tabindex="showBackToTop ? 0 : -1"
  >
    <span aria-hidden="true">↑</span>
  </a>
</template>

<style lang="scss" scoped>
.site-footer {
  position: relative;
  flex: 0 0 auto;
  border-top: 1px solid var(--color-border);
  background: radial-gradient(
      ellipse at 16% 0%,
      var(--color-accent-soft),
      transparent 34%
    ),
    var(--color-bg);
}

.site-footer__inner {
  width: auto;
  margin: 0;
  margin-inline: calc(clamp(1rem, 3vw, 3rem) - (100vw - 100%) / 2);
  padding: 0.7rem 0 0.35rem;
}

.site-footer__main {
  display: flex;
  min-height: 56px;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding-bottom: 0.55rem;
}

.site-footer__navigation {
  flex: 1;
  min-width: 0;
}

.site-footer__navigation ul {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.15rem clamp(0.75rem, 2vw, 1.8rem);
  margin: 0;
  padding: 0;
  list-style: none;
}

.site-footer__navigation a {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  font-weight: 650;
  text-decoration: none;
  transition: color var(--motion-fast) var(--ease-standard);
}

.site-footer__navigation a:hover,
.site-footer__navigation a:focus-visible,
.site-footer__navigation a[aria-current='page'] {
  color: var(--color-accent);
}

.site-footer__socials {
  display: flex;
  flex: 0 0 auto;
  gap: 0.45rem;
}

.site-footer__socials a {
  position: relative;
  isolation: isolate;
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 1px solid transparent;
  border-radius: 50%;
  color: var(--color-text-secondary);
  background: transparent;
  transition:
    transform var(--motion-fast) var(--ease-standard),
    color var(--motion-fast) var(--ease-standard),
    background-color var(--motion-fast) var(--ease-standard);
}

.site-footer__socials a::before {
  position: absolute;
  z-index: -1;
  inset: -4px;
  border-radius: inherit;
  background: radial-gradient(
    circle,
    transparent 42%,
    rgba(24, 214, 160, 0.14) 60%,
    rgba(24, 214, 160, 0.06) 72%,
    transparent 84%
  );
  content: '';
  filter: blur(6px);
  opacity: 0.72;
  transition:
    filter var(--motion-fast) var(--ease-standard),
    opacity var(--motion-fast) var(--ease-standard);
}

.site-footer__socials a:hover,
.site-footer__socials a:focus-visible {
  transform: translateY(-2px);
  background: rgba(24, 214, 160, 0.035);
  color: var(--color-accent);
}

.site-footer__socials a:hover::before,
.site-footer__socials a:focus-visible::before {
  filter: blur(8px);
  opacity: 1;
}

.site-footer__bottom {
  display: flex;
  min-height: 44px;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: 0.78rem;
}

.site-footer__bottom p {
  margin: 0;
}

.site-footer__top {
  position: fixed;
  z-index: 30;
  right: clamp(1rem, 3vw, 2rem);
  bottom: 1.25rem;
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border: 1px solid var(--color-accent-border);
  border-radius: 50%;
  color: var(--color-accent);
  background: var(--color-surface);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.24);
  opacity: 0;
  pointer-events: none;
  text-decoration: none;
  transform: translateY(8px);
  transition:
    opacity var(--motion-panel) var(--ease-standard),
    transform var(--motion-panel) var(--ease-standard),
    visibility 0s linear var(--motion-panel);
  visibility: hidden;
}

.site-footer__top span {
  display: grid;
  place-items: center;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
}

.site-footer__top--visible {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
  transition:
    opacity var(--motion-panel) var(--ease-standard),
    transform var(--motion-panel) var(--ease-standard),
    visibility 0s;
  visibility: visible;
}

.site-footer__top--visible:hover {
  transform: translateY(-2px);
  background: var(--color-surface-raised);
}

.site-footer__top:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

.site-footer :focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
}

@media (max-width: 760px) {
  .site-footer__main {
    align-items: flex-start;
    gap: 0.75rem;
  }

  .site-footer__navigation ul {
    gap: 0.1rem clamp(0.55rem, 1.6vw, 1rem);
  }
}

@media (max-width: 640px) {
  .site-footer {
    margin-bottom: calc(92px + env(safe-area-inset-bottom));
  }

  .site-footer__inner {
    margin-inline: calc(1.25rem - (100vw - 100%) / 2);
    padding: 0.7rem 0 0.35rem;
  }

  .site-footer__main {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.35rem 0.5rem;
    padding-bottom: 0.45rem;
  }

  .site-footer__navigation {
    grid-column: 1 / -1;
  }

  .site-footer__navigation ul {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.05rem 0.35rem;
  }

  .site-footer__navigation a {
    min-height: 44px;
    font-size: 0.8rem;
  }

  .site-footer__socials {
    align-self: center;
  }

  .site-footer__socials a {
    width: 44px;
    height: 44px;
  }

  .site-footer__bottom {
    min-height: 42px;
    font-size: 0.72rem;
  }

  .site-footer__top {
    bottom: calc(92px + env(safe-area-inset-bottom) + 0.75rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-footer *,
  .site-footer *::before,
  .site-footer *::after {
    scroll-behavior: auto !important;
    transition: none !important;
  }

  .site-footer__socials a:hover,
  .site-footer__socials a:focus-visible,
  .site-footer__top {
    transition: none;
  }

  .site-footer__top--visible:hover {
    transform: none;
  }
}
</style>
