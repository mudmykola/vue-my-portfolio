import { defineStore } from 'pinia';
import axios from 'axios';

export const useClientImagesStore = defineStore('clientImages', {
    state: () => ({
        baseURL: 'https://test-api-mudmykola.vercel.app',
        clientImages: []
    }),
    actions: {
        async fetchClientImages() {
            try {
                const response = await axios.get(`${this.baseURL}/api-my-portfolio-avatar.json`);
                const data = response.data;

                if (data.clientImage && Array.isArray(data.clientImage)) {
                    this.clientImages = data.clientImage.map(item => ({
                        ...item,
                        image: `${this.baseURL}${item.image}`
                    }));
                } else {
                    console.error('Invalid or missing client images data');
                }
            } catch (error) {
                console.error('Error fetching client images:', error);
            }
        }
    }
});