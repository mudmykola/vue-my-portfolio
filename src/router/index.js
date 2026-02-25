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
        title: 'Vue and Nuxt Front-End Engineer Portfolio',
        seo: {
          title: 'Vue and Nuxt Front-End Engineer Portfolio',
          description:
            'Explore Mykola Mud’s front-end engineering portfolio featuring Vue and Nuxt interfaces, Shopify storefront implementation, performance optimization, reusable component architecture, and production-focused UX delivery for real products.',
          canonicalPath: '/',
        },
      },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
      meta: {
        title: 'About Mykola Mud Front-End Engineer',
        seo: {
          title: 'About Mykola Mud Front-End Engineer',
          description:
            'Learn about Mykola Mud’s front-end engineering background, services, client collaborations, testimonials, and workflow strengths across Vue, Nuxt, Shopify, and performance-focused user interface development projects.',
          canonicalPath: '/about',
        },
      },
    },
    {
      path: '/resume',
      name: 'resume',
      component: ResumePage,
      meta: {
        title: 'Front-End Engineer Resume and Experience',
        seo: {
          title: 'Front-End Engineer Resume and Experience',
          description:
            'Review Mykola Mud’s front-end engineer resume with professional experience, education history, core stack, tooling, and downloadable CV options covering Vue, Nuxt, Shopify, and modern interface delivery work.',
          canonicalPath: '/resume',
        },
      },
    },

    {
      path: '/portfolio',
      name: 'portfolio',
      component: PortfolioPage,
      meta: {
        title: 'Front-End Portfolio Projects and Case Studies',
        seo: {
          title: 'Front-End Portfolio Projects and Case Studies',
          description:
            'Browse selected front-end portfolio projects and case studies built with Vue, Nuxt, Shopify, and performance-first UI architecture, including implementation details, visual solutions, and technical stack decisions.',
          canonicalPath: '/portfolio',
        },
      },
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogPage,
      meta: {
        title: 'Front-End Engineering Blog and Case Notes',
        seo: {
          title: 'Front-End Engineering Blog and Case Notes',
          description:
            'Read front-end engineering blog notes, implementation case studies, and practical articles on Vue, Nuxt, eCommerce UI architecture, maintainability, and performance optimization for production-ready interfaces.',
          canonicalPath: '/blog',
        },
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage,
      meta: {
        title: 'Contact Mykola Mud for Front-End Projects',
        seo: {
          title: 'Contact Mykola Mud for Front-End Projects',
          description:
            'Contact Mykola Mud to discuss Vue, Nuxt, Shopify frontend, and performance-focused front-end engineering work, request project estimates, or start collaboration on product interface improvements.',
          canonicalPath: '/contact',
        },
      },
    },
    {
      path: '/game',
      name: 'game',
      component: GamePage,
      meta: {
        title: 'Interactive Game Demo and Portfolio Experiment',
        seo: {
          title: 'Interactive Game Demo and Portfolio Experiment',
          description:
            'Interactive game demo and portfolio experiment page included in the project as a non-indexed feature example for UI interactions and front-end implementation practice.',
          canonicalPath: '/game',
          noindex: true,
        },
      },
    },
  ],
});

export default router;
