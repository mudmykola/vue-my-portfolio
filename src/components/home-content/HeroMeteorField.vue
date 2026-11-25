<script setup>
const meteors = [
  { id: 1, left: '58%', top: '12%', size: '2px', length: '42px', duration: '4.8s', delay: '0.25s', dx: '112px', dy: '118px', angle: '32deg' },
  { id: 2, left: '86%', top: '18%', size: '1.5px', length: '30px', duration: '4.2s', delay: '1.15s', dx: '-74px', dy: '112px', angle: '-28deg' },
  { id: 3, left: '71%', top: '34%', size: '2px', length: '48px', duration: '5.2s', delay: '1.9s', dx: '92px', dy: '126px', angle: '26deg' },
  { id: 4, left: '93%', top: '43%', size: '1.5px', length: '26px', duration: '3.8s', delay: '0.8s', dx: '-58px', dy: '94px', angle: '-34deg' },
  { id: 5, left: '63%', top: '57%', size: '1.5px', length: '34px', duration: '4.6s', delay: '2.65s', dx: '76px', dy: '104px', angle: '30deg' },
  { id: 6, left: '82%', top: '68%', size: '2px', length: '38px', duration: '4.4s', delay: '3.25s', dx: '-82px', dy: '100px', angle: '-30deg' },
  { id: 7, left: '97%', top: '74%', size: '1.5px', length: '24px', duration: '3.6s', delay: '2.1s', dx: '-54px', dy: '82px', angle: '-26deg' },
];
</script>

<template>
  <div class="hero-meteor-field" aria-hidden="true">
    <span
      v-for="meteor in meteors"
      :key="meteor.id"
      class="hero-meteor"
      :style="{
        '--meteor-left': meteor.left,
        '--meteor-top': meteor.top,
        '--meteor-size': meteor.size,
        '--meteor-length': meteor.length,
        '--meteor-duration': meteor.duration,
        '--meteor-delay': meteor.delay,
        '--meteor-dx': meteor.dx,
        '--meteor-dy': meteor.dy,
        '--meteor-angle': meteor.angle,
      }"
    />
  </div>
</template>

<style lang="scss">
.hero-meteor-field {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.hero-meteor {
  position: absolute;
  top: var(--meteor-top);
  left: var(--meteor-left);
  width: var(--meteor-size);
  height: var(--meteor-size);
  border-radius: 50%;
  background: var(--color-accent);
  opacity: 0;
  filter: drop-shadow(0 0 5px rgba(24, 214, 160, 0.32));
  transform: rotate(var(--meteor-angle));
  animation: hero-meteor-fall var(--meteor-duration) var(--ease-enter)
    var(--meteor-delay) 1 both;
}

.hero-meteor::after {
  position: absolute;
  top: 50%;
  right: calc(var(--meteor-length) * -1);
  width: var(--meteor-length);
  height: 1px;
  content: '';
  background: linear-gradient(90deg, rgba(24, 214, 160, 0.48), transparent);
  opacity: 0.72;
  transform: translateY(-50%);
  transform-origin: right center;
}

@keyframes hero-meteor-fall {
  0% {
    opacity: 0;
    transform: translate3d(0, 0, 0) rotate(var(--meteor-angle));
  }

  15% {
    opacity: 0.5;
  }

  72% {
    opacity: 0.28;
  }

  100% {
    opacity: 0;
    transform: translate3d(var(--meteor-dx), var(--meteor-dy), 0)
      rotate(var(--meteor-angle));
  }
}

@media (max-width: 640px) {
  .hero-meteor-field {
    opacity: 0.48;
  }

  .hero-meteor:nth-child(n + 5) {
    display: none;
  }

  .hero-meteor::after {
    right: -24px;
    width: 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-meteor-field {
    display: none;
  }
}
</style>
