import './assets/tailwindCSS/main.css';
import './assets/style/global-style.scss';
import './assets/style/media.scss';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

config.autoAddCss = false;
library.add(faGithub, faInstagram, faLinkedin);

import App from './App.vue';
import router from './router';

const app = createApp(App);

if (import.meta.env.DEV) {
  app.config.globalProperties.$portfolioProjectsUrl =
    import.meta.env.VITE_PORTFOLIO_PROJECTS_URL || '/api/portfolio';
}

app.use(createPinia());
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);

const mountApp = () => app.mount('#app');

router.isReady().then(mountApp, mountApp);
