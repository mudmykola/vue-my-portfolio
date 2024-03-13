import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AboutPage from "@/views/about/AboutPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {title: 'Home Page'}
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
      meta: {title: 'About Me'}
    },

  ]
})

export default router