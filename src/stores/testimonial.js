import { defineStore } from 'pinia';
import axios from 'axios';
import { remoteEndpoints } from '../config/remoteEndpoints.js';

export const useTestimonialsStore = defineStore({
  id: 'testimonials',
  state: () => ({
    baseURL: remoteEndpoints.contentApiBase,
    testimonials: [],
    groupedTestimonials: [],
  }),
  actions: {
    async fetchTestimonials() {
      try {
        const response = await axios.get(
          remoteEndpoints.avatarDataUrl
        );
        const data = response.data;

        if (data && Array.isArray(data.testimonialCard)) {
          this.testimonials = data.testimonialCard;
          const chunkSize = 4;
          for (let i = 0; i < this.testimonials.length; i += chunkSize) {
            this.groupedTestimonials.push(
              this.testimonials.slice(i, i + chunkSize)
            );
          }
        } else {
          console.error('Invalid or missing testimonials data');
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    },
    getPhotoUrl(photo) {
      return `${this.baseURL}${photo}`;
    },
  },
});
