import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import {
  faBriefcase,
  faEnvelope,
  faFile,
  faHome,
  faRss,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faGithub,
  faInstagram,
  faLinkedin,
  faBriefcase,
  faEnvelope,
  faFile,
  faHome,
  faRss,
  faUser
);

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.component('font-awesome-icon', FontAwesomeIcon);
});
