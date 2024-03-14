import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { faHome, faUser, faFile, faBriefcase, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const avatarUrl = ref('src/assets/images/avatar-3.png');
export const firstName = ref('Mykola');
export const lastName = ref('Mud');

export const menuItems = ref([
    { id: 1, name: 'Home', icon: faHome, link: '/' },
    { id: 2, name: 'About me', icon: faUser, link: '/about' },
    { id: 3, name: 'Resume', icon: faFile, link: '/resume' },
    { id: 4, name: 'Portfolio', icon: faBriefcase, link: '/portfolio' },
    { id: 5, name: 'Contact', icon: faEnvelope, link: '/contact' }
]);

export const isCurrentRoute = (route) => {
    const currentRoute = useRoute();
    return currentRoute.path === route;
};

export const playClickSound = () => {
    const audio = new Audio('src/assets/audio/rclick.mp3');
    audio.play();
};