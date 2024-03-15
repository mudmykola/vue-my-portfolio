import { ref } from 'vue';
import { useIntervalFn } from '@vueuse/core';

export const fullName = ref('Mykola Mud');

export const titles = [
    'Software Engineer',
    'Vue | Nuxt Engineer',
    'Shopify E-Commerce Developer'
];

export const title = ref(titles[0]);
export const transitioning = ref(false);

useIntervalFn(() => {
    transitioning.value = true;
    setTimeout(() => {
        title.value = titles[(titles.indexOf(title.value) + 1) % titles.length];
        transitioning.value = false;
    }, 500);
}, 3000);