import { defineStore } from 'pinia';
import axios from 'axios';

export const useTestimonialsStore = defineStore({
    id: 'testimonials',
    state: () => ({
        baseURL: 'https://test-api-mudmykola.vercel.app',
        testimonials: [],
        groupedTestimonials: []
    }),
    actions: {
        async fetchTestimonials() {
            try {
                const response = await axios.get(`${this.baseURL}/api-my-portfolio-avatar.json`);
                const data = response.data;

                if (data && Array.isArray(data.testimonialCard)) {
                    this.testimonials = data.testimonialCard;
                    const chunkSize = 4;
                    for (let i = 0; i < this.testimonials.length; i += chunkSize) {
                        this.groupedTestimonials.push(this.testimonials.slice(i, i + chunkSize));
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
        }
    }
});