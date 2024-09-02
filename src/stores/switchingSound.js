import { defineStore } from 'pinia';
import axios from 'axios';

export const useAudioStore = defineStore('audio', {
  state: () => ({
    audio: null,
  }),
  actions: {
    async fetchSound() {
      try {
        const response = await axios.get(
          'https://api.github.com/repos/mudmykola/test-api/contents/audio/rclick.mp3'
        );
        const data = response.data;

        if (data.download_url) {
          const audioUrl = data.download_url;
          this.audio = new Audio(audioUrl);
        } else {
          console.error('Invalid response format or missing audio data');
        }
      } catch (error) {
        console.error('Error fetching audio:', error);
      }
    },
    playSound() {
      if (this.audio) {
        this.audio.play();
      } else {
        console.error('Audio not loaded');
      }
    },
  },
});
