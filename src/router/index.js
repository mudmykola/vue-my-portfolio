import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AboutPage from "@/views/about/AboutPage.vue";
import ResumePage from "@/views/resume/ResumePage.vue";
import PortfolioPage from "@/views/portfolio/PortfolioPage.vue";
import BlogPage from "@/views/blog/BlogPage.vue";
import ContactPage from "@/views/contact/ContactPage.vue";

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
    {
      path: '/resume',
      name: 'resume',
      component: ResumePage,
      meta: {title: 'Resume'}
    },

    {
      path: '/portfolio',
      name: 'portfolio',
      component: PortfolioPage,
      meta: {title: 'Portfolio'}
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogPage,
      meta: {title: 'Blog'}
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage,
      meta: {title: 'Contact'}
    }


  ]
})

export default router