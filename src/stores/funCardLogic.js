import { defineStore } from 'pinia';
import axios from 'axios';
import { remoteEndpoints } from '../config/remoteEndpoints.js';

export const useFactsStore = defineStore('facts', {
  state: () => ({
    facts: [],
  }),
  actions: {
    async fetchFacts() {
      try {
        const response = await axios.get(remoteEndpoints.avatarDataUrl);
        const data = response.data;
        if (data.funCard && Array.isArray(data.funCard)) {
          this.facts = data.funCard.map((item) => ({
            title: item.title,
            value: item.number,
            image: remoteEndpoints.resolveContentApiAsset(item.photo),
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
