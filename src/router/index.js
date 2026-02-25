import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AboutPage from '@/views/about/AboutPage.vue';
import ResumePage from '@/views/resume/ResumePage.vue';
import PortfolioPage from '@/views/portfolio/PortfolioPage.vue';
import BlogPage from '@/views/blog/BlogPage.vue';
import ContactPage from '@/views/contact/ContactPage.vue';
import GamePage from '@/views/game/GamePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        title: 'Front-End Engineer Portfolio',
        seo: {
          title: 'Front-End Engineer Portfolio',
          description:
            'Front-end engineer portfolio focused on Vue, Nuxt, Shopify storefronts, and performance-driven UI implementation.',
          canonicalPath: '/',
        },
      },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
      meta: {
        title: 'About',
        seo: {
          title: 'About',
          description:
            'About Mykola Mud: front-end engineering experience, services, testimonials, clients, and work highlights.',
          canonicalPath: '/about',
        },
      },
    },
    {
      path: '/resume',
      name: 'resume',
      component: ResumePage,
      meta: {
        title: 'Resume',
        seo: {
          title: 'Resume',
          description:
            'Resume of Mykola Mud, Front-End Engineer: experience, education, core stack, tools, and downloadable CV options.',
          canonicalPath: '/resume',
        },
      },
    },

    {
      path: '/portfolio',
      name: 'portfolio',
      component: PortfolioPage,
      meta: {
        title: 'Portfolio',
        seo: {
          title: 'Portfolio',
          description:
            'Selected front-end and eCommerce projects built with Vue, Nuxt, Shopify, and performance-first UI architecture.',
          canonicalPath: '/portfolio',
        },
      },
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogPage,
      meta: {
        title: 'Blog',
        seo: {
          title: 'Blog',
          description:
            'Technical notes, front-end case studies, and implementation-focused articles on Vue, Nuxt, and eCommerce development.',
          canonicalPath: '/blog',
        },
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage,
      meta: {
        title: 'Contact',
        seo: {
          title: 'Contact',
          description:
            'Contact Mykola Mud for Vue/Nuxt, Shopify frontend, and performance-focused front-end engineering work.',
          canonicalPath: '/contact',
        },
      },
    },
    {
      path: '/game',
      name: 'game',
      component: GamePage,
      meta: {
        title: 'Game',
        seo: {
          title: 'Game',
          description: 'Interactive game page in the portfolio project.',
          canonicalPath: '/game',
          noindex: true,
        },
      },
    },
  ],
});

export default router;
