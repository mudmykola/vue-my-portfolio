<script setup>
import {onMounted} from "vue"
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/swiper-bundle.css';

import { useTestimonialsStore } from '@/stores/testimonial.js';


const store = useTestimonialsStore();
const props = defineProps( ({
  title: String
}))

onMounted(() => {
  store.fetchTestimonials();
});
</script>

<template>
  <div class="services mt-10 testimonial">
    <div class="services-title testimonial-title text-2xl font-bold">
      <h2>{{ title }}</h2>
    </div>
    <div class="testimonial-inner mt-5" v-if="store.testimonials.length">
      <Swiper>
        <template v-for="(group, index) in store.groupedTestimonials" :key="index">
          <SwiperSlide>
            <div class="testimonial-group flex justify-center gap-5">
              <div v-for="(testimonial, idx) in group" :key="idx" class="testimonial-item rounded py-2 px-2">
                <p class="font-light">{{ testimonial.text }}</p>
                <div class="testimonial-author flex items-center gap-2 pt-2">
                  <div class="testimonial-author__image">
                    <img width="60" height="60" :src="store.getPhotoUrl(testimonial.photo)" :alt="testimonial.author"
                         class="photo rounded">
                  </div>
                  <div class="testimonial-author__text">
                    <p class="author text-[18px] font-bold">{{ testimonial.author }}</p>
                    <p class="testimonial-company font-medium rounded">{{ testimonial.company }}</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </template>
      </Swiper>
    </div>
    <div v-else>
      <p>Loading testimonials...</p>
    </div>
  </div>
</template>

<style lang="scss">
@import "style.scss";
</style>