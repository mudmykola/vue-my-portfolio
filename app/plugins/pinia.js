import { createPinia } from 'pinia';

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(createPinia());
});
