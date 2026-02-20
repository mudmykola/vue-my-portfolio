import {
  faHome,
  faUser,
  faFile,
  faBriefcase,
  faEnvelope,
  faRss,
} from '@fortawesome/free-solid-svg-icons';

export const firstName = 'Mykola';
export const lastName = 'Mud';

export const menuItems = [
  { id: 1, name: 'Home', icon: faHome, link: '/' },
  { id: 2, name: 'About me', icon: faUser, link: '/about' },
  { id: 3, name: 'Resume', icon: faFile, link: '/resume' },
  { id: 4, name: 'Portfolio', icon: faBriefcase, link: '/portfolio' },
  { id: 5, name: 'Blog', icon: faRss, link: '/blog' },
  { id: 6, name: 'Contact', icon: faEnvelope, link: '/contact' },
];
