import { markRaw } from 'vue';
import { defineStore } from 'pinia';

const createTone = (context, { type, from, to, volume, duration, startAt }) => {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(from, startAt);
  oscillator.frequency.exponentialRampToValueAtTime(to, startAt + duration);

  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.linearRampToValueAtTime(volume, startAt + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration + 0.025);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration + 0.03);
};

export const useAudioStore = defineStore('audio', {
  state: () => ({
    context: null,
  }),
  actions: {
    playSound() {
      if (typeof window === 'undefined') return;

      const AudioContextConstructor =
        window.AudioContext || window.webkitAudioContext;
      if (!AudioContextConstructor) return;

      try {
        this.context ??= markRaw(new AudioContextConstructor());

        const context = this.context;
        if (context.state === 'suspended') {
          void context.resume().catch(() => {});
        }

        const startAt = context.currentTime + 0.005;
        createTone(context, {
          type: 'triangle',
          from: 1180,
          to: 720,
          volume: 0.016,
          duration: 0.052,
          startAt,
        });
        createTone(context, {
          type: 'sine',
          from: 330,
          to: 220,
          volume: 0.009,
          duration: 0.068,
          startAt,
        });
      } catch {
        // Sound is optional; audio errors must never interrupt navigation.
      }
    },
  },
});
