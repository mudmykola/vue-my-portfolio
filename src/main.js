import './assets/tailwindCSS/main.css'
import './assets/style/global-style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

library.add(faGithub, faInstagram, faLinkedin);

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router)

app.mount('#app')