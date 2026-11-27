<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'home',
    validator: (value) => ['home', 'resume'].includes(value),
  },
});

const host = ref(null);
const width = ref(1);
const height = ref(1);
const branches = ref([]);
const nodes = ref([]);
const ctaTraces = ref([]);
const ctaNodes = ref([]);
const meteors = [
  {
    id: 1,
    left: '16%',
    top: '14%',
    duration: '10s',
    delay: '0s',
    angle: '32deg',
  },
  {
    id: 2,
    left: '73%',
    top: '29%',
    duration: '10s',
    delay: '-2.5s',
    angle: '38deg',
  },
  {
    id: 3,
    left: '42%',
    top: '61%',
    duration: '10s',
    delay: '-5s',
    angle: '31deg',
  },
  {
    id: 4,
    left: '88%',
    top: '78%',
    duration: '10s',
    delay: '-7.5s',
    angle: '35deg',
  },
];

let resizeObserver;
let animationFrame;

const artifactPatterns = {
  home: {
    hero: '.home-hero',
    sections: [
      '.section-about',
      '.section-expertise',
      '.section-workflow',
      '.section-selected-work',
      '.section-cta',
    ],
    cta: '.section-cta',
  },
  resume: {
    hero: '.resume-hero',
    sections: [
      '.resume-experience',
      '.resume-skills',
      '.resume-education',
      '.resume-contact-cta',
    ],
    cta: '.resume-contact-cta',
  },
};

function updateArtifact() {
  const page = host.value?.parentElement;
  if (!page) return;

  const pattern = artifactPatterns[props.variant] ?? artifactPatterns.home;

  width.value = page.clientWidth;
  height.value = page.scrollHeight;
  const pageRect = page.getBoundingClientRect();

  const pageTop = pageRect.top + window.scrollY;
  const sectionNodes = pattern.sections
    .map((selector) => page.querySelector(selector))
    .filter(Boolean);
  const hero = page.querySelector(pattern.hero);
  const heroRect = hero?.getBoundingClientRect();
  const heroJunction = heroRect
    ? {
        x:
          heroRect.left -
          page.getBoundingClientRect().left +
          (props.variant === 'resume' ? 0.935 : 978 / 1200) * heroRect.width,
        y:
          heroRect.top +
          window.scrollY -
          pageTop +
          (props.variant === 'resume' ? 0.7 : 256 / 700) * heroRect.height,
        side: 1,
      }
    : null;
  const anchors = [
    ...(heroJunction ? [heroJunction] : []),
    ...sectionNodes.map((section, index) => {
      const rect = section.getBoundingClientRect();
      return {
        x: width.value * (index % 2 === 0 ? 0.935 : 0.95),
        y:
          rect.top +
          window.scrollY -
          pageTop +
          Math.min(rect.height * 0.32, 150),
        side: index % 2 === 0 ? -1 : 1,
      };
    }),
  ];

  nodes.value = anchors;
  branches.value = anchors.slice(1).map((anchor, index) => {
    const endX = anchor.x + anchor.side * Math.min(width.value * 0.05, 72);
    const bendY = anchor.y + (index % 2 === 0 ? -18 : 18);
    return `M ${anchor.x} ${anchor.y} L ${anchor.x} ${bendY} L ${endX} ${bendY}`;
  });

  const ctaSection = page.querySelector(pattern.cta);
  if (!ctaSection) {
    ctaTraces.value = [];
    ctaNodes.value = [];
    return;
  }

  const ctaRect = ctaSection.getBoundingClientRect();
  const ctaLeft = ctaRect.left - pageRect.left;
  const ctaTop = ctaRect.top + window.scrollY - pageTop;
  const ctaRight = ctaLeft + ctaRect.width;
  const ctaBottom = ctaTop + ctaRect.height;
  const ctaWidth = ctaRect.width;
  const upperNode = {
    x: ctaLeft + ctaWidth * 0.91,
    y: ctaTop + 28,
  };
  const lowerNode = {
    x: ctaLeft + ctaWidth * 0.86,
    y: ctaBottom - 14,
  };

  ctaTraces.value = [
    `M ${ctaLeft + ctaWidth * 0.78} ${ctaTop + 12} H ${upperNode.x} V ${upperNode.y} H ${ctaRight - 8}`,
    `M ${ctaRight - 8} ${ctaBottom - 30} V ${lowerNode.y} H ${lowerNode.x}`,
  ];
  ctaNodes.value = [
    upperNode,
    { x: ctaRight - 8, y: ctaBottom - 30 },
    lowerNode,
  ];
}

function scheduleUpdate() {
  cancelAnimationFrame(animationFrame);
  animationFrame = requestAnimationFrame(updateArtifact);
}

onMounted(() => {
  const page = host.value?.parentElement;
  if (!page) return;

  const pattern = artifactPatterns[props.variant] ?? artifactPatterns.home;

  resizeObserver = new ResizeObserver(scheduleUpdate);
  resizeObserver.observe(page);
  page
    .querySelectorAll(`${pattern.sections.join(', ')}, ${pattern.hero}`)
    .forEach((section) => resizeObserver.observe(section));
  window.addEventListener('resize', scheduleUpdate, { passive: true });
  window.addEventListener('load', scheduleUpdate, { once: true });
  scheduleUpdate();
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  window.removeEventListener('resize', scheduleUpdate);
  window.removeEventListener('load', scheduleUpdate);
  cancelAnimationFrame(animationFrame);
});
</script>

<template>
  <div ref="host" class="home-artifact-field" aria-hidden="true">
    <svg
      class="home-artifact-field__circuit"
      :viewBox="`0 0 ${width} ${height}`"
      preserveAspectRatio="none"
      focusable="false"
    >
      <path
        v-if="nodes.length"
        class="home-artifact-field__spine"
        :d="
          nodes.reduce((path, node, index) => {
            if (!index) return `M ${node.x} ${node.y}`;
            const previous = nodes[index - 1];
            const bendY = node.y - Math.min(24, (node.y - previous.y) / 3);
            return `${path} L ${previous.x} ${bendY} L ${node.x} ${bendY} L ${node.x} ${node.y}`;
          }, '')
        "
      />
      <path
        v-for="(branch, index) in branches"
        :key="`branch-${index}`"
        class="home-artifact-field__branch"
        :d="branch"
      />
      <path
        v-for="(trace, index) in ctaTraces"
        :key="`cta-trace-${index}`"
        class="home-artifact-field__cta-trace"
        :d="trace"
      />
      <circle
        v-for="(node, index) in nodes"
        :key="`node-${index}`"
        class="home-artifact-field__node"
        :cx="node.x"
        :cy="node.y"
        r="3"
      />
      <circle
        v-for="(node, index) in ctaNodes"
        :key="`cta-node-${index}`"
        class="home-artifact-field__cta-node"
        :cx="node.x"
        :cy="node.y"
        r="2.5"
      />
    </svg>

    <div class="home-meteor-field">
      <span
        v-for="meteor in meteors"
        :key="meteor.id"
        class="home-meteor"
        :style="{
          '--meteor-left': meteor.left,
          '--meteor-top': meteor.top,
          '--meteor-duration': meteor.duration,
          '--meteor-delay': meteor.delay,
          '--meteor-angle': meteor.angle,
        }"
      />
    </div>
  </div>
</template>

<style lang="scss">
.home-artifact-field {
  position: absolute;
  z-index: 0;
  inset: 0;
  overflow: clip;
  pointer-events: none;
}

.home-artifact-field__circuit {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  fill: none;
  stroke: rgba(24, 214, 160, 0.105);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.home-artifact-field__spine {
  stroke: rgba(24, 214, 160, 0.14);
}

.home-artifact-field__node {
  fill: rgba(24, 214, 160, 0.26);
  stroke: none;
}

.home-artifact-field__cta-trace {
  stroke: rgba(24, 214, 160, 0.105);
}

.home-artifact-field__cta-node {
  fill: rgba(24, 214, 160, 0.24);
  stroke: none;
}

.home-meteor-field {
  position: fixed;
  z-index: 0;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.home-meteor {
  position: absolute;
  top: var(--meteor-top);
  left: var(--meteor-left);
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: rgba(24, 214, 160, 0.72);
  opacity: 0;
  transform: rotate(var(--meteor-angle));
  animation: home-meteor-fall var(--meteor-duration) linear var(--meteor-delay)
    infinite;
}

.home-meteor::after {
  position: absolute;
  top: 50%;
  right: 2px;
  width: clamp(34px, 5vw, 64px);
  height: 1px;
  background: linear-gradient(90deg, rgba(24, 214, 160, 0.36), transparent);
  content: '';
  transform: translateY(-50%);
}

@keyframes home-meteor-fall {
  0%,
  8% {
    opacity: 0;
    transform: translate3d(0, 0, 0) rotate(var(--meteor-angle));
  }

  11% {
    opacity: 0.5;
  }

  22% {
    opacity: 0.12;
  }

  27%,
  100% {
    opacity: 0;
    transform: translate3d(130px, 160px, 0) rotate(var(--meteor-angle));
  }
}

@media (max-width: 640px) {
  .home-meteor:nth-child(n + 3) {
    display: none;
  }

  .home-artifact-field__circuit {
    stroke: rgba(24, 214, 160, 0.075);
  }

  .home-artifact-field__cta-node {
    fill: rgba(24, 214, 160, 0.18);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-meteor-field {
    display: none;
  }
}
</style>
