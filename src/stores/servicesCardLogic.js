import { defineStore } from 'pinia';
import axios from 'axios';
import { remoteEndpoints } from '../config/remoteEndpoints.js';

export const useServiceStore = defineStore({
  id: 'services',
  state: () => ({
    servicesItem: [],
  }),
  actions: {
    async fetchServices() {
      try {
        const response = await axios.get(remoteEndpoints.avatarDataUrl);
        const data = response.data;
        if (data.servicesCard && Array.isArray(data.servicesCard)) {
          this.servicesItem = data.servicesCard.map((item) => ({
            ...item,
            photo: remoteEndpoints.resolveContentApiAsset(item.photo),
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
