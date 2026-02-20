<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';

const props = defineProps({
  testimonials: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="about-testimonials-wrap" v-if="props.testimonials.length">
    <Swiper
      :space-between="10"
      :slides-per-view="1.3"
      :breakpoints="{
        480: { slidesPerView: 1.3, spaceBetween: 10 },
        640: { slidesPerView: 1.3, spaceBetween: 12 },
        900: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }"
      class="about-testimonial-swiper"
    >
      <SwiperSlide v-for="testimonial in props.testimonials" :key="testimonial.id">
        <article class="about-testimonial-card">
          <p class="about-testimonial-card__text">{{ testimonial.text }}</p>
          <div class="about-testimonial-card__author">
            <img width="44" height="44" :src="testimonial.photo" :alt="testimonial.author" />
            <div>
              <p>{{ testimonial.author }}</p>
              <span>{{ testimonial.company }}</span>
            </div>
          </div>
        </article>
      </SwiperSlide>
    </Swiper>
  </div>
  <p v-else class="text-default">No testimonials yet.</p>
</template>

<style scoped lang="scss">
.about-testimonials-wrap {
  min-width: 0;
}

.about-testimonial-swiper {
  padding-bottom: 0.3rem;
}

:deep(.about-testimonial-swiper .swiper-slide) {
  height: auto;
}

.about-testimonial-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.05);
  padding: 0.85rem;
  min-height: 190px;
}

.about-testimonial-card__text {
  margin: 0;
  color: var(--app-text-soft);
  font-size: 0.9rem;
  line-height: 1.45;
}

.about-testimonial-card__author {
  margin-top: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.about-testimonial-card__author img {
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.about-testimonial-card__author p {
  margin: 0;
  font-weight: 700;
  font-size: 0.9rem;
}

.about-testimonial-card__author span {
  font-size: 0.74rem;
  color: var(--app-text-soft);
  display: block;
  overflow-wrap: anywhere;
}

@media (max-width: 980px) {
  .about-testimonial-card {
    min-height: auto;
  }
}

@media (max-width: 640px) {
  .about-testimonial-card {
    padding: 0.58rem;
    border-radius: 12px;
    min-height: 126px;
  }

  .about-testimonial-card__text {
    font-size: 0.79rem;
    line-height: 1.35;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .about-testimonial-card__author {
    margin-top: 0.46rem;
    gap: 0.45rem;
  }

  .about-testimonial-card__author img {
    width: 36px;
    height: 36px;
  }

  .about-testimonial-card__author p {
    font-size: 0.8rem;
  }

  .about-testimonial-card__author span {
    font-size: 0.68rem;
  }
}

@media (max-width: 420px) {
  .about-testimonial-card {
    padding: 0.5rem;
    min-height: 118px;
  }

  .about-testimonial-card__text {
    -webkit-line-clamp: 3;
  }
}

</style>
