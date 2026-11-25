<script setup>
defineProps({
  kind: {
    type: String,
    default: 'arc',
    validator: (value) => ['arc', 'waves'].includes(value),
  },
});
</script>

<template>
  <div
    :class="['decorative-accent', `decorative-accent--${kind}`]"
    aria-hidden="true"
  ></div>
</template>

<style lang="scss">
.decorative-accent {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  user-select: none;
}

.decorative-accent--arc {
  top: -9rem;
  right: -7rem;
  width: min(38vw, 520px);
  height: min(34vw, 430px);
  border: 1px solid rgba(24, 214, 160, 0.3);
  border-left-color: transparent;
  border-bottom-color: transparent;
  border-radius: 50%;
  opacity: 0.76;
  transform: rotate(-15deg);
}

.decorative-accent--arc::before {
  content: '';
  position: absolute;
  inset: 3.5rem 2rem auto auto;
  width: 14rem;
  height: 7rem;
  border-radius: 50%;
  background: rgba(24, 214, 160, 0.12);
  filter: blur(28px);
}

.decorative-accent--arc::after {
  content: '';
  position: absolute;
  top: 5rem;
  right: 5.5rem;
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 0 0.3rem rgba(24, 214, 160, 0.12);
}

.decorative-accent--waves {
  inset: auto 0 0;
  height: 9rem;
  overflow: hidden;
}

.decorative-accent--waves::before,
.decorative-accent--waves::after {
  content: '';
  position: absolute;
  bottom: -5.5rem;
  width: 58%;
  height: 10rem;
  border-top: 1px solid rgba(24, 214, 160, 0.4);
  background: rgba(24, 214, 160, 0.1);
  filter: blur(0.2px);
}

.decorative-accent--waves::before {
  left: -12%;
  border-radius: 58% 42% 0 0;
  transform: rotate(-5deg);
}

.decorative-accent--waves::after {
  right: -12%;
  border-radius: 42% 58% 0 0;
  transform: rotate(5deg);
}

@media (max-width: 640px) {
  .decorative-accent--arc {
    top: -4rem;
    right: -9rem;
    width: 19rem;
    height: 15rem;
    opacity: 0.42;
  }

  .decorative-accent--arc::before,
  .decorative-accent--arc::after {
    display: none;
  }

  .decorative-accent--waves {
    height: 5rem;
  }

  .decorative-accent--waves::before,
  .decorative-accent--waves::after {
    bottom: -6rem;
    width: 72%;
    height: 8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .decorative-accent {
    transform: none;
  }
}
</style>
