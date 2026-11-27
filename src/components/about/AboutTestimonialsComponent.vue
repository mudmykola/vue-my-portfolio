<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  testimonials: {
    type: Array,
    default: () => [],
  },
});

const isExpanded = ref(false);
const displayedTestimonials = computed(() =>
  isExpanded.value ? props.testimonials : props.testimonials.slice(0, 3)
);
</script>

<template>
  <div v-if="props.testimonials.length" class="about-testimonials">
    <div class="about-testimonials__grid">
      <article
        v-for="testimonial in displayedTestimonials"
        :key="testimonial.id"
        class="about-testimonial"
      >
        <span class="about-testimonial__quote" aria-hidden="true">“</span>
        <p class="about-testimonial__text">{{ testimonial.text }}</p>
        <div class="about-testimonial__author">
          <img
            width="40"
            height="40"
            :src="testimonial.photo"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <div>
            <p>{{ testimonial.author }}</p>
            <span>{{ testimonial.company }}</span>
          </div>
        </div>
      </article>
    </div>

    <button
      v-if="props.testimonials.length > 3"
      class="about-testimonials__toggle"
      type="button"
      :aria-expanded="isExpanded"
      @click="isExpanded = !isExpanded"
    >
      {{
        isExpanded
          ? 'Show fewer testimonials'
          : `Show all ${props.testimonials.length} testimonials`
      }}
      <span aria-hidden="true">{{ isExpanded ? '↑' : '→' }}</span>
    </button>
  </div>
  <p v-else class="text-default">No testimonials yet.</p>
</template>

<style scoped lang="scss">
.about-testimonials {
  min-width: 0;
}

.about-testimonials__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.about-testimonial {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 1.35rem 0 0;
}

.about-testimonial + .about-testimonial {
  padding-left: 1.35rem;
  border-left: 1px solid var(--app-border);
}

.about-testimonial:nth-child(3n + 1) {
  padding-left: 0;
  border-left: 0;
}

.about-testimonial__quote {
  height: 1.4rem;
  color: var(--color-accent);
  font-family: Georgia, serif;
  font-size: 2.6rem;
  font-weight: 700;
  line-height: 1;
}

.about-testimonial__text {
  margin: 0.3rem 0 0;
  color: var(--app-text-soft);
  font-size: var(--type-body);
  font-style: italic;
  line-height: 1.45;
}

.about-testimonial__author {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-top: auto;
  padding-top: 0.9rem;
}

.about-testimonial__author img {
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  border-radius: 50%;
  object-fit: cover;
}

.about-testimonial__author p {
  margin: 0;
  font-weight: 750;
}

.about-testimonial__author span {
  display: block;
  color: var(--app-text-soft);
  font-size: var(--type-supporting);
}

.about-testimonials__toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 44px;
  margin-top: 1rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-accent);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition: color var(--motion-fast) var(--ease-standard);
}

.about-testimonials__toggle span {
  transition: transform var(--motion-fast) var(--ease-standard);
}

.about-testimonials__toggle:hover {
  color: var(--color-accent-hover);
}

.about-testimonials__toggle:hover span {
  transform: translateX(3px);
}

.about-testimonials__toggle:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
  border-radius: var(--radius-sm);
}

@media (max-width: 768px) {
  .about-testimonials__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.2rem 0.75rem;
  }

  .about-testimonial {
    padding-right: 0.75rem;
  }

  .about-testimonial + .about-testimonial {
    padding-left: 0;
    border-left: 0;
  }

  .about-testimonial:nth-child(even) {
    padding-left: 0.75rem;
    border-left: 1px solid var(--app-border);
  }

  .about-testimonial:nth-child(odd) {
    padding-left: 0;
    border-left: 0;
  }
}

@media (max-width: 520px) {
  .about-testimonials__grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }

  .about-testimonial,
  .about-testimonial + .about-testimonial {
    padding: 1rem 0;
    border-left: 0;
  }

  .about-testimonial + .about-testimonial {
    border-top: 1px solid var(--app-border);
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-testimonials__toggle,
  .about-testimonials__toggle span {
    transition: none;
  }
}
</style>
