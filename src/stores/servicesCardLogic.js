
import { defineStore } from 'pinia';
import axios from 'axios';

export const useServiceStore = defineStore({
    id: 'services',
    state: () => ({
        servicesItem: [],
    }),
    actions: {
        async fetchServices() {
            try {
                const response = await axios.get('https://test-api-mudmykola.vercel.app/api-my-portfolio-avatar.json');
                const data = response.data;
                if (data.servicesCard && Array.isArray(data.servicesCard)) {
                    const baseURL = 'https://test-api-mudmykola.vercel.app';
                    this.servicesItem = data.servicesCard.map(item => ({
                        ...item,
                        photo: `${baseURL}${item.photo}`
                    }));
                } else {
                    console.error('Invalid or missing services data');
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        },
    },
});