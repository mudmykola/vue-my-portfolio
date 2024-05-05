<template>
  <div class="mobile-navigation">
    <button @click="toggleMenu" :class="{ 'close-icon': isOpen }" class="burger-icon">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <transition name="fade">
      <div v-if="isOpen" class="menu-panel">
        <ul class="menu-items">
          <li v-for="item in menuItems" :key="item.id" @click="handleItemClick(item)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const menuItems = [
  { id: 1, name: 'Home', link: '/' },
  { id: 2, name: 'About', link: '/about' },
  { id: 3, name: 'Services', link: '/services' },
  { id: 4, name: 'Contact', link: '/contact' }
];

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const handleItemClick = (item) => {
  router.push(item.link);
};
</script>

<style lang="scss">
.mobile-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #000000;
  z-index: 9999;
}

.burger-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  transition: transform 0.3s ease;
}

.burger-icon span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #fff;
  margin-bottom: 5px;
  transition: transform 0.3s ease;
}

.close-icon span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.close-icon span:nth-child(2) {
  opacity: 0;
}

.close-icon span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.menu-panel {
  position: absolute;
  bottom: 50px;
  left: 0;
  width: 100%;
  background-color: #333;
  border: 1px solid #ccc;
  padding: 10px;
}

.menu-items {
  display: flex;
  flex-direction: column;
}

.menu-items li {
  margin-bottom: 10px;
  cursor: pointer;
  color: #fff;
}

.menu-items li:hover {
  text-decoration: underline;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
@media only screen and (max-width: 430px) {

  .mobile-navigation{
    display: block;
  }
}
</style>