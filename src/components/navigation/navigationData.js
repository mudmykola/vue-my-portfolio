import { useRoute } from 'vue-router';
import { ref } from 'vue';
import {
  faHome,
  faUser,
  faFile,
  faBriefcase,
  faEnvelope,
  faRss,
  faGhost,
} from '@fortawesome/free-solid-svg-icons';

export const firstName = ref('Mykola');
export const lastName = ref('Mud');

export const menuItems = ref([
  { id: 1, name: 'Home', icon: faHome, link: '/' },
  { id: 2, name: 'About me', icon: faUser, link: '/about' },
  { id: 3, name: 'Resume', icon: faFile, link: '/resume' },
  { id: 4, name: 'Portfolio', icon: faBriefcase, link: '/portfolio' },
  { id: 5, name: 'Blog', icon: faRss, link: '/blog' },
  { id: 6, name: 'Contact', icon: faEnvelope, link: '/contact' },
  // { id: 6, name: 'Game', icon: faGhost, link: '/game' },
]);

export const isCurrentRoute = (route) => {
  const currentRoute = useRoute();
  return currentRoute.path === route;
};
