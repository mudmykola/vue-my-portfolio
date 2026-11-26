export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.config.globalProperties.$portfolioProjectsUrl = '/api/portfolio';
});
