<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import {
  faCloudflare,
  faFigma,
  faGithub,
  faShopify,
  faVuejs,
} from '@fortawesome/free-brands-svg-icons';
import { faArrowDown, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import SectionAtmosphere from '@/components/shared/SectionAtmosphere.vue';

const props = defineProps({
  hero: { type: Object, required: true },
  fullName: { type: String, required: true },
});

const visibleHeroName = computed(() => props.fullName?.trim() || 'Mykola Mud');
const heroKickerItems = computed(() =>
  (props.hero.kicker || '')
    .split('·')
    .map((item) => item.trim())
    .filter(Boolean)
);
const architectureNodes = [
  {
    id: 'figma',
    label: 'Figma',
    role: 'UI source',
    icon: faFigma,
    route: 'M420 280L140 110',
    snippet: [
      'const design = await getDesign()',
      'const tokens = design.variables',
      '<Component :tokens="tokens" />',
    ],
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    role: 'contracts',
    mark: 'TS',
    route: 'M500 280V80',
    snippet: ['type Product = {', '  handle: string', '  price: number', '}'],
  },
  {
    id: 'vue',
    label: 'Vue',
    role: 'components',
    icon: faVuejs,
    route: 'M400 400L140 350',
    snippet: [
      'const props = defineProps<Props>()',
      'const price = computed(() => props.product.price)',
      '<ProductCard :product="product" />',
    ],
  },
  {
    id: 'nuxt',
    label: 'Nuxt',
    role: 'SSR / routing',
    asset: '/images/brands/nuxt.svg',
    route: 'M580 280L860 110',
    snippet: [
      'const product = await getProduct()',
      'const href = `/products/${product.handle}`',
      '<NuxtLink :to="href" />',
    ],
  },
  {
    id: 'api',
    label: 'REST / GraphQL',
    role: 'data layer',
    icon: faCodeBranch,
    route: 'M600 400L860 350',
    snippet: [
      'const query = `query Product {',
      '  product(handle: $handle) { price }',
      '}`',
    ],
  },
  {
    id: 'shopify',
    label: 'Shopify',
    role: 'commerce',
    icon: faShopify,
    route: 'M500 520V620',
    snippet: [
      'const storefront = createClient({',
      '  domain: shop.myshopify.com,',
      '  token: runtimeConfig.storefront',
      '})',
    ],
  },
  {
    id: 'cloudflare',
    label: 'Cloudflare',
    role: 'edge runtime',
    icon: faCloudflare,
    route: 'M600 500L760 520',
    snippet: [
      'export default {',
      '  async fetch(request, env) {',
      '    return handleEdgeRequest(request, env)',
      '  }',
      '}',
    ],
  },
];

const processStages = ['component', 'render', 'storefront'];
architectureNodes.push(
  {
    id: 'pinia',
    label: 'Pinia',
    role: 'state',
    mark: 'P',
    snippet: [
      'export const useCart = defineStore("cart", {',
      '  state: () => ({ items: [] })',
      '})',
    ],
  },
  {
    id: 'github',
    label: 'GitHub',
    role: 'source control',
    icon: faGithub,
    snippet: [
      'git add src/components',
      'git commit -m "feat: storefront"',
      'git push origin feature/storefront',
    ],
  }
);
// One coordinate system drives both HTML icons and SVG connections.
const boardPositions = [
  [12, 12],
  [38, 12],
  [12, 43],
  [64, 12],
  [88, 43],
  [88, 76],
  [64, 89],
  [12, 76],
  [36, 89],
];
architectureNodes.forEach((node, index) => {
  const [x, y] = boardPositions[index];
  node.x = x;
  node.y = y;
  node.route = `M500 350 L${x * 10} ${y * 7}`;
});
const architectureSequence = [
  'figma',
  'vue',
  'typescript',
  'nuxt',
  'api',
  'shopify',
  'api',
  'nuxt',
  'cloudflare',
  'github',
  'pinia',
  'vue',
];
function connectionBetween(sourceId, targetId, index) {
  const source = architectureNodes.find((node) => node.id === sourceId);
  const target = architectureNodes.find((node) => node.id === targetId);
  const sx = source.x * 10;
  const sy = source.y * 7;
  const tx = target.x * 10;
  const ty = target.y * 7;
  const baseLane =
    sourceId === 'nuxt' && targetId === 'cloudflare'
      ? 950
      : sourceId === 'nuxt' || targetId === 'nuxt'
        ? 880
        : sx;
  // Each route owns a lane; reverse requests no longer reuse the same pixels.
  const offset = ((index % 4) + 1) * 12;
  const direction = baseLane >= 500 ? 1 : -1;
  const lane = Math.max(35, Math.min(970, baseLane + direction * offset));
  const startY = sy + (index % 2 ? 7 : -7);
  const endY = ty + (index % 2 ? 7 : -7);
  return `M${sx} ${sy} L${sx + direction * 18} ${startY} H${lane} V${endY} H${tx + direction * 18} L${tx} ${ty}`;
}
const communicationRoutes = architectureSequence.map((id, index) =>
  connectionBetween(
    id,
    architectureSequence[(index + 1) % architectureSequence.length],
    index
  )
);
const communicationStep = ref(0);
const communicationTarget = computed(
  () =>
    architectureSequence[
      (communicationStep.value + 1) % architectureSequence.length
    ]
);
const consoleRoute = computed(() => {
  const node = architectureNodes.find(
    (item) => item.id === architectureSequence[communicationStep.value]
  );
  return `M490 217 V163 H${node.x * 10 - 12} V${node.y * 7 - 12} L${node.x * 10} ${node.y * 7}`;
});
const responseRoute = computed(() => {
  const node = architectureNodes.find(
    (item) => item.id === communicationTarget.value
  );
  return `M${node.x * 10} ${node.y * 7} L${node.x * 10 + 12} ${node.y * 7 + 12} H980 V187 H510 V217`;
});
const communicationRoute = computed(() =>
  flowPhase.value === 'launch'
    ? consoleRoute.value
    : flowPhase.value === 'reply'
      ? responseRoute.value
      : communicationRoutes[communicationStep.value]
);
const activeArchitectureId = ref('nuxt');
const flowPhase = ref('writing');
const activeArchitectureNode = computed(
  () =>
    architectureNodes.find((node) => node.id === activeArchitectureId.value) ||
    architectureNodes[0]
);
const activeCodeLines = computed(() =>
  activeArchitectureNode.value.snippet.map((text, index) => ({
    className:
      index === 0 ? 'code-muted' : index === 1 ? 'code-key' : 'code-tag',
    text,
  }))
);
const codeLength = computed(() =>
  activeCodeLines.value.reduce((total, line) => total + line.text.length + 1, 0)
);
const typedCharacters = ref(999);
const isReducedMotion = ref(false);
const characterMotionState = ref('idle');
let typingTimer;
let motionQuery;
let characterMotionTimer;
let architectureTimer;

const visibleCodeLines = computed(() => {
  let remaining = typedCharacters.value;

  return activeCodeLines.value.map((line) => {
    const visibleLength = isReducedMotion.value
      ? line.text.length
      : Math.max(0, Math.min(line.text.length, remaining));

    remaining -= line.text.length + 1;

    return {
      ...line,
      value: line.text.slice(0, visibleLength),
      visible: visibleLength > 0,
    };
  });
});

const currentStage = computed(() =>
  Math.min(
    processStages.length - 1,
    Math.floor(
      (typedCharacters.value / codeLength.value) * processStages.length
    )
  )
);

const activeCodeLine = computed(() => {
  let remaining = typedCharacters.value;

  for (let index = 0; index < activeCodeLines.value.length; index += 1) {
    if (remaining <= activeCodeLines.value[index].text.length) {
      return index;
    }

    remaining -= activeCodeLines.value[index].text.length + 1;
  }

  return activeCodeLines.value.length - 1;
});

const typingStatus = computed(() =>
  typedCharacters.value >= codeLength.value ? 'ready' : 'writing'
);

function typeCode() {
  if (isReducedMotion.value) {
    typedCharacters.value = codeLength.value;
    return;
  }

  if (typedCharacters.value < codeLength.value) {
    typedCharacters.value += 1;
    typingTimer = window.setTimeout(typeCode, 32);
    return;
  }

  typingTimer = window.setTimeout(() => {
    typedCharacters.value = 0;
    typingTimer = window.setTimeout(typeCode, 220);
  }, 1700);
}

function startTypingPreview() {
  window.clearTimeout(typingTimer);
  typedCharacters.value = codeLength.value;
  typingTimer = window.setTimeout(() => {
    typedCharacters.value = 0;
    typingTimer = window.setTimeout(typeCode, 220);
  }, 1500);
}

function runArchitectureFlow() {
  window.clearTimeout(architectureTimer);

  if (isReducedMotion.value) {
    activeArchitectureId.value = 'nuxt';
    flowPhase.value = 'received';
    return;
  }

  activeArchitectureId.value = architectureSequence[communicationStep.value];
  flowPhase.value = 'writing';
  startTypingPreview();

  architectureTimer = window.setTimeout(
    () => {
      window.clearTimeout(typingTimer);
      typedCharacters.value = codeLength.value;
      flowPhase.value = 'launch';
      architectureTimer = window.setTimeout(() => {
        flowPhase.value = 'sending';
        architectureTimer = window.setTimeout(() => {
          flowPhase.value = 'received';
          activeArchitectureId.value = communicationTarget.value;
          architectureTimer = window.setTimeout(() => {
            flowPhase.value = 'reply';
            architectureTimer = window.setTimeout(() => {
              flowPhase.value = 'complete';
              architectureTimer = window.setTimeout(() => {
                communicationStep.value =
                  (communicationStep.value + 1) % architectureSequence.length;
                runArchitectureFlow();
              }, 900);
            }, 1500);
          }, 650);
        }, 1500);
      }, 1500);
    },
    1500 + codeLength.value * 32 + 220
  );
}

const characterMotionSequence = [
  ['wave', 1200],
  ['open-console', 1100],
  ['typing', 3600],
  ['close-console', 1100],
  ['idle', 2800],
];

function runCharacterMotion(sequence = characterMotionSequence) {
  window.clearTimeout(characterMotionTimer);

  if (isReducedMotion.value) {
    characterMotionState.value = 'idle';
    return;
  }

  const [nextState, duration] = sequence[0];
  characterMotionState.value = nextState;

  characterMotionTimer = window.setTimeout(() => {
    const nextSequence = sequence.slice(1);

    if (nextSequence.length) {
      runCharacterMotion(nextSequence);
      return;
    }

    characterMotionState.value = 'idle';
  }, duration);
}

function updateMotionPreference(event) {
  isReducedMotion.value = event.matches;
  window.clearTimeout(typingTimer);
  window.clearTimeout(characterMotionTimer);
  window.clearTimeout(architectureTimer);

  if (isReducedMotion.value) {
    typedCharacters.value = codeLength.value;
    characterMotionState.value = 'idle';
    return;
  }

  startTypingPreview();
  runCharacterMotion();
  runArchitectureFlow();
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  updateMotionPreference(motionQuery);
  motionQuery.addEventListener?.('change', updateMotionPreference);
});

onBeforeUnmount(() => {
  window.clearTimeout(typingTimer);
  window.clearTimeout(characterMotionTimer);
  window.clearTimeout(architectureTimer);
  motionQuery?.removeEventListener?.('change', updateMotionPreference);
});
</script>

<template>
  <section class="home-hero">
    <SectionAtmosphere class="hero-atmosphere" variant="hero" />
    <div class="hero-shell">
      <div class="hero-grid">
        <div class="hero-copy">
          <p class="hero-kicker" aria-label="Primary technologies">
            <span class="hero-kicker__index" aria-hidden="true">01</span>
            <span class="hero-kicker__signal" aria-hidden="true"></span>
            <span
              v-for="(item, index) in heroKickerItems"
              :key="item"
              class="hero-kicker__item"
            >
              {{ item
              }}<span
                v-if="index < heroKickerItems.length - 1"
                class="hero-kicker__separator"
                aria-hidden="true"
              >
                ·
              </span>
            </span>
          </p>
          <h1 class="hero-name">
            <span>{{ hero.headlinePrimary || visibleHeroName }}</span>
            <span class="hero-name__accent">
              {{ hero.headlineAccent || hero.title }}
            </span>
          </h1>
          <p class="hero-description">{{ hero.description }}</p>

          <div class="hero-cta">
            <router-link class="app-btn app-btn--primary" to="/portfolio">
              {{ hero.portfolioCtaLabel }}
            </router-link>
            <router-link class="app-btn app-btn--ghost" to="/contact">
              {{ hero.contactCtaLabel }}
            </router-link>
          </div>
        </div>

        <div class="hero-visual">
          <div
            class="hero-console-stage"
            :data-motion-state="characterMotionState"
            :data-architecture-node="activeArchitectureId"
            :data-flow-phase="flowPhase"
            @mouseenter="runCharacterMotion()"
          >
            <div
              class="architecture-board"
              :data-active-node="activeArchitectureId"
              :data-flow-phase="flowPhase"
              aria-label="Frontend commerce architecture"
            >
              <div class="architecture-board__backdrop" aria-hidden="true">
                <span>LIVE BUILD / 03</span>
              </div>
              <div class="architecture-board__connections" aria-hidden="true">
                <svg viewBox="0 0 1000 700" preserveAspectRatio="none">
                  <path
                    :d="consoleRoute"
                    :class="{ 'is-active': flowPhase === 'launch' }"
                  />
                  <path
                    v-if="flowPhase === 'reply'"
                    :d="responseRoute"
                    class="is-active"
                  />
                  <circle
                    cx="500"
                    cy="217"
                    r="6"
                    class="architecture-board__port"
                  />
                  <path
                    v-for="(route, index) in communicationRoutes"
                    :key="index"
                    :d="route"
                    :class="{ 'is-active': index === communicationStep }"
                  />
                  <circle
                    v-if="['launch', 'sending', 'reply'].includes(flowPhase)"
                    :key="`${activeArchitectureId}-${flowPhase}`"
                    class="architecture-board__dot"
                    r="5"
                  >
                    <animateMotion
                      :dur="'1.5s'"
                      repeatCount="1"
                      fill="freeze"
                      :path="communicationRoute"
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="linear"
                    />
                  </circle>
                </svg>
              </div>
              <div class="architecture-board__nodes">
                <span
                  v-for="node in architectureNodes"
                  :key="node.id"
                  class="architecture-board__node"
                  :class="`architecture-board__node--${node.id}`"
                  :style="{
                    '--node-x': `${node.x}%`,
                    '--node-y': `${node.y}%`,
                  }"
                  :data-active="activeArchitectureId === node.id"
                  :data-flow-state="
                    activeArchitectureId === node.id ? flowPhase : 'idle'
                  "
                  :aria-label="`${node.label} — ${node.role}`"
                >
                  <font-awesome-icon
                    v-if="node.icon"
                    :icon="node.icon"
                    class="architecture-board__icon"
                    aria-hidden="true"
                  />
                  <img
                    v-else-if="node.asset"
                    :src="node.asset"
                    alt=""
                    class="architecture-board__icon"
                    aria-hidden="true"
                  />
                  <span
                    v-else
                    class="architecture-board__monogram"
                    aria-hidden="true"
                  >
                    {{ node.mark }}
                  </span>
                </span>
              </div>
              <div class="code-window" aria-hidden="true">
                <div class="code-window__bar" aria-hidden="true">
                  <span></span><span></span><span></span>
                  <small>{{ activeArchitectureNode.label }} / live.ts</small>
                  <em>LIVE</em>
                </div>
                <div class="code-window__file">
                  <span class="code-window__file-dot"></span>
                  <span>{{ activeArchitectureNode.label }}</span>
                  <span>{{ activeArchitectureNode.role }}</span>
                </div>
                <pre><code><span
              v-for="(line, index) in visibleCodeLines"
              :key="line.text"
              :class="['code-line', line.className]"
            ><span class="code-line__number">{{ String(index + 1).padStart(2, '0') }}</span><span class="code-line__content">{{ line.value }}<i
                v-if="index === activeCodeLine"
                class="code-caret"
              ></i></span></span></code></pre>
                <div class="code-window__command">
                  <span class="code-window__command-prompt">$</span>
                  <span>npm run build:storefront</span>
                  <strong>{{
                    flowPhase === 'sending'
                      ? 'pinging'
                      : flowPhase === 'received'
                        ? 'received'
                        : typingStatus
                  }}</strong>
                </div>
                <div class="code-window__process">
                  <ol>
                    <li
                      v-for="(stage, index) in processStages"
                      :key="stage"
                      :class="[
                        'code-window__stage',
                        { 'is-active': index <= currentStage },
                      ]"
                    >
                      <span class="code-window__stage-dot"></span>
                      <span>{{ stage }}</span>
                    </li>
                  </ol>
                </div>
                <div class="code-window__status">
                  <span>build / storefront</span>
                  <strong>{{
                    flowPhase === 'complete'
                      ? 'response received'
                      : flowPhase === 'launch'
                        ? 'request sent'
                        : flowPhase === 'reply'
                          ? 'receiving response'
                          : typingStatus
                  }}</strong>
                </div>
              </div>
            </div>
          </div>
          <p class="sr-only">
            Decorative code console showing a Vue component for a Nuxt
            storefront.
          </p>
        </div>
      </div>
    </div>
    <a
      class="hero-scroll-cue"
      href="#section-about"
      aria-label="Scroll to the About section"
    >
      <span class="hero-scroll-cue__label">Follow the signal</span>
      <span class="hero-scroll-cue__rails" aria-hidden="true">
        <svg viewBox="0 0 300 48" preserveAspectRatio="none" focusable="false">
          <path d="M0 24H54L70 40H218L234 24H300" />
          <circle cx="54" cy="24" r="2.5" />
          <circle cx="218" cy="40" r="2.5" />
        </svg>
        <svg viewBox="0 0 300 48" preserveAspectRatio="none" focusable="false">
          <path d="M0 24H66L82 40H230L246 24H300" />
          <circle cx="82" cy="40" r="2.5" />
          <circle cx="246" cy="24" r="2.5" />
        </svg>
      </span>
      <span class="hero-scroll-cue__node" aria-hidden="true">
        <font-awesome-icon :icon="faArrowDown" />
      </span>
      <span class="hero-scroll-cue__stem" aria-hidden="true">
        <span class="hero-scroll-cue__signal"></span>
      </span>
    </a>
  </section>
</template>

<style scoped>
.home-hero .hero-grid {
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: clamp(1.5rem, 2.4vw, 2.75rem);
}
.home-hero .hero-copy {
  min-width: 0;
  max-width: none;
}
.home-hero .hero-name {
  width: 100%;
  max-width: 100%;
  font-size: clamp(3.25rem, 4.2vw, 4.5rem);
  letter-spacing: -0.065em;
  line-height: 1;
  text-wrap: balance;
}
.home-hero .hero-name > span {
  white-space: normal;
}
.home-hero .architecture-board {
  overflow: clip;
}
.home-hero .architecture-board__backdrop {
  inset: 5% 2% 3%;
}

.hero-visual .hero-console-stage {
  width: 100%;
  margin: 0;
  height: clamp(520px, 42vw, 660px);
  contain: none;
}
.architecture-board .architecture-board__node {
  left: var(--node-x) !important;
  top: var(--node-y) !important;
  right: auto !important;
  bottom: auto !important;
  transform: translate(-50%, -50%) !important;
  display: grid !important;
  place-items: center;
  grid-template: 1fr / 1fr;
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  min-height: 0;
  padding: 0;
  border: 0 !important;
  background: var(--color-bg);
  box-shadow: none !important;
  animation: none;
}
.architecture-board__node .architecture-board__icon,
.architecture-board__node .architecture-board__monogram {
  width: 36px;
  height: 36px;
  grid-area: 1 / 1;
  border: 0 !important;
  font-size: 36px;
}
.architecture-board__node .architecture-board__monogram {
  font-size: 22px;
}
.architecture-board .code-window {
  top: 31%;
  left: 50%;
  width: 66%;
  height: 37%;
  min-height: 190px;
  transform: translateX(-50%);
  animation: none;
}
.architecture-board__connections,
.architecture-board__nodes {
  inset: 0;
}
.architecture-board__connections svg {
  display: block;
}
.architecture-board__connections {
  z-index: 1;
}
.architecture-board__port {
  fill: var(--color-info);
}
.architecture-board[data-flow-phase='launch'] .architecture-board__dot {
  fill: var(--color-info);
}
.architecture-board[data-flow-phase='complete'] .architecture-board__port {
  fill: var(--color-accent);
}
.architecture-board[data-flow-phase='sending'] .architecture-board__dot {
  fill: var(--color-info);
}
.architecture-board[data-flow-phase='reply'] .architecture-board__dot {
  fill: var(--color-accent);
}
@media (max-width: 1120px) {
  .home-hero .hero-grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .home-hero .hero-copy {
    max-width: min(100%, 860px);
  }
  .home-hero .hero-visual {
    width: min(100%, 900px);
    margin-inline: auto;
  }
}
@media (max-width: 640px) {
  .home-hero .hero-name {
    font-size: clamp(2.6rem, 10.5vw, 3.5rem);
    line-height: 1.04;
  }
  .hero-visual .hero-console-stage {
    height: 540px;
  }
  .architecture-board .code-window {
    width: 68%;
    padding: 10px;
  }
  .architecture-board .architecture-board__node {
    width: 36px;
    height: 36px;
  }
  .architecture-board__node .architecture-board__icon {
    width: 28px;
    height: 28px;
  }
}
</style>
