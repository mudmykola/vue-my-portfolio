<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  descriptions: {
    type: Array,
    default: () => [],
  },
});

const isExpanded = ref(false);
const additionalDescriptions = computed(() => props.descriptions.slice(1));
const canToggle = computed(() => props.descriptions.length > 1);

const expand = (element, done) => {
  element.style.height = '0px';
  element.style.opacity = '0';
  const complete = (event) => {
    if (event.propertyName !== 'height') return;
    element.removeEventListener('transitionend', complete);
    element.removeEventListener('transitioncancel', complete);
    element.style.height = 'auto';
    done();
  };
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    element.style.height = 'auto';
    element.style.opacity = '1';
    done();
    return;
  }
  element.addEventListener('transitionend', complete);
  element.addEventListener('transitioncancel', complete);
  requestAnimationFrame(() => {
    element.style.height = `${element.scrollHeight}px`;
    element.style.opacity = '1';
  });
};

const collapse = (element, done) => {
  element.style.height = `${element.scrollHeight}px`;
  element.style.opacity = '1';
  const complete = (event) => {
    if (event.propertyName !== 'height') return;
    element.removeEventListener('transitionend', complete);
    element.removeEventListener('transitioncancel', complete);
    done();
  };
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    done();
    return;
  }
  element.addEventListener('transitionend', complete);
  element.addEventListener('transitioncancel', complete);
  requestAnimationFrame(() => {
    element.style.height = '0px';
    element.style.opacity = '0';
  });
};
</script>

<template>
  <div class="about-intro-copy">
    <p v-if="descriptions[0]" class="about-intro-copy__lead">
      {{ descriptions[0] }}
    </p>

    <Transition @enter="expand" @leave="collapse">
      <div
        v-show="isExpanded"
        id="about-intro-copy-more"
        class="about-intro-copy__more"
      >
        <p
          v-for="(item, index) in additionalDescriptions"
          :key="`${index}-${item.slice(0, 16)}`"
        >
          {{ item }}
        </p>
      </div>
    </Transition>

    <button
      v-if="canToggle"
      type="button"
      class="about-intro-copy__toggle"
      :aria-expanded="isExpanded"
      :aria-controls="canToggle ? 'about-intro-copy-more' : undefined"
      @click="isExpanded = !isExpanded"
    >
      {{ isExpanded ? 'Show less' : 'Read more' }}
      <span aria-hidden="true">→</span>
    </button>
  </div>
</template>

<style scoped lang="scss">
.about-intro-copy {
  max-width: 58ch;
  min-width: 0;
}

.about-intro-copy p {
  margin: 0 0 0.65rem;
  color: var(--app-text-soft);
  font-size: var(--type-body);
  line-height: 1.55;
}

.about-intro-copy__more {
  overflow: hidden;
  transition:
    height 260ms var(--ease-standard),
    opacity 200ms var(--ease-standard);
  will-change: height, opacity;
}

.about-intro-copy__toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 44px;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-accent);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: color var(--motion-fast) var(--ease-standard);
}

.about-intro-copy__toggle span {
  transition: transform var(--motion-fast) var(--ease-standard);
}

.about-intro-copy__toggle:hover {
  color: var(--color-accent-hover);
}

.about-intro-copy__toggle:hover span {
  transform: translateX(3px);
}

.about-intro-copy__toggle:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
  border-radius: var(--radius-sm);
}

@media (prefers-reduced-motion: reduce) {
  .about-intro-copy__more {
    transition: none;
  }

  .about-intro-copy__toggle,
  .about-intro-copy__toggle span {
    transition: none;
  }
}
</style>
