import { defineStore } from 'pinia';
import axios from 'axios';

export const useFactsStore = defineStore('facts', {
    state: () => ({
        facts: [],
    }),
    actions: {
        async fetchFacts() {
            try {
                const response = await axios.get('https://test-api-mudmykola.vercel.app/api-my-portfolio-avatar.json');
                const data = response.data;
                if (data.funCard && Array.isArray(data.funCard)) {
                    this.facts = data.funCard.map(item => ({
                        title: item.title,
                        value: item.number,
                        image: `https://test-api-mudmykola.vercel.app${item.photo}`
                    }));
                } else {
                    console.error('Invalid or missing fun facts data');
                }
            } catch (error) {
                console.error('Error fetching fun facts:', error);
            }
        },
    },
});