<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps({
  text: { type: String, default: '' },
  lines: { type: Number, default: 2 },
  moreLabel: { type: String, default: '…more' },
  lessLabel: { type: String, default: 'less' },
});

const el = ref(null);
const expanded = ref(false);
const overflowing = ref(false);

const measure = () => {
  const node = el.value;
  if (!node || expanded.value) return;
  overflowing.value = node.scrollHeight > node.clientHeight + 1;
};

let observer = null;

onMounted(async () => {
  await nextTick();
  measure();
  if (typeof ResizeObserver !== 'undefined' && el.value) {
    observer = new ResizeObserver(() => measure());
    observer.observe(el.value);
  }
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});

watch(
  () => props.text,
  async () => {
    expanded.value = false;
    await nextTick();
    measure();
  }
);

const toggle = () => {
  expanded.value = !expanded.value;
};
</script>

<template>
  <span class="clamp">
    <span
      ref="el"
      class="clamp__text"
      :class="{ 'is-clamped': !expanded }"
      :style="{ '--clamp-lines': lines }"
      >{{ text }}</span
    >
    <button
      v-if="overflowing"
      type="button"
      class="clamp__toggle"
      :aria-expanded="expanded"
      @click.stop="toggle"
    >
      {{ expanded ? lessLabel : moreLabel }}
    </button>
  </span>
</template>

<style scoped lang="scss">
.clamp {
  display: block;
}

.clamp__text {
  display: block;
  font: inherit;
  color: inherit;
  line-height: inherit;
}

.clamp__text.is-clamped {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--clamp-lines, 2);
  overflow: hidden;
}

.clamp__toggle {
  margin-top: 0.15rem;
  padding: 0;
  border: 0;
  background: none;
  color: var(--app-accent);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  line-height: 1.2;
}

.clamp__toggle:hover {
  text-decoration: underline;
}
</style>
